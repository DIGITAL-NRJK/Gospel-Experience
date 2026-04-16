import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

const buttonFields = (textDefault: string, urlDefault: string) => [
  defineField({ name: "text", title: "Texte", type: "string", initialValue: textDefault }),
  defineField({ name: "url", title: "Lien", type: "string", initialValue: urlDefault }),
];

const faqArrayField = (name: string, title: string, group: string) =>
  defineField({
    name, title, type: "array", group,
    description: "Questions fréquentes affichées en accordéon sur la page.",
    of: [{
      type: "object",
      fields: [
        defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
        defineField({ name: "answer", title: "Réponse", type: "text", rows: 3, validation: (r) => r.required() }),
      ],
      preview: { select: { title: "question" } },
    }],
  });

const heroFieldsForMode = (mode: string, label: string, defaults: { title: string; subtitle: string; btn1Text: string; btn1Url: string; btn2Text: string; btn2Url: string }) => [
  defineField({ name: `hero${mode}VideoFile`, title: `Vidéo MP4`, type: "file", group: "hero", options: { accept: "video/mp4" }, hidden: ({ document }) => document?.siteMode !== mode.toLowerCase() }),
  defineField({ name: `hero${mode}VideoUrl`, title: `Vidéo YouTube (fallback)`, type: "url", group: "hero", hidden: ({ document }) => document?.siteMode !== mode.toLowerCase() }),
  defineField({ name: `hero${mode}Title`, title: `Titre`, type: "string", group: "hero", initialValue: defaults.title, hidden: ({ document }) => document?.siteMode !== mode.toLowerCase() }),
  defineField({ name: `hero${mode}Subtitle`, title: `Sous-titre`, type: "text", rows: 2, group: "hero", initialValue: defaults.subtitle, hidden: ({ document }) => document?.siteMode !== mode.toLowerCase() }),
  defineField({ name: `hero${mode}Stats`, title: `Chiffres clés`, type: "object", group: "hero", hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(), fields: [
    defineField({ name: "spectators", title: "Spectateurs", type: "string", initialValue: "3 000+" }),
    defineField({ name: "editions", title: "Éditions", type: "string", initialValue: "3" }),
    defineField({ name: "artists", title: "Artistes", type: "string", initialValue: "80+" }),
    defineField({ name: "since", title: "Depuis", type: "string", initialValue: "2020" }),
  ] }),
  defineField({ name: `hero${mode}Btn1`, title: `Bouton principal`, type: "object", group: "hero", hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(), fields: buttonFields(defaults.btn1Text, defaults.btn1Url) }),
  defineField({ name: `hero${mode}Btn2`, title: `Bouton secondaire`, type: "object", group: "hero", hidden: ({ document }) => document?.siteMode !== mode.toLowerCase(), fields: buttonFields(defaults.btn2Text, defaults.btn2Url) }),
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "① Général", default: true },
    { name: "hero", title: "② Hero (Accueil)" },
    { name: "headerFooter", title: "③ Header & Footer" },
    { name: "homepage", title: "④ Accueil — Sections" },
    { name: "festival", title: "⑤ Page Festival" },
    { name: "programme", title: "⑥ Page Programme" },
    { name: "ecole", title: "⑦ Page École GEI" },
    { name: "about", title: "⑧ Page À propos" },
    { name: "contact", title: "⑨ Contact" },
  ],
  fields: [
    // ═══════════════════════════════════════
    // ① GÉNÉRAL
    // ═══════════════════════════════════════
    defineField({ name: "siteMode", title: "Mode du site", type: "string", group: "general", description: "Change le Hero de la homepage. Les champs correspondants apparaissent dans l'onglet ②.", options: { list: [{ title: "Festival", value: "festival" }, { title: "École GEI", value: "ecole" }, { title: "Général", value: "general" }], layout: "radio" }, initialValue: "general" }),
    defineField({ name: "currentSeason", title: "Saison en cours", type: "string", group: "general", initialValue: "Saison 2026 – 2027" }),
    defineField({ name: "socials", title: "Réseaux sociaux", type: "object", group: "general", fields: [
      defineField({ name: "instagram", title: "Instagram", type: "url" }),
      defineField({ name: "facebook", title: "Facebook", type: "url" }),
      defineField({ name: "youtube", title: "YouTube", type: "url" }),
    ] }),
    defineField({
      name: "comingSoonMode",
      title: "🚧 Mode Coming Soon",
      type: "boolean",
      group: "general",
      description: "Activez pour afficher la page de maintenance à tous les visiteurs. Désactivez pour remettre le site en ligne.",
      initialValue: false,
    }),

    // ═══════════════════════════════════════
    // ② HERO (conditionnel)
    // ═══════════════════════════════════════
    ...heroFieldsForMode("Festival", "Hero Festival", { title: "Fourvière Gospel Expérience", subtitle: "Du 23 au 26 avril 2026 — Concerts, Masterclass et ateliers dans la Crypte de la Basilique de Fourvière.", btn1Text: "Réserver ma place", btn1Url: "/festival", btn2Text: "Voir le programme", btn2Url: "/evenements" }),
    ...heroFieldsForMode("Ecole", "Hero École", { title: "Gospel Experience Institute", subtitle: "Un dimanche par mois, rejoignez notre atelier chœur gospel au Carré Fourvière. Jeunes et adultes, tous niveaux.", btn1Text: "S'inscrire", btn1Url: "/ecole", btn2Text: "Voir les dates", btn2Url: "/ecole#dates" }),
    ...heroFieldsForMode("General", "Hero Général", { title: "Vivez le Gospel au cœur de Lyon", subtitle: "Festival, Masterclass, École de Gospel — une expérience musicale et humaine unique dans l'écrin sacré de la Basilique de Fourvière.", btn1Text: "Réserver ma place", btn1Url: "/festival", btn2Text: "Découvrir l'école", btn2Url: "/ecole" }),

    // ═══════════════════════════════════════
    // ③ HEADER & FOOTER
    // ═══════════════════════════════════════
    defineField({ name: "headerLogo", title: "Logo Header (image)", type: "image", group: "headerFooter", description: "Si vide, le logo local /images/logo-goslym.png est utilisé." }),
    defineField({ name: "headerLogoText", title: "Nom du site (texte)", type: "string", group: "headerFooter", initialValue: "Gospel Expérience" }),
    defineField({ name: "headerLogoSubtext", title: "Sous-texte", type: "string", group: "headerFooter", initialValue: "Lyon Fourvière" }),
    defineField({ name: "headerNavLinks", title: "Liens de navigation", type: "array", group: "headerFooter", description: "Glisser-déposer pour réorganiser.", of: [{ type: "object", fields: [
      defineField({ name: "label", title: "Texte", type: "string", validation: (r) => r.required() }),
      defineField({ name: "href", title: "Lien", type: "string", validation: (r) => r.required() }),
    ], preview: { select: { title: "label", subtitle: "href" } } }] }),
    defineField({ name: "headerCtaButton", title: "Bouton CTA Header", type: "object", group: "headerFooter", fields: buttonFields("Billetterie", "/festival") }),
    defineField({ name: "footerSections", title: "Colonnes de liens Footer", type: "array", group: "headerFooter", of: [{ type: "object", fields: [
      defineField({ name: "title", title: "Titre", type: "string" }),
      defineField({ name: "links", title: "Liens", type: "array", of: [{ type: "object", fields: [
        defineField({ name: "label", title: "Texte", type: "string" }),
        defineField({ name: "href", title: "Lien", type: "string" }),
      ], preview: { select: { title: "label", subtitle: "href" } } }] }),
    ], preview: { select: { title: "title" } } }] }),
    defineField({ name: "footerDescription", title: "Description Footer", type: "text", rows: 3, group: "headerFooter", initialValue: "Association GOSLYM — Gospel Lyon Métropole. Promouvoir le gospel, rassembler les talents, transmettre des valeurs de joie et de fraternité." }),
    defineField({ name: "footerCopyright", title: "Copyright", type: "string", group: "headerFooter", initialValue: "GOSLYM — Gospel Lyon Métropole" }),

    // ═══════════════════════════════════════
    // ④ ACCUEIL — SECTIONS
    // ═══════════════════════════════════════

    // --- Section Festival ---
    defineField({ name: "homeFestivalImage", title: "🎵 Festival — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "homeFestivalTag", title: "🎵 Festival — Étiquette", type: "string", group: "homepage", initialValue: "Le festival" }),
    defineField({ name: "homeFestivalTitle", title: "🎵 Festival — Titre", type: "string", group: "homepage" }),
    defineField({ name: "homeFestivalDescription", title: "🎵 Festival — Description", type: "text", rows: 3, group: "homepage" }),
    defineField({ name: "homeFestivalButton", title: "🎵 Festival — Bouton", type: "object", group: "homepage", fields: buttonFields("Découvrir le festival →", "/festival") }),

    // --- Section École ---
    defineField({ name: "homeEcoleImage", title: "🎶 École — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "homeEcoleTag", title: "🎶 École — Étiquette", type: "string", group: "homepage", initialValue: "L'école GEI" }),
    defineField({ name: "homeEcoleTitle", title: "🎶 École — Titre", type: "string", group: "homepage" }),
    defineField({ name: "homeEcoleDescription", title: "🎶 École — Description", type: "text", rows: 3, group: "homepage" }),
    defineField({ name: "homeEcoleButton", title: "🎶 École — Bouton", type: "object", group: "homepage", fields: buttonFields("S'inscrire →", "/ecole") }),

    // --- Flyer École ---
    defineField({ name: "flyerImage", title: "📄 Flyer École — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "flyerTagline", title: "📄 Flyer École — Étiquette", type: "string", group: "homepage", initialValue: "École de gospel" }),
    defineField({ name: "flyerTitle", title: "📄 Flyer École — Titre", type: "string", group: "homepage" }),
    defineField({ name: "flyerDescription", title: "📄 Flyer École — Description", type: "text", rows: 2, group: "homepage" }),
    defineField({ name: "flyerButton", title: "📄 Flyer École — Bouton principal", type: "object", group: "homepage", fields: buttonFields("S'inscrire →", "/ecole") }),
    defineField({ name: "flyerButton2", title: "📄 Flyer École — Bouton secondaire", type: "object", group: "homepage", fields: buttonFields("Voir le flyer en grand", "") }),

    // --- Flyer Festival ---
    defineField({ name: "festivalFlyerImage", title: "🎪 Flyer Festival — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "festivalFlyerTitle", title: "🎪 Flyer Festival — Titre", type: "string", group: "homepage", initialValue: "Fourvière Gospel Expérience 2026" }),
    defineField({ name: "festivalFlyerDesc", title: "🎪 Flyer Festival — Description courte", type: "string", group: "homepage", initialValue: "23 – 26 avril 2026 · Dans la Crypte de la Basilique de Fourvière · 3ème édition" }),

    // --- Sponsors ---
    defineField({ name: "secondarySponsors", title: "🤝 Sponsors secondaires", type: "array", group: "homepage", of: [{ type: "object", fields: [
      defineField({ name: "name", title: "Nom", type: "string" }),
      defineField({ name: "url", title: "Lien", type: "url" }),
    ], preview: { select: { title: "name" } } }] }),

    // --- Newsletter ---
    defineField({ name: "newsletterTitle", title: "📬 Newsletter — Titre", type: "string", group: "homepage", initialValue: "Accès préventes exclusives" }),
    defineField({ name: "newsletterDescription", title: "📬 Newsletter — Description", type: "string", group: "homepage", initialValue: "Réservez vos places avant l'ouverture au grand public." }),

    // ═══════════════════════════════════════
    // ⑤ PAGE FESTIVAL
    // ═══════════════════════════════════════
    defineField({ name: "festivalHeroImage", title: "🖼️ Hero — Image de fond", type: "image", group: "festival", options: { hotspot: true } }),
    defineField({ name: "festivalHeroTag", title: "🖼️ Hero — Étiquette", type: "string", group: "festival", initialValue: "Festival biennal" }),
    defineField({ name: "festivalHeroTitle", title: "🖼️ Hero — Titre", type: "string", group: "festival", initialValue: "Fourvière Gospel Expérience" }),
    defineField({ name: "festivalHeroSubtitle", title: "🖼️ Hero — Sous-titre", type: "text", rows: 2, group: "festival" }),
    defineField({ name: "festivalHeroButton1", title: "🖼️ Hero — Bouton 1", type: "object", group: "festival", fields: buttonFields("Voir le programme", "#programmation") }),
    defineField({ name: "festivalHeroButton2", title: "🖼️ Hero — Bouton 2", type: "object", group: "festival", fields: buttonFields("Découvrir le lieu", "#lieu") }),

    defineField({ name: "festivalPresentationTag", title: "📝 Présentation — Étiquette", type: "string", group: "festival", initialValue: "Le festival" }),
    defineField({ name: "festivalPresentationTitle", title: "📝 Présentation — Titre", type: "string", group: "festival" }),
    defineField({ name: "festivalIntro", title: "📝 Présentation — Paragraphe 1", type: "text", rows: 5, group: "festival" }),
    defineField({ name: "festivalIntro2", title: "📝 Présentation — Paragraphe 2", type: "text", rows: 5, group: "festival" }),
    defineField({ name: "festivalIntro3", title: "📝 Présentation — Paragraphe 3", type: "text", rows: 5, group: "festival" }),

    defineField({
      name: "festivalHighlights",
      title: "✨ Chiffres clés — 4 cartes",
      type: "array",
      group: "festival",
      description: "Les 4 cartes affichées à droite du texte de présentation (icône, valeur, label, sous-label).",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon", title: "Icône (emoji)", type: "string", initialValue: "🎵" }),
          defineField({ name: "value", title: "Valeur principale", type: "string", validation: (r) => r.required() }),
          defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
          defineField({ name: "sub", title: "Sous-label", type: "string" }),
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
    }),

    defineField({
      name: "festivalUniqueCards",
      title: "🏆 Ce qui rend ce festival unique — 3 cartes",
      type: "array",
      group: "festival",
      description: "Les 3 cartes thématiques en bas de la section présentation.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
          defineField({ name: "desc", title: "Description", type: "text", rows: 3, validation: (r) => r.required() }),
        ],
        preview: { select: { title: "title", subtitle: "desc" } },
      }],
    }),

    defineField({ name: "festivalCrypteImage", title: "🏛️ Crypte — Image", type: "image", group: "festival", options: { hotspot: true } }),
    defineField({ name: "festivalCrypteText", title: "🏛️ Crypte — Description", type: "text", rows: 4, group: "festival" }),
    defineField({ name: "festivalVenueStats", title: "🏛️ Crypte — Chiffres", type: "array", group: "festival", of: [{ type: "object", fields: [
      defineField({ name: "value", title: "Valeur", type: "string" }),
      defineField({ name: "label", title: "Label", type: "string" }),
    ], preview: { select: { title: "value", subtitle: "label" } } }] }),

    defineField({ name: "festivalBasiliqueImage", title: "⛪ Basilique — Image", type: "image", group: "festival", options: { hotspot: true } }),
    defineField({ name: "festivalBasiliqueText", title: "⛪ Basilique — Paragraphe 1", type: "text", rows: 4, group: "festival" }),
    defineField({ name: "festivalBasiliqueText2", title: "⛪ Basilique — Paragraphe 2", type: "text", rows: 4, group: "festival" }),

    defineField({ name: "festivalCtaTitle", title: "🔔 CTA — Titre", type: "string", group: "festival", initialValue: "Ne manquez pas la prochaine édition" }),
    defineField({ name: "festivalCtaDescription", title: "🔔 CTA — Description", type: "text", rows: 2, group: "festival" }),

    faqArrayField("festivalFaqs", "❓ FAQ Festival", "festival"),

    // --- Village Gospel (section homepage + page festival) ---
    defineField({ name: "villageGospelActive", title: "🏕️ Village Gospel — Afficher la section", type: "boolean", group: "festival", description: "Active/désactive la section Village Gospel sur la homepage et la page festival.", initialValue: true }),
    defineField({ name: "villageGospelTitle", title: "🏕️ Village Gospel — Titre", type: "string", group: "festival", initialValue: "Le Village Gospel sur l'Esplanade de Fourvière" }),
    defineField({ name: "villageGospelText", title: "🏕️ Village Gospel — Texte descriptif", type: "text", rows: 4, group: "festival" }),

    // ═══════════════════════════════════════
    // ⑥ PAGE PROGRAMME
    // ═══════════════════════════════════════

    // --- Hero ---
    defineField({ name: "programmeHeroTitle", title: "🎭 Hero — Titre", type: "string", group: "programme", initialValue: "Programme complet" }),
    defineField({ name: "programmeHeroSubtitle", title: "🎭 Hero — Sous-titre", type: "string", group: "programme", initialValue: "4 concerts dans la Crypte · Village Gospel sur l'Esplanade · Masterclasses" }),
    defineField({ name: "programmeBilletterieUrl", title: "🎭 Billetterie — Lien", type: "url", group: "programme", initialValue: "https://reservation.fourviere.org" }),

    // --- Concerts ---
    defineField({
      name: "programmeConcerts",
      title: "🎵 Concerts (4 soirées)",
      type: "array",
      group: "programme",
      description: "Les concerts dans la Crypte. L'ordre ici détermine l'ordre d'affichage sur la page.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "day", title: "Jour", type: "string", validation: (r) => r.required(), description: "Ex: Jeudi, Vendredi, Samedi, Dimanche" }),
          defineField({ name: "date", title: "Date", type: "string", validation: (r) => r.required(), description: "Ex: 23 avril" }),
          defineField({ name: "time", title: "Horaire", type: "string", validation: (r) => r.required(), description: "Ex: 20h30 – 22h" }),
          defineField({ name: "ensemble", title: "Ensemble / Chœur", type: "string", validation: (r) => r.required() }),
          defineField({ name: "director", title: "Directeur artistique", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
          defineField({ name: "firstPart", title: "1ère partie (laisser vide si aucune)", type: "string" }),
        ],
        preview: { select: { title: "ensemble", subtitle: "date" } },
      }],
    }),

    // --- Village Gospel esplanade ---
    defineField({ name: "programmeEsplanadeTitle", title: "🏕️ Esplanade — Titre de section", type: "string", group: "programme", initialValue: "Le Village Gospel sur l'Esplanade" }),
    defineField({ name: "programmeEsplanadeSubtitle", title: "🏕️ Esplanade — Dates & accès", type: "string", group: "programme", initialValue: "Samedi 25 avril · Accès gratuit · 12h30 – 20h15" }),
    defineField({ name: "programmeEsplanadeDesc1", title: "🏕️ Esplanade — Paragraphe 1", type: "text", rows: 4, group: "programme", description: "Description principale du Village Gospel (concerts gratuits, ateliers, Radio Scoop...)" }),
    defineField({ name: "programmeEsplanadeDesc2", title: "🏕️ Esplanade — Paragraphe 2 (partenaires)", type: "text", rows: 3, group: "programme", description: "Ex: Maison Pignol, Les Apprentis d'Auteuil..." }),

    defineField({
      name: "programmeEsplanade",
      title: "🏕️ Programme détaillé de l'esplanade",
      type: "array",
      group: "programme",
      description: "Chaque créneau horaire sur l'esplanade, dans l'ordre chronologique.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "time", title: "Horaire", type: "string", validation: (r) => r.required(), description: "Ex: 13h – 14h" }),
          defineField({ name: "label", title: "Nom du groupe / Activité", type: "string", validation: (r) => r.required() }),
          defineField({ name: "detail", title: "Détail (optionnel)", type: "string", description: "Ex: dirigé par Rose Makamu" }),
          defineField({ name: "type", title: "Type", type: "string", options: { list: [{ title: "Concert", value: "concert" }, { title: "Atelier", value: "atelier" }], layout: "radio" }, initialValue: "concert" }),
        ],
        preview: { select: { title: "time", subtitle: "label" } },
      }],
    }),

    // --- Masterclasses ---
    defineField({ name: "programmeMasterTitle", title: "🎤 Masterclasses — Titre", type: "string", group: "programme", initialValue: "Les Masterclasses" }),
    defineField({ name: "programmeMasterDesc", title: "🎤 Masterclasses — Description", type: "text", rows: 4, group: "programme", description: "Description générale (lieu, public, animateurs...)" }),
    defineField({ name: "programmeMasterDesc2", title: "🎤 Masterclasses — Opportunité (résultat des formations)", type: "text", rows: 3, group: "programme", description: "Ex: À l'issue des formations, les participants pourront se produire en 1ère partie de One Step Gospel." }),

    defineField({
      name: "programmeMasterSessions",
      title: "🎤 Masterclasses — Sessions",
      type: "array",
      group: "programme",
      description: "Les créneaux de masterclasses (ex: samedi 10h–17h, dimanche 10h–16h).",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "day", title: "Jour", type: "string", validation: (r) => r.required(), description: "Ex: Samedi 25 avril" }),
          defineField({ name: "time", title: "Horaire", type: "string", validation: (r) => r.required(), description: "Ex: 10h – 17h" }),
          defineField({ name: "icon", title: "Icône (emoji)", type: "string", initialValue: "🎵" }),
        ],
        preview: { select: { title: "day", subtitle: "time" } },
      }],
    }),

    // --- CTA programme ---
    defineField({ name: "programmeCtaTitle", title: "🔔 CTA — Titre", type: "string", group: "programme", initialValue: "Ne manquez pas la 3ème édition" }),
    defineField({ name: "programmeCtaDesc", title: "🔔 CTA — Description", type: "string", group: "programme", initialValue: "Crypte de la Basilique de Fourvière · 800 places · Lyon 5ème" }),

    // ═══════════════════════════════════════
    // ⑦ PAGE ÉCOLE GEI
    // ═══════════════════════════════════════
    defineField({ name: "ecoleHeroImage", title: "🖼️ Hero — Image", type: "image", group: "ecole", options: { hotspot: true } }),
    defineField({ name: "ecoleHeroTag", title: "🖼️ Hero — Étiquette", type: "string", group: "ecole", initialValue: "Atelier chœur gospel" }),
    defineField({ name: "ecoleHeroTitle", title: "🖼️ Hero — Titre", type: "string", group: "ecole", initialValue: "Gospel Experience Institute" }),
    defineField({ name: "ecoleHeroSubtitle", title: "🖼️ Hero — Sous-titre", type: "text", rows: 2, group: "ecole" }),
    defineField({ name: "ecoleHeroButton1", title: "🖼️ Hero — Bouton 1", type: "object", group: "ecole", fields: buttonFields("S'inscrire maintenant", "#inscription") }),
    defineField({ name: "ecoleHeroButton2", title: "🖼️ Hero — Bouton 2", type: "object", group: "ecole", fields: buttonFields("Voir les dates", "#dates") }),

    defineField({ name: "ecolePresentationTitle", title: "📝 Présentation — Titre", type: "string", group: "ecole", initialValue: "Une école de gospel au cœur de Fourvière" }),
    defineField({ name: "ecolePresentationText", title: "📝 Présentation — Paragraphe 1", type: "text", rows: 4, group: "ecole" }),
    defineField({ name: "ecoleVision", title: "📝 Présentation — Vision", type: "text", rows: 4, group: "ecole" }),
    defineField({ name: "ecolePedagogie", title: "📝 Présentation — Pédagogie", type: "text", rows: 4, group: "ecole" }),

    defineField({ name: "ecoleFormatTag", title: "📋 Format — Étiquette", type: "string", group: "ecole", initialValue: "Format" }),
    defineField({ name: "ecoleFormatTitle", title: "📋 Format — Titre", type: "string", group: "ecole", initialValue: "Deux créneaux, un dimanche par mois" }),
    defineField({ name: "ecoleJeunesSchedule", title: "📋 Jeunes — Horaires", type: "string", group: "ecole", initialValue: "11h – 13h" }),
    defineField({ name: "ecoleJeunesDescription", title: "📋 Jeunes — Description", type: "text", rows: 3, group: "ecole" }),
    defineField({ name: "ecoleJeunesPrice", title: "📋 Jeunes — Tarif", type: "string", group: "ecole", initialValue: "30€" }),
    defineField({ name: "ecoleAdultesSchedule", title: "📋 Adultes — Horaires", type: "string", group: "ecole", initialValue: "14h – 17h" }),
    defineField({ name: "ecoleAdultesDescription", title: "📋 Adultes — Description", type: "text", rows: 3, group: "ecole" }),
    defineField({ name: "ecoleAdultesPrice", title: "📋 Adultes — Tarif", type: "string", group: "ecole", initialValue: "150€" }),

    defineField({ name: "ecoleIntervenants", title: "👤 Intervenants", type: "array", group: "ecole", of: [{ type: "object", fields: [
      defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
      defineField({ name: "role", title: "Rôle(s)", type: "string" }),
      defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
      defineField({ name: "bio", title: "Biographie", type: "text", rows: 4 }),
      defineField({ name: "bio2", title: "Paragraphe complémentaire", type: "text", rows: 3 }),
    ], preview: { select: { title: "name", subtitle: "role", media: "photo" } } }] }),

    defineField({ name: "ecoleDatesTag", title: "📅 Dates — Étiquette", type: "string", group: "ecole", initialValue: "Dates 2026" }),
    defineField({ name: "ecoleDatesTitle", title: "📅 Dates — Titre", type: "string", group: "ecole", initialValue: "Calendrier des sessions" }),
    defineField({ name: "ecoleDates", title: "📅 Dates des sessions", type: "array", group: "ecole", of: [{ type: "object", fields: [
      defineField({ name: "date", title: "Date", type: "date" }),
      defineField({ name: "lieu", title: "Lieu", type: "string", initialValue: "Carré Fourvière" }),
    ], preview: { select: { title: "date", subtitle: "lieu" } } }] }),

    defineField({ name: "ecoleCtaTitle", title: "🔔 CTA — Titre", type: "string", group: "ecole", initialValue: "Prêt à rejoindre le chœur ?" }),
    defineField({ name: "ecoleCtaDescription", title: "🔔 CTA — Description", type: "string", group: "ecole" }),
    defineField({ name: "ecoleCtaButton", title: "🔔 CTA — Bouton", type: "object", group: "ecole", fields: buttonFields("S'inscrire maintenant", "#inscription") }),

    faqArrayField("ecoleFaqs", "❓ FAQ École", "ecole"),

    // ═══════════════════════════════════════
    // ⑧ PAGE À PROPOS
    // ═══════════════════════════════════════
    defineField({ name: "aboutIntro", title: "📝 Introduction", type: "text", rows: 4, group: "about" }),
    defineField({ name: "aboutHistoryTitle", title: "📜 Histoire — Titre", type: "string", group: "about", initialValue: "Du rêve à la scène" }),
    defineField({ name: "aboutHistory", title: "📜 Histoire — Paragraphe 1", type: "text", rows: 5, group: "about" }),
    defineField({ name: "aboutHistory2", title: "📜 Histoire — Paragraphe 2", type: "text", rows: 5, group: "about" }),
    defineField({ name: "aboutStats", title: "📊 Chiffres clés", type: "array", group: "about", of: [{ type: "object", fields: [
      defineField({ name: "value", title: "Valeur", type: "string" }),
      defineField({ name: "label", title: "Label", type: "string" }),
    ], preview: { select: { title: "value", subtitle: "label" } } }] }),
    defineField({ name: "missionFestival", title: "🎯 Mission — Festival", type: "text", rows: 4, group: "about" }),
    defineField({ name: "missionEcole", title: "🎯 Mission — École", type: "text", rows: 4, group: "about" }),
    defineField({ name: "aboutTeam", title: "👥 Équipe / Membres", type: "array", group: "about", description: "Nom, rôle, photo et bio de chaque membre.", of: [{ type: "object", fields: [
      defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
      defineField({ name: "role", title: "Rôle", type: "string", validation: (r) => r.required() }),
      defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
      defineField({ name: "bio", title: "Bio courte", type: "text", rows: 3 }),
    ], preview: { select: { title: "name", subtitle: "role", media: "photo" } } }] }),
    defineField({ name: "socialActions", title: "💛 Actions sociales", type: "array", group: "about", of: [{ type: "object", fields: [
      defineField({ name: "title", title: "Titre", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    ], preview: { select: { title: "title" } } }] }),
    defineField({ name: "aboutCtaTitle", title: "🔔 CTA — Titre", type: "string", group: "about", initialValue: "Envie de nous rejoindre ?" }),
    defineField({ name: "aboutCtaDescription", title: "🔔 CTA — Description", type: "text", rows: 2, group: "about" }),

    // ═══════════════════════════════════════
    // ⑨ CONTACT
    // ═══════════════════════════════════════
    defineField({ name: "contactEmail", title: "Email", type: "string", group: "contact", initialValue: "goslym69@gmail.com" }),
    defineField({ name: "contactPhone", title: "Téléphone", type: "string", group: "contact", initialValue: "07 88 51 96 52" }),
    defineField({ name: "address", title: "Adresse", type: "text", rows: 3, group: "contact", initialValue: "Carré Fourvière\n8 place de Fourvière\n69005 Lyon" }),
  ],
  preview: { prepare() { return { title: "Réglages du site" }; } },
});
