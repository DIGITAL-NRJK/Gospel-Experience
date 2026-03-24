import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const partner = defineType({
  name: "partner",
  title: "Partenaire",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
      description: "Logo du partenaire. Utilisez un format carré ou horizontal, fond transparent de préférence.",
    }),
    defineField({
      name: "role",
      title: "Rôle / Statut",
      type: "string",
      description: "Ex: Partenaire & mécène, Dirigé par Pascal Horecka, Média partenaire",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Courte description du partenariat",
    }),
    defineField({
      name: "website",
      title: "Site web",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Partenaire phare (affiché en homepage)",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "logo",
    },
  },
  orderings: [
    {
      title: "Ordre personnalisé",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
