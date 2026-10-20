/* ============================================================
   CONFIG — bourse partagée (optionnel)
   Laisse vide = les annonces restent dans le navigateur de chacun.
   Renseigne ces 2 valeurs (projet Supabase + supabase.sql) pour partager la bourse.
   ============================================================ */
const BACKEND = { url: "", key: "" };

/* ============================================================
   DONNÉES — ok:true = lieu et tarif vérifiés ; sinon affiché « À vérifier »
   ============================================================ */
/* ---- MANGER : restaurants, CROUS, formules étudiantes + courses (source : RECHERCHES.pdf) ---- */
const courses = [
  // CROUS
  {t:"Restaurants universitaires (CROUS)", c:"CROUS", q:"Campus et centre-ville", d:"Repas complet à 1 € pour tous les étudiants avec un compte Izly actif, boursiers ou non : un plat principal et jusqu'à deux accompagnements (entrée, fromage, dessert ou fruit), le midi et le soir là où le Crous propose un dîner.", m:"1 € le repas", ok:true},
  {t:"Cafétéria de la Veillère", c:"CROUS", q:"Petite rue de la Veillère", d:"Cafétéria CROUS à tarifs étudiants.", m:"≈ 1 – 3,30 €", ok:true},
  {t:"Event'Café", c:"CROUS", q:"Centre-ville", d:"Cafétéria CROUS, certaines formules à environ 1 €.", m:"Dès ≈ 1 €", ok:true},
  {t:"Cafétéria Saint-Leu", c:"CROUS", q:"Saint-Leu", d:"Cafétéria CROUS à tarifs étudiants.", m:"Tarifs CROUS", ok:true},
  {t:"Cafétéria Droit & Économie", c:"CROUS", q:"Faculté de droit et d'économie", d:"Cafétéria CROUS à tarifs étudiants.", m:"Tarifs CROUS", ok:true},
  {t:"Cafétéria des Arts", c:"CROUS", q:"Faculté des Arts", d:"Cafétéria CROUS à tarifs étudiants.", m:"Tarifs CROUS", ok:true},
  // Formules étudiantes
  {t:"The 216 Food", c:"Formule étudiante", q:"Amiens centre", d:"Menu étudiant : kebab, tenders ou tacos M + frites + boisson.", m:"≈ 7,50 €", ok:true},
  {t:"Bento", c:"Formule étudiante", q:"19 rue des Sergents", d:"Menu étudiant en cuisine asiatique. Formule poulet dynamite + boisson à 7,90 €.", m:"7,90 – 9,90 €", ok:true},
  {t:"O'Paradise", c:"Formule étudiante", q:"Amiens centre", d:"Burger + boisson sur présentation de la carte étudiante.", m:"9,90 €", ok:true},
  {t:"Lusitalia", c:"Formule étudiante", q:"3 rue des Sergents", d:"Formule étudiante pizzas / italien.", m:"9,90 €", ok:true},
  {t:"Beef N'Co", c:"Formule étudiante", q:"12 rue Léon Blum", d:"Menu étudiant : plat + frites + boisson (burgers).", m:"10 €", ok:true},
  {t:"Gaddar", c:"Formule étudiante", q:"Amiens centre", d:"Menu étudiant sur présentation de la carte étudiante.", m:"11,90 €", ok:true},
  {t:"Allo Mario's Pizza", c:"Formule étudiante", q:"Amiens", d:"Formule étudiante : pizza solo + boisson.", m:"8,99 €", ok:true},
  {t:"Mian Miam", c:"Formule étudiante", q:"12 place Parmentier", d:"Menu midi étudiant (cuisine asiatique) sur présentation de la carte étudiante.", m:"14,90 €", ok:true},
  // Burgers
  {t:"GOMU Burger", c:"Burgers", q:"20 rue de Noyon", d:"Burgers et fast-food.", m:"≈ 10 – 15 €", ok:true},
  {t:"ROB Burger", c:"Burgers", q:"11 rue Léon Blum", d:"Burgers et fast-food.", m:"≈ 10 – 15 €", ok:true},
  {t:"L'Eden Burger", c:"Burgers", q:"4 rue de Beauvais", d:"Burgers et fast-food.", m:"≈ 10 – 15 €", ok:true},
  {t:"G La Dalle", c:"Burgers", q:"Centre-ville", d:"Burgers et fast-food.", m:"≈ 10 – 14 €", ok:true},
  {t:"Starsmash by Amixem", c:"Burgers", q:"20 rue Sire-Firmin-Leroux", d:"Burgers et fast-food.", m:"≈ 10 – 15 €", ok:true},
  // Tacos & kebabs
  {t:"The Best Food", c:"Tacos & kebabs", q:"23 rue du Général Leclerc", d:"Tacos et kebabs.", m:"≈ 6 – 12 €", ok:true},
  {t:"Royal Kebab", c:"Tacos & kebabs", q:"62 rue Saint-Leu", d:"Kebab.", m:"≈ 7 – 12 €", ok:true},
  {t:"Berlin & Durum", c:"Tacos & kebabs", q:"41 quai Bélu", d:"Kebab et durum. Offre étudiante à vérifier sur place.", m:"≈ 7 – 12 €", ok:true},
  {t:"Avesta", c:"Tacos & kebabs", q:"49 rue des Augustins", d:"Tacos et kebabs.", m:"≈ 8 – 13 €", ok:true},
  {t:"O'Tacos", c:"Tacos & kebabs", q:"45 rue des Augustins", d:"Tacos.", m:"≈ 9 – 15 €", ok:true},
  // Poulet
  {t:"Tasty Crousty", c:"Poulet", q:"14 place Alphonse Fiquet", d:"Poulet frit.", m:"≈ 7 – 12 €", ok:true},
  {t:"Krousty Factory", c:"Poulet", q:"11 rue Duméril", d:"Poulet frit.", m:"≈ 7 – 12 €", ok:true},
  {t:"Master Poulet", c:"Poulet", q:"Amiens centre", d:"Repas poulet.", m:"≈ 9 – 12 €", ok:true},
  {t:"Chicken Street", c:"Poulet", q:"106 rue du Maréchal de Lattre de Tassigny", d:"Poulet frit.", m:"≈ 10 – 15 €", ok:true},
  {t:"Pepe Chicken by FastGoodCuisine", c:"Poulet", q:"20 rue Sire-Firmin-Leroux", d:"Poulet et fast-food.", m:"≈ 10 – 15 €", ok:true},
  {t:"Five Krousty", c:"Poulet", q:"Amiens", d:"Fast-food, menu à moins de 10 € (estimation).", m:"< 10 € le menu", ok:true},
  {t:"Crousty One", c:"Poulet", q:"Amiens", d:"Fast-food, menu à moins de 10 € (estimation).", m:"< 10 € le menu", ok:true},
  // Pizzas
  {t:"Pizza Time", c:"Pizzas", q:"6 rue du Maréchal de Lattre de Tassigny", d:"Pizzas. Menu étudiant non vérifié.", m:"≈ 8 – 15 €", ok:true},
  {t:"Mama La Pizza", c:"Pizzas", q:"15 rue des Otages", d:"Pizzas. Menu étudiant non vérifié.", m:"≈ 10 – 20 €", ok:true},
  {t:"Via Pizza", c:"Pizzas", q:"5 rue des Sergents", d:"Pizzas. Menu étudiant non vérifié.", m:"≈ 15 – 20 €", ok:true},
  // Asiatique
  {t:"Pho Du Dragon", c:"Asiatique", q:"13 rue de Noyon", d:"Cuisine asiatique.", m:"≈ 10 – 20 €", ok:true},
  {t:"Chez Yu Dong", c:"Asiatique", q:"Rue des Sergents", d:"Cuisine chinoise.", m:"≈ 10 – 20 €", ok:true},
  {t:"Sushi Arata", c:"Asiatique", q:"4-6 rue du Maréchal de Lattre de Tassigny", d:"Sushis.", m:"≈ 10 – 20 €", ok:true},
  {t:"Sushi Tori Amiens", c:"Asiatique", q:"24 rue Lucien Fournier", d:"Sushis.", m:"≈ 10 – 20 €", ok:true},
  {t:"Okaeri", c:"Asiatique", q:"8 rue Gresset", d:"Cuisine asiatique.", m:"≈ 10 – 20 €", ok:true},
  // Autres
  {t:"Le Kimono", c:"Autres", q:"Galerie des Jacobins", d:"Plat du jour à petit prix, en plein centre.", m:"Plat du jour 7,50 €", ok:true},
  {t:"Tadam Grill", c:"Autres", q:"Amiens centre", d:"Restauration rapide au grill.", m:"≈ 7,50 – 12 €", ok:true},
  {t:"MEALY", c:"Autres", q:"8 place de l'Hôtel de Ville", d:"Restauration rapide.", m:"≈ 7 – 15 €", ok:true},
  {t:"Le Phare", c:"Autres", q:"19 place Alphonse Fiquet", d:"Crêpes et restauration.", m:"≈ 10 – 18 €", ok:true},
  {t:"La Graine et les Saveurs", c:"Autres", q:"7 rue Saint-Jacques", d:"Restauration rapide, cuisine variée.", m:"≈ 10 – 20 €", ok:true},
  {t:"Grill Antalya", c:"Autres", q:"Amiens", d:"Fast-food, menu à moins de 10 € (estimation).", m:"< 10 € le menu", ok:true},
  {t:"Bodrum", c:"Autres", q:"Amiens", d:"Fast-food, menu à moins de 10 € (estimation).", m:"< 10 € le menu", ok:true},
  {t:"Moment'O", c:"Autres", q:"Amiens", d:"Formule du midi du mardi au vendredi : plat, dessert, café offert, renouvelée chaque semaine.", m:"Formule midi 17,90 €", ok:true},
  // Aide alimentaire
  {t:"Croix-Rouge française : petit-déjeuner offert", c:"Aide alimentaire", q:"36 Square Friant", d:"Petit-déjeuner offert tous les matins de 8 h à 10 h pour les étudiants en difficulté.", m:"Gratuit", ok:true}
];

