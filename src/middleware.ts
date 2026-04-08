import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Routes toujours accessibles même en mode coming soon
const BYPASS_PREFIXES = ['/studio', '/api/', '/_next/', '/coming-soon']
const BYPASS_FILES    = /\.(ico|png|jpg|jpeg|svg|webp|gif|woff2?|ttf|css|js|map)$/i

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Laisser passer le studio, les API, les assets et la page elle-même
  if (
    BYPASS_PREFIXES.some((p) => pathname.startsWith(p)) ||
    BYPASS_FILES.test(pathname)
  ) {
    return NextResponse.next()
  }

  try {
    const query = encodeURIComponent('*[_type=="siteSettings"][0].comingSoonMode')
    const sanityUrl =
      `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${DATASET}?query=${query}`

    const res = await fetch(sanityUrl, {
      // Cache 60 s côté CDN Netlify/Edge pour éviter de trop solliciter Sanity
      headers: { 'Cache-Control': 'max-age=60' },
    })

    if (res.ok) {
      const { result } = await res.json()

      if (result === true) {
        // Réécriture interne vers la page statique dans /public
        const url = request.nextUrl.clone()
        url.pathname = '/coming-soon.html'
        return NextResponse.rewrite(url)
      }
    }
  } catch {
    // En cas d'erreur Sanity, le site reste accessible normalement
  }

  return NextResponse.next()
}

export const config = {
  // Appliquer le middleware à toutes les routes sauf les fichiers statiques Next.js
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
