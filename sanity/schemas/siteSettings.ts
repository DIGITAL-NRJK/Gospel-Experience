import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

/* Helper: button object fields */
const buttonFields = (textDefault: string, urlDefault: string) => [
  defineField({ name: "text", title: "Texte", type: "string", initialValue: textDefault }),
  defineField({ name: "url", title: "Lien", type: "string", initialValue: urlDefault }),
];

/* Helper: hero fields for a given mode */
const heroFieldsForMode = (mode: string, label: string, defaults: { title: string; subtitle: string; btn1Text: string; btn1Url: string; btn2Text: string; btn2Url: string }) => [
  defineField({
    name: `hero${mode}VideoFile`,
    title: `${label} — Vidéo MP4`,
    type: "file",
    group: "hero",
    options: { accept: "video/mp4" },
    hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(),
  }),
  defineField({
    name: `hero${mode}VideoUrl`,
    title: `${label} — Vidéo YouTube (fallback)`,
    type: "url",
    group: "hero",
    hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(),
  }),
  defineField({
    name: `hero${mode}Title`,
    title: `${label} — Titre`,
    type: "string",
    group: "hero",
    initialValue: defaults.title,
    hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(),
  }),
  defineField({
    name: `hero${mode}Subtitle`,
    title: `${label} — Sous-titre`,
    type: "text",
    rows: 2,
    group: "hero",
    initialValue: defaults.subtitle,
    hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(),
  }),
  defineField({
    name: `hero${mode}Stats`,
    title: `${label} — Chiffres clés`,
    type: "object",
    group: "hero",
    hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(),
    fields: [
      defineField({ name: "spectators", title: "Spectateurs", type: "string", initialValue: "3 000+" }),
      defineField({ name: "editions", title: "Éditions", type: "string", initialValue: "2" }),
      defineField({ name: "artists", title: "Artistes", type: "string", initialValue: "80+" }),
      defineField({ name: "since", title: "Depuis", type: "string", initialValue: "2020" }),
    ],
  }),
  defineField({
    name: `hero${mode}Btn1`,
    title: `${label} — Bouton principal`,
    type: "object",
    group: "hero",
    hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(),
    fields: buttonFields(defaults.btn1Text, defaults.btn1Url),
  }),
  defineField({
    name: `hero${mode}Btn2`,
    title: `${label} — Bouton secondaire`,
    type: "object",
    group: "hero",
    hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(),
    fields: buttonFields(defaults.btn2Text, defaults.btn2Url),
  }),
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "Général", default: true },
    { name: "hero", title: "Hero (Accueil)" },
    { name: "headerFooter", title: "Header & Footer" },
    { name: "homepage", title: "Page Accueil" },
    { name: "festival", title: "Page Festival" },
    { name: "ecole", title: "Page École GEI" },
    { name: "about", title: "Page À propos" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    // ========================================
    // GÉNÉRAL
    // ========================================
    defineField({
      name: "siteMode",
      title: "Mode du site",
      type: "string",
      group: "general",
      description: "Change le Hero de la homepage et les CTAs. Les champs Hero correspondants apparaissent dans l'onglet Hero.",
      options: {
        list: [
          { title: "Festival", value: "festival" },
          { title: "École GEI", value: "ecole" },
          { title: "Général", value: "general" },
        ],
        layout: "radio",
      },
      initialValue: "general",
    }),
    defineField({ name: "currentSeason", title: "Saison en cours", type: "string", group: "general", initialValue: "Saison 2026 – 2027" }),
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

    // ========================================
    // HERO (conditionnel selon le mode)
    // ========================================
    defineField({
      name: "heroModeInfo",
      title: "Mode actif",
      type: "string",
      group: "hero",
      readOnly: true,
      description: "Changez le mode dans l'onglet Général. Les champs ci-dessous s'adaptent automatiquement.",
    }),

    ...heroFieldsForMode("Festival", "Hero Festival", {
      title: "Fourvière Gospel Expérience",
      subtitle: "Du 23 au 26 avril 2026 — Concerts, Masterclass et ateliers dans la Crypte de la Basilique de Fourvière.",
      btn1Text: "Réserver ma place",
      btn1Url: "/festival",
      btn2Text: "Voir le programme",
      btn2Url: "/evenements",
    }),

    ...heroFieldsForMode("Ecole", "Hero École", {
      title: "Gospel Experience Institute",
      subtitle: "Un dimanche par mois, rejoignez notre atelier chœur gospel au Carré Fourvière. Jeunes et adultes, tous niveaux.",
      btn1Text: "S'inscrire",
      btn1Url: "/ecole",
      btn2Text: "Voir les dates",
      btn2Url: "/ecole#dates",
    }),

    ...heroFieldsForMode("General", "Hero Général", {
      title: "Vivez le Gospel au cœur de Lyon",
      subtitle: "Festival, Masterclass, École de Gospel — une expérience musicale et humaine unique dans l'écrin sacré de la Basilique de Fourvière.",
      btn1Text: "Réserver ma place",
      btn1Url: "/festival",
      btn2Text: "Découvrir l'école",
      btn2Url: "/ecole",
    }),

    // ========================================
    // HEADER & FOOTER
    // ========================================
    defineField({
      name: "headerLogo",
      title: "Header — Logo (image)",
      type: "image",
      group: "headerFooter",
      description: "Logo du site. Si vide, le nom texte s'affiche.",
    }),
    defineField({ name: "headerLogoText", title: "Header — Nom du site", type: "string", group: "headerFooter", initialValue: "Gospel Expérience" }),
    defineField({ name: "headerLogoSubtext", title: "Header — Sous-texte", type: "string", group: "headerFooter", initialValue: "Lyon Fourvière" }),
    defineField({
      name: "headerNavLinks",
      title: "Header — Liens de navigation",
      type: "array",
      group: "headerFooter",
      description: "Liens du menu principal. Glisser-déposer pour réorganiser.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Texte", type: "string", validation: (r) => r.required() }),
          defineField({ name: "href", title: "Lien", type: "string", validation: (r) => r.required() }),
        ],
        preview: { select: { title: "label", subtitle: "href" } },
      }],
    }),
    defineField({
      name: "headerCtaButton",
      title: "Header — Bouton CTA",
      type: "object",
      group: "headerFooter",
      fields: buttonFields("Billetterie", "/festival"),
    }),
    defineField({
      name: "footerSections",
      title: "Footer — Sections de liens",
      type: "array",
      group: "headerFooter",
      description: "Colonnes de liens dans le footer. Ex: Festival, École, Association.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Titre de la section", type: "string" }),
          defineField({
            name: "links",
            title: "Liens",
            type: "array",
            of: [{
              type: "object",
              fields: [
                defineField({ name: "label", title: "Texte", type: "string" }),
                defineField({ name: "href", title: "Lien", type: "string" }),
              ],
              preview: { select: { title: "label", subtitle: "href" } },
            }],
          }),
        ],
        preview: { select: { title: "title" } },
      }],
    }),
    defineField({ name: "footerDescription", title: "Footer — Description", type: "text", rows: 3, group: "headerFooter", initialValue: "Association GOSLYM — Gospel Lyon Métropole. Promouvoir le gospel, rassembler les talents, transmettre des valeurs de joie et de fraternité." }),
    defineField({ name: "footerCopyright", title: "Footer — Copyright", type: "string", group: "headerFooter", initialValue: "GOSLYM — Gospel Lyon Métropole" }),

    // ========================================
    // PAGE ACCUEIL (sections après le Hero)
    // ========================================

    // --- Section Festival ---
    defineField({ name: "homeFestivalImage", title: "Section Festival — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "homeFestivalTag", title: "Section Festival — Étiquette", type: "string", group: "homepage", initialValue: "Le festival" }),
    defineField({ name: "homeFestivalTitle", title: "Section Festival — Titre", type: "string", group: "homepage", initialValue: "La Crypte de Fourvière comme vous ne l'avez jamais entendue" }),
    defineField({ name: "homeFestivalDescription", title: "Section Festival — Description", type: "text", rows: 3, group: "homepage" }),
    defineField({ name: "homeFestivalButton", title: "Section Festival — Bouton", type: "object", group: "homepage", fields: buttonFields("Découvrir le festival →", "/festival") }),

    // --- Section École ---
    defineField({ name: "homeEcoleImage", title: "Section École — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "homeEcoleTag", title: "Section École — Étiquette", type: "string", group: "homepage", initialValue: "L'école GEI" }),
    defineField({ name: "homeEcoleTitle", title: "Section École — Titre", type: "string", group: "homepage", initialValue: "Votre voix a sa place ici" }),
    defineField({ name: "homeEcoleDescription", title: "Section École — Description", type: "text", rows: 3, group: "homepage" }),
    defineField({ name: "homeEcoleButton", title: "Section École — Bouton", type: "object", group: "homepage", fields: buttonFields("S'inscrire →", "/ecole") }),

    // --- Flyer ---
    defineField({ name: "flyerImage", title: "Flyer — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "flyerTagline", title: "Flyer — Étiquette", type: "string", group: "homepage", initialValue: "École de gospel" }),
    defineField({ name: "flyerTitle", title: "Flyer — Titre", type: "string", group: "homepage" }),
    defineField({ name: "flyerDescription", title: "Flyer — Description", type: "text", rows: 2, group: "homepage" }),
    defineField({ name: "flyerButton", title: "Flyer — Bouton principal", type: "object", group: "homepage", fields: buttonFields("S'inscrire →", "/ecole") }),
    defineField({ name: "flyerButton2", title: "Flyer — Bouton secondaire", type: "object", group: "homepage", fields: buttonFields("Voir le flyer en grand", "") }),

    // --- Sponsors ---
    defineField({
      name: "secondarySponsors",
      title: "Sponsors secondaires",
      type: "array",
      group: "homepage",
      of: [{ type: "object", fields: [
        defineField({ name: "name", title: "Nom", type: "string" }),
        defineField({ name: "url", title: "Lien", type: "url" }),
      ], preview: { select: { title: "name" } } }],
    }),

    // --- Newsletter ---
    defineField({ name: "newsletterTitle", title: "Newsletter — Titre", type: "string", group: "homepage", initialValue: "Accès préventes exclusives" }),
    defineField({ name: "newsletterDescription", title: "Newsletter — Description", type: "string", group: "homepage", initialValue: "Réservez vos places avant l'ouverture au grand public." }),

    // ========================================
    // PAGE FESTIVAL
    // ========================================
    defineField({ name: "festivalHeroImage", title: "Hero — Image de fond", type: "image", group: "festival", options: { hotspot: true } }),
    defineField({ name: "festivalHeroTag", title: "Hero — Étiquette", type: "string", group: "festival", initialValue: "Festival biennal" }),
    defineField({ name: "festivalHeroTitle", title: "Hero — Titre", type: "string", group: "festival", initialValue: "Fourvière Gospel Expérience" }),
    defineField({ name: "festivalHeroSubtitle", title: "Hero — Sous-titre", type: "text", rows: 2, group: "festival" }),
    defineField({ name: "festivalHeroButton1", title: "Hero — Bouton 1", type: "object", group: "festival", fields: buttonFields("Voir le programme", "#programmation") }),
    defineField({ name: "festivalHeroButton2", title: "Hero — Bouton 2", type: "object", group: "festival", fields: buttonFields("Découvrir le lieu", "#lieu") }),
    defineField({ name: "festivalPresentationTag", title: "Présentation — Étiquette", type: "string", group: "festival", initialValue: "Le festival" }),
    defineField({ name: "festivalPresentationTitle", title: "Présentation — Titre", type: "string", group: "festival", initialValue: "Une expérience unique en son genre" }),
    defineField({ name: "festivalIntro", title: "Présentation — Paragraphe 1", type: "text", rows: 5, group: "festival" }),
    defineField({ name: "festivalIntro2", title: "Présentation — Paragraphe 2", type: "text", rows: 5, group: "festival" }),
    defineField({ name: "festivalIntro3", title: "Présentation — Paragraphe 3", type: "text", rows: 5, group: "festival" }),
    defineField({ name: "festivalCrypteImage", title: "Crypte — Image", type: "image", group: "festival", options: { hotspot: true } }),
    defineField({ name: "festivalCrypteText", title: "Crypte — Description", type: "text", rows: 4, group: "festival" }),
    defineField({ name: "festivalVenueStats", title: "Crypte — Chiffres", type: "array", group: "festival", of: [{ type: "object", fields: [
      defineField({ name: "value", title: "Valeur", type: "string" }),
      defineField({ name: "label", title: "Label", type: "string" }),
    ], preview: { select: { title: "value", subtitle: "label" } } }] }),
    defineField({ name: "festivalBasiliqueImage", title: "Basilique — Image", type: "image", group: "festival", options: { hotspot: true } }),
    defineField({ name: "festivalBasiliqueText", title: "Basilique — Paragraphe 1", type: "text", rows: 4, group: "festival" }),
    defineField({ name: "festivalBasiliqueText2", title: "Basilique — Paragraphe 2", type: "text", rows: 4, group: "festival" }),
    defineField({ name: "festivalCtaTitle", title: "CTA — Titre", type: "string", group: "festival", initialValue: "Ne manquez pas la prochaine édition" }),
    defineField({ name: "festivalCtaDescription", title: "CTA — Description", type: "text", rows: 2, group: "festival" }),
    defineField({
      name: "festivalFaqs",
      title: "FAQ Festival",
      type: "array",
      group: "festival",
      description: "Questions fréquentes sur le festival. Affichées en accordéon.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
          defineField({ name: "answer", title: "Réponse", type: "text", rows: 3, validation: (r) => r.required() }),
        ],
        preview: { select: { title: "question" } },
      }],
    }),
    // ========================================
    // PAGE ÉCOLE GEI
    // ========================================
    defineField({ name: "ecoleHeroImage", title: "Hero — Image", type: "image", group: "ecole", options: { hotspot: true } }),
    defineField({ name: "ecoleHeroTag", title: "Hero — Étiquette", type: "string", group: "ecole", initialValue: "Atelier chœur gospel" }),
    defineField({ name: "ecoleHeroTitle", title: "Hero — Titre", type: "string", group: "ecole", initialValue: "Gospel Experience Institute" }),
    defineField({ name: "ecoleHeroSubtitle", title: "Hero — Sous-titre", type: "text", rows: 2, group: "ecole" }),
    defineField({ name: "ecoleHeroButton1", title: "Hero — Bouton 1", type: "object", group: "ecole", fields: buttonFields("S'inscrire maintenant", "#inscription") }),
    defineField({ name: "ecoleHeroButton2", title: "Hero — Bouton 2", type: "object", group: "ecole", fields: buttonFields("Voir les dates", "#dates") }),
    defineField({ name: "ecoleFormatTag", title: "Format — Étiquette", type: "string", group: "ecole", initialValue: "Format" }),
    defineField({ name: "ecoleFormatTitle", title: "Format — Titre", type: "string", group: "ecole", initialValue: "Deux créneaux, un dimanche par mois" }),
    defineField({
      name: "ecoleIntervenants",
      title: "Intervenants",
      type: "array",
      group: "ecole",
      of: [{ type: "object", fields: [
        defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
        defineField({ name: "role", title: "Rôle(s)", type: "string" }),
        defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
        defineField({ name: "bio", title: "Biographie", type: "text", rows: 4 }),
        defineField({ name: "bio2", title: "Paragraphe complémentaire", type: "text", rows: 3 }),
      ], preview: { select: { title: "name", subtitle: "role", media: "photo" } } }],
    }),
    defineField({
      name: "ecoleDates",
      title: "Dates des sessions",
      type: "array",
      group: "ecole",
      of: [{ type: "object", fields: [
        defineField({ name: "date", title: "Date", type: "date" }),
        defineField({ name: "lieu", title: "Lieu", type: "string", initialValue: "Carré Fourvière" }),
      ], preview: { select: { title: "date", subtitle: "lieu" } } }],
    }),
    defineField({ name: "ecoleDatesTag", title: "Dates — Étiquette", type: "string", group: "ecole", initialValue: "Dates 2026" }),
    defineField({ name: "ecoleDatesTitle", title: "Dates — Titre", type: "string", group: "ecole", initialValue: "Calendrier des sessions" }),
    defineField({ name: "ecoleCtaTitle", title: "CTA — Titre", type: "string", group: "ecole", initialValue: "Prêt à rejoindre le chœur ?" }),
    defineField({ name: "ecoleCtaDescription", title: "CTA — Description", type: "string", group: "ecole" }),
    defineField({ name: "ecoleCtaButton", title: "CTA — Bouton", type: "object", group: "ecole", fields: buttonFields("S'inscrire maintenant", "#inscription") }),
    defineField({ name: "ecolePresentationTitle", title: "Présentation — Titre", type: "string", group: "ecole", initialValue: "Une école de gospel au cœur de Fourvière" }),
    defineField({ name: "ecolePresentationText", title: "Présentation — Paragraphe 1", type: "text", rows: 4, group: "ecole" }),
    defineField({ name: "ecoleVision", title: "Présentation — Vision", type: "text", rows: 4, group: "ecole" }),
    defineField({ name: "ecolePedagogie", title: "Présentation — Pédagogie", type: "text", rows: 4, group: "ecole" }),
    defineField({
      name: "ecoleFaqs",
      title: "FAQ École",
      type: "array",
      group: "ecole",
      description: "Questions fréquentes sur l'école GEI.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
          defineField({ name: "answer", title: "Réponse", type: "text", rows: 3, validation: (r) => r.required() }),
        ],
        preview: { select: { title: "question" } },
      }],
    }),
    // ========================================
    // PAGE À PROPOS
    // ========================================
    defineField({ name: "aboutIntro", title: "Introduction", type: "text", rows: 4, group: "about" }),
    defineField({ name: "aboutIntro2", title: "Introduction — Suite", type: "text", rows: 4, group: "about" }),
    defineField({ name: "aboutHistoryTitle", title: "Histoire — Titre", type: "string", group: "about", initialValue: "Du rêve à la scène" }),
    defineField({ name: "aboutHistory", title: "Histoire — Paragraphe 1", type: "text", rows: 5, group: "about" }),
    defineField({ name: "aboutHistory2", title: "Histoire — Paragraphe 2", type: "text", rows: 5, group: "about" }),
    defineField({ name: "aboutStats", title: "Chiffres", type: "array", group: "about", of: [{ type: "object", fields: [
      defineField({ name: "value", title: "Valeur", type: "string" }),
      defineField({ name: "label", title: "Label", type: "string" }),
    ], preview: { select: { title: "value", subtitle: "label" } } }] }),
    defineField({ name: "missionFestival", title: "Mission — Festival", type: "text", rows: 4, group: "about" }),
    defineField({ name: "missionEcole", title: "Mission — École", type: "text", rows: 4, group: "about" }),
    defineField({ name: "socialActions", title: "Actions sociales", type: "array", group: "about", of: [{ type: "object", fields: [
      defineField({ name: "title", title: "Titre", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    ], preview: { select: { title: "title" } } }] }),
    defineField({
      name: "aboutTeam",
      title: "Équipe / Membres",
      type: "array",
      group: "about",
      description: "Les membres de l'équipe GOSLYM. Photo, nom, rôle, bio.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
          defineField({ name: "role", title: "Rôle", type: "string", validation: (r) => r.required() }),
          defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
          defineField({ name: "bio", title: "Bio courte", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "name", subtitle: "role", media: "photo" } },
      }],
    }),

    // ========================================
    // CONTACT
    // ========================================
    defineField({ name: "contactEmail", title: "Email", type: "string", group: "contact", initialValue: "goslym69@gmail.com" }),
    defineField({ name: "contactPhone", title: "Téléphone", type: "string", group: "contact", initialValue: "07 88 51 96 52" }),
    defineField({ name: "address", title: "Adresse", type: "text", rows: 3, group: "contact", initialValue: "Carré Fourvière\n5 place de Fourvière\n69005 Lyon" }),
  ],
  preview: { prepare() { return { title: "Réglages du site" }; } },
});