/* ---- ACTIVITÉS : spectacles, concerts, cinéma, gratuit ---- */
const activites = [
  // Cette semaine
  {t:"Video Mapping Festival", c:"Cette semaine", q:"Façades du centre-ville", d:"Il clôture le festival IC.ON.IC avec un parcours de sept points de projection sur des façades du centre-ville.", m:"Gratuit · ven. 16 et sam. 17 octobre", fin:"2026-10-17", ok:true},
  {t:"Patrick Bruel", c:"Cette semaine", q:"Amiens", d:"Concert de la tournée anniversaire.", m:"Mercredi 14 et jeudi 15 octobre", fin:"2026-10-15", ok:true},
  {t:"M. Pokora : Adrenaline Tour", c:"Cette semaine", q:"Amiens", d:"Concert de l'« Adrenaline Tour », à 20 h.", m:"Samedi 17 octobre · 20 h", fin:"2026-10-17", ok:true},
  {t:"Installation de François Réau", c:"Cette semaine", q:"Maison de la Culture", d:"Un grand dispositif visuel mêlant installations, dessins et lettrages lumineux.", m:"Jusqu'au 8 novembre", fin:"2026-11-08", ok:true},
  // Spectacles
  {t:"Le Safran", c:"Spectacles", q:"Amiens", d:"Spectacle tout public à 8,50 € en tarif étudiant, 7 € pour certains spectacles jeune public. Avec le Pass Vie Étudiante UPJV : 5 €.", m:"Dès 5 € avec le Pass UPJV", ok:true},
  {t:"Le Trait d'Union", c:"Spectacles", q:"Amiens", d:"Tarif étudiant à 8,10 € (tout public) et 7,10 € (jeune public). Certains tarifs descendent à 5,10 €.", m:"Dès 5,10 €", ok:true},
  {t:"Maison du Théâtre d'Amiens", c:"Spectacles", q:"Amiens", d:"Tarif étudiant généralement à 9 €. Certains spectacles ont des tarifs spécifiques.", m:"≈ 9 € étudiant", ok:true},
  {t:"La Comédie d'Amiens", c:"Spectacles", q:"55 rue de Sully", d:"Spectacles et humour. Bon plan : ta place à 15 € au lieu de 19 € en réservant par mail et en présentant ce bon plan sur place.", m:"15 € au lieu de 19 €", ok:true},
  {t:"Comédie de Picardie", c:"Spectacles", q:"62 rue des Jacobins", d:"Théâtre et spectacles.", m:"Tarifs selon le spectacle", ok:true},
  {t:"Centre culturel Léo Lagrange", c:"Spectacles", q:"Place Vogel", d:"Spectacles, concerts et événements.", m:"Tarifs selon la programmation", ok:true},
  // Concerts
  {t:"La Lune des Pirates", c:"Concerts", q:"58 bis rue Saint-Leu", d:"Salle de concerts de la ville.", m:"Prix selon l'artiste", ok:true},
  {t:"Zénith Amiens Métropole", c:"Concerts", q:"Amiens", d:"Concerts, spectacles et humour.", m:"Souvent 20 – 60 €+", ok:true},
  // Cinéma
  {t:"Ciné St-Leu", c:"Cinéma", q:"33 rue Vanmarcke", d:"Cinéma indépendant. Carte 5 places à 30 € (valable 1 an), carte 10 places à 60 € (valable 2 ans), cartes rechargeables (1 € à l'acquisition). 5 € la place pour les séances avant 13 h.", m:"Dès 5 € la place", ok:true},
  {t:"Cinéma Orson Welles", c:"Cinéma", q:"2 place Léon Gontier", d:"Cinéma et programmation culturelle.", m:"Tarifs selon la séance", ok:true},
  {t:"Pathé Amiens", c:"Cinéma", q:"3 boulevard de Belfort", d:"CinéCarte 5 places à 49 € (hors 3D et technos), valable 3 mois, 3 places maximum par séance.", m:"CinéCarte 49 € les 5 places", ok:true},
  // Bars & happy hours
  {t:"Les Dés Raisonnables", c:"Bars & happy hours", q:"Amiens", d:"Happy Hour tous les jours de 17 h à 19 h : pinte de Roman à 4 € (−1 € sur les autres pintes), 2 cocktails pour 12 €, citronnade à 4,50 €. À consommer avec modération.", m:"Happy Hour 17 h – 19 h", ok:true},
  {t:"Le Manneken Pis", c:"Bars & happy hours", q:"Amiens", d:"Happy Hour de 17 h à 22 h du lundi au samedi. Planche mixte charcuterie-fromage pour 2 personnes et une bouteille de vin (blanc, rosé ou rouge) à 19,80 €. À consommer avec modération.", m:"Planche + vin 19,80 € pour 2", ok:true},
  {t:"Le Môme qui Pisse", c:"Bars & happy hours", q:"Amiens", d:"Les Mardis Shooters : tous les shooters à 1,50 € au lieu de 2,50 € chaque mardi soir. À consommer avec modération.", m:"Shooters 1,50 € le mardi", ok:true},
  // Sorties
  {t:"Évasion au Beffroi", c:"Sorties", q:"Beffroi d'Amiens", d:"Escape game historique d'1 h, jusqu'à 6 personnes : 62 € la session, soit environ 10,30 € chacun à 6.", m:"≈ 10,30 € à 6", ok:true},
  // À venir
  {t:"Musée de Picardie : dimanche gratuit pour tous", c:"À venir", q:"2 rue Puvis de Chavannes", d:"Le Musée de Picardie est gratuit pour tous le premier dimanche du mois.", m:"Dimanche 1er novembre · gratuit", fin:"2026-11-01", ok:true},
  {t:"FIFAM : Festival international du film d'Amiens", c:"À venir", q:"Amiens", d:"Le grand festival de cinéma de la ville.", m:"Du 13 au 21 novembre", fin:"2026-11-21", ok:true},
  {t:"24 Heures pour l'Emploi et la Formation", c:"À venir", q:"Mégacité", d:"De 10 h à 17 h sans interruption : utile pour trouver un job étudiant ou une alternance.", m:"Jeudi 19 novembre · 10 h – 17 h", fin:"2026-11-19", ok:true},
  {t:"Geek Life", c:"À venir", q:"Mégacité", d:"Le grand rendez-vous pop culture autour des mangas, jeux vidéo, cosplay, comics et K-pop.", m:"21 et 22 novembre", fin:"2026-11-22", ok:true},
  // Gratuit
  {t:"Bibliothèques d'Amiens", c:"Gratuit", q:"Amiens", d:"De nombreuses animations gratuites : concerts, ateliers, rencontres, expositions, lectures.", m:"Gratuit", ok:true},
  {t:"Expositions du CIAP", c:"Gratuit", q:"23 place Notre-Dame", d:"Expositions gratuites.", m:"Gratuit", ok:true},
  {t:"Expositions temporaires des musées", c:"Gratuit", q:"Amiens", d:"Certaines expositions sont gratuites selon l'événement.", m:"Selon l'expo", ok:true},
  {t:"Journées européennes du patrimoine", c:"Gratuit", q:"Amiens", d:"Nombreuses visites et activités gratuites.", m:"Gratuit", ok:true},
  {t:"Nuit européenne des musées", c:"Gratuit", q:"Amiens", d:"Activités et entrées gratuites dans les établissements participants.", m:"Gratuit", ok:true},
  {t:"Animations culturelles municipales", c:"Gratuit", q:"Amiens", d:"Régulièrement gratuites ou à quelques euros selon l'événement.", m:"Gratuit ou quelques €", ok:true},
  // Exemples à remplacer
  {t:"Club de sport universitaire", c:"Sport", q:"Campus", d:"Une dizaine de disciplines, inscription à l'année pour un tarif symbolique.", m:"Adhésion 25 €/an"},
  {t:"Soirée jeux de société", c:"Sorties", q:"Saint-Leu", d:"Un bar, des tables, des jeux : parfait pour rencontrer du monde sans dépenser.", m:"Entrée libre"},
  {t:"Randonnée en baie de Somme", c:"Plein air", q:"Hors ville", d:"Sortie organisée le week-end, covoiturage depuis le campus.", m:"≈ 10 € la journée"}
];

