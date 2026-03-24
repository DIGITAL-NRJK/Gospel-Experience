import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "gospel-experience-studio",
  title: "Gospel Expérience",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu")
          .items([
            S.listItem()
              .title("Réglages du site")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.documentTypeListItem("event").title("Événements"),
            S.documentTypeListItem("artist").title("Artistes"),
            S.documentTypeListItem("formation").title("Formations"),
            S.documentTypeListItem("testimonial").title("Témoignages"),
            S.divider(),
            S.documentTypeListItem("article").title("Articles (Blog)"),
            S.documentTypeListItem("galleryItem").title("Galerie (Médias)"),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
