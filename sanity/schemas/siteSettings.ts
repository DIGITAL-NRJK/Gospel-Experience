import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "siteMode",
      title: "Mode du site",
      type: "string",
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
      description: "URL de la vidéo YouTube pour le fond du hero. Ex: https://www.youtube.com/watch?v=...",
    }),
    defineField({
      name: "heroTitle",
      title: "Titre du Hero",
      type: "string",
      initialValue: "Vivez le Gospel au cœur de Lyon",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sous-titre du Hero",
      type: "text",
      rows: 2,
      initialValue:
        "Festival, Masterclass, École de Gospel — une expérience musicale et humaine unique dans l'écrin sacré de la Basilique de Fourvière.",
    }),
    defineField({
      name: "currentSeason",
      title: "Saison en cours",
      type: "string",
      description: "Ex: Saison 2026 – 2027",
      initialValue: "Saison 2026 – 2027",
    }),
    defineField({
      name: "stats",
      title: "Chiffres clés",
      type: "object",
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
      fields: [
        defineField({ name: "instagram", title: "Instagram", type: "url" }),
        defineField({ name: "facebook", title: "Facebook", type: "url" }),
        defineField({ name: "youtube", title: "YouTube", type: "url" }),
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Email de contact",
      type: "string",
      initialValue: "goslym69@gmail.com",
    }),
    defineField({
      name: "contactPhone",
      title: "Téléphone",
      type: "string",
      initialValue: "07 88 51 96 52",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "text",
      rows: 3,
      initialValue: "Carré Fourvière\n5 place de Fourvière\n69005 Lyon",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Réglages du site" };
    },
  },
});
