// Structured content is centralized here to simplify future translation work.
export const siteShell = {
  brand: {
    name: "ATLANTIC HOLDING",
    eyebrow: "West Africa Investment Platform",
    statement:
      "Groupe d'investissement positionné sur l'immobilier, l'automobile, les services et la restauration en Afrique de l'Ouest."
  },
  navigation: [
    { slug: "accueil", href: "index.html", label: "Accueil" },
    { slug: "apropos", href: "a-propos.html", label: "À propos" },
    { slug: "projets", href: "projets.html", label: "Projets" },
    { slug: "pays", href: "pays.html", label: "Pays" },
    { slug: "investisseurs", href: "investisseurs.html", label: "Investisseurs" },
    { slug: "contact", href: "contact.html", label: "Contact" }
  ],
  primaryCta: {
    label: "Devenir partenaire financier",
    href: "investisseurs.html#dossier"
  }
};

export const stats = [
  {
    value: "3",
    label: "marchés stratégiques",
    note: "Sénégal, Mali, Côte d'Ivoire",
    image: "assets/images/goumalo-residence-tower.jpg"
  },
  {
    value: "2",
    label: "pôles structurants",
    note: "Immobilier et automobile",
    image: "assets/images/goumalo-pool.jpg"
  },
  {
    value: "4",
    label: "marques opérationnelles",
    note: "Goumalo, Atlantic Group, GGB, Africar",
    image: "assets/images/atlantic-automobile-showroom.jpg"
  },
  {
    value: "1",
    label: "vision de groupe",
    note: "Exécution locale et partenaires internationaux",
    image: "assets/images/restaurant-twilight.jpg"
  }
];

export const sectorCards = [
  {
    eyebrow: "1. Immobilier",
    title: "Goumalo",
    copy:
      "Des résidences, terrains et programmes mixtes pensés pour les besoins urbains et les standards de confiance attendus par des partenaires institutionnels.",
    image: "assets/images/goumalo-waterfront.jpg",
    href: "projets.html#immobilier"
  },
  {
    eyebrow: "2. Automobile",
    title: "Atlantic Group",
    copy:
      "Une plateforme régionale pour la vente automobile, l'import-export, les showrooms, la restauration associée et le service après-vente Africar.",
    image: "assets/images/atlantic-automobile-showroom.jpg",
    href: "projets.html#automobile"
  }
];

export const companyCards = [
  {
    name: "Goumalo",
    role: "Pôle immobilier",
    description:
      "Promotion immobilière, programmes résidentiels, actifs mixtes et opportunités d'investissement dans des emplacements stratégiques.",
    logo: "assets/images/goumalo-logo.jpg",
    image: "assets/images/goumalo-waterfront.jpg"
  },
  {
    name: "Atlantic Group",
    role: "Plateforme automobile régionale",
    description:
      "Distribution automobile, import-export, showrooms et restauration intégrée au service d'une clientèle exigeante.",
    logo: "assets/images/atlantic-senegal-logo.jpg",
    image: "assets/images/atlantic-automobile-showroom.jpg"
  },
  {
    name: "GGB",
    role: "Opérateur automobile Sénégal",
    description:
      "Concessionnaire complémentaire au Sénégal, centré sur la vente multimarque, la proximité commerciale et la croissance locale.",
    logo: "assets/images/ggb-logo.jpg",
    image: "assets/images/restaurant-front.jpg"
  },
  {
    name: "Africar",
    role: "Service après-vente",
    description:
      "Maintenance, réparation, pièces détachées et suivi client pour renforcer la durabilité des opérations automobiles.",
    logo: "assets/images/africar-logo.jpg",
    image: "assets/images/restaurant-exterior-wide.jpg"
  }
];

