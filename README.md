# Gospel Expérience — Next.js + Sanity + Netlify

## Stack technique
- **Frontend** : Next.js 16+ (App Router, TypeScript, Tailwind CSS)
- **CMS** : Sanity (plan Free, 20 sièges)
- **Hébergement** : Netlify (plan Free, usage commercial autorisé)
- **Formulaire** : Resend (plan Free, 3 000 emails/mois)
- **Email pro** : Hostinger Business Email (~1€/mois)
- **Repo** : GitHub

---

## Étape 1 — Créer le projet Next.js

```bash
pnpm create next-app@latest gospel-experience --yes
cd gospel-experience
```

Le flag `--yes` configure automatiquement : TypeScript, Tailwind CSS, ESLint, App Router, Turbopack, alias `@/*`.

---

## Étape 2 — Installer les dépendances

```bash
# Sanity client + générateur d'images
pnpm add next-sanity @sanity/image-url @sanity/vision

# Sanity Studio (intégré dans Next.js)
pnpm add sanity @sanity/icons

# Formulaire + email
pnpm add resend

# Utilitaires
pnpm add clsx

# Fonts Google (optimisées par Next.js)
# → Déjà inclus via next/font, pas besoin d'installer
```

---

## Étape 3 — Créer le projet Sanity

1. Va sur https://www.sanity.io/manage et crée un compte (gratuit)
2. Crée un nouveau projet : "Gospel Expérience"
3. Choisis le dataset : "production"
4. Note ton **Project ID** (ex: `abc123xyz`)

---

## Étape 4 — Configurer les variables d'environnement

Copie le fichier `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

Remplis les valeurs avec ton Project ID Sanity et ta clé API Resend.

---

## Étape 5 — Copier les fichiers du starter kit

Copie tous les fichiers de ce dossier dans ton projet Next.js :

```
src/
  app/
    layout.tsx          → Layout racine avec fonts + metadata SEO
    page.tsx            → Homepage
    studio/[[...tool]]/
      page.tsx          → Sanity Studio intégré dans Next.js
  components/
    Header.tsx          → Header sticky avec navigation
    Footer.tsx          → Footer 4 colonnes
  lib/
    sanity.client.ts    → Client Sanity configuré
    sanity.image.ts     → Helper pour les images Sanity
  styles/
    globals.css         → Design system (couleurs, typographies)
sanity/
  schemas/
    event.ts            → Schéma CPT Événement
    artist.ts           → Schéma CPT Artiste
    formation.ts        → Schéma CPT Formation
    testimonial.ts      → Schéma CPT Témoignage
    siteSettings.ts     → Réglages globaux du site
    index.ts            → Export de tous les schémas
  lib/
    sanity.config.ts    → Configuration Sanity Studio
  sanity.cli.ts         → CLI Sanity
netlify.toml            → Configuration Netlify
.env.example            → Template des variables d'environnement
```

---

## Étape 6 — Lancer en développement

```bash
pnpm dev
```

- Site : http://localhost:3000
- Sanity Studio : http://localhost:3000/studio

---

## Étape 7 — Déployer sur Netlify

1. Push ton code sur GitHub
2. Va sur https://app.netlify.com et connecte ton repo GitHub
3. Configure :
   - Build command : `pnpm build`
   - Publish directory : `.next`
   - Ajoute les variables d'environnement depuis `.env.local`
4. Déploie !

---

## Étape 8 — Configurer le domaine

Dans Netlify > Domain settings > Add custom domain :
1. Ajoute `fourvieregospelexperience.com`
2. Dans Hostinger DNS, ajoute :
   - **A record** : `@` → IP fournie par Netlify
   - **CNAME** : `www` → `ton-site.netlify.app`
   - **Garde** les MX records existants (pour les emails)
3. Ajoute les TXT records de Resend (pour le formulaire)

---

## Étape 9 — Configurer Resend (formulaire)

1. Crée un compte sur https://resend.com
2. Ajoute ton domaine et vérifie les DNS
3. Crée une API key et ajoute-la dans `.env.local`

---

## Étape 10 — Publier le contenu

Connecte-toi à `fourvieregospelexperience.com/studio` et commence à ajouter :
- Les événements (ateliers GEI, prochain festival)
- Les artistes (Hazaële, Pascal Horecka)
- Les formations (créneaux jeunes, adultes)
- Les témoignages
- Les réglages du site (vidéo hero, mode, réseaux sociaux)