/* ---- MARCHÉS ET BONS PLANS COURSES (page « Faire mes courses ») ---- */
const MARCHES = [
  {t:"Puces amiénoises", c:"Courses & marchés", q:"Amiens", d:"Brocante, pratique pour équiper un logement étudiant à petit prix.", m:"Samedi 17 octobre", fin:"2026-10-17", ok:true},
  {t:"Marché sur l'eau", c:"Courses & marchés", q:"Place Parmentier, Saint-Leu", d:"Légumes locaux vendus par les hortillons, le samedi matin, du 23 mai au 26 décembre 2026.", m:"Samedi matin", fin:"2026-12-26", ok:true},
  {t:"L'Île aux Fruits", c:"Courses & marchés", q:"Île de la Somme, Amiens", d:"Ferme bio en plein cœur d'Amiens, posée sur une île de la Somme, avec vente directe du 21 mai au 17 décembre 2026.", m:"Vente directe jusqu'au 17 décembre", fin:"2026-12-17", ok:true}
];

/* ---- BONS PLANS : sélection (Découvrir + meilleures offres) ---- */
const trouver = t => [...courses, ...activites].find(x => x.t === t);
const bonsPlans = [
  // Découvrir
  {t:"Cathédrale Notre-Dame d'Amiens", c:"Découvrir", q:"30 place Notre-Dame", d:"Visite de l'intérieur libre et gratuite.", m:"Gratuit", ok:true},
  {t:"CIAP (patrimoine et architecture)", c:"Découvrir", q:"23 place Notre-Dame", d:"Centre d'interprétation de l'architecture et du patrimoine. Visite libre et expositions gratuites.", m:"Gratuit", ok:true},
  {t:"Musée de Picardie", c:"Découvrir", q:"2 rue Puvis de Chavannes", d:"9 € plein tarif, mais gratuit pour les moins de 26 ans.", m:"Gratuit -26 ans", ok:true},
  {t:"Maison de Jules Verne", c:"Découvrir", q:"2 rue Charles Dubois", d:"9 € plein tarif, 5 € pour les étudiants.", m:"5 € étudiant", ok:true},
  {t:"Parc Saint-Pierre", c:"Découvrir", q:"Amiens", d:"Promenade avec vue sur les Hortillonnages et la Somme.", m:"Gratuit", ok:true},
  {t:"Jardin des plantes", c:"Découvrir", q:"Amiens", d:"Promenade et découverte botanique.", m:"Gratuit", ok:true},
  {t:"Visites guidées du patrimoine", c:"Découvrir", q:"Amiens", d:"Cathédrale, quartiers, monuments. Généralement 5 € adulte, 4 € tarif réduit, certaines visites courtes à 3 €.", m:"3 – 5 €", ok:true},
  {t:"Beffroi d'Amiens", c:"Découvrir", q:"Centre-ville", d:"Visites guidées et visites thématiques, généralement autour de 5 € selon la visite.", m:"≈ 5 €", ok:true},
  {t:"Visite nocturne aux lampions", c:"Découvrir", q:"Amiens", d:"Parcours dans Amiens à la découverte du patrimoine, de nuit. Vérifie les dates.", m:"5 €", ok:true},
  {t:"Jardin archéologique de Saint-Acheul", c:"Découvrir", q:"Amiens", d:"Activités et visites autour du patrimoine préhistorique.", m:"Selon l'activité", ok:true},
  {t:"Hortillonnages en barque", c:"Découvrir", q:"54 boulevard de Beauvillé", d:"Balade d'environ 45 min en barque traditionnelle.", m:"11 € adulte", ok:true},
  {t:"Musée des Hortillonnages", c:"Découvrir", q:"Rivery", d:"Musée + promenade en barque électrique.", m:"10 € adulte", ok:true},
  {t:"Festival international de jardins", c:"Découvrir", q:"Hortillonnages", d:"Installations artistiques et jardins sur les îles. Pass Amiens : 26 €.", m:"28 € adulte", ok:true},
  {t:"Parcours street art de Saint-Leu", c:"Découvrir", q:"Quartier Saint-Leu", d:"Œuvres de street art dans le cadre d'IC.ON.IC, visibles depuis le 19 septembre. Le parcours reste en place toute l'année.", m:"Gratuit", ok:true},
  {t:"Zoo d'Amiens Métropole", c:"Découvrir", q:"Amiens", d:"Tarif réduit à 10 € l'entrée pour les étudiants.", m:"10 € étudiant", ok:true},
  // Manger
  {...trouver("Restaurants universitaires (CROUS)"), c:"Manger"},
  {...trouver("The 216 Food"), c:"Manger"},
  {...trouver("Le Kimono"), c:"Manger"},
  {...trouver("Bento"), c:"Manger"},
  // Culture & sorties
  {...trouver("Le Safran"), c:"Culture & sorties"},
  {...trouver("Maison du Théâtre d'Amiens"), c:"Culture & sorties"},
  {...trouver("Bibliothèques d'Amiens"), c:"Culture & sorties"},
  ...MARCHES
];

/* ---- FICHES DÉTAILLÉES (ouvertes au clic sur une carte) ----
   lab = intitulé du bloc de texte ; h = histoire / contexte ; budget ; duree = temps estimé ; lieu */
const DETAILS = {
  "Cathédrale Notre-Dame d'Amiens": {h:"Commencée vers 1220, c'est la plus vaste cathédrale gothique de France par son volume intérieur. Sa nef s'élève à environ 42 mètres. Elle est inscrite au patrimoine mondial de l'UNESCO depuis 1981 et abrite, selon la tradition, le chef de saint Jean-Baptiste.", budget:"Gratuit (visite libre de l'intérieur)", duree:"45 min à 1 h 30", lieu:"30 place Notre-Dame"},
  "CIAP (patrimoine et architecture)": {h:"Lieu d'information sur le patrimoine d'Amiens : on y comprend l'histoire de la ville et de son architecture avant de partir explorer. Des expositions gratuites y sont régulièrement présentées.", budget:"Gratuit (visite libre)", duree:"30 à 45 min", lieu:"23 place Notre-Dame"},
  "Musée de Picardie": {h:"Le musée occupe un bâtiment du Second Empire conçu par l'architecte Arthur-Stanislas Diet et inauguré en 1867. Il réunit archéologie et beaux-arts, avec notamment de grands décors de Puvis de Chavannes.", budget:"Gratuit pour les moins de 26 ans (9 € plein tarif)", duree:"1 h 30 à 2 h", lieu:"2 rue Puvis de Chavannes"},
  "Maison de Jules Verne": {h:"Jules Verne s'installe à Amiens en 1871 et vit dans cette maison de 1882 à 1900. Il y a écrit une grande partie de son œuvre. La maison est aujourd'hui un musée consacré à l'écrivain.", budget:"5 € en tarif étudiant (9 € plein tarif)", duree:"1 h à 1 h 30", lieu:"2 rue Charles Dubois"},
  "Parc Saint-Pierre": {lab:"À savoir", h:"Grand espace vert au bord de la Somme, avec des vues sur les Hortillonnages. Idéal pour courir, pique-niquer ou faire une pause entre deux cours.", budget:"Gratuit", duree:"30 min à 1 h", lieu:"Amiens, bords de Somme"},
  "Jardin des plantes": {lab:"À savoir", h:"Jardin public calme où l'on découvre des espèces botaniques le long des allées. Une pause nature gratuite pour se ressourcer.", budget:"Gratuit", duree:"30 à 45 min", lieu:"Amiens"},
  "Visites guidées du patrimoine": {lab:"À savoir", h:"Des visites guidées par thèmes (cathédrale, quartiers, monuments) pour comprendre l'histoire d'Amiens avec un guide. Renseigne-toi à l'office de tourisme pour les dates et les points de départ.", budget:"5 € adulte, 4 € tarif réduit, certaines visites courtes à 3 €", duree:"≈ 1 h à 1 h 30 selon la visite", lieu:"Départ variable selon la visite"},
  "Beffroi d'Amiens": {h:"Construit au début du XVe siècle (à partir de 1406), le beffroi symbolisait les libertés et le pouvoir de la ville. Il est classé à l'UNESCO au titre des beffrois de Belgique et de France. Des visites guidées et thématiques y sont proposées.", budget:"≈ 5 € selon la visite", duree:"≈ 1 h", lieu:"Centre-ville d'Amiens"},
  "Visite nocturne aux lampions": {lab:"À savoir", h:"Une balade guidée de nuit, à la lueur des lampions, à travers les rues et le patrimoine d'Amiens. Vérifie les dates avant de venir.", budget:"5 € par personne", duree:"≈ 1 h 30 (à confirmer)", lieu:"Départ à confirmer"},
  "Jardin archéologique de Saint-Acheul": {h:"Le quartier de Saint-Acheul a donné son nom à l'Acheuléen, une culture préhistorique connue pour ses bifaces. Des fouilles y ont lieu depuis le XIXe siècle, et le jardin permet de découvrir ce patrimoine.", budget:"Selon l'activité", duree:"1 h à 2 h", lieu:"Quartier Saint-Acheul, Amiens"},
  "Hortillonnages en barque": {h:"Les Hortillonnages sont environ 300 hectares de jardins sur l'eau, cultivés depuis le Moyen Âge et séparés par des canaux. Les hortillons livraient leurs légumes en barque jusqu'au marché sur l'eau, place Parmentier.", budget:"11 € adulte (tarif étudiant à vérifier)", duree:"≈ 45 min", lieu:"54 boulevard de Beauvillé"},
  "Musée des Hortillonnages": {h:"Un musée pour comprendre la vie des hortillons et l'histoire des jardins sur l'eau, avec une promenade en barque électrique.", budget:"10 € adulte", duree:"≈ 1 h 30", lieu:"Rivery"},
  "Festival international de jardins": {lab:"À savoir", h:"Chaque année, des artistes et paysagistes créent des installations et des jardins sur les îles des Hortillonnages.", budget:"28 € adulte, 26 € avec le Pass Amiens", duree:"≈ 2 h", lieu:"Hortillonnages"},
  "Restaurants universitaires (CROUS)": {lab:"À savoir", h:"Repas complets dans les restaurants universitaires, à 1 € pour tous les étudiants depuis mai 2026. Paiement avec ta carte étudiante.", budget:"1 € le repas", duree:"≈ 30 à 45 min", lieu:"Campus et centre-ville"},
  "The 216 Food": {lab:"À savoir", h:"Menu étudiant composé d'un kebab, de tenders ou d'un tacos M, avec frites et boisson.", budget:"≈ 7,50 € le menu étudiant", duree:"≈ 30 min", lieu:"Amiens centre"},
  "Le Kimono": {lab:"À savoir", h:"Plat du jour à petit prix, en plein centre-ville, dans la galerie des Jacobins.", budget:"Plat du jour 7,50 €", duree:"≈ 30 à 45 min", lieu:"Galerie des Jacobins"},
  "Bento": {lab:"À savoir", h:"Menu étudiant en cuisine asiatique, entre 8,80 € et 9,90 €.", budget:"8,80 à 9,90 €", duree:"≈ 45 min", lieu:"19 rue des Sergents"},
  "Le Safran": {lab:"À savoir", h:"Salle de spectacle d'Amiens avec une programmation tout public et jeune public. Le Pass Vie Étudiante de l'UPJV ramène la place à 5 €.", budget:"5 € avec le Pass UPJV, sinon 8,50 € en tarif étudiant", duree:"≈ 1 h 30 selon le spectacle", lieu:"Amiens"},
  "Maison du Théâtre d'Amiens": {lab:"À savoir", h:"Salle de théâtre avec un tarif étudiant généralement à 9 €. Certains spectacles ont des tarifs spécifiques.", budget:"≈ 9 € en tarif étudiant", duree:"≈ 1 h 30 selon le spectacle", lieu:"Amiens"},
  "Bibliothèques d'Amiens": {lab:"À savoir", h:"Le réseau de bibliothèques propose de nombreuses animations gratuites : concerts, ateliers, rencontres, expositions et lectures. C'est aussi un lieu chaud et calme pour réviser.", budget:"Gratuit", duree:"1 à 2 h", lieu:"Réseau de bibliothèques, dont la bibliothèque Louis-Aragon"}
};