export const countries = [
  {
    slug: "senegal",
    code: "SN",
    name: "Sénégal",
    label: "Plateforme commerciale",
    image: "assets/images/atlantic-automobile-showroom.jpg",
    accent: "#c6a15b",
    summary:
      "Le Sénégal porte l'ancrage commercial du groupe avec une combinaison forte entre distribution automobile, service après-vente, restauration de site et développement immobilier.",
    opportunity:
      "Priorité à l'accélération commerciale, à la montée en gamme de l'offre et à l'expansion des programmes immobiliers urbains.",
    logos: [
      "assets/images/atlantic-senegal-logo.jpg",
      "assets/images/ggb-logo.jpg",
      "assets/images/africar-logo.jpg"
    ],
    entities: [
      {
        name: "Goumalo",
        detail: "Programmes immobiliers, résidences et opportunités foncières."
      },
      {
        name: "Atlantic Group",
        detail: "Distribution automobile, showrooms et import-export."
      },
      {
        name: "Restaurant",
        detail: "Restauration premium adossée aux sites automobiles."
      },
      {
        name: "Africar",
        detail: "Maintenance, réparation, garantie et pièces détachées."
      },
      {
        name: "GGB",
        detail: "Relais automobile complémentaire au Sénégal."
      }
    ]
  },
  {
    slug: "mali",
    code: "ML",
    name: "Mali",
    label: "Ancrage patrimonial",
    image: "assets/images/mixed-tower.jpg",
    accent: "#d5b684",
    summary:
      "Le Mali constitue un marché de conviction pour la structuration d'actifs immobiliers solides et l'implantation de services automobiles à fort potentiel de fidélisation.",
    opportunity:
      "Mise en avant des projets immobiliers mixtes, accompagnement des opérations automobiles et renforcement du maillage après-vente.",
    logos: [
      "assets/images/atlantic-mali-logo.jpg",
      "assets/images/africar-logo.jpg",
      "assets/images/goumalo-logo.jpg"
    ],
    entities: [
      {
        name: "Goumalo",
        detail: "Développement immobilier moderne et programmes adaptés au marché malien."
      },
      {
        name: "Atlantic Group",
        detail: "Projet automobile régional avec point d'entrée sur le marché malien."
      },
      {
        name: "Restaurant",
        detail: "Composante de services associée à l'expérience client automobile."
      },
      {
        name: "Africar",
        detail: "SAV officiel pour l'entretien, la réparation et le suivi."
      }
    ]
  },
  {
    slug: "cote-divoire",
    code: "CI",
    name: "Côte d'Ivoire",
    label: "Hub de croissance régionale",
    image: "assets/images/atlantic-automobile-showroom.jpg",
    accent: "#93a6c9",
    summary:
      "La Côte d'Ivoire représente un marché premium pour déployer des projets automobiles, de services et des investissements immobiliers dans un environnement économique dynamique.",
    opportunity:
      "Approche par plateforme sectorielle, avec possibilité d'entrée par pays, par projet ou par partenariat stratégique.",
    logos: [
      "assets/images/goumalo-logo.jpg",
      "assets/images/africar-logo.jpg"
    ],
    entities: [
      {
        name: "Goumalo",
        detail: "Actifs résidentiels, terrains et programmes urbains ciblés."
      },
      {
        name: "Atlantic Group",
        detail: "Vente automobile, import-export et futurs showrooms."
      },
      {
        name: "Restaurant",
        detail: "Composante restauration liée aux sites automobiles."
      },
      {
        name: "Africar",
        detail: "Maintenance, assistance client et garanties dans la durée."
      }
    ]
  }
];

export const missionPillars = [
  {
    title: "Vision de long terme",
    copy:
      "Concevoir des plateformes durables, adossées à des besoins réels, avec une lecture régionale des opportunités et des cycles d'investissement.",
    image: "assets/images/mixed-tower.jpg"
  },
  {
    title: "Exécution locale",
    copy:
      "Opérer avec une compréhension fine des marchés du Sénégal, du Mali et de la Côte d'Ivoire pour accélérer la mise en œuvre et la fiabilité des projets.",
    image: "assets/images/atlantic-automobile-showroom.jpg"
  },
  {
    title: "Discipline institutionnelle",
    copy:
      "Structurer les projets pour rassurer les investisseurs, faciliter les partenariats financiers et construire une gouvernance lisible.",
    image: "assets/images/goumalo-bedroom.jpg"
  },
  {
    title: "Synergies sectorielles",
    copy:
      "Relier immobilier, automobile, services et restauration afin de renforcer la solidité commerciale et la valeur des actifs.",
    image: "assets/images/restaurant-twilight.jpg"
  }
];

