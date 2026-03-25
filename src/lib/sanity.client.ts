import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
});

// ===== SITE SETTINGS =====
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  ...,
  "heroVideoFileUrl": heroVideoFile.asset->url
}`;

// ===== EVENTS =====
export const UPCOMING_EVENTS_QUERY = `
  *[_type == "event" && dateStart >= now()] | order(dateStart asc) [0...4] {
    _id, title, slug, eventType, dateStart, dateEnd,
    timeStart, timeEnd, venue, price, ticketUrl,
    image, featured,
    "artists": artists[]->{ _id, name, slug, role, photo }
  }
`;

export const ALL_EVENTS_QUERY = `
  *[_type == "event"] | order(dateStart desc) {
    _id, title, slug, eventType, dateStart, dateEnd,
    timeStart, timeEnd, venue, price, ticketUrl, image, featured
  }
`;

export const FESTIVAL_EVENTS_QUERY = `
  *[_type == "event" && eventType in ["festival", "concert", "masterclass"]] | order(dateStart asc) {
    _id, title, slug, eventType, dateStart, dateEnd,
    timeStart, timeEnd, venue, price, ticketUrl, image, featured
  }
`;

// ===== TESTIMONIALS (with video support) =====
export const FEATURED_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...6] {
    _id, quote, personName, personRole, photo, rating, category, videoUrl
  }
`;

// ===== ARTISTS =====
export const ALL_ARTISTS_QUERY = `
  *[_type == "artist"] | order(name asc) {
    _id, name, slug, role, photo, biography, website, socials
  }
`;

// ===== PARTNERS =====
export const FEATURED_PARTNERS_QUERY = `
  *[_type == "partner" && featured == true] | order(order asc) {
    _id, name, logo, role, description, website, order
  }
`;

export const ALL_PARTNERS_QUERY = `
  *[_type == "partner"] | order(order asc) {
    _id, name, logo, role, description, website, featured, order
  }
`;

// ===== FORMATIONS =====
export const ALL_FORMATIONS_QUERY = `
  *[_type == "formation"] | order(title asc) {
    _id, title, slug, targetAudience, schedule, price,
    venue, registrationUrl, sessions, image, description,
    "instructor": instructor->{ _id, name, role, photo }
  }
`;

// ===== ARTICLES =====
export const ALL_ARTICLES_QUERY = `
  *[_type == "article"] | order(publishedAt desc) {
    _id, title, slug, category, publishedAt, excerpt, mainImage, readTime
  }
`;

export const RECENT_ARTICLES_QUERY = `
  *[_type == "article"] | order(publishedAt desc) [0...3] {
    _id, title, slug, category, publishedAt, excerpt, mainImage, readTime
  }
`;

export const ARTICLE_BY_SLUG_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id, title, slug, category, publishedAt, excerpt,
    mainImage, body, readTime
  }
`;

export const ALL_ARTICLE_SLUGS_QUERY = `
  *[_type == "article" && defined(slug.current)] { "slug": slug.current }
`;

// ===== GALLERY =====
export const ALL_GALLERY_QUERY = `
  *[_type == "galleryItem"] | order(order asc, _createdAt desc) {
    _id, title, category, mediaType, image, videoUrl, featured, order
  }
`;

export const RECENT_GALLERY_QUERY = `
  *[_type == "galleryItem"] | order(order asc, _createdAt desc) [0...5] {
    _id, title, category, mediaType, image, videoUrl, featured, order
  }
`;

// ===== SITEMAP =====
export const SITEMAP_ARTICLES_QUERY = `
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }
`;
