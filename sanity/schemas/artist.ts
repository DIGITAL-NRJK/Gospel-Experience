import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const artist = defineType({
  name: "artist",
  title: "Artiste",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nom",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle",
      type: "string",
      description: "Ex: Chef de chœur, Compositeur, Choriste, Chef d'orchestre",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "biography",
      title: "Biographie",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "website",
      title: "Site web",
      type: "url",
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
      name: "isFeaturedPartner",
      title: "Partenaire phare (affiché en homepage)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "partnerDescription",
      title: "Description partenaire",
      type: "text",
      rows: 3,
      description: "Courte description affichée dans la section partenaires phares",
      hidden: ({ parent }) => !parent?.isFeaturedPartner,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});