Object.assign(DETAILS, {
  "Flânerie dans Saint-Leu": {h:"Ancien quartier d'artisans, de tisserands et de teinturiers, bâti autour des canaux de la Somme. Réhabilité, il est devenu le quartier animé des quais, des restaurants et des bars, tout près du centre.", budget:"Gratuit", duree:"1 h à 1 h 30", lieu:"Quartier Saint-Leu"},
  "Marché sur l'eau": {h:"Il perpétue la tradition des hortillons, qui vendaient leurs légumes depuis leurs barques sur la Somme. Le marché a lieu le samedi matin, place Parmentier, dans le quartier Saint-Leu.", budget:"Gratuit (les achats sont en plus)", duree:"45 min à 1 h", lieu:"Place Parmentier, Saint-Leu"},
  "Chemin de halage à vélo": {h:"Le long de la Somme, les chemins de halage servaient autrefois à tirer les bateaux depuis la berge. Ils sont aujourd'hui aménagés pour se promener à pied ou à vélo, au calme.", budget:"Gratuit", duree:"1 h à 2 h", lieu:"Berges de la Somme, depuis Saint-Leu"},
  "Parc de la Hotoie": {lab:"À savoir", h:"Grand parc urbain de l'ouest d'Amiens, avec son étang et ses larges allées. L'un des grands espaces verts de la ville pour courir, pique-niquer ou se détendre.", budget:"Gratuit", duree:"1 h", lieu:"Parc de la Hotoie, Amiens"},
  "Expositions du CIAP": {lab:"À savoir", h:"Le CIAP propose régulièrement des expositions gratuites pour mieux comprendre l'histoire et l'architecture d'Amiens.", budget:"Gratuit", duree:"20 à 40 min", lieu:"23 place Notre-Dame"},
  "Expositions temporaires des musées": {lab:"À savoir", h:"Certaines expositions temporaires des musées d'Amiens sont gratuites selon l'événement. Renseigne-toi sur les programmes en cours.", budget:"Gratuit selon l'exposition", duree:"30 min à 1 h", lieu:"Musées d'Amiens"},
  "Journées européennes du patrimoine": {h:"Créées en France en 1984, les Journées européennes du patrimoine ouvrent chaque année en septembre de nombreux lieux, avec des visites et des activités gratuites.", budget:"Gratuit", duree:"1 à 2 h par visite", lieu:"Plusieurs lieux à Amiens"},
  "Nuit européenne des musées": {h:"Née en 2005, cette soirée ouvre gratuitement les établissements participants, avec des animations de nuit. Elle a lieu au printemps.", budget:"Gratuit", duree:"1 à 3 h", lieu:"Musées participants"},
  "Animations culturelles municipales": {lab:"À savoir", h:"La ville propose régulièrement des animations culturelles gratuites ou à quelques euros selon l'événement. Garde un œil sur le programme municipal.", budget:"Gratuit ou quelques euros", duree:"Variable selon l'événement", lieu:"Amiens"}
});

Object.assign(DETAILS, {
  "Restaurants universitaires (CROUS)": {lab:"À savoir", h:"Repas à 1 € pour tous les étudiants avec un compte Izly actif, boursiers ou non : un plat principal et jusqu'à deux accompagnements (entrée, fromage, dessert ou fruit), une fois par service, le midi et le soir là où le Crous propose un dîner. Avant, les non-boursiers payaient généralement 3,30 €.", budget:"1 € le repas", duree:"≈ 30 à 45 min", lieu:"Campus et centre-ville"},
  "Bento": {lab:"À savoir", h:"Menu étudiant en cuisine asiatique, avec une formule poulet dynamite + boisson à 7,90 €.", budget:"7,90 € la formule (menus étudiants jusqu'à 9,90 €)", duree:"≈ 45 min", lieu:"19 rue des Sergents"},
  "Marché sur l'eau": {h:"Il perpétue la tradition des hortillons, qui vendaient leurs légumes depuis leurs barques sur la Somme. Le marché a lieu le samedi matin, place Parmentier, du 23 mai au 26 décembre 2026.", budget:"Gratuit (les achats sont en plus)", duree:"45 min à 1 h", lieu:"Place Parmentier, Saint-Leu"},
  "Video Mapping Festival": {lab:"À savoir", h:"Il clôture le festival IC.ON.IC avec un parcours de sept points de projection sur des façades du centre-ville. Gratuit, les vendredi 16 et samedi 17 octobre.", budget:"Gratuit", duree:"≈ 1 h à 1 h 30 pour le parcours", lieu:"Façades du centre-ville"},
  "Parcours street art de Saint-Leu": {lab:"À savoir", h:"Des œuvres de street art à découvrir dans le quartier Saint-Leu, dans le cadre du festival IC.ON.IC. Les nouvelles œuvres sont visibles depuis le 19 septembre, et le parcours reste en place toute l'année.", budget:"Gratuit", duree:"45 min à 1 h", lieu:"Quartier Saint-Leu"},
  "Zoo d'Amiens Métropole": {lab:"À savoir", h:"Le zoo propose un tarif réduit à 10 € l'entrée pour les étudiants. Pense à prendre ta carte étudiante.", budget:"10 € en tarif réduit étudiant", duree:"2 h à 3 h", lieu:"Zoo d'Amiens Métropole"},
  "Puces amiénoises": {lab:"À savoir", h:"Une brocante pratique pour équiper un logement étudiant à petit prix. Elle a lieu le samedi 17 octobre.", budget:"Selon tes achats", duree:"1 à 2 h", lieu:"Amiens"},
  "L'Île aux Fruits": {lab:"À savoir", h:"Une ferme bio en plein cœur d'Amiens, posée sur une île de la Somme, avec vente directe du 21 mai au 17 décembre 2026.", budget:"Selon tes achats", duree:"30 min à 1 h", lieu:"Île de la Somme, Amiens"}
});