export const projectFamilies = {
  immobilier: {
    eyebrow: "Pôle immobilier",
    title: "Goumalo",
    intro:
      "Goumalo développe une offre immobilière contemporaine, fiable et adaptée aux besoins des marchés ouest-africains, avec une logique de valorisation durable des actifs.",
    image: "assets/images/goumalo-waterfront.jpg",
    features: [
      "Résidences premium et produits résidentiels urbains",
      "Terrains et réserves foncières à fort potentiel",
      "Programmes immobiliers mixtes et actifs de rendement",
      "Opportunités d'investissement structurées par projet",
      "Partenariats financiers recherchés pour le déploiement"
    ]
  },
  automobile: {
    eyebrow: "Pôle automobile",
    title: "Atlantic Group",
    intro:
      "Atlantic Group porte une ambition régionale autour de la vente automobile, de l'import-export de véhicules, de showrooms modernes et de services additionnels qui enrichissent l'expérience client.",
    image: "assets/images/atlantic-automobile-showroom.jpg",
    features: [
      "Vente automobile et sourcing de véhicules",
      "Import-export et structuration de flux régionaux",
      "Showrooms et plateformes commerciales haut de gamme",
      "Restaurants associés aux sites automobiles",
      "Recherche de partenaires financiers et stratégiques"
    ]
  },
  ggb: {
    eyebrow: "Opérateur Sénégal",
    title: "GGB Sénégal",
    intro:
      "GGB renforce le dispositif automobile du groupe au Sénégal avec une offre multimarque, des services de proximité et des perspectives de développement commercial ciblées.",
    image: "assets/images/atlantic-automobile-showroom.jpg",
    features: [
      "Vente de véhicules neufs et d'occasion",
      "Services automobiles et accompagnement client",
      "Renforcement de la capacité commerciale locale",
      "Opportunités de croissance sur le marché sénégalais"
    ]
  },
  africar: {
    eyebrow: "Service après-vente",
    title: "Africar",
    intro:
      "Africar est la colonne vertébrale après-vente du projet automobile dans chaque pays, avec une promesse de qualité, de continuité de service et de confiance client.",
    image: "assets/images/restaurant-exterior-wide.jpg",
    features: [
      "Maintenance préventive et corrective",
      "Réparation et diagnostic technique",
      "Pièces détachées et logistique atelier",
      "Assistance client, garantie et suivi après achat"
    ]
  }
};

export const investorPillars = [
  {
    title: "Présences complémentaires dans 3 pays",
    copy:
      "Le groupe construit une trajectoire régionale entre Sénégal, Mali et Côte d'Ivoire, avec la possibilité de calibrer l'investissement par marché.",
    image: "assets/images/goumalo-residence-tower.jpg"
  },
  {
    title: "Secteurs porteurs et interconnectés",
    copy:
      "Immobilier, automobile, services et restauration s'articulent autour d'une même logique de flux, d'usage et de valeur.",
    image: "assets/images/restaurant-twilight.jpg"
  },
  {
    title: "Partenariats adaptables",
    copy:
      "Ouverture à des partenariats stratégiques, financiers ou opérationnels, selon le pays, le projet et le niveau d'implication recherché.",
    image: "assets/images/goumalo-living.jpg"
  },
  {
    title: "Narratif institutionnel crédible",
    copy:
      "Le positionnement premium et la structuration multi-activités permettent de dialoguer avec des banques, family offices et partenaires internationaux.",
    image: "assets/images/atlantic-automobile-showroom.jpg"
  }
];

export const investmentFormats = [
  {
    title: "Investissement par pays",
    copy:
      "Entrer sur un marché prioritaire selon la thèse d'investissement et la maturité du pipeline local.",
    image: "assets/images/mixed-tower.jpg"
  },
  {
    title: "Investissement par secteur",
    copy:
      "Cibler exclusivement l'immobilier, l'automobile, les services ou la restauration en fonction du mandat du partenaire.",
    image: "assets/images/atlantic-automobile-showroom.jpg"
  },
  {
    title: "Partenariat stratégique",
    copy:
      "Associer capital, réseau, savoir-faire ou capacité de financement autour d'une plateforme de croissance régionale.",
    image: "assets/images/goumalo-waterfront.jpg"
  }
];

export const resources = [
  {
    title: "Plaquette Goumalo",
    copy: "Document de présentation immobilière pour une première lecture du projet.",
    image: "assets/images/goumalo-waterfront.jpg",
    href: "assets/docs/goumalo-brochure.pdf",
    cta: "Ouvrir la plaquette"
  },
  {
    title: "Rapport Tour Mixte Badalabougou",
    copy:
      "Support descriptif d'un projet mixte illustrant la capacité du groupe à structurer des actifs complexes.",
    image: "assets/images/mixed-tower.jpg",
    href: "assets/docs/tour-mixte-badalabougou.pdf",
    cta: "Consulter le rapport"
  }
];

export const contactDetails = [
  {
    label: "Email groupe",
    value: "info@goumalo.com",
    href: "mailto:info@goumalo.com"
  },
  {
    label: "Mali",
    value: "(+223) 91 19 06 15",
    href: "tel:+22391190615"
  },
  {
    label: "Sénégal",
    value: "+221 76 584 51 51",
    href: "tel:+221765845151"
  },
  {
    label: "Abidjan",
    value: "+225 84 04 07 07",
    href: "tel:+22584040707"
  }
];

export const ceoProfile = {
  name: "Cheikh Ahmed Tidiane Fall",
  role: "CEO",
  quote:
    "Notre ambition est de construire des plateformes solides dans l'immobilier et l'automobile, capables d'accompagner la croissance de l'Afrique de l'Ouest avec exigence, confiance et vision."
};
