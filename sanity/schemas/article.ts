import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Festival", value: "festival" },
          { title: "École GEI", value: "ecole" },
          { title: "Interview", value: "interview" },
          { title: "Coulisses", value: "coulisses" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Extrait",
      type: "text",
      rows: 3,
      description: "Court résumé affiché dans la liste des articles",
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Contenu",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Légende",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "readTime",
      title: "Temps de lecture (min)",
      type: "number",
      initialValue: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      date: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, category, date, media }) {
      const d = date ? new Date(date).toLocaleDateString("fr-FR") : "";
      return { title, subtitle: `${category} — ${d}`, media };
    },
  },
  orderings: [
    {
      title: "Date (plus récent)",
      name: "dateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