/* ---- SE CULTIVER À 0 € (page « Aujourd'hui ») ---- */
const G0_REFS = [
  ["Bons plans","Cathédrale Notre-Dame d'Amiens",""],
  ["Bons plans","CIAP (patrimoine et architecture)",""],
  ["Bons plans","Musée de Picardie","pour les moins de 26 ans"],
  ["Bons plans","Parc Saint-Pierre",""],
  ["Bons plans","Parcours street art de Saint-Leu",""],
  ["Bons plans","Jardin des plantes",""],
  ["Activités","Video Mapping Festival","16 et 17 octobre"],
  ["Activités","Bibliothèques d'Amiens",""],
  ["Activités","Expositions du CIAP",""],
  ["Activités","Expositions temporaires des musées",""],
  ["Activités","Journées européennes du patrimoine","chaque septembre"],
  ["Activités","Nuit européenne des musées","une soirée en mai"],
  ["Activités","Animations culturelles municipales",""]
];
const G0_EXTRA = [
  {t:"Flânerie dans Saint-Leu", c:"Bons plans", q:"Saint-Leu", when:""},
  {t:"Marché sur l'eau", c:"Bons plans", q:"Place Parmentier, Saint-Leu", when:"samedi matin"},
  {t:"Chemin de halage à vélo", c:"Bons plans", q:"Saint-Leu", when:""},
  {t:"Parc de la Hotoie", c:"Bons plans", q:"Ouest", when:""}
];
const GRATUITS = [
  ...G0_REFS.map(([c, t, when]) => ({...[...bonsPlans, ...courses, ...activites].find(x => x.t === t), c, when})),
  ...G0_EXTRA
].map(it => ({...it, d:DETAILS[it.t].h, m:"Gratuit · ⏱ " + DETAILS[it.t].duree + (it.when ? " · " + it.when : ""), ok:true}))
 .sort((a, b) => (a.c === b.c ? 0 : a.c === "Bons plans" ? -1 : 1));

const quartiers = ["Saint-Leu","Centre-ville","Nord","Sud","Citadelle","Campus"];

/* p = prix en €, mo = moments, j = jours (0 = dimanche) */
const idees = [
  // Manger
  {t:"Restaurants universitaires (CROUS)", c:"Manger", q:"Campus et centre-ville", p:1, mo:["midi","soir"], j:[1,2,3,4,5], d:"Repas complet à 1 € pour tous les étudiants avec un compte Izly actif."},
  {t:"Event'Café", c:"Manger", q:"Centre-ville", p:1, mo:["midi","aprem"], d:"Cafétéria CROUS : certaines formules à environ 1 €."},
  {t:"Plat du jour au Kimono", c:"Manger", q:"Galerie des Jacobins", p:7.5, mo:["midi"], d:"Plat du jour en plein centre."},
  {t:"Menu étudiant The 216 Food", c:"Manger", q:"Amiens centre", p:7.5, mo:["midi","soir"], d:"Kebab, tenders ou tacos M + frites + boisson."},
  {t:"Menu étudiant Bento", c:"Manger", q:"19 rue des Sergents", p:7.9, mo:["midi","soir"], d:"Cuisine asiatique : formule poulet dynamite + boisson à 7,90 €."},
  {t:"Burger + boisson chez O'Paradise", c:"Manger", q:"Amiens centre", p:9.9, mo:["midi","soir"], d:"Sur présentation de la carte étudiante."},
  {t:"Formule étudiante Lusitalia", c:"Manger", q:"3 rue des Sergents", p:9.9, mo:["midi","soir"], d:"Pizzas et cuisine italienne."},
  {t:"Menu étudiant Beef N'Co", c:"Manger", q:"12 rue Léon Blum", p:10, mo:["midi","soir"], d:"Plat + frites + boisson."},
  {t:"Menu étudiant Gaddar", c:"Manger", q:"Amiens centre", p:11.9, mo:["midi","soir"], d:"Sur présentation de la carte étudiante."},
  {t:"Menu midi Mian Miam", c:"Manger", q:"12 place Parmentier", p:14.9, mo:["midi"], d:"Cuisine asiatique, carte étudiante."},
  // Découvrir
  {t:"Cathédrale Notre-Dame", c:"Découvrir", q:"30 place Notre-Dame", p:0, mo:["matin","aprem"], d:"La plus grande cathédrale gothique de France, entrée libre."},
  {t:"CIAP et ses expositions", c:"Découvrir", q:"23 place Notre-Dame", p:0, mo:["matin","aprem"], d:"Visite libre et expositions gratuites sur le patrimoine."},
  {t:"Musée de Picardie", c:"Découvrir", q:"2 rue Puvis de Chavannes", p:0, mo:["matin","aprem"], j:[2,3,4,5,6,0], d:"Gratuit pour les moins de 26 ans."},
  {t:"Flânerie dans Saint-Leu", c:"Découvrir", q:"Saint-Leu", p:0, mo:["aprem","soir"], d:"Maisons colorées, canaux et quais animés."},
  {t:"Marché sur l'eau", c:"Découvrir", q:"Saint-Leu", p:0, mo:["matin"], j:[6], d:"Les hortillons vendent leurs légumes place Parmentier, le samedi matin."},
  {t:"Bibliothèques d'Amiens", c:"Découvrir", q:"Amiens", p:0, mo:["matin","aprem"], j:[2,3,4,5,6], d:"Animations gratuites : concerts, ateliers, expositions, lectures."},
  {t:"Visite guidée du patrimoine", c:"Découvrir", q:"Amiens", p:4, mo:["matin","aprem"], d:"Tarif réduit à 4 €, certaines visites courtes à 3 €."},
  {t:"Visite du Beffroi", c:"Découvrir", q:"Centre-ville", p:5, mo:["matin","aprem"], d:"Visite guidée ou thématique, autour de 5 €."},
  {t:"Maison de Jules Verne", c:"Découvrir", q:"2 rue Charles Dubois", p:5, mo:["matin","aprem"], d:"Tarif étudiant à 5 €."},
  {t:"Musée des Hortillonnages", c:"Découvrir", q:"Rivery", p:10, mo:["aprem"], d:"Musée + promenade en barque électrique."},
  {t:"Hortillonnages en barque", c:"Découvrir", q:"54 boulevard de Beauvillé", p:11, mo:["aprem"], d:"Balade d'environ 45 minutes sur l'eau."},
  {t:"Petit-déjeuner offert Croix-Rouge", c:"Manger", q:"36 Square Friant", p:0, mo:["matin"], d:"Offert tous les matins de 8 h à 10 h pour les étudiants en difficulté."},
  {t:"Formule étudiante Allo Mario's Pizza", c:"Manger", q:"Amiens", p:8.99, mo:["midi","soir"], d:"Pizza solo + boisson."},
  {t:"Formule du midi Moment'O", c:"Manger", q:"Amiens", p:17.9, mo:["midi"], j:[2,3,4,5], d:"Plat, dessert et café offert, renouvelée chaque semaine."},
  {t:"Parcours street art de Saint-Leu", c:"Découvrir", q:"Quartier Saint-Leu", p:0, mo:["matin","aprem","soir"], d:"Œuvres à ciel ouvert, parcours visible toute l'année."},
  {t:"Zoo d'Amiens Métropole", c:"Découvrir", q:"Amiens", p:10, mo:["matin","aprem"], d:"Tarif réduit à 10 € pour les étudiants."},
  {t:"Video Mapping Festival", c:"Sortir", q:"Centre-ville", p:0, mo:["soir"], dates:["2026-10-16","2026-10-17"], d:"Sept points de projection sur des façades du centre-ville."},
  {t:"Séance avant 13 h au Ciné St-Leu", c:"Sortir", q:"33 rue Vanmarcke", p:5, mo:["matin","midi"], d:"5 € la place pour les séances avant 13 h."},
  {t:"Séance Ciné St-Leu avec carte 5 places", c:"Sortir", q:"33 rue Vanmarcke", p:6, mo:["aprem","soir"], d:"Carte à 30 € les 5 places, soit 6 € la séance."},
  {t:"Happy Hour aux Dés Raisonnables", c:"Sortir", q:"Amiens", p:4, mo:["soir"], d:"Pinte de Roman à 4 € de 17 h à 19 h, citronnade à 4,50 €."},
  {t:"Place à 15 € à La Comédie d'Amiens", c:"Sortir", q:"55 rue de Sully", p:15, mo:["soir"], d:"15 € au lieu de 19 € en réservant par mail et en présentant le bon plan."},
  // Bouger
  {t:"Parc Saint-Pierre", c:"Bouger", q:"Amiens", p:0, mo:["matin","midi","aprem"], d:"Footing, pique-nique ou promenade au bord de la Somme."},
  {t:"Jardin des plantes", c:"Bouger", q:"Amiens", p:0, mo:["matin","midi","aprem"], d:"Promenade et découverte botanique."},
  {t:"Chemin de halage à vélo", c:"Bouger", q:"Saint-Leu", p:0, mo:["matin","aprem"], d:"Le long de la Somme, plat et tranquille."},
  {t:"Parc de la Hotoie", c:"Bouger", q:"Ouest", p:0, mo:["matin","midi","aprem"], d:"Le grand poumon vert de la ville, avec son étang."},
  // Sortir
  {t:"Visite nocturne aux lampions", c:"Sortir", q:"Amiens", p:5, mo:["soir"], d:"Parcours nocturne dans Amiens. Vérifie les dates."},
  {t:"Spectacle au Safran (Pass UPJV)", c:"Sortir", q:"Amiens", p:5, mo:["soir"], d:"5 € avec le Pass Vie Étudiante UPJV, sinon 8,50 €."},
  {t:"Spectacle au Trait d'Union", c:"Sortir", q:"Amiens", p:8.1, mo:["soir"], d:"Tarif étudiant à 8,10 €, certains à 5,10 €."},
  {t:"Spectacle à la Maison du Théâtre", c:"Sortir", q:"Amiens", p:9, mo:["soir"], d:"Tarif étudiant généralement à 9 €."},
  {t:"Escape game au Beffroi", c:"Sortir", q:"Beffroi d'Amiens", p:10.3, mo:["aprem","soir"], d:"62 € la session d'1 h : ≈ 10,30 € chacun à 6."}
];

