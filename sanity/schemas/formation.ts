import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const formation = defineType({
  name: "formation",
  title: "Formation",
  type: "document",
  icon: BookIcon,
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
      name: "targetAudience",
      title: "Public cible",
      type: "string",
      options: {
        list: [
          { title: "Jeunes (16-18 ans)", value: "jeunes" },
          { title: "Adultes & Jeunes", value: "adultes" },
          { title: "Tous publics", value: "tous" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "schedule",
      title: "Horaires",
      type: "string",
      description: "Ex: 11h-13h, 14h-17h",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Tarif",
      type: "string",
      description: "Ex: 30€/semestre, 150€/semestre",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "instructor",
      title: "Intervenant(e)",
      type: "reference",
      to: [{ type: "artist" }],
    }),
    defineField({
      name: "registrationUrl",
      title: "Lien d'inscription",
      type: "url",
    }),
    defineField({
      name: "venue",
      title: "Lieu",
      type: "string",
      description: "Ex: Carré Fourvière",
    }),
    defineField({
      name: "sessions",
      title: "Dates des sessions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "date",
              title: "Date",
              type: "date",
              options: { dateFormat: "DD/MM/YYYY" },
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "string",
              description: "Info supplémentaire optionnelle",
            }),
          ],
          preview: {
            select: { title: "date", subtitle: "note" },
            prepare({ title, subtitle }) {
              const d = title
                ? new Date(title).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Date non définie";
              return { title: d, subtitle };
            },
          },
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      audience: "targetAudience",
      price: "price",
    },
    prepare({ title, audience, price }) {
      return {
        title,
        subtitle: `${audience} — ${price}`,
      };
    },
  },
});
