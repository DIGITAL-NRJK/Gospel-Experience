import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Média (Galerie)",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      options: {
        list: [
          { title: "Édition 2024", value: "edition-2024" },
          { title: "Édition 2021", value: "edition-2021" },
          { title: "Masterclass", value: "masterclass" },
          { title: "École GEI", value: "ecole-gei" },
          { title: "Coulisses", value: "coulisses" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mediaType",
      title: "Type de média",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Vidéo", value: "video" },
        ],
        layout: "radio",
      },
      initialValue: "photo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description: "Photo ou miniature de la vidéo",
    }),
    defineField({
      name: "videoUrl",
      title: "URL vidéo (YouTube)",
      type: "url",
      description: "Lien YouTube. Laisser vide pour une photo.",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "featured",
      title: "Mettre en avant (grande taille)",
      type: "boolean",
      initialValue: false,
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
      title: "title",
      category: "category",
      type: "mediaType",
      media: "image",
    },
    prepare({ title, category, type, media }) {
      return {
        title,
        subtitle: `${type === "video" ? "Vidéo" : "Photo"} — ${category}`,
        media,
      };
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