/* ============================================================
   UTILITAIRES
   ============================================================ */
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const lsGet = (k, def) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch(e){ return def; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} };
const actif = it => !it.fin || Date.now() <= Date.parse(it.fin + "T23:59:59");
const keyOf = o => o.id || (o.t + "|" + (o.q || ""));
const depuis = ts => {
  const m = (Date.now() - ts) / 60000;
  if (m < 2) return "à l'instant";
  if (m < 60) return "il y a " + Math.round(m) + " min";
  const h = m / 60; if (h < 24) return "il y a " + Math.round(h) + " h";
  return "il y a " + Math.round(h / 24) + " j";
};
const euros = n => n === 0 ? "Gratuit"
  : n.toLocaleString("fr-FR", {minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2}) + " €";

/* ============================================================
   ANNONCES — stockage local ou Supabase
   ============================================================ */
const shared = !!(BACKEND.url && BACKEND.key);
const J = 86400000, now = Date.now();
const DEMOS = [
  {id:"demo1", t:"Bureau en bois", c:"Je donne", cat:"Mobilier", q:"Saint-Leu", d:"Bon état, à récupérer sur place avant fin du mois.", contact:"@marie", ts:now-2*J, demo:true},
  {id:"demo2", t:"Frigo top", c:"Je donne", cat:"Électroménager", q:"Nord", d:"Fonctionne parfaitement, je déménage vendredi.", contact:"@lucas", ts:now-4*J, demo:true},
  {id:"demo3", t:"Cherche vélo", c:"Je cherche", cat:"Transport", q:"Centre-ville", d:"Un vélo pour aller en cours, même un peu ancien.", contact:"@sarah", ts:now-6*J, demo:true}
];
let mine = lsGet("sa_annonces", []);
let remote = shared ? [] : DEMOS;
const annonces = () => [...mine, ...remote].sort((a,b) => b.ts - a.ts);

const sbHeaders = () => ({apikey:BACKEND.key, Authorization:"Bearer " + BACKEND.key, "Content-Type":"application/json"});
async function chargerRemote(){
  if (!shared) return;
  try {
    const r = await fetch(BACKEND.url + "/rest/v1/annonces?select=*&approved=eq.true&order=created_at.desc&limit=200", {headers: sbHeaders()});
    if (!r.ok) throw new Error(r.status);
    const rows = await r.json();
    remote = rows.map(x => ({id:"r" + x.id, t:x.titre, c:x.type, cat:x.categorie, q:x.quartier, d:x.description, contact:x.contact, ts:Date.parse(x.created_at)}));
    renderBourse(); renderAccueil(); renderFavoris();
  } catch(e){ toast("Impossible de charger les annonces partagées"); }
}
async function enregistrer(a){
  if (shared) {
    const r = await fetch(BACKEND.url + "/rest/v1/annonces", {
      method:"POST", headers:{...sbHeaders(), Prefer:"return=minimal"},
      body: JSON.stringify({titre:a.t, type:a.c, categorie:a.cat, quartier:a.q, description:a.d, contact:a.contact})
    });
    if (!r.ok) throw new Error(r.status);
    return "pending";
  }
  mine.unshift(a); lsSet("sa_annonces", mine);
  return "ok";
}

/* ============================================================
   ÉTAT
   ============================================================ */
let favoris = lsGet("sa_favoris", []);
let filtre = {bp:"Toutes", courses:"Toutes", act:"Toutes", bourse:"Toutes", g0:"Tout", favOnly:false};
const saveFavoris = () => lsSet("sa_favoris", favoris);

/* ============================================================
   NAVIGATION
   ============================================================ */
function go(page){
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const el = $("page-" + page);
  if (el) el.classList.add("active");
  document.querySelectorAll(".tab").forEach(t => {
    const on = t.dataset.tab === page;
    t.classList.toggle("active", on);
    if (on) t.setAttribute("aria-current", "page"); else t.removeAttribute("aria-current");
  });
  if (page === "copanier") { const f = $("copanierFrame"); if (!f.getAttribute("src")) f.setAttribute("src", "copanier.html?embed=1"); }
  toggleMenu(false);
  window.scrollTo({top:0, behavior:"smooth"});
}
function toggleMenu(open){
  $("drawer").classList.toggle("open", open);
  $("overlay").classList.toggle("open", open);
}

/* ============================================================
   RENDU
   ============================================================ */
function carteHTML(item){
  const k = keyOf(item), on = favoris.includes(k);
  const tag = item.c ? `<span class="card-tag">${esc(item.c)}${item.cat ? " · " + esc(item.cat) : ""}</span>` : "";
  const meta = item.m ? `<p class="card-meta">${esc(item.m)}</p>`
    : item.ts ? `<p class="card-meta">${esc(item.contact)} · ${esc(depuis(item.ts))}</p>` : "";
  let badge = "";
  if (item.demo) badge = `<span class="badge demo">Annonce d'exemple</span>`;
  else if (!item.ts && !item.ok) badge = `<span class="badge">À vérifier</span>`;
  const suppr = item.own ? `<button class="del" data-del="${esc(item.id)}">Supprimer mon annonce</button>` : "";
  const det = DETAILS[item.t];
  const plus = det ? `<button class="more" data-detail="${esc(item.t)}">Voir la fiche →</button>` : "";
  return `<article class="card${det ? " clickable" : ""}"${det ? ` data-detail="${esc(item.t)}"` : ""}>
    ${tag}
    <button class="fav ${on ? "on" : ""}" data-fav="${esc(k)}" aria-pressed="${on}" aria-label="${on ? "Retirer des favoris" : "Ajouter aux favoris"} : ${esc(item.t)}">${on ? "★" : "☆"}</button>
    <h3>${esc(item.t)}</h3>
    ${item.q ? `<p class="card-loc">📍 ${esc(item.q)}</p>` : ""}
    <p>${esc(item.d)}</p>
    ${meta}${badge}${suppr}${plus}
  </article>`;
}
const chipsHTML = (list, cle, scope) => list.map(c =>
  `<button class="chip ${filtre[cle] === c ? "active" : ""}" data-filter="${scope}" data-v="${esc(c)}">${esc(c)}</button>`).join("");

