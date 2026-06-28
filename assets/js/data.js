// Central content model used by the public site and the private admin area.
// Keeping everything here makes translation and future CMS changes simpler.

export const defaultSiteContent = {
  siteShell: {
    brand: {
      name: "ATLANTIC HOLDING",
      eyebrow: "West Africa Investment Platform",
      statement:
        "Groupe d'investissement positionne sur l'immobilier, l'automobile, les services et la restauration en Afrique de l'Ouest."
    },
    navigation: [
      { slug: "accueil", href: "index.html", label: "Accueil" },
      { slug: "apropos", href: "a-propos.html", label: "A propos" },
      { slug: "projets", href: "projets.html", label: "Projets" },
      { slug: "pays", href: "pays.html", label: "Pays" },
      { slug: "investisseurs", href: "investisseurs.html", label: "Investisseurs" },
      { slug: "contact", href: "contact.html", label: "Contact" }
    ],
    primaryCta: {
      label: "Devenir partenaire financier",
      href: "investisseurs.html#dossier"
    },
    contactEmail: "info@goumalo.com",
    whatsappNumber: "+22391190615"
  },
  pages: {
    home: {
      hero: {
        title: "Les grands Projets",
        subtitle: "100% de Rentabilite",
        video: "assets/videos/atlantic-hero.mp4",
        poster: "assets/images/atlantic-automobile-showroom.jpg",
        primaryCta: {
          label: "Decouvrir les projets",
          href: "projets.html"
        },
        secondaryCta: {
          label: "Devenir partenaire financier",
          href: "investisseurs.html#dossier"
        }
      },
      groupStory: {
        eyebrow: "Le groupe",
        title: "Une plateforme d'investissement pensee pour la confiance",
        image: "assets/images/goumalo-waterfront.jpg",
        paragraphs: [
          "ATLANTIC HOLDING reunit des projets a forte valeur d'usage dans l'immobilier, l'automobile, les services et la restauration. L'ambition est claire : structurer des operations robustes, lisibles et attractives pour des partenaires financiers internationaux.",
          "Entre vision entrepreneuriale, execution locale et standard premium, le groupe deploie un modele qui associe actifs tangibles, presence regionale et potentiel de croissance."
        ],
        links: [
          { label: "Decouvrir la vision", href: "a-propos.html" },
          { label: "Voir les marches", href: "pays.html" }
        ]
      },
      sectorsIntro: {
        eyebrow: "Nos poles",
        title: "Deux moteurs de croissance, une logique de groupe",
        copy:
          "Le site combine une lecture institutionnelle des projets et une presentation claire des opportunites par activite, afin de faciliter l'analyse des partenaires et investisseurs."
      },
      regionsIntro: {
        eyebrow: "Empreinte regionale",
        title: "Trois pays, une trajectoire coherente",
        copy:
          "Senegal, Mali et Cote d'Ivoire concentrent des besoins urbains, commerciaux et de services compatibles avec le positionnement premium du groupe."
      },
      brandsIntro: {
        eyebrow: "Entreprises",
        title: "Des marques complementaires au service d'une meme ambition",
        copy:
          "Chaque entreprise joue un role precis dans la chaine de valeur, du developpement immobilier a l'experience automobile et au service apres-vente."
      },
      ceoStory: {
        eyebrow: "Vision du CEO",
        image: "assets/images/mixed-tower.jpg"
      },
      investorsCta: {
        title: "Opportunites pour partenaires financiers",
        copy:
          "ATLANTIC HOLDING recherche des partenaires capables d'accompagner des projets immobiliers, automobiles, de services et de restauration a l'echelle de l'Afrique de l'Ouest.",
        button: {
          label: "Acceder a la page investisseurs",
          href: "investisseurs.html#dossier"
        }
      }
    },
    about: {
      hero: {
        eyebrow: "A propos",
        title: "Une vision entrepreneuriale structuree pour les investisseurs",
        copy:
          "ATLANTIC HOLDING developpe des projets solides dans l'immobilier et l'automobile avec une lecture strategique des marches du Senegal, du Mali et de la Cote d'Ivoire.",
        backgroundImage: "assets/images/mixed-tower.jpg"
      },
      leadership: {
        eyebrow: "Leadership",
        title: "Cheikh Ahmed Tidiane Fall",
        image: "assets/images/goumalo-living.jpg",
        paragraphs: [
          "A la tete d'ATLANTIC HOLDING, Cheikh Ahmed Tidiane Fall porte une ambition claire : batir des projets credibles, visibles et durables dans des secteurs essentiels a la transformation economique de l'Afrique de l'Ouest.",
          "La vision du groupe s'appuie sur une discipline d'execution, une presence terrain et une capacite a creer des actifs attractifs pour des partenaires financiers, industriels et institutionnels."
        ]
      },
      missionIntro: {
        eyebrow: "Mission",
        title: "Developper des projets solides dans trois marches strategiques",
        copy:
          "La mission d'ATLANTIC HOLDING est de construire des operations automobiles et immobilieres qui repondent aux besoins des marches africains tout en respectant les attentes de partenaires financiers internationaux."
      },
      positioning: {
        eyebrow: "Positionnement",
        title: "Institutionnel, premium et ancre dans le reel",
        image: "assets/images/goumalo-bedroom.jpg",
        paragraphs: [
          "Le groupe adopte un langage d'investissement sobre, credible et oriente resultats. Les projets sont penses pour creer de la valeur a travers des actifs tangibles, une qualite d'execution et des synergies entre secteurs.",
          "Cette approche permet de dialoguer avec des partenaires strategiques, des banques, des fonds, des family offices et des investisseurs prives recherchant une exposition structuree a l'Afrique de l'Ouest."
        ]
      },
      regionalIntro: {
        eyebrow: "Presence regionale",
        title: "Trois marches, trois leviers de croissance",
        copy:
          "Chaque pays est aborde avec une logique d'entree specifique, adaptee aux opportunites immobilieres, automobiles et de services les plus pertinentes."
      },
      cta: {
        title: "Une plateforme ouverte aux partenaires de long terme",
        copy:
          "Decouvrez les projets prioritaires du groupe, les secteurs vises et les formats de collaboration possibles avec ATLANTIC HOLDING.",
        button: {
          label: "Voir la page investisseurs",
          href: "investisseurs.html"
        }
      }
    },
    projects: {
      hero: {
        eyebrow: "Projets",
        title: "Immobilier, automobile, services et restauration integree",
        copy:
          "Une presentation claire des poles de croissance d'ATLANTIC HOLDING, concue pour faciliter la lecture investisseur et la comprehension des complementarites operationnelles.",
        backgroundImage: "assets/images/atlantic-automobile-showroom.jpg"
      },
      pillarsIntro: {
        eyebrow: "Poles principaux",
        title: "Deux piliers structurants pour le groupe",
        copy:
          "Goumalo porte l'ambition immobiliere. Atlantic Group porte la plateforme automobile regionale avec une offre commerciale et de services concue pour durer."
      },
      galleryIntro: {
        eyebrow: "Univers Goumalo",
        title: "Une signature immobiliere moderne et fiable",
        copy:
          "Les visuels ci-dessous illustrent le niveau d'ambition architecturale et d'usage porte par le pole immobilier du groupe."
      },
      gallery: [
        {
          eyebrow: "Residences",
          title: "Programme immobilier mixte et premium",
          image: "assets/images/goumalo-waterfront.jpg",
          alt: "Programme Goumalo en facade lagunaire"
        },
        {
          eyebrow: "Interieurs",
          title: "Residences modernes adaptees a une clientele exigeante",
          image: "assets/images/goumalo-bedroom.jpg",
          alt: "Chambre haut de gamme Goumalo"
        },
        {
          eyebrow: "Valorisation",
          title: "Espaces de vie valorisant l'actif et l'experience",
          image: "assets/images/goumalo-pool.jpg",
          alt: "Terrasse avec piscine Goumalo"
        }
      ],
      complementaryIntro: {
        eyebrow: "Poles complementaires",
        title: "GGB Senegal et Africar renforcent la plateforme automobile",
        copy:
          "Le groupe complete sa chaine de valeur avec une presence locale specialisee au Senegal et un dispositif SAV concu pour accompagner durablement les clients."
      },
      flagshipStory: {
        eyebrow: "Showroom flagship",
        title: "Une vitrine automobile premium au service de la credibilite du groupe",
        image: "assets/images/atlantic-automobile-showroom.jpg",
        paragraphs: [
          "Le showroom Atlantic Automobile incarne le niveau d'ambition visuelle et commerciale recherche par le groupe : architecture contemporaine, exposition valorisante des vehicules et lecture immediate d'un positionnement haut de gamme.",
          "Ce type d'actif renforce la valeur percue de la plateforme automobile et soutient la capacite du groupe a convaincre des partenaires financiers, industriels et commerciaux dans la duree."
        ]
      },
      cta: {
        title: "Vous souhaitez examiner un projet ou un secteur en priorite ?",
        copy:
          "ATLANTIC HOLDING peut ouvrir la discussion par projet, par pays ou selon le format de partenariat recherche.",
        button: {
          label: "Parler au groupe",
          href: "contact.html"
        }
      }
    },
    countries: {
      hero: {
        eyebrow: "Pays",
        title: "Senegal, Mali, Cote d'Ivoire",
        copy:
          "Trois marches strategiques pour construire des actifs de confiance, des plateformes automobiles credibles et des services de proximite a forte valeur ajoutee.",
        backgroundImage: "assets/images/goumalo-waterfront.jpg"
      },
      overviewIntro: {
        eyebrow: "Vue d'ensemble",
        title: "Une lecture pays par pays de la plateforme ATLANTIC HOLDING",
        copy:
          "Chaque marche concentre une combinaison specifique de projets immobiliers, automobiles et de services, avec une capacite d'investissement modulable selon les priorites du partenaire."
      },
      detailIntro: {
        eyebrow: "Deploiement detaille",
        title: "Des projets adaptes au profil de chaque marche",
        copy:
          "Les sections ci-dessous donnent une vision plus concrete des entreprises mobilisees et des leviers d'expansion identifies dans chaque pays."
      },
      cta: {
        title: "Entrer par marche, par projet ou par secteur",
        copy:
          "ATLANTIC HOLDING permet d'envisager une approche progressive, ciblee ou regionale selon le niveau d'ambition et le profil du partenaire financier.",
        button: {
          label: "Voir les modalites d'investissement",
          href: "investisseurs.html#dossier"
        }
      }
    },
    investors: {
      hero: {
        eyebrow: "Investisseurs",
        title: "Opportunites pour partenaires financiers",
        copy:
          "Une plateforme regionale positionnee sur des secteurs porteurs, avec des options d'entree par pays, par projet ou par secteur selon la strategie du partenaire.",
        backgroundImage: "assets/images/atlantic-automobile-showroom.jpg"
      },
      thesisIntro: {
        eyebrow: "These d'investissement",
        title: "Pourquoi ATLANTIC HOLDING interesse un partenaire strategique",
        copy:
          "Le groupe reunit des actifs tangibles, des usages recurrents et une logique de plateformes multiservices susceptible de generer des synergies operationnelles et commerciales."
      },
      ongoingStory: {
        eyebrow: "Projets en cours",
        title: "Des priorites claires sur des secteurs a fort potentiel",
        image: "assets/images/mixed-tower.jpg",
        paragraphs: [
          "Les projets du groupe se concentrent sur l'immobilier, l'automobile, les services et la restauration. Cette combinaison permet d'adosser des revenus commerciaux a des actifs visibles et de creer une relation client durable.",
          "L'investissement peut etre calibre selon la maturite de chaque projet, les objectifs du partenaire et le degre d'implication souhaite dans le developpement regional."
        ]
      },
      formatsIntro: {
        eyebrow: "Formats de partenariat",
        title: "Une approche adaptable au profil du partenaire",
        copy:
          "ATLANTIC HOLDING peut structurer la discussion autour d'un investissement cible, progressif ou regional, avec une lecture simple des perimetres concernes."
      },
      countriesIntro: {
        eyebrow: "Presence pays",
        title: "Possibilite d'investir par marche ou par plateforme",
        copy:
          "Senegal, Mali et Cote d'Ivoire peuvent etre approches separement ou dans une logique regionale selon l'appetit du partenaire pour la croissance ou la diversification."
      },
      resourcesIntro: {
        eyebrow: "Documentation",
        title: "Demander le dossier d'investissement",
        copy:
          "Une premiere base documentaire est disponible pour amorcer les echanges et faciliter la revue des projets avec vos equipes."
      },
      cta: {
        title: "Engager une discussion confidentielle",
        copy:
          "Le groupe peut partager des elements complementaires, organiser un echange cible et preparer un dossier adapte au type de partenariat recherche.",
        button: {
          label: "Prendre contact",
          href: "contact.html"
        }
      }
    },
    contact: {
      hero: {
        eyebrow: "Contact",
        title: "Echanger avec ATLANTIC HOLDING",
        copy:
          "Pour un partenariat financier, une demande d'information ou une prise de contact strategique, utilisez les coordonnees ci-dessous ou preparez votre message via le formulaire.",
        backgroundImage: "assets/images/restaurant-front.jpg"
      },
      coordinatesPanel: {
        eyebrow: "Coordonnees",
        title: "Presence et contacts du groupe",
        copy:
          "ATLANTIC HOLDING accompagne des discussions sur les projets immobiliers, automobiles, les partenariats regionaux et les opportunites d'investissement par marche."
      },
      partnershipPanel: {
        eyebrow: "Typologies de partenariat",
        copy:
          "Partenariat strategique, financement de projet, developpement par pays, co-investissement, accompagnement operationnel ou structuration de dossiers investisseurs."
      },
      formPanel: {
        eyebrow: "Formulaire",
        title: "Preparer votre demande",
        copy:
          "Le formulaire prepare automatiquement votre message pour l'equipe du groupe avec les elements essentiels a une premiere qualification.",
        recipientEmail: "info@goumalo.com",
        submitLabel: "Envoyer la demande",
        feedbackMessage:
          "Le message sera prepare pour envoi a l'adresse du groupe.",
        sentMessage:
          "Votre demande est prete. Votre messagerie va s'ouvrir pour envoyer le message au groupe.",
        fields: {
          name: "Nom",
          email: "Email",
          phone: "Telephone",
          country: "Pays",
          partnership: "Type de partenariat recherche",
          message: "Message",
          countryPlaceholder: "Selectionner",
          partnershipPlaceholder: "Selectionner",
          messagePlaceholder:
            "Decrivez votre interet, votre horizon d'investissement ou votre besoin."
        },
        countryOptions: ["Senegal", "Mali", "Cote d'Ivoire", "Autre"],
        partnershipOptions: [
          "Investissement immobilier",
          "Investissement automobile",
          "Partenariat strategique",
          "Co-developpement par pays",
          "Demande de dossier d'investissement"
        ]
      }
    }
  },
  stats: [
    {
      value: "3X",
      label: "marches strategiques",
      note: "Senegal, Mali, Cote d'Ivoire",
      image: "assets/images/goumalo-residence-tower.jpg",
      counterValue: 10356796128,
      counterCurrency: "FCFA",
      counterLabel: "Chiffres du projet"
    },
    {
      value: "2",
      label: "poles structurants",
      note: "Immobilier et automobile",
      image: "assets/images/goumalo-pool.jpg"
    },
    {
      value: "4",
      label: "marques operationnelles",
      note: "Goumalo, Atlantic Group, GGB, Africar",
      image: "assets/images/atlantic-automobile-showroom.jpg"
    },
    {
      value: "1",
      label: "vision de groupe",
      note: "Execution locale et partenaires internationaux",
      image: "assets/images/restaurant-twilight.jpg"
    }
  ],
  sectorCards: [
    {
      eyebrow: "1. Immobilier",
      title: "Goumalo",
      copy:
        "Des residences, terrains et programmes mixtes penses pour les besoins urbains et les standards de confiance attendus par des partenaires institutionnels.",
      image: "assets/images/goumalo-waterfront.jpg",
      href: "projets.html#immobilier"
    },
    {
      eyebrow: "2. Automobile",
      title: "Atlantic Group",
      copy:
        "Une plateforme regionale pour la vente automobile, l'import-export, les showrooms, la restauration associee et le service apres-vente Africar.",
      image: "assets/images/atlantic-automobile-showroom.jpg",
      href: "projets.html#automobile"
    }
  ],
  companyCards: [
    {
      name: "Goumalo",
      role: "Pole immobilier",
      description:
        "Promotion immobiliere, programmes residentiels, actifs mixtes et opportunites d'investissement dans des emplacements strategiques.",
      logo: "assets/images/goumalo-logo.jpg",
      image: "assets/images/goumalo-waterfront.jpg"
    },
    {
      name: "Atlantic Group",
      role: "Plateforme automobile regionale",
      description:
        "Distribution automobile, import-export, showrooms et restauration integree au service d'une clientele exigeante.",
      logo: "assets/images/atlantic-senegal-logo.jpg",
      image: "assets/images/atlantic-automobile-showroom.jpg"
    },
    {
      name: "GGB",
      role: "Operateur automobile Senegal",
      description:
        "Concessionnaire complementaire au Senegal, centre sur la vente multimarque, la proximite commerciale et la croissance locale.",
      logo: "assets/images/ggb-logo.jpg",
      image: "assets/images/restaurant-front.jpg"
    },
    {
      name: "Africar",
      role: "Service apres-vente",
      description:
        "Maintenance, reparation, pieces detachees et suivi client pour renforcer la durabilite des operations automobiles.",
      logo: "assets/images/africar-logo.jpg",
      image: "assets/images/restaurant-exterior-wide.jpg"
    }
  ],
  countries: [
    {
      slug: "senegal",
      code: "SN",
      name: "Senegal",
      label: "Plateforme commerciale",
      image: "assets/images/atlantic-automobile-showroom.jpg",
      accent: "#c6a15b",
      summary:
        "Le Senegal porte l'ancrage commercial du groupe avec une combinaison forte entre distribution automobile, service apres-vente, restauration de site et developpement immobilier.",
      opportunity:
        "Priorite a l'acceleration commerciale, a la montee en gamme de l'offre et a l'expansion des programmes immobiliers urbains.",
      logos: [
        "assets/images/atlantic-senegal-logo.jpg",
        "assets/images/ggb-logo.jpg",
        "assets/images/africar-logo.jpg"
      ],
      entities: [
        {
          name: "Goumalo",
          detail: "Programmes immobiliers, residences et opportunites foncieres."
        },
        {
          name: "Atlantic Group",
          detail: "Distribution automobile, showrooms et import-export."
        },
        {
          name: "Restaurant",
          detail: "Restauration premium adossee aux sites automobiles."
        },
        {
          name: "Africar",
          detail: "Maintenance, reparation, garantie et pieces detachees."
        },
        {
          name: "GGB",
          detail: "Relais automobile complementaire au Senegal."
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
        "Le Mali constitue un marche de conviction pour la structuration d'actifs immobiliers solides et l'implantation de services automobiles a fort potentiel de fidelisation.",
      opportunity:
        "Mise en avant des projets immobiliers mixtes, accompagnement des operations automobiles et renforcement du maillage apres-vente.",
      logos: [
        "assets/images/atlantic-mali-logo.jpg",
        "assets/images/africar-logo.jpg",
        "assets/images/goumalo-logo.jpg"
      ],
      entities: [
        {
          name: "Goumalo",
          detail: "Developpement immobilier moderne et programmes adaptes au marche malien."
        },
        {
          name: "Atlantic Group",
          detail: "Projet automobile regional avec point d'entree sur le marche malien."
        },
        {
          name: "Restaurant",
          detail: "Composante de services associee a l'experience client automobile."
        },
        {
          name: "Africar",
          detail: "SAV officiel pour l'entretien, la reparation et le suivi."
        }
      ]
    },
    {
      slug: "cote-divoire",
      code: "CI",
      name: "Cote d'Ivoire",
      label: "Hub de croissance regionale",
      image: "assets/images/atlantic-automobile-showroom.jpg",
      accent: "#93a6c9",
      summary:
        "La Cote d'Ivoire represente un marche premium pour deployer des projets automobiles, de services et des investissements immobiliers dans un environnement economique dynamique.",
      opportunity:
        "Approche par plateforme sectorielle, avec possibilite d'entree par pays, par projet ou par partenariat strategique.",
      logos: [
        "assets/images/goumalo-logo.jpg",
        "assets/images/africar-logo.jpg"
      ],
      entities: [
        {
          name: "Goumalo",
          detail: "Actifs residentiels, terrains et programmes urbains cibles."
        },
        {
          name: "Atlantic Group",
          detail: "Vente automobile, import-export et futurs showrooms."
        },
        {
          name: "Restaurant",
          detail: "Composante restauration liee aux sites automobiles."
        },
        {
          name: "Africar",
          detail: "Maintenance, assistance client et garanties dans la duree."
        }
      ]
    }
  ],
  missionPillars: [
    {
      title: "Vision de long terme",
      copy:
        "Concevoir des plateformes durables, adossees a des besoins reels, avec une lecture regionale des opportunites et des cycles d'investissement.",
      image: "assets/images/mixed-tower.jpg"
    },
    {
      title: "Execution locale",
      copy:
        "Operer avec une comprehension fine des marches du Senegal, du Mali et de la Cote d'Ivoire pour accelerer la mise en oeuvre et la fiabilite des projets.",
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
        "Relier immobilier, automobile, services et restauration afin de renforcer la solidite commerciale et la valeur des actifs.",
      image: "assets/images/restaurant-twilight.jpg"
    }
  ],
  projectFamilies: {
    immobilier: {
      eyebrow: "Pole immobilier",
      title: "Goumalo",
      intro:
        "Goumalo developpe une offre immobiliere contemporaine, fiable et adaptee aux besoins des marches ouest-africains, avec une logique de valorisation durable des actifs.",
      image: "assets/images/goumalo-waterfront.jpg",
      features: [
        "Residences premium et produits residentiels urbains",
        "Terrains et reserves foncieres a fort potentiel",
        "Programmes immobiliers mixtes et actifs de rendement",
        "Opportunites d'investissement structurees par projet",
        "Partenariats financiers recherches pour le deploiement"
      ]
    },
    automobile: {
      eyebrow: "Pole automobile",
      title: "Atlantic Group",
      intro:
        "Atlantic Group porte une ambition regionale autour de la vente automobile, de l'import-export de vehicules, de showrooms modernes et de services additionnels qui enrichissent l'experience client.",
      image: "assets/images/atlantic-automobile-showroom.jpg",
      features: [
        "Vente automobile et sourcing de vehicules",
        "Import-export et structuration de flux regionaux",
        "Showrooms et plateformes commerciales haut de gamme",
        "Restaurants associes aux sites automobiles",
        "Recherche de partenaires financiers et strategiques"
      ]
    },
    ggb: {
      eyebrow: "Operateur Senegal",
      title: "GGB Senegal",
      intro:
        "GGB renforce le dispositif automobile du groupe au Senegal avec une offre multimarque, des services de proximite et des perspectives de developpement commercial ciblees.",
      image: "assets/images/atlantic-automobile-showroom.jpg",
      features: [
        "Vente de vehicules neufs et d'occasion",
        "Services automobiles et accompagnement client",
        "Renforcement de la capacite commerciale locale",
        "Opportunites de croissance sur le marche senegalais"
      ]
    },
    africar: {
      eyebrow: "Service apres-vente",
      title: "Africar",
      intro:
        "Africar est la colonne vertebrale apres-vente du projet automobile dans chaque pays, avec une promesse de qualite, de continuite de service et de confiance client.",
      image: "assets/images/restaurant-exterior-wide.jpg",
      features: [
        "Maintenance preventive et corrective",
        "Reparation et diagnostic technique",
        "Pieces detachees et logistique atelier",
        "Assistance client, garantie et suivi apres achat"
      ]
    }
  },
  investorPillars: [
    {
      title: "Presences complementaires dans 3 pays",
      copy:
        "Le groupe construit une trajectoire regionale entre Senegal, Mali et Cote d'Ivoire, avec la possibilite de calibrer l'investissement par marche.",
      image: "assets/images/goumalo-residence-tower.jpg"
    },
    {
      title: "Secteurs porteurs et interconnectes",
      copy:
        "Immobilier, automobile, services et restauration s'articulent autour d'une meme logique de flux, d'usage et de valeur.",
      image: "assets/images/restaurant-twilight.jpg"
    },
    {
      title: "Partenariats adaptables",
      copy:
        "Ouverture a des partenariats strategiques, financiers ou operationnels, selon le pays, le projet et le niveau d'implication recherches.",
      image: "assets/images/goumalo-living.jpg"
    },
    {
      title: "Narratif institutionnel credible",
      copy:
        "Le positionnement premium et la structuration multi-activites permettent de dialoguer avec des banques, family offices et partenaires internationaux.",
      image: "assets/images/atlantic-automobile-showroom.jpg"
    }
  ],
  investmentFormats: [
    {
      title: "Investissement par pays",
      copy:
        "Entrer sur un marche prioritaire selon la these d'investissement et la maturite du pipeline local.",
      image: "assets/images/mixed-tower.jpg"
    },
    {
      title: "Investissement par secteur",
      copy:
        "Cibler exclusivement l'immobilier, l'automobile, les services ou la restauration en fonction du mandat du partenaire.",
      image: "assets/images/atlantic-automobile-showroom.jpg"
    },
    {
      title: "Partenariat strategique",
      copy:
        "Associer capital, reseau, savoir-faire ou capacite de financement autour d'une plateforme de croissance regionale.",
      image: "assets/images/goumalo-waterfront.jpg"
    }
  ],
  resources: [
    {
      title: "Plaquette Goumalo",
      copy: "Document de presentation immobiliere pour une premiere lecture du projet.",
      image: "assets/images/goumalo-waterfront.jpg",
      href: "assets/docs/goumalo-brochure.pdf",
      cta: "Ouvrir la plaquette"
    },
    {
      title: "Rapport Tour Mixte Badalabougou",
      copy:
        "Support descriptif d'un projet mixte illustrant la capacite du groupe a structurer des actifs complexes.",
      image: "assets/images/mixed-tower.jpg",
      href: "assets/docs/tour-mixte-badalabougou.pdf",
      cta: "Consulter le rapport"
    }
  ],
  contactDetails: [
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
      label: "Senegal",
      value: "+221 76 584 51 51",
      href: "tel:+221765845151"
    },
    {
      label: "Abidjan",
      value: "+225 84 04 07 07",
      href: "tel:+22584040707"
    }
  ],
  ceoProfile: {
    name: "Cheikh Ahmed Tidiane Fall",
    role: "CEO",
    quote:
      "Notre ambition est de construire des plateformes solides dans l'immobilier et l'automobile, capables d'accompagner la croissance de l'Afrique de l'Ouest avec exigence, confiance et vision."
  }
};

export const siteShell = defaultSiteContent.siteShell;
export const stats = defaultSiteContent.stats;
export const sectorCards = defaultSiteContent.sectorCards;
export const companyCards = defaultSiteContent.companyCards;
export const countries = defaultSiteContent.countries;
export const missionPillars = defaultSiteContent.missionPillars;
export const projectFamilies = defaultSiteContent.projectFamilies;
export const investorPillars = defaultSiteContent.investorPillars;
export const investmentFormats = defaultSiteContent.investmentFormats;
export const resources = defaultSiteContent.resources;
export const contactDetails = defaultSiteContent.contactDetails;
export const ceoProfile = defaultSiteContent.ceoProfile;
