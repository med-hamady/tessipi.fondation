// Contenu des pages légales du footer. Édition centralisée ici — chaque entrée
// correspond à une route `/legal/<slug>` rendue par LegalPage.jsx.
//
// Les placeholders entre crochets ([adresse], [RNA], [email]…) doivent être
// renseignés avant la mise en production. Le contenu est en français, aligné
// sur le droit français (association loi 1901) et le RGPD.

export const legalPages = {
  'mentions-legales': {
    title: 'Mentions légales',
    intro:
      "Conformément aux dispositions des articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, dite « LCEN », nous portons à la connaissance des utilisateurs du site les informations suivantes.",
    sections: [
      {
        heading: 'Éditeur du site',
        body: [
          'TESSIPI Foundation — Association régie par la loi du 1er juillet 1901.',
          'Siège social : [adresse complète], France.',
          'RNA : [numéro RNA] — SIREN : [numéro SIREN, le cas échéant].',
          'Adresse email : contact@tessipi.org',
          'Téléphone : +33 1 23 45 67 89',
        ],
      },
      {
        heading: 'Responsable de la publication',
        body: [
          'La directrice / le directeur de la publication est [Nom, fonction], joignable à l\'adresse contact@tessipi.org.',
        ],
      },
      {
        heading: 'Hébergement',
        body: [
          "Le site est hébergé par [Nom de l'hébergeur], dont le siège social est situé à [adresse de l'hébergeur].",
          'Site web : [site web de l\'hébergeur].',
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        body: [
          "L'ensemble des contenus présents sur le site (textes, images, photographies, vidéos, logos, marques, illustrations, éléments graphiques, structure, ainsi que tout autre élément composant le site) sont la propriété exclusive de TESSIPI Foundation ou de ses partenaires, et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.",
          "Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit et sur quelque support que ce soit, est interdite sans l'autorisation écrite préalable de TESSIPI Foundation.",
        ],
      },
      {
        heading: 'Responsabilité',
        body: [
          "TESSIPI Foundation s'efforce de fournir, sur le site, des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.",
          "Le site peut contenir des liens vers d'autres sites. TESSIPI Foundation n'exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu.",
        ],
      },
      {
        heading: 'Droit applicable et juridiction',
        body: [
          'Le présent site et les présentes mentions légales sont régis par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.',
        ],
      },
    ],
  },

  'protection-donnees': {
    title: 'Protection des données personnelles',
    intro:
      "TESSIPI Foundation accorde une importance particulière à la protection des données personnelles des utilisateurs de son site et de ses sympathisants. La présente politique décrit comment nous collectons, utilisons et protégeons ces données, dans le respect du Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et de la loi française « Informatique et Libertés » du 6 janvier 1978 modifiée.",
    sections: [
      {
        heading: '1. Responsable du traitement',
        body: [
          "Le responsable du traitement des données est TESSIPI Foundation, dont le siège social est situé à [adresse], joignable à l'adresse contact@tessipi.org.",
        ],
      },
      {
        heading: '2. Données collectées',
        body: ['Nous collectons les catégories de données suivantes, exclusivement lorsque vous les fournissez de votre plein gré :'],
        list: [
          "Données d'identité : nom, prénom, civilité.",
          "Coordonnées : adresse email, numéro de téléphone, adresse postale (si renseignée).",
          "Données d'engagement : type de soutien (don, bénévolat, partenariat, adhésion), compétences déclarées, disponibilités.",
          "Données techniques : adresse IP, données de connexion et de navigation collectées de manière agrégée et anonyme.",
        ],
      },
      {
        heading: '3. Finalités du traitement',
        body: ['Vos données sont traitées pour les finalités suivantes :'],
        list: [
          'Répondre à vos demandes de contact et d\'information.',
          'Gérer les dons, partenariats, adhésions et candidatures de bénévolat.',
          'Envoyer la lettre d\'information à laquelle vous vous êtes inscrit·e.',
          'Améliorer le fonctionnement du site et la qualité de nos services.',
          'Respecter nos obligations légales et réglementaires (comptabilité, fiscalité, lutte contre la fraude).',
        ],
      },
      {
        heading: '4. Base légale',
        body: ['Les traitements reposent, selon les cas, sur :'],
        list: [
          "votre consentement (newsletter, candidatures, formulaires) ;",
          "l'exécution de mesures précontractuelles ou d'un contrat (adhésion, partenariat) ;",
          "l'intérêt légitime de TESSIPI Foundation à promouvoir sa mission et à fidéliser ses soutiens ;",
          "le respect d'une obligation légale (notamment comptable et fiscale).",
        ],
      },
      {
        heading: '5. Durée de conservation',
        body: [
          "Vos données sont conservées pendant la durée nécessaire à la finalité poursuivie, et au-delà selon les obligations légales (par exemple, 10 ans pour les pièces comptables liées aux dons). Les données des prospects inactifs sont effacées au plus tard 3 ans après le dernier contact.",
        ],
      },
      {
        heading: '6. Destinataires',
        body: [
          "Vos données sont destinées exclusivement aux services internes habilités de TESSIPI Foundation et, le cas échéant, à nos prestataires techniques (hébergeur, prestataire d'envoi d'emails, outils de paiement) agissant en qualité de sous-traitants et tenus à une obligation de confidentialité.",
          "Aucune donnée n'est vendue, louée ou échangée à des tiers à des fins commerciales.",
        ],
      },
      {
        heading: '7. Sécurité',
        body: [
          "Nous mettons en œuvre les mesures techniques et organisationnelles appropriées (chiffrement des échanges, contrôle des accès, sauvegardes, journalisation) pour protéger vos données contre tout accès non autorisé, perte, altération ou divulgation.",
        ],
      },
      {
        heading: '8. Vos droits',
        body: ['Conformément au RGPD, vous disposez des droits suivants :'],
        list: [
          "Droit d'accès à vos données.",
          "Droit de rectification.",
          "Droit à l'effacement (« droit à l'oubli »).",
          "Droit à la limitation du traitement.",
          "Droit d'opposition.",
          "Droit à la portabilité.",
          "Droit de définir des directives post-mortem.",
          "Droit de retirer votre consentement à tout moment.",
        ],
      },
      {
        heading: '9. Comment exercer vos droits',
        body: [
          "Vous pouvez exercer vos droits en écrivant à contact@tessipi.org ou par courrier postal à TESSIPI Foundation — [adresse]. Une copie d'une pièce d'identité pourra vous être demandée en cas de doute raisonnable sur votre identité.",
          "Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL (www.cnil.fr).",
        ],
      },
    ],
  },

  'cookies': {
    title: 'Politique de cookies',
    intro:
      "Le site de TESSIPI Foundation utilise des cookies et des technologies similaires afin d'assurer son bon fonctionnement, d'améliorer votre expérience de navigation et de mesurer son audience. La présente politique vous explique ce que sont ces cookies, comment nous les utilisons et comment vous pouvez les gérer.",
    sections: [
      {
        heading: "1. Qu'est-ce qu'un cookie ?",
        body: [
          "Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la consultation d'un site internet. Il permet au site de reconnaître votre appareil et de mémoriser certaines informations relatives à votre navigation, pour la durée de validité du cookie.",
        ],
      },
      {
        heading: '2. Types de cookies utilisés',
        body: ['Le site utilise plusieurs catégories de cookies :'],
        list: [
          "Cookies strictement nécessaires : indispensables au fonctionnement du site (navigation, sécurité, accès aux espaces protégés, mémorisation de vos choix en matière de cookies). Ils ne nécessitent pas votre consentement.",
          "Cookies de performance et d'analyse : permettent de mesurer l'audience du site, de comprendre comment les visiteurs interagissent avec nos contenus et d'améliorer ceux-ci. Ils sont déposés uniquement avec votre consentement.",
          "Cookies fonctionnels : permettent de mémoriser vos préférences (langue, paramètres d'affichage) afin de personnaliser votre expérience.",
          "Cookies tiers (le cas échéant) : déposés par des services externes intégrés au site (ex. lecteurs vidéo, outils statistiques). Ils sont soumis à la politique de confidentialité de leur émetteur.",
        ],
      },
      {
        heading: '3. Base légale',
        body: [
          "Conformément au RGPD et aux recommandations de la CNIL, le dépôt de cookies non strictement nécessaires est soumis à votre consentement préalable, libre, éclairé et univoque. Ce consentement peut être retiré à tout moment, aussi simplement qu'il a été donné.",
        ],
      },
      {
        heading: '4. Gestion de vos préférences',
        body: [
          "Lors de votre première visite, un bandeau d'information vous permet d'accepter l'ensemble des cookies, de les refuser, ou de personnaliser vos préférences par catégorie. Vous pouvez modifier vos choix à tout moment via le lien « Paramètres cookies » disponible en bas de chaque page.",
          "Vous pouvez également configurer votre navigateur pour bloquer ou supprimer les cookies. Notez toutefois que la désactivation des cookies strictement nécessaires peut rendre certaines fonctionnalités du site indisponibles.",
        ],
      },
      {
        heading: '5. Durée de conservation',
        body: [
          "Conformément aux recommandations de la CNIL, les cookies sont conservés pour une durée maximale de 13 mois à compter de leur dépôt. À l'expiration de ce délai, votre consentement sera à nouveau sollicité.",
        ],
      },
      {
        heading: '6. Vos droits',
        body: [
          "Vous pouvez à tout moment exercer vos droits d'accès, de rectification, d'effacement ou d'opposition sur les données collectées via les cookies, en nous écrivant à contact@tessipi.org. Vous pouvez également adresser une réclamation à la CNIL.",
        ],
      },
    ],
  },

  'transparence-financiere': {
    title: 'Transparence financière',
    intro:
      "TESSIPI Foundation s'engage à une gestion transparente, rigoureuse et responsable de ses ressources financières. Notre redevabilité envers nos donateurs, nos partenaires et les bénéficiaires de nos programmes est une valeur fondatrice de notre action.",
    sections: [
      {
        heading: '1. Principes de gestion',
        body: ['Notre gestion financière repose sur les principes suivants :'],
        list: [
          "Affectation des ressources en cohérence avec notre mission humanitaire.",
          "Optimisation de l'impact social de chaque euro collecté.",
          "Bonne gouvernance financière, encadrée par notre conseil d'administration.",
          "Respect strict des règles comptables applicables aux associations loi 1901.",
        ],
      },
      {
        heading: '2. Origine des ressources',
        body: ['Les ressources de TESSIPI Foundation proviennent de :'],
        list: [
          'Dons de particuliers (uniques ou récurrents).',
          'Partenariats institutionnels (entreprises, fondations, organisations internationales).',
          'Subventions publiques (collectivités, agences publiques, bailleurs de fonds).',
          'Mécénat d\'entreprise et dons en nature.',
          "Cotisations des membres adhérents de l'association.",
        ],
      },
      {
        heading: '3. Utilisation des fonds',
        body: ['Les ressources collectées sont affectées à :'],
        list: [
          "La mise en œuvre directe de nos programmes terrain (santé, nutrition, éducation, protection, eau, urgence).",
          "Le fonctionnement de l'organisation (frais administratifs, ressources humaines, logistique).",
          "Le développement stratégique (formation, communication, recherche d'impact).",
        ],
        after: [
          "Nous nous engageons à ce que la part consacrée à la mission sociale reste prépondérante dans nos dépenses annuelles.",
        ],
      },
      {
        heading: '4. Contrôles et audits',
        body: ['La rigueur de notre gestion est garantie par plusieurs niveaux de contrôle :'],
        list: [
          'Contrôles internes permanents.',
          'Suivi budgétaire mensuel par la direction et trimestriel par le conseil d\'administration.',
          'Audit annuel des comptes par un commissaire aux comptes indépendant (lorsque les seuils légaux sont atteints).',
          'Audits externes spécifiques exigés par certains bailleurs.',
        ],
      },
      {
        heading: '5. Redevabilité',
        body: ['TESSIPI Foundation rend compte de sa gestion à travers :'],
        list: [
          "La publication annuelle d'un rapport d'activité et d'un rapport financier.",
          'Une communication régulière auprès des donateurs et partenaires sur l\'avancement des programmes.',
          "L'accessibilité de nos comptes annuels sur simple demande à contact@tessipi.org.",
        ],
      },
      {
        heading: '6. Éthique financière',
        body: ['Nous appliquons les règles éthiques suivantes :'],
        list: [
          "Prévention et gestion des conflits d'intérêts.",
          'Lutte active contre la fraude et la corruption (voir notre politique PEAS).',
          "Refus de tout financement contraire à notre éthique ou à notre mission.",
          "Conformité aux obligations légales et fiscales françaises et internationales.",
        ],
      },
    ],
  },

  'engagement-abus': {
    title: 'Notre engagement contre les abus',
    intro:
      "TESSIPI Foundation place la protection des personnes au cœur de ses actions. Nous appliquons une politique de tolérance zéro contre toute forme d'abus, d'exploitation, de harcèlement ou de violence, sans exception, qu'elle soit le fait d'un membre de notre personnel, d'un partenaire ou de toute personne agissant en notre nom.",
    sections: [
      {
        heading: "1. Champ d'application",
        body: ['Cet engagement s\'applique à toutes les personnes en lien avec notre organisation :'],
        list: [
          'Les bénéficiaires de nos programmes.',
          'Les communautés locales où nous intervenons.',
          'Les salariés, stagiaires et bénévoles.',
          'Les partenaires, sous-traitants et fournisseurs.',
          'Les membres du conseil d\'administration et de l\'assemblée générale.',
        ],
      },
      {
        heading: '2. Types d\'abus concernés',
        body: ['Sont strictement interdits et passibles de sanctions :'],
        list: [
          'L\'exploitation et les abus sexuels (PEAS).',
          'Le harcèlement, moral ou sexuel.',
          'L\'abus de pouvoir ou d\'autorité.',
          'La discrimination, sous toutes ses formes.',
          'La violence physique, psychologique ou verbale.',
          'La maltraitance des enfants et des personnes vulnérables.',
        ],
      },
      {
        heading: '3. Principes directeurs',
        body: ['Notre engagement repose sur les principes suivants :'],
        list: [
          'Respect inconditionnel de la dignité humaine.',
          'Égalité et non-discrimination.',
          'Responsabilité individuelle et collective.',
          'Protection prioritaire des personnes vulnérables (enfants, femmes, personnes en situation de crise).',
          'Approche centrée sur les survivants.',
        ],
      },
      {
        heading: '4. Prévention',
        body: ['Pour prévenir les abus, nous mettons en place :'],
        list: [
          'Une formation obligatoire de tout le personnel et des bénévoles à la prévention des abus.',
          'Un code de conduite signé par chaque personne intervenant pour TESSIPI Foundation.',
          'Des actions de sensibilisation auprès des communautés bénéficiaires.',
          'L\'intégration des critères de protection dans nos processus RH (recrutement, évaluations).',
          'Des partenariats exigeants : adhésion à nos standards exigée de tous nos partenaires.',
        ],
      },
      {
        heading: '5. Signalement et protection',
        body: [
          "Toute personne témoin ou victime d'un abus peut effectuer un signalement via notre mécanisme dédié (voir la page « Signaler un cas »). Nous garantissons :",
        ],
        list: [
          'La confidentialité du signalement.',
          'La possibilité de signalement anonyme.',
          'La protection contre toute forme de représailles.',
          'Un accompagnement adapté pour les victimes.',
        ],
      },
      {
        heading: '6. Gestion des cas',
        body: ['Chaque signalement reçu fait l\'objet d\'un traitement structuré :'],
        list: [
          'Analyse préliminaire par une équipe dédiée et formée.',
          'Enquête indépendante, dans le respect du principe du contradictoire.',
          'Mesures disciplinaires proportionnées (allant jusqu\'au licenciement et au signalement aux autorités judiciaires).',
          'Accompagnement médical, psychologique et juridique des victimes lorsque nécessaire.',
        ],
      },
      {
        heading: '7. Culture organisationnelle',
        body: [
          "Au-delà des dispositifs formels, nous cultivons une organisation fondée sur l'intégrité, la transparence et la responsabilité, dans laquelle chacun se sent légitime à parler et protégé pour le faire.",
        ],
      },
    ],
  },

  'signaler': {
    title: 'Signaler un cas de mauvaise conduite ou d\'abus',
    intro:
      "TESSIPI Foundation met à disposition un mécanisme de signalement sécurisé, accessible et confidentiel, ouvert à toute personne — bénéficiaire, membre du personnel, bénévole, partenaire ou observateur — qui souhaite porter à notre connaissance un fait susceptible de constituer un abus, une fraude ou un manquement à notre code de conduite.",
    sections: [
      {
        heading: '1. Que pouvez-vous signaler ?',
        body: ['Le mécanisme couvre, sans s\'y limiter :'],
        list: [
          'Les abus et l\'exploitation, notamment sexuels (PEAS).',
          'Le harcèlement, moral ou sexuel.',
          'La fraude, la corruption et les détournements de fonds.',
          'Les conflits d\'intérêts non déclarés.',
          'L\'abus de pouvoir ou d\'autorité.',
          'Tout autre manquement grave à notre code de conduite ou à nos valeurs.',
        ],
      },
      {
        heading: '2. Nos principes',
        body: ['Tout signalement est traité selon les principes suivants :'],
        list: [
          'Confidentialité stricte de l\'identité du signalant et des personnes mises en cause, dans les limites légales.',
          'Possibilité de signalement anonyme.',
          'Protection contre les représailles : aucune sanction ne peut être prise à l\'encontre d\'un signalant de bonne foi.',
          'Présomption d\'innocence et respect du contradictoire pendant l\'enquête.',
          'Approche centrée sur les besoins et la sécurité des victimes.',
        ],
      },
      {
        heading: '3. Processus de traitement',
        body: ['Chaque signalement suit un processus en quatre étapes :'],
        list: [
          'Réception : accusé de réception sous 5 jours ouvrés.',
          'Analyse préliminaire : évaluation de la recevabilité et des risques.',
          'Enquête : recueil des éléments, audition des parties, dans la confidentialité.',
          'Décision et suivi : mesures correctrices, sanctions, accompagnement de la victime, information du signalant lorsque possible.',
        ],
      },
      {
        heading: '4. Comment signaler ?',
        body: [
          'Plusieurs canaux sont à votre disposition pour effectuer un signalement :',
        ],
        list: [
          'Par email à l\'adresse dédiée : signalement@tessipi.org',
          'Par courrier postal, sous pli confidentiel : TESSIPI Foundation — À l\'attention du Référent Intégrité — [adresse]',
          'Via le formulaire de contact du site, en précisant « signalement » en objet.',
        ],
        after: [
          "Nous nous engageons à traiter chaque signalement avec impartialité, diligence et respect, et à vous tenir informé·e du suivi dans la mesure où la confidentialité le permet.",
        ],
      },
    ],
  },

  'politique-confidentialite': {
    title: 'Politique de confidentialité',
    intro:
      "La présente politique de confidentialité décrit, de manière synthétique, comment TESSIPI Foundation collecte, utilise et protège vos données personnelles dans le cadre de votre navigation sur notre site et de votre relation avec notre organisation. Pour une information détaillée, vous pouvez également consulter notre page « Protection des données personnelles ».",
    sections: [
      {
        heading: '1. Données que nous collectons',
        body: ['Nous ne collectons que les données strictement nécessaires :'],
        list: [
          'Données d\'identité (nom, prénom).',
          'Coordonnées (email, téléphone, adresse si renseignée).',
          'Données d\'engagement (don, bénévolat, adhésion, partenariat).',
          'Données techniques anonymisées de navigation.',
        ],
      },
      {
        heading: '2. À quoi servent vos données',
        body: ['Vos données nous permettent de :'],
        list: [
          'Répondre à vos demandes et formulaires.',
          'Gérer nos relations avec nos donateurs, bénévoles, partenaires et membres.',
          'Vous communiquer nos actualités si vous y avez consenti.',
          'Améliorer le fonctionnement de notre site et de nos services.',
          'Respecter nos obligations comptables et légales.',
        ],
      },
      {
        heading: '3. Sécurité',
        body: [
          "Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données contre tout accès, modification ou divulgation non autorisés. Vos données ne sont jamais vendues ni louées à des tiers.",
        ],
      },
      {
        heading: '4. Vos droits',
        body: [
          "Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité sur vos données. Vous pouvez exercer ces droits à tout moment en écrivant à contact@tessipi.org.",
          'En cas de désaccord, vous pouvez saisir la CNIL (www.cnil.fr).',
        ],
      },
      {
        heading: '5. Cookies',
        body: [
          "Pour plus d'informations sur l'utilisation des cookies, consultez notre politique dédiée.",
        ],
      },
    ],
  },

  'peas': {
    title: 'PEAS, lutte contre la fraude et éthique',
    intro:
      "TESSIPI Foundation applique une politique de tolérance zéro contre l'exploitation et les abus sexuels (PEAS), la fraude et la corruption. Cette politique s'appuie sur les standards internationaux de référence, notamment ceux des Nations Unies, du Comité Permanent Inter-Organisations (IASC) et de l'OCDE-CAD.",
    sections: [
      {
        heading: '1. Cadre de référence',
        body: [
          "Notre politique est alignée sur :",
        ],
        list: [
          "Le Bulletin du Secrétaire général des Nations Unies sur les mesures spéciales visant à protéger contre l'exploitation et les abus sexuels (ST/SGB/2003/13).",
          'Les six principes fondamentaux du Comité Permanent Inter-Organisations (IASC) en matière de PEAS.',
          'Les recommandations de l\'OCDE-CAD relatives à la lutte contre l\'exploitation et les abus sexuels dans l\'aide au développement.',
          'Le cadre légal français applicable aux associations et aux organisations humanitaires.',
        ],
      },
      {
        heading: '2. Principes',
        body: ['Notre action s\'inscrit dans le respect de cinq principes intangibles :'],
        list: [
          'Dignité humaine : respect inconditionnel de toute personne en contact avec notre organisation.',
          'Responsabilité : chacun est responsable de prévenir les abus et d\'agir en cas de doute.',
          'Redevabilité : nous rendons compte de nos engagements aux personnes que nous servons.',
          'Non-représailles : aucune sanction contre les signalants de bonne foi.',
          'Approche centrée sur les survivants : priorité à leur sécurité, leur dignité et leur consentement.',
        ],
      },
      {
        heading: '3. Mise en œuvre',
        body: ['Nous traduisons ces principes en actions concrètes :'],
        list: [
          'Gouvernance interne : un Référent Intégrité, rattaché à la direction, supervise la politique.',
          'Code de conduite signé par tout salarié, bénévole et partenaire.',
          'Formation obligatoire à la prévention des abus et à la lutte anti-fraude.',
          'Mécanismes de signalement sécurisés (voir « Signaler un cas »).',
          'Enquêtes indépendantes et sanctions disciplinaires.',
          'Audits internes et externes réguliers.',
          'Vérification des références et du casier judiciaire au recrutement, lorsque la loi le permet.',
        ],
      },
      {
        heading: '4. Lutte contre la fraude et la corruption',
        body: [
          "Nous refusons toute forme de fraude, de corruption, de détournement ou de paiement de facilitation. Nos contrôles internes, notre séparation des fonctions, notre suivi budgétaire et nos audits visent à prévenir, détecter et sanctionner toute pratique contraire à notre éthique.",
        ],
      },
      {
        heading: '5. Objectif',
        body: [
          "Au-delà des dispositifs formels, notre ambition est de garantir un environnement sûr et éthique pour toutes les personnes en contact avec TESSIPI Foundation, et de mériter chaque jour la confiance que nous accordent nos bénéficiaires, nos donateurs et nos partenaires.",
        ],
      },
      {
        heading: '6. Signaler',
        body: [
          "Toute personne souhaitant signaler un manquement à cette politique peut le faire de manière confidentielle à signalement@tessipi.org ou via la page « Signaler un cas ».",
        ],
      },
    ],
  },
}

// Ordre et libellés affichés dans le footer (et utilisés pour la navigation
// latérale entre pages légales).
export const legalNav = [
  { slug: 'mentions-legales', label: 'Mentions légales' },
  { slug: 'politique-confidentialite', label: 'Politique de confidentialité' },
  { slug: 'protection-donnees', label: 'Protection des données personnelles' },
  { slug: 'cookies', label: 'Politique de cookies' },
  { slug: 'transparence-financiere', label: 'Transparence financière' },
  { slug: 'engagement-abus', label: 'Engagement contre les abus' },
  { slug: 'peas', label: 'PEAS / Anti-fraude / Éthique' },
  { slug: 'signaler', label: 'Signaler un cas' },
]
