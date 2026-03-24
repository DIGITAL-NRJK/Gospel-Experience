import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "Général", default: true },
    { name: "cta", title: "Boutons & Flyer" },
    { name: "about", title: "Page À propos" },
    { name: "festival", title: "Festival (tarifs & lieu)" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    // ===== GÉNÉRAL =====
    defineField({
      name: "siteMode",
      title: "Mode du site",
      type: "string",
      group: "general",
      description: "Détermine le contenu mis en avant sur la homepage",
      options: {
        list: [
          { title: "Festival (billetterie en priorité)", value: "festival" },
          { title: "École GEI (inscriptions en priorité)", value: "ecole" },
          { title: "Général (les deux équilibrés)", value: "general" },
        ],
        layout: "radio",
      },
      initialValue: "general",
    }),
    defineField({
      name: "heroVideoFile",
      title: "Vidéo Hero (fichier MP4) — Prioritaire",
      type: "file",
      group: "general",
      options: { accept: "video/mp4" },
      description: "Upload un fichier MP4 (max 1 min, idéalement 10-30 Mo). Qualité parfaite, pas de buffering. Prioritaire sur le lien YouTube.",
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Vidéo Hero (lien YouTube) — Fallback",
      type: "url",
      group: "general",
      description: "Utilisé uniquement si aucun fichier MP4 n'est uploadé ci-dessus.",
    }),
    defineField({
      name: "heroTitle",
      title: "Titre du Hero",
      type: "string",
      group: "general",
      initialValue: "Vivez le Gospel au cœur de Lyon",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sous-titre du Hero",
      type: "text",
      rows: 2,
      group: "general",
      initialValue: "Festival, Masterclass, École de Gospel — une expérience musicale et humaine unique dans l'écrin sacré de la Basilique de Fourvière.",
    }),
    defineField({
      name: "currentSeason",
      title: "Saison en cours",
      type: "string",
      group: "general",
      initialValue: "Saison 2026 – 2027",
    }),
    defineField({
      name: "stats",
      title: "Chiffres clés (homepage)",
      type: "object",
      group: "general",
      fields: [
        defineField({ name: "spectators", title: "Spectateurs", type: "string", initialValue: "1 500+" }),
        defineField({ name: "editions", title: "Éditions", type: "string", initialValue: "3" }),
        defineField({ name: "artists", title: "Artistes", type: "string", initialValue: "80+" }),
        defineField({ name: "since", title: "Depuis", type: "string", initialValue: "2021" }),
      ],
    }),
    defineField({
      name: "socials",
      title: "Réseaux sociaux",
      type: "object",
      group: "general",
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
      ],
    }),

    // ===== BOUTONS & FLYER =====
    defineField({
      name: "ctaPrimary",
      title: "Bouton principal du Hero",
      type: "object",
      group: "cta",
      fields: [
        defineField({ name: "text", title: "Texte", type: "string", initialValue: "Réserver ma place" }),
        defineField({ name: "url", title: "Lien", type: "string", initialValue: "/festival#billetterie" }),
      ],
    }),
    defineField({
      name: "ctaSecondary",
      title: "Bouton secondaire du Hero",
      type: "object",
      group: "cta",
      fields: [
        defineField({ name: "text", title: "Texte", type: "string", initialValue: "Découvrir l'école" }),
        defineField({ name: "url", title: "Lien", type: "string", initialValue: "/ecole" }),
      ],
    }),
    defineField({
      name: "flyerImage",
      title: "Flyer à afficher sur la homepage",
      type: "image",
      group: "cta",
      options: { hotspot: true },
      description: "Image du flyer (ex: flyer GEI). Cliquable en plein écran sur le site.",
    }),
    defineField({
      name: "flyerTitle",
      title: "Titre de la section flyer",
      type: "string",
      group: "cta",
      initialValue: "Rejoignez l'école de gospel",
    }),
    defineField({
      name: "flyerDescription",
      title: "Description sous le flyer",
      type: "text",
      rows: 2,
      group: "cta",
    }),
    defineField({
      name: "flyerLink",
      title: "Lien du flyer (inscription, etc.)",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "secondarySponsors",
      title: "Sponsors secondaires",
      type: "array",
      group: "cta",
      description: "Affichés sous les partenaires phares",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nom", type: "string" }),
            defineField({ name: "url", title: "Lien (optionnel)", type: "url" }),
          ],
          preview: { select: { title: "name" } },
        },
      ],
    }),

    // ===== PAGE À PROPOS =====
    defineField({ name: "aboutIntro", title: "Texte d'introduction", type: "text", rows: 4, group: "about" }),
    defineField({
      name: "aboutStats",
      title: "Chiffres de l'association",
      type: "array",
      group: "about",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Valeur", type: "string" }),
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
    }),
    defineField({ name: "missionFestival", title: "Mission — Le Festival", type: "text", rows: 4, group: "about" }),
    defineField({ name: "missionEcole", title: "Mission — L'École", type: "text", rows: 4, group: "about" }),
    defineField({
      name: "socialActions",
      title: "Actions sociales",
      type: "array",
      group: "about",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Titre", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),

    // ===== FESTIVAL =====
    defineField({
      name: "festivalTarifs",
      title: "Tarifs du festival",
      type: "array",
      group: "festival",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Nom", type: "string" }),
          defineField({ name: "price", title: "Prix", type: "string" }),
          defineField({ name: "description", title: "Description", type: "string" }),
          defineField({ name: "popular", title: "Populaire", type: "boolean", initialValue: false }),
        ],
        preview: { select: { title: "name", subtitle: "price" } },
      }],
    }),
    defineField({ name: "festivalVenue", title: "Description du lieu", type: "text", rows: 4, group: "festival" }),
    defineField({
      name: "festivalVenueStats",
      title: "Chiffres du lieu",
      type: "array",
      group: "festival",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Valeur", type: "string" }),
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
    }),

    // ===== CONTACT =====
    defineField({ name: "contactEmail", title: "Email", type: "string", group: "contact", initialValue: "goslym69@gmail.com" }),
    defineField({ name: "contactPhone", title: "Téléphone", type: "string", group: "contact", initialValue: "07 88 51 96 52" }),
    defineField({ name: "address", title: "Adresse", type: "text", rows: 3, group: "contact", initialValue: "Carré Fourvière\n5 place de Fourvière\n69005 Lyon" }),
  ],
  preview: { prepare() { return { title: "Réglages du site" }; } },
});
