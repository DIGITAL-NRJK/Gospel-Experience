import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "Général", default: true },
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
      name: "heroVideoUrl",
      title: "Vidéo Hero (URL YouTube)",
      type: "url",
      group: "general",
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

    // ===== PAGE À PROPOS =====
    defineField({
      name: "aboutIntro",
      title: "Texte d'introduction",
      type: "text",
      rows: 4,
      group: "about",
      initialValue: "Gospel Lyon Métropole (GOSLYM) a pour mission la promotion du chant gospel à Lyon et dans la métropole lyonnaise. L'association croit profondément que le gospel peut faire grandir grâce aux valeurs qu'il porte : fraternité, solidarité, communion, joie.",
    }),
    defineField({
      name: "aboutStats",
      title: "Chiffres de l'association",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valeur", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "missionFestival",
      title: "Mission — Le Festival",
      type: "text",
      rows: 4,
      group: "about",
      initialValue: "Un festival biennal avec des grands concerts professionnels, offrant une scène aux chorales régionales, et des Masterclass pour permettre aux chanteurs de progresser dans leur art.",
    }),
    defineField({
      name: "missionEcole",
      title: "Mission — L'École de Gospel",
      type: "text",
      rows: 4,
      group: "about",
      initialValue: "À plus long terme, un lieu d'éducation et de professionnalisation pour les jeunes. Le gospel comme chemin vers l'épanouissement, l'apprentissage du travail en groupe et la confiance en soi.",
    }),
    defineField({
      name: "socialActions",
      title: "Actions sociales",
      type: "array",
      group: "about",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
    }),

    // ===== FESTIVAL (TARIFS & LIEU) =====
    defineField({
      name: "festivalTarifs",
      title: "Tarifs du festival",
      type: "array",
      group: "festival",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nom du pass", type: "string" }),
            defineField({ name: "price", title: "Prix", type: "string" }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({ name: "popular", title: "Populaire (mis en avant)", type: "boolean", initialValue: false }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
    }),
    defineField({
      name: "festivalVenue",
      title: "Description du lieu",
      type: "text",
      rows: 4,
      group: "festival",
      initialValue: "Située sous la Basilique Notre-Dame de Fourvière, la crypte offre un cadre unique avec une acoustique remarquable. Ses voûtes basses et pierres apparentes créent une atmosphère intimiste propice aux concerts gospel.",
    }),
    defineField({
      name: "festivalVenueStats",
      title: "Chiffres du lieu",
      type: "array",
      group: "festival",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valeur", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),

    // ===== CONTACT =====
    defineField({
      name: "contactEmail",
      title: "Email de contact",
      type: "string",
      group: "contact",
      initialValue: "goslym69@gmail.com",
    }),
    defineField({
      name: "contactPhone",
      title: "Téléphone",
      type: "string",
      group: "contact",
      initialValue: "07 88 51 96 52",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "text",
      rows: 3,
      group: "contact",
      initialValue: "Carré Fourvière\n5 place de Fourvière\n69005 Lyon",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Réglages du site" };
    },
  },
});
