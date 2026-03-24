import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const event = defineType({
  name: "event",
  title: "Événement",
  type: "document",
  icon: CalendarIcon,
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
      name: "eventType",
      title: "Type d'événement",
      type: "string",
      options: {
        list: [
          { title: "Concert", value: "concert" },
          { title: "Masterclass", value: "masterclass" },
          { title: "Atelier GEI", value: "atelier-gei" },
          { title: "Festival", value: "festival" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dateStart",
      title: "Date de début",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dateEnd",
      title: "Date de fin",
      type: "datetime",
      description: "Laisser vide si événement sur une seule journée",
    }),
    defineField({
      name: "timeStart",
      title: "Heure de début",
      type: "string",
      description: "Ex: 19h00, 14h00",
    }),
    defineField({
      name: "timeEnd",
      title: "Heure de fin",
      type: "string",
      description: "Ex: 22h30, 17h00",
    }),
    defineField({
      name: "venue",
      title: "Lieu",
      type: "string",
      description: "Ex: Crypte de Fourvière, Carré Fourvière",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Adresse complète",
      type: "string",
      description: "Ex: 5 place de Fourvière, 69005 Lyon",
    }),
    defineField({
      name: "price",
      title: "Tarif",
      type: "string",
      description: "Ex: 15€, Gratuit, 30€/semestre",
    }),
    defineField({
      name: "ticketUrl",
      title: "Lien billetterie",
      type: "url",
      description: "URL HelloAsso ou autre plateforme de billetterie",
    }),
    defineField({
      name: "image",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "artists",
      title: "Artistes liés",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant sur la homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "dateStart",
      type: "eventType",
      media: "image",
    },
    prepare({ title, date, type, media }) {
      const d = date ? new Date(date).toLocaleDateString("fr-FR") : "";
      return {
        title,
        subtitle: `${type} — ${d}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Date (plus récent)",
      name: "dateDesc",
      by: [{ field: "dateStart", direction: "desc" }],
    },
    {
      title: "Date (plus ancien)",
      name: "dateAsc",
      by: [{ field: "dateStart", direction: "asc" }],
    },
  ],
});