function renderBonsPlans(){
  $("chips").innerHTML = chipsHTML(["Toutes", ...new Set(bonsPlans.map(b => b.c))], "bp", "bp");
  const q = $("recherche").value.toLowerCase().trim();
  const res = bonsPlans.filter(actif).filter(b =>
    (filtre.bp === "Toutes" || b.c === filtre.bp) &&
    (!q || (b.t + b.q + b.d).toLowerCase().includes(q)) &&
    (!filtre.favOnly || favoris.includes(keyOf(b))));
  $("grilleBonsPlans").innerHTML = res.length ? res.map(carteHTML).join("")
    : `<div class="empty">Aucun bon plan ne correspond à cette recherche.</div>`;
}
function renderCourses(){
  $("chipsCourses").innerHTML = chipsHTML(["Toutes","Formule étudiante","CROUS","Burgers","Tacos & kebabs","Poulet","Pizzas","Asiatique","Autres","Aide alimentaire"], "courses", "courses");
  const q = $("rechercheCourses").value.toLowerCase().trim();
  const res = courses.filter(c => (filtre.courses === "Toutes" || c.c === filtre.courses) && (!q || (c.t + (c.q||"") + c.d).toLowerCase().includes(q)));
  $("grilleCourses").innerHTML = res.length ? res.map(carteHTML).join("") : `<div class="empty">Rien ici pour l'instant.</div>`;
}
function renderActivites(){
  $("chipsActivites").innerHTML = chipsHTML(["Toutes", ...new Set(activites.map(a => a.c))], "act", "act");
  const q = $("rechercheActivites").value.toLowerCase().trim();
  const res = activites.filter(actif).filter(a => (filtre.act === "Toutes" || a.c === filtre.act) && (!q || (a.t + a.q + a.d).toLowerCase().includes(q)));
  $("grilleActivites").innerHTML = res.length ? res.map(carteHTML).join("") : `<div class="empty">Aucune activité ne correspond.</div>`;
}
function renderGratuit(){
  $("chipsG0").innerHTML = chipsHTML(["Tout", "Bons plans", "Activités"], "g0", "g0");
  const res = GRATUITS.filter(actif).filter(g => filtre.g0 === "Tout" || g.c === filtre.g0);
  $("g0Count").textContent = res.length + (res.length > 1 ? " idées gratuites" : " idée gratuite");
  $("grilleG0").innerHTML = res.map(carteHTML).join("");
}
function renderMarches(){
  const res = MARCHES.filter(actif);
  $("mkCount").textContent = res.length + (res.length > 1 ? " adresses" : " adresse");
  $("grilleMarches").innerHTML = res.length ? res.map(carteHTML).join("") : `<div class="empty">Rien de prévu pour le moment.</div>`;
}
function renderBourse(){
  $("chipsBourse").innerHTML = chipsHTML(["Toutes", "Je donne", "Je cherche"], "bourse", "bourse");
  const res = annonces().filter(a => filtre.bourse === "Toutes" || a.c === filtre.bourse)
    .map(a => ({...a, own: mine.some(m => m.id === a.id)}));
  $("compteurBourse").textContent = res.length + (res.length > 1 ? " annonces" : " annonce");
  $("grilleBourse").innerHTML = res.length ? res.map(carteHTML).join("")
    : `<div class="empty">Aucune annonce dans cette catégorie pour le moment.</div>`;
}
function renderFavoris(){
  const tous = [...bonsPlans, ...courses, ...activites, ...GRATUITS, ...annonces(), ...idees.map(i => ({...i, m:euros(i.p), ok:true}))];
  const vus = new Set();
  const res = tous.filter(actif).filter(o => { const k = keyOf(o); if (!favoris.includes(k) || vus.has(k)) return false; vus.add(k); return true; });
  const badge = $("favCount");
  badge.textContent = res.length; badge.hidden = res.length === 0;
  $("btnFav").setAttribute("aria-label", res.length ? "Mes favoris (" + res.length + ")" : "Mes favoris");
  $("grilleFavoris").innerHTML = res.length ? res.map(carteHTML).join("")
    : `<div class="empty">Aucun favori pour l'instant. Touche l'étoile ☆ sur une carte pour la garder ici.</div>`;
}

/* ============================================================
   AUJOURD'HUI
   ============================================================ */
const MOMENTS = [{k:"matin", l:"Ce matin", h:"Matin"},{k:"midi", l:"Ce midi", h:"Midi"},{k:"aprem", l:"Cet après-midi", h:"Aprèm"},{k:"soir", l:"Ce soir", h:"Soir"}];
const ENVIES = ["Un peu de tout","Manger","Découvrir","Bouger","Sortir"];
const ORDRE = {matin:0, midi:1, aprem:2, soir:3};
const momentActuel = () => { const h = new Date().getHours(); return h < 11 ? "matin" : h < 14 ? "midi" : h < 18 ? "aprem" : "soir"; };
let jour = {budget:10, moment:momentActuel(), envie:"Un peu de tout", tirage:0, nbIdees:6};

function reset(){ jour.tirage = 0; jour.nbIdees = 6; renderAujourdhui(); }
function setBudget(v){
  jour.budget = Number(v);
  const n = $("budgetNum");
  n.textContent = jour.budget;
  n.classList.remove("bump"); void n.offsetWidth; n.classList.add("bump");
  $("budgetRange").value = jour.budget;
  reset();
}
function ideesDuJour(){
  const d = new Date().getDay(), debut = ORDRE[jour.moment];
  const t = new Date(), iso = t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
  return idees.filter(i => (!i.j || i.j.includes(d)) && (!i.dates || i.dates.includes(iso)) && i.mo.some(m => ORDRE[m] >= debut));
}
const creneau = i => i.mo.filter(m => ORDRE[m] >= ORDRE[jour.moment]).sort((a,b) => ORDRE[a] - ORDRE[b])[0];

function programmes(){
  const dispo = ideesDuJour().filter(i => i.p <= jour.budget);
  const combos = [];
  const valide = c => {
    const types = new Set(c.map(i => i.c));
    const total = c.reduce((s,i) => s + i.p, 0);
    const okEnvie = jour.envie === "Un peu de tout" || c.some(i => i.c === jour.envie);
    return types.size === c.length && total <= jour.budget + 1e-9 && okEnvie;
  };
  for (let a = 0; a < dispo.length; a++)
    for (let b = a + 1; b < dispo.length; b++) {
      if (valide([dispo[a], dispo[b]])) combos.push([dispo[a], dispo[b]]);
      for (let c = b + 1; c < dispo.length; c++)
        if (valide([dispo[a], dispo[b], dispo[c]])) combos.push([dispo[a], dispo[b], dispo[c]]);
    }
  const score = c => {
    const total = c.reduce((s,i) => s + i.p, 0);
    return c.length * 2 + (c.some(i => i.c === "Manger") ? 3 : 0) + (jour.budget ? total / jour.budget * 4 : 0);
  };
  return combos.map(c => c.sort((x,y) => ORDRE[creneau(x)] - ORDRE[creneau(y)])).sort((x,y) => score(y) - score(x)).slice(0, 12);
}
function renderProgramme(){
  const liste = programmes(), box = $("programme");
  $("btnShuffle").style.visibility = liste.length > 1 ? "visible" : "hidden";
  if (!liste.length) {
    const seule = ideesDuJour().filter(i => i.p <= jour.budget)[0];
    box.innerHTML = `<h2>Petite journée, grandes idées.</h2>
      <p class="ticket-empty">${seule ? `Pas assez d'idées pour composer un programme complet à ce moment-là, mais tu peux déjà : <strong>${esc(seule.t)}</strong>.`
      : "Rien ne rentre dans ce budget pour ce créneau. Monte un peu le curseur ou change de moment."}</p>`;
    return;
  }
  const prog = liste[jour.tirage % liste.length];
  const total = prog.reduce((s,i) => s + i.p, 0), reste = jour.budget - total;
  const titre = jour.budget === 0 ? "Une journée à 0 €, et pleine quand même."
    : total === 0 ? "Tout gratuit, tu gardes tes sous." : `${prog.length} étapes, ${euros(total)} en tout.`;
  box.innerHTML = `<h2>${titre}</h2>
    <ol class="steps">${prog.map(i => `
      <li class="step">
        <span class="step-time">${MOMENTS.find(m => m.k === creneau(i)).h}</span>
        <div><h4>${esc(i.t)}</h4><p>${esc(i.q)} · ${esc(i.d)}</p></div>
        <span class="step-price">${euros(i.p)}</span>
      </li>`).join("")}</ol>
    <div class="ticket-total"><strong>${euros(total)}</strong>
      <span>${reste > 0.004 ? "Il te reste " + euros(Math.round(reste * 100) / 100) : "Budget pile utilisé"}</span></div>`;
}
function renderIdees(){
  const res = ideesDuJour().filter(i => i.p <= jour.budget && (jour.envie === "Un peu de tout" || i.c === jour.envie))
    .sort((a,b) => a.p - b.p || ORDRE[creneau(a)] - ORDRE[creneau(b)]);
  $("ideasTitle").textContent = jour.budget === 0 ? "Gratuit aujourd'hui" : `À ${jour.budget} € ou moins`;
  $("ideasCount").textContent = res.length + (res.length > 1 ? " idées" : " idée");
  $("ideas").innerHTML = res.length ? res.slice(0, jour.nbIdees).map(i => `
      <article class="idea">
        <h4><small>${esc(i.c)}</small>${esc(i.t)}</h4>
        <span class="idea-r"><span class="price ${i.p === 0 ? "free" : ""}">${euros(i.p)}</span>${(() => { const k = keyOf(i), on = favoris.includes(k); return `<button class="fav ${on ? "on" : ""}" data-fav="${esc(k)}" aria-pressed="${on}" aria-label="${on ? "Retirer des favoris" : "Ajouter aux favoris"} : ${esc(i.t)}">${on ? "★" : "☆"}</button>`; })()}</span>
        <p>${esc(i.q)} · ${esc(i.d)}</p>
      </article>`).join("")
    : `<div class="empty" style="margin-top:0;">Aucune idée pour ce créneau. Essaie un autre moment ou une autre envie.</div>`;
  $("moreIdeas").style.display = res.length > jour.nbIdees ? "" : "none";
}
function renderAujourdhui(){
  const r = $("budgetRange");
  r.style.setProperty("--pct", (jour.budget / r.max * 100) + "%");
  $("chipsBudget").innerHTML = [0,5,10,20].map(b =>
    `<button class="chip small ${jour.budget === b ? "active" : ""}" data-budget="${b}">${b === 0 ? "0 €, fauché" : b + " €"}</button>`).join("");
  $("chipsMoment").innerHTML = MOMENTS.map(m =>
    `<button class="chip small ${jour.moment === m.k ? "active" : ""}" data-moment="${m.k}">${m.l}</button>`).join("");
  $("chipsEnvie").innerHTML = ENVIES.map(e =>
    `<button class="chip small ${jour.envie === e ? "active" : ""}" data-envie="${esc(e)}">${esc(e)}</button>`).join("");
  renderProgramme(); renderIdees();
}
function renderAccueil(){
  const d = new Date().toLocaleDateString("fr-FR", {weekday:"long", day:"numeric", month:"long"});
  $("todayDate").textContent = d.charAt(0).toUpperCase() + d.slice(1) + " · Amiens";
  const nbGratuit = idees.filter(i => i.p === 0).length;
  const rub = [
    {t:"Se nourrir", d:"Restos, fast-foods, boulangeries, épiceries et anti-gaspi", n:courses.length, go:"courses"},
    {t:"Faire mes courses", d:"Organise tes repas de la semaine et compare les prix entre enseignes", go:"copanier"},
    {t:"Sortir et se divertir", d:"Spectacles, concerts, cinéma et activités gratuites", n:activites.length, go:"activites"},
    {t:"Découvrir Amiens", d:"Incontournables, coins méconnus, parcs et balades", n:bonsPlans.filter(b => b.c === "Découvrir").length, go:"decouvrir"},
    {t:"Les bons plans", d:`Adresses testées et tarifs étudiants, dont ${nbGratuit} idées gratuites`, n:bonsPlans.length, go:"bons-plans"}
  ];
  $("rubriques").innerHTML = rub.map((r,i) => `
    <li class="rubrique" tabindex="0" role="link" data-rub="${r.go}">
      <span class="num">0${i+1}</span>
      <div><h3>${r.t}</h3><p>${r.d}${r.n != null ? " · " + r.n + " adresses" : ""}</p></div><span class="arrow" aria-hidden="true">→</span>
    </li>`).join("");
  $("miniAnnonces").innerHTML = annonces().slice(0,3).map(a => `
    <div class="mini-annonce"><div><strong>${esc(a.t)}</strong><span>${esc(a.q)} · ${esc(depuis(a.ts))}</span></div><em>${esc(a.c)}</em></div>`).join("")
    || `<div class="mini-annonce"><div><strong>Pas encore d'annonce</strong><span>Sois le premier à en déposer une</span></div></div>`;
}
const renderAll = () => { renderMarches(); renderGratuit(); renderBonsPlans(); renderCourses(); renderActivites(); renderBourse(); renderFavoris(); renderAccueil(); };

