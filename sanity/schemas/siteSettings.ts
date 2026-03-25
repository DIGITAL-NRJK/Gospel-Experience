import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Réglages du site",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "Général", default: true },
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
      description: "Détermine les CTAs mis en avant sur la homepage",
      options: {
        list: [
          { title: "Festival (billetterie en priorité)", value: "festival" },
          { title: "École GEI (inscriptions en priorité)", value: "ecole" },
          { title: "Général (les deux équilibrés)", value: "general" },
        ],
        layout: "radio",
      },
      initialValue: "general",
    }),
    defineField({
      name: "currentSeason",
      title: "Saison en cours",
      type: "string",
      group: "general",
      initialValue: "Saison 2026 – 2027",
    }),
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
    // PAGE ACCUEIL
    // ========================================

    // --- Hero ---
    defineField({
      name: "heroVideoFile",
      title: "Hero — Vidéo MP4 (prioritaire)",
      type: "file",
      group: "homepage",
      options: { accept: "video/mp4" },
      description: "Upload un fichier MP4 (max 1 min). Prioritaire sur YouTube.",
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero — Vidéo YouTube (fallback)",
      type: "url",
      group: "homepage",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero — Titre",
      type: "string",
      group: "homepage",
      initialValue: "Vivez le Gospel au cœur de Lyon",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero — Sous-titre",
      type: "text",
      rows: 2,
      group: "homepage",
      initialValue: "Festival, Masterclass, École de Gospel — une expérience musicale et humaine unique dans l'écrin sacré de la Basilique de Fourvière.",
    }),
    defineField({
      name: "stats",
      title: "Hero — Chiffres clés",
      type: "object",
      group: "homepage",
      fields: [
        defineField({ name: "spectators", title: "Spectateurs", type: "string", initialValue: "3 000+" }),
        defineField({ name: "editions", title: "Éditions", type: "string", initialValue: "2" }),
        defineField({ name: "artists", title: "Artistes", type: "string", initialValue: "80+" }),
        defineField({ name: "since", title: "Depuis", type: "string", initialValue: "2020" }),
      ],
    }),
    defineField({
      name: "ctaPrimary",
      title: "Hero — Bouton principal",
      type: "object",
      group: "homepage",
      fields: [
        defineField({ name: "text", title: "Texte", type: "string", initialValue: "Réserver ma place" }),
        defineField({ name: "url", title: "Lien", type: "string", initialValue: "/festival" }),
      ],
    }),
    defineField({
      name: "ctaSecondary",
      title: "Hero — Bouton secondaire",
      type: "object",
      group: "homepage",
      fields: [
        defineField({ name: "text", title: "Texte", type: "string", initialValue: "Découvrir l'école" }),
        defineField({ name: "url", title: "Lien", type: "string", initialValue: "/ecole" }),
      ],
    }),

    // --- Section Festival (homepage) ---
    defineField({ name: "homeFestivalImage", title: "Section Festival — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "homeFestivalTag", title: "Section Festival — Étiquette", type: "string", group: "homepage", initialValue: "Le festival" }),
    defineField({ name: "homeFestivalTitle", title: "Section Festival — Titre", type: "string", group: "homepage", initialValue: "La Crypte de Fourvière comme vous ne l'avez jamais entendue" }),
    defineField({ name: "homeFestivalDescription", title: "Section Festival — Description", type: "text", rows: 3, group: "homepage", initialValue: "Tous les deux ans, la Crypte de la Basilique se transforme en salle de concert pour accueillir le gospel. Quatre jours de concerts, Masterclass et ateliers." }),
    defineField({ name: "homeFestivalButton", title: "Section Festival — Bouton", type: "object", group: "homepage", fields: [
      defineField({ name: "text", title: "Texte", type: "string", initialValue: "Découvrir le festival →" }),
      defineField({ name: "url", title: "Lien", type: "string", initialValue: "/festival" }),
    ]}),

    // --- Section École (homepage) ---
    defineField({ name: "homeEcoleImage", title: "Section École — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "homeEcoleTag", title: "Section École — Étiquette", type: "string", group: "homepage", initialValue: "L'école GEI" }),
    defineField({ name: "homeEcoleTitle", title: "Section École — Titre", type: "string", group: "homepage", initialValue: "Votre voix a sa place ici" }),
    defineField({ name: "homeEcoleDescription", title: "Section École — Description", type: "text", rows: 3, group: "homepage", initialValue: "Un dimanche par mois, rejoignez l'atelier chœur gospel au Carré Fourvière. Jeunes dès 16 ans et adultes, tous niveaux." }),
    defineField({ name: "homeEcoleButton", title: "Section École — Bouton", type: "object", group: "homepage", fields: [
      defineField({ name: "text", title: "Texte", type: "string", initialValue: "S'inscrire →" }),
      defineField({ name: "url", title: "Lien", type: "string", initialValue: "/ecole" }),
    ]}),

    // --- Flyer ---
    defineField({ name: "flyerImage", title: "Flyer — Image", type: "image", group: "homepage", options: { hotspot: true } }),
    defineField({ name: "flyerTitle", title: "Flyer — Titre", type: "string", group: "homepage" }),
    defineField({ name: "flyerDescription", title: "Flyer — Description", type: "text", rows: 2, group: "homepage" }),
    defineField({ name: "flyerLink", title: "Flyer — Lien", type: "string", group: "homepage" }),

    // --- Sponsors secondaires ---
    defineField({
      name: "secondarySponsors",
      title: "Sponsors secondaires",
      type: "array",
      group: "homepage",
      of: [{ type: "object", fields: [
        defineField({ name: "name", title: "Nom", type: "string" }),
        defineField({ name: "url", title: "Lien (optionnel)", type: "url" }),
      ], preview: { select: { title: "name" } } }],
    }),

    // --- Newsletter ---
    defineField({ name: "newsletterTitle", title: "Newsletter — Titre", type: "string", group: "homepage", initialValue: "Accès préventes exclusives" }),
    defineField({ name: "newsletterDescription", title: "Newsletter — Description", type: "string", group: "homepage", initialValue: "Réservez vos places avant l'ouverture au grand public." }),

    // ========================================
    // PAGE FESTIVAL
    // ========================================

    // --- Hero Festival ---
    defineField({ name: "festivalHeroImage", title: "Hero — Image de fond", type: "image", group: "festival", options: { hotspot: true } }),
    defineField({ name: "festivalHeroTag", title: "Hero — Étiquette", type: "string", group: "festival", initialValue: "Festival biennal" }),
    defineField({ name: "festivalHeroTitle", title: "Hero — Titre", type: "string", group: "festival", initialValue: "Fourvière Gospel Expérience" }),
    defineField({ name: "festivalHeroSubtitle", title: "Hero — Sous-titre", type: "text", rows: 2, group: "festival", initialValue: "Depuis 2021, le rendez-vous incontournable du gospel à Lyon. Quatre jours de concerts, Masterclass et ateliers dans le cadre exceptionnel de la Crypte de la Basilique de Fourvière." }),
    defineField({ name: "festivalHeroButton1", title: "Hero — Bouton 1", type: "object", group: "festival", fields: [
      defineField({ name: "text", title: "Texte", type: "string", initialValue: "Voir le programme" }),
      defineField({ name: "url", title: "Lien", type: "string", initialValue: "#programmation" }),
    ]}),
    defineField({ name: "festivalHeroButton2", title: "Hero — Bouton 2", type: "object", group: "festival", fields: [
      defineField({ name: "text", title: "Texte", type: "string", initialValue: "Découvrir le lieu" }),
      defineField({ name: "url", title: "Lien", type: "string", initialValue: "#lieu" }),
    ]}),

    // --- Présentation Festival ---
    defineField({ name: "festivalPresentationTag", title: "Présentation — Étiquette", type: "string", group: "festival", initialValue: "Le festival" }),
    defineField({ name: "festivalPresentationTitle", title: "Présentation — Titre", type: "string", group: "festival", initialValue: "Une expérience unique en son genre" }),
    defineField({ name: "festivalIntro", title: "Présentation — Paragraphe 1", type: "text", rows: 5, group: "festival" }),
    defineField({ name: "festivalIntro2", title: "Présentation — Paragraphe 2", type: "text", rows: 5, group: "festival", initialValue: "Chaque édition réunit des artistes professionnels, des chorales régionales et des musiciens d'orchestre pour des concerts d'exception dans la Crypte de la Basilique de Fourvière. Le festival propose également des Masterclass ouvertes à tous, encadrées par des artistes de renom, permettant aux participants de monter sur scène lors du concert de clôture." }),
    defineField({ name: "festivalIntro3", title: "Présentation — Paragraphe 3", type: "text", rows: 5, group: "festival", initialValue: "Au-delà de la musique, le festival porte une dimension sociale forte : invitation de jeunes en difficulté, accessibilité aux personnes en situation de handicap, partenariats solidaires. Le gospel est ici un vecteur de partage, de joie et d'inclusion." }),

    // --- Crypte ---
    defineField({ name: "festivalCrypteImage", title: "Crypte — Image", type: "image", group: "festival", options: { hotspot: true } }),
    defineField({ name: "festivalCrypteText", title: "Crypte — Description", type: "text", rows: 4, group: "festival" }),
    defineField({
      name: "festivalVenueStats",
      title: "Crypte — Chiffres",
      type: "array",
      group: "festival",
      of: [{ type: "object", fields: [
        defineField({ name: "value", title: "Valeur", type: "string" }),
        defineField({ name: "label", title: "Label", type: "string" }),
      ], preview: { select: { title: "value", subtitle: "label" } } }],
    }),

    // --- Basilique ---
    defineField({ name: "festivalBasiliqueImage", title: "Basilique — Image", type: "image", group: "festival", options: { hotspot: true } }),
    defineField({ name: "festivalBasiliqueText", title: "Basilique — Paragraphe 1", type: "text", rows: 4, group: "festival" }),
    defineField({ name: "festivalBasiliqueText2", title: "Basilique — Paragraphe 2", type: "text", rows: 4, group: "festival", initialValue: "La Fondation Fourvière, partenaire et mécène du festival, met à disposition la Crypte et son esplanade pour les concerts et les Masterclass, ainsi que son service de communication pour la promotion de l'événement." }),

    // --- CTA Festival ---
    defineField({ name: "festivalCtaTitle", title: "CTA bas — Titre", type: "string", group: "festival", initialValue: "Ne manquez pas la prochaine édition" }),
    defineField({ name: "festivalCtaDescription", title: "CTA bas — Description", type: "text", rows: 2, group: "festival", initialValue: "Inscrivez-vous à la newsletter pour être informé de l'ouverture de la billetterie et de la programmation." }),

    // ========================================
    // PAGE ÉCOLE GEI
    // ========================================

    // --- Hero École ---
    defineField({ name: "ecoleHeroImage", title: "Hero — Image de fond", type: "image", group: "ecole", options: { hotspot: true } }),
    defineField({ name: "ecoleHeroTag", title: "Hero — Étiquette", type: "string", group: "ecole", initialValue: "Atelier chœur gospel" }),
    defineField({ name: "ecoleHeroTitle", title: "Hero — Titre", type: "string", group: "ecole", initialValue: "Gospel Experience Institute" }),
    defineField({ name: "ecoleHeroSubtitle", title: "Hero — Sous-titre", type: "text", rows: 2, group: "ecole", initialValue: "Un dimanche par mois, rejoignez notre atelier chœur gospel au Carré Fourvière." }),
    defineField({ name: "ecoleHeroButton1", title: "Hero — Bouton 1", type: "object", group: "ecole", fields: [
      defineField({ name: "text", title: "Texte", type: "string", initialValue: "S'inscrire maintenant" }),
      defineField({ name: "url", title: "Lien", type: "string", initialValue: "#inscription" }),
    ]}),
    defineField({ name: "ecoleHeroButton2", title: "Hero — Bouton 2", type: "object", group: "ecole", fields: [
      defineField({ name: "text", title: "Texte", type: "string", initialValue: "Voir les dates" }),
      defineField({ name: "url", title: "Lien", type: "string", initialValue: "#dates" }),
    ]}),

    // --- Format École ---
    defineField({ name: "ecoleFormatTag", title: "Format — Étiquette", type: "string", group: "ecole", initialValue: "Format" }),
    defineField({ name: "ecoleFormatTitle", title: "Format — Titre", type: "string", group: "ecole", initialValue: "Deux créneaux, un dimanche par mois" }),

    // --- Intervenants (array — multi-intervenants) ---
    defineField({
      name: "ecoleIntervenants",
      title: "Intervenants",
      type: "array",
      group: "ecole",
      description: "Les intervenants/professeurs de l'école. Ajouter autant que nécessaire.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "name", title: "Nom", type: "string", validation: (r) => r.required() }),
          defineField({ name: "role", title: "Rôle(s)", type: "string", description: "Ex: Compositrice · Interprète · Chef de chœur" }),
          defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
          defineField({ name: "bio", title: "Biographie", type: "text", rows: 4 }),
          defineField({ name: "bio2", title: "Paragraphe complémentaire (optionnel)", type: "text", rows: 3 }),
        ],
        preview: {
          select: { title: "name", subtitle: "role", media: "photo" },
        },
      }],
    }),

    // --- Dates École ---
    defineField({
      name: "ecoleDates",
      title: "Dates des sessions",
      type: "array",
      group: "ecole",
      description: "Dates des ateliers pour la saison en cours.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "date", title: "Date", type: "date" }),
          defineField({ name: "lieu", title: "Lieu", type: "string", initialValue: "Carré Fourvière" }),
        ],
        preview: {
          select: { title: "date", subtitle: "lieu" },
        },
      }],
    }),
    defineField({ name: "ecoleDatesTag", title: "Dates — Étiquette", type: "string", group: "ecole", initialValue: "Dates 2026" }),
    defineField({ name: "ecoleDatesTitle", title: "Dates — Titre", type: "string", group: "ecole", initialValue: "Calendrier des sessions" }),

    // --- CTA École ---
    defineField({ name: "ecoleCtaTitle", title: "CTA bas — Titre", type: "string", group: "ecole", initialValue: "Prêt à rejoindre le chœur ?" }),
    defineField({ name: "ecoleCtaDescription", title: "CTA bas — Description", type: "string", group: "ecole", initialValue: "Carré Fourvière — 5 place de Fourvière, 69005 Lyon" }),
    defineField({ name: "ecoleCtaButton", title: "CTA bas — Bouton", type: "object", group: "ecole", fields: [
      defineField({ name: "text", title: "Texte", type: "string", initialValue: "S'inscrire maintenant" }),
      defineField({ name: "url", title: "Lien", type: "string", initialValue: "#inscription" }),
    ]}),

    // ========================================
    // PAGE À PROPOS
    // ========================================
    defineField({ name: "aboutIntro", title: "Texte d'introduction", type: "text", rows: 4, group: "about" }),
    defineField({
      name: "aboutStats",
      title: "Chiffres de l'association",
      type: "array",
      group: "about",
      of: [{ type: "object", fields: [
        defineField({ name: "value", title: "Valeur", type: "string" }),
        defineField({ name: "label", title: "Label", type: "string" }),
      ], preview: { select: { title: "value", subtitle: "label" } } }],
    }),
    defineField({ name: "missionFestival", title: "Mission — Le Festival", type: "text", rows: 4, group: "about" }),
    defineField({ name: "missionEcole", title: "Mission — L'École", type: "text", rows: 4, group: "about" }),
    defineField({
      name: "socialActions",
      title: "Actions sociales",
      type: "array",
      group: "about",
      of: [{ type: "object", fields: [
        defineField({ name: "title", title: "Titre", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      ], preview: { select: { title: "title" } } }],
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
