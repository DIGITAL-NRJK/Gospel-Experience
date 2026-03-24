import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const testimonial = defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "quote",
      title: "Citation",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "personName",
      title: "Nom de la personne",
      type: "string",
      description: "Ex: Marie D., Thomas K.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "personRole",
      title: "Rôle / Contexte",
      type: "string",
      description: "Ex: Spectatrice Édition 2024, Parent d'élève GEI",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo (optionnel)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "rating",
      title: "Note (1-5)",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Festival", value: "festival" },
          { title: "École GEI", value: "ecole" },
          { title: "Masterclass", value: "masterclass" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Affiché en homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "personName",
      subtitle: "personRole",
      media: "photo",
    },
  },
});