/* ============================================================
   ACTIONS
   ============================================================ */
function toggleFav(k){
  const i = favoris.indexOf(k);
  if (i > -1) { favoris.splice(i, 1); toast("Retiré des favoris"); }
  else { favoris.push(k); toast("Ajouté à tes favoris ★"); }
  saveFavoris(); renderAll(); renderIdees();
  document.querySelectorAll(".btn-star").forEach(majBtnStar);
}
function majBtnStar(b){
  const on = favoris.includes(b.dataset.fav);
  b.classList.toggle("on", on);
  b.textContent = on ? "★ Dans mes favoris" : "☆ Ajouter aux favoris";
}
function openForm(){
  ["fTitre","fQuartier","fDesc","fContact"].forEach(x => $(x).value = "");
  $("formIntro").textContent = shared
    ? "Ton annonce sera relue par l'équipe avant d'apparaître dans la bourse."
    : "Pour l'instant, ton annonce reste dans ce navigateur : parfait pour tester.";
  go("form");
}
async function publier(){
  const titre = $("fTitre").value.trim(), desc = $("fDesc").value.trim();
  if (!titre || !desc) { toast("Il manque le titre ou la description"); return; }
  const a = {
    id: "m" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    t:titre, c:$("fType").value, cat:$("fCat").value,
    q:$("fQuartier").value.trim() || "Amiens", d:desc,
    contact:$("fContact").value.trim() || "@anonyme", ts:Date.now()
  };
  const btn = $("btnPublier"); btn.disabled = true;
  try {
    const res = await enregistrer(a);
    renderBourse(); renderAccueil();
    toast(res === "pending" ? "Merci ! Ton annonce sera visible après validation." : "Annonce publiée ✓");
    go("bourse");
  } catch(e) { toast("Échec de l'envoi, réessaie dans un instant"); }
  btn.disabled = false;
}
function supprimer(id){
  mine = mine.filter(a => a.id !== id); lsSet("sa_annonces", mine);
  favoris = favoris.filter(k => k !== id); saveFavoris();
  renderAll(); toast("Annonce supprimée");
}

function ouvrirFiche(titre){
  const item = [...bonsPlans, ...courses, ...activites, ...GRATUITS].find(x => x.t === titre);
  const d = DETAILS[titre];
  if (!item || !d) return;
  const lieu = d.lieu || item.q || "Amiens";
  const requete = encodeURIComponent((item.q && item.q !== "Amiens" ? item.t + " " + item.q : item.t) + " Amiens");
  $("ficheTag").textContent = item.c || "";
  $("ficheTitre").textContent = item.t;
  $("ficheCorps").innerHTML = `
    <div class="bloc"><h3>${esc(d.lab || "Petite histoire")}</h3><p>${esc(d.h)}</p></div>
    <dl class="fiche-grid">
      <div><dt>💶 Budget</dt><dd>${esc(d.budget)}</dd></div>
      <div><dt>⏱ Temps estimé</dt><dd>${esc(d.duree)}</dd></div>
      <div><dt>📍 Localisation</dt><dd>${esc(lieu)}</dd></div>
    </dl>
    <button type="button" class="btn-star" id="btnStar" data-fav="${esc(keyOf(item))}"></button>
    <a class="btn-maps" href="https://www.google.com/maps/search/?api=1&query=${requete}" target="_blank" rel="noopener noreferrer">Voir sur la carte</a>
    <p class="fiche-note">Prix et durées indicatifs : vérifie les horaires avant de te déplacer.</p>`;
  majBtnStar($("btnStar"));
  const dlg = $("fiche");
  if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
}
function fermerFiche(){ const dlg = $("fiche"); if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
let toastTimer;
function toast(msg){
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* Un seul écouteur pour tous les clics (aucun onclick inline) */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-go],[data-action],[data-fav],[data-del],[data-detail],[data-filter],[data-budget],[data-moment],[data-envie],[data-rub]");
  if (!t) return;
  const d = t.dataset;
  if (d.fav) return toggleFav(d.fav);
  if (d.del) return supprimer(d.del);
  if (d.detail) return ouvrirFiche(d.detail);
  if (d.filter) {
    filtre[d.filter] = d.v;
    return ({bp:renderBonsPlans, courses:renderCourses, act:renderActivites, bourse:renderBourse, g0:renderGratuit})[d.filter]();
  }
  if (d.budget !== undefined) return setBudget(d.budget);
  if (d.moment) { jour.moment = d.moment; return reset(); }
  if (d.envie) { jour.envie = d.envie; return reset(); }
  if (d.rub) {
    if (d.rub === "decouvrir") { filtre.bp = "Découvrir"; renderBonsPlans(); return go("bons-plans"); }
    return go(d.rub);
  }
  if (d.go) return go(d.go);
  switch (d.action) {
    case "openForm": toggleMenu(false); return openForm();
    case "menu-open": return toggleMenu(true);
    case "menu-close": return toggleMenu(false);
    case "fiche-close": return fermerFiche();
    case "g0-toggle": {
      const btn = $("g0Toggle"), corps = $("g0Body");
      const ouvert = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!ouvert));
      corps.hidden = ouvert;
      return;
    }
    case "shuffle": jour.tirage++; return renderProgramme();
    case "more": jour.nbIdees += 6; return renderIdees();
    case "publish": return publier();
    case "about": toggleMenu(false); return toast("StudiAmiens — projet étudiant amiénois 🎓");
    case "favfilter":
      filtre.favOnly = !filtre.favOnly;
      $("favBtn").classList.toggle("active", filtre.favOnly);
      $("favBtn").textContent = filtre.favOnly ? "★ Favoris" : "☆ Favoris";
      return renderBonsPlans();
  }
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") toggleMenu(false);
  if (e.key === "Enter" && e.target.matches("[data-rub],[data-go].logo")) e.target.click();
});
$("fiche").addEventListener("click", e => { if (e.target === $("fiche")) fermerFiche(); });
$("budgetRange").addEventListener("input", e => setBudget(e.target.value));
$("recherche").addEventListener("input", renderBonsPlans);
$("rechercheCourses").addEventListener("input", renderCourses);
$("rechercheActivites").addEventListener("input", renderActivites);

/* ============================================================
   INIT
   ============================================================ */
renderAll();
renderAujourdhui();
go("aujourdhui");
chargerRemote();
