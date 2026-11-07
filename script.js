/* ============================================================
   CONFIG — comptes en ligne et bourse partagée (optionnel)
   Laisse vide = tout reste dans le navigateur de chacun (mode démo :
   comptes locaux, panier et annonces enregistrés sur l'appareil).
   Renseigne url + clé « anon » (jamais la clé « service_role ») d'un projet
   Supabase et exécute optionnel/supabase.sql pour avoir de VRAIS comptes
   (inscription, e-mail de confirmation, mot de passe oublié) et un panier
   synchronisé sur tous les appareils.
   ============================================================ */
const BACKEND = { url: "", key: "" };

/* ============================================================
   DONNÉES — ok:true = lieu et tarif vérifiés ; sinon affiché « À vérifier »
   ============================================================ */
/* ---- MANGER : restaurants, CROUS, formules étudiantes + courses (source : RECHERCHES.pdf) ---- */
const courses = [
  // CROUS
  {t:"Restaurants universitaires (CROUS)", c:"CROUS", q:"Campus et centre-ville", d:"Repas complet à 1 € pour tous les étudiants avec un compte Izly actif, boursiers ou non : un plat principal et jusqu'à deux accompagnements (entrée, fromage, dessert ou fruit), le midi et le soir là où le Crous propose un dîner.", m:"1 € le repas", menus:[["Repas complet : plat principal + jusqu'à 2 accompagnements (entrée, fromage, dessert ou fruit)", "1 €"]], ok:true},
  {t:"Cafétéria de la Veillère", c:"CROUS", q:"Petite rue de la Veillère", d:"Cafétéria CROUS à tarifs étudiants.", m:"≈ 1 – 3,30 €", menus:[["Formules de la cafétéria CROUS", "≈ 1 – 3,30 €"]], ok:true},
  {t:"Event'Café", c:"CROUS", q:"Centre-ville", d:"Cafétéria CROUS, certaines formules à environ 1 €.", m:"Dès ≈ 1 €", menus:[["Certaines formules du CROUS", "≈ 1 €"]], ok:true},
  {t:"Cafétéria Saint-Leu", c:"CROUS", q:"Saint-Leu", d:"Cafétéria CROUS à tarifs étudiants.", m:"Tarifs CROUS", ok:true},
  {t:"Cafétéria Droit & Économie", c:"CROUS", q:"Faculté de droit et d'économie", d:"Cafétéria CROUS à tarifs étudiants.", m:"Tarifs CROUS", ok:true},
  {t:"Cafétéria des Arts", c:"CROUS", q:"Faculté des Arts", d:"Cafétéria CROUS à tarifs étudiants.", m:"Tarifs CROUS", ok:true},
  // Formules étudiantes
  {t:"The 216 Food", c:"Formule étudiante", q:"Amiens centre", d:"Fast-food avec menu étudiant.", m:"≈ 7,50 €", menus:[["Menu étudiant : kebab, tenders ou tacos M + frites + boisson", "≈ 7,50 €"]], ok:true},
  {t:"Bento", c:"Formule étudiante", q:"19 rue des Sergents", d:"Cuisine asiatique avec formules étudiantes.", m:"7,90 – 9,90 €", menus:[["Formule étudiante : poulet dynamite + boisson", "7,90 €"], ["Menu étudiant (cuisine asiatique)", "8,80 – 9,90 €"]], ok:true},
  {t:"O'Paradise", c:"Formule étudiante", q:"Amiens centre", d:"Burgers à prix étudiant.", m:"9,90 €", menus:[["Burger + boisson (carte étudiante)", "9,90 €"]], ok:true},
  {t:"Lusitalia", c:"Formule étudiante", q:"3 rue des Sergents", d:"Pizzas et cuisine italienne.", m:"9,90 €", menus:[["Formule étudiante (pizzas / italien)", "9,90 €"]], ok:true},
  {t:"Beef N'Co", c:"Formule étudiante", q:"12 rue Léon Blum", d:"Burgers avec menu étudiant.", m:"10 €", menus:[["Menu étudiant : plat + frites + boisson", "10 €"]], ok:true},
  {t:"Gaddar", c:"Formule étudiante", q:"Amiens centre", d:"Restaurant avec menu étudiant.", m:"11,90 €", menus:[["Menu étudiant (sur présentation de la carte étudiante)", "11,90 €"]], ok:true},
  {t:"Allo Mario's Pizza", c:"Formule étudiante", q:"Amiens", d:"Pizzas avec formule étudiante.", m:"8,99 €", menus:[["Formule étudiante : pizza solo + boisson", "8,99 €"]], ok:true},
  {t:"Mian Miam", c:"Formule étudiante", q:"12 place Parmentier", d:"Cuisine asiatique, menu du midi pour les étudiants.", m:"14,90 €", menus:[["Menu midi étudiant (carte étudiante)", "14,90 €"]], ok:true},
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
  {t:"Le Kimono", c:"Autres", q:"Galerie des Jacobins", d:"Plat du jour à petit prix, en plein centre.", m:"Plat du jour 7,50 €", menus:[["Plat du jour", "7,50 €"]], ok:true},
  {t:"Tadam Grill", c:"Autres", q:"Amiens centre", d:"Restauration rapide au grill.", m:"≈ 7,50 – 12 €", ok:true},
  {t:"MEALY", c:"Autres", q:"8 place de l'Hôtel de Ville", d:"Restauration rapide.", m:"≈ 7 – 15 €", ok:true},
  {t:"Le Phare", c:"Autres", q:"19 place Alphonse Fiquet", d:"Crêpes et restauration.", m:"≈ 10 – 18 €", ok:true},
  {t:"La Graine et les Saveurs", c:"Autres", q:"7 rue Saint-Jacques", d:"Restauration rapide, cuisine variée.", m:"≈ 10 – 20 €", ok:true},
  {t:"Grill Antalya", c:"Autres", q:"Amiens", d:"Fast-food, menu à moins de 10 € (estimation).", m:"< 10 € le menu", ok:true},
  {t:"Bodrum", c:"Autres", q:"Amiens", d:"Fast-food, menu à moins de 10 € (estimation).", m:"< 10 € le menu", ok:true},
  {t:"Moment'O", c:"Autres", q:"Amiens", d:"Formule du midi renouvelée chaque semaine.", m:"Formule midi 17,90 €", menus:[["Formule du midi (du mardi au vendredi) : plat, dessert, café offert", "17,90 €"]], ok:true},
  // Aide alimentaire
  {t:"Croix-Rouge française : petit-déjeuner offert", c:"Aide alimentaire", q:"36 Square Friant", d:"Petit-déjeuner offert tous les matins de 8 h à 10 h pour les étudiants en difficulté.", m:"Gratuit", menus:[["Petit-déjeuner offert, tous les matins de 8 h à 10 h", "Gratuit"]], ok:true}
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
  {t:"Les Dés Raisonnables", c:"Bars & happy hours", q:"Amiens", d:"Happy Hour tous les jours de 17 h à 19 h. À consommer avec modération.", m:"Happy Hour 17 h – 19 h", menus:[["Pinte de Roman (Happy Hour 17 h – 19 h)", "4 €"], ["Autres pintes (Happy Hour)", "−1 €"], ["2 cocktails (Happy Hour)", "12 €"], ["Citronnade", "4,50 €"]], ok:true},
  {t:"Le Manneken Pis", c:"Bars & happy hours", q:"Amiens", d:"Happy Hour de 17 h à 22 h du lundi au samedi. À consommer avec modération.", m:"Planche + vin 19,80 € pour 2", menus:[["Planche mixte charcuterie-fromage pour 2 + bouteille de vin (blanc, rosé ou rouge)", "19,80 €"]], ok:true},
  {t:"Le Môme qui Pisse", c:"Bars & happy hours", q:"Amiens", d:"Les Mardis Shooters. À consommer avec modération.", m:"Shooters 1,50 € le mardi", menus:[["Shooters, chaque mardi soir", "1,50 € (au lieu de 2,50 €)"]], ok:true},
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
let filtre = {bp:"Toutes", courses:"Toutes", act:"Toutes", bourse:"Toutes", g0:"Tout", pxc:"Tous les prix", pxa:"Tous les prix", tric:false, tria:false, favOnly:false};
const saveFavoris = () => lsSet("sa_favoris", favoris);
let panier = [];

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
  if (typeof fermerCompte === "function" && $("compte").open) fermerCompte();
  window.scrollTo({top:0, behavior:"smooth"});
}
function toggleMenu(open){
  $("drawer").classList.toggle("open", open);
  $("overlay").classList.toggle("open", open);
  const croix = $("drawer").querySelector(".drawer-close");
  if (open && croix) croix.focus();
}

/* ============================================================
   RENDU
   ============================================================ */
const FOOD_CATS = ["CROUS","Formule étudiante","Burgers","Tacos & kebabs","Poulet","Pizzas","Asiatique","Autres","Aide alimentaire","Bars & happy hours","Manger"];
function menusHTML(it, vide = true){
  const l = Array.isArray(it.menus) ? it.menus.filter(x => Array.isArray(x) && x.length >= 2) : [];
  if (l.length) return `<div class="menus"><p class="menus-t">Menus &amp; prix</p><ul>${l.map(([n, p]) => `<li><span>${esc(n)}</span><b>${esc(p)}</b></li>`).join("")}</ul></div>`;
  return vide && FOOD_CATS.includes(it.c) ? `<p class="menus-vide">Carte détaillée à compléter.</p>` : "";
}
function carteHTML(item){
  const k = keyOf(item), on = favoris.includes(k);
  const tag = item.c ? `<span class="card-tag">${esc(item.c)}${item.cat ? " · " + esc(item.cat) : ""}</span>` : "";
  const meta = item.m ? `<p class="card-meta">${esc(item.m)}</p>`
    : item.ts ? `<p class="card-meta">${esc(item.contact)} · ${esc(depuis(item.ts))}</p>` : "";
  let badge = "";
  if (item.demo) badge = `<span class="badge demo">Annonce d'exemple</span>`;
  else if (!actif(item)) badge = `<span class="badge">Terminé</span>`;
  else if (!item.ts && !item.ok) badge = `<span class="badge">À vérifier</span>`;
  const suppr = item.own ? `<button class="del" data-del="${esc(item.id)}">Supprimer mon annonce</button>` : "";
  const det = DETAILS[item.t];
  const voir = det ? `<button class="more" data-detail="${esc(item.t)}">Voir la fiche →</button>` : "";
  const dp = dansPanier(k);
  const plus = `<div class="card-actions">${voir}<button type="button" class="pan-btn ${dp ? "on" : ""}" data-panier="${esc(k)}" aria-pressed="${dp}">${dp ? "✓ Dans mon panier" : "🛒 Ajouter au panier"}</button></div>`;
  return `<article class="card${det ? " clickable" : ""}"${det ? ` data-detail="${esc(item.t)}"` : ""}>
    ${tag}
    <button class="fav ${on ? "on" : ""}" data-fav="${esc(k)}" aria-pressed="${on}" aria-label="${on ? "Retirer des favoris" : "Ajouter aux favoris"} : ${esc(item.t)}">${on ? "★" : "☆"}</button>
    <h3>${esc(item.t)}</h3>
    ${item.q ? `<p class="card-loc">📍 ${esc(item.q)}</p>` : ""}
    <p>${esc(item.d)}</p>
    ${menusHTML(item)}
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
/* ---- Filtre par prix (pages Manger et Activités) ---- */
const PRIX_CHIPS = ["Tous les prix", "Gratuit", "≤ 5 €", "≤ 10 €", "≤ 15 €"];
function prixMin(it){
  if (typeof it.p === "number") return it.p;
  const lire = s => { const r = String(s || "").match(/(\d+(?:[.,]\d+)?)(?:\s*[–-]\s*\d+(?:[.,]\d+)?)?\s*€/); return r ? parseFloat(r[1].replace(",", ".")) : null; };
  const direct = lire(it.m);
  if (direct !== null) return direct;
  if (/gratuit|entrée libre/i.test(String(it.m || ""))) return 0;
  if (Array.isArray(it.menus)) {
    const l = it.menus.map(x => Array.isArray(x) ? lire(x[1]) : null).filter(v => v !== null && v > 0);
    if (l.length) return Math.min(...l);
  }
  return null;
}
function appliquerPrix(liste, choix, tri){
  let res = liste, masques = 0;
  if (choix !== "Tous les prix") {
    const lim = choix === "Gratuit" ? 0 : Number(choix.replace(/\D/g, ""));
    res = liste.filter(it => { const p = prixMin(it); if (p === null) { masques++; return false; } return p <= lim; });
  }
  if (tri) res = [...res].sort((a, b) => (prixMin(a) ?? 1e9) - (prixMin(b) ?? 1e9));
  return {res, masques};
}
const chipsPrixHTML = (cle, tri, actionTri) =>
  PRIX_CHIPS.map(c => `<button class="chip small ${filtre[cle] === c ? "active" : ""}" data-filter="${cle}" data-v="${esc(c)}">${esc(c)}</button>`).join("") +
  `<button class="chip small ${tri ? "active" : ""}" data-action="${actionTri}" aria-pressed="${!!tri}">↑ Prix croissant</button>`;
const noteMasques = n => n ? n + " lieu" + (n > 1 ? "x" : "") + " sans prix précis " + (n > 1 ? "masqués" : "masqué") + " avec ce filtre." : "";

function renderCourses(){
  $("chipsCourses").innerHTML = chipsHTML(["Toutes","Formule étudiante","CROUS","Burgers","Tacos & kebabs","Poulet","Pizzas","Asiatique","Autres","Aide alimentaire"], "courses", "courses");
  const q = $("rechercheCourses").value.toLowerCase().trim();
  const base = courses.filter(c => (filtre.courses === "Toutes" || c.c === filtre.courses) && (!q || (c.t + (c.q||"") + c.d).toLowerCase().includes(q)));
  $("prixCourses").innerHTML = chipsPrixHTML("pxc", filtre.tric, "tri-courses");
  const {res, masques} = appliquerPrix(base, filtre.pxc, filtre.tric);
  $("noteCourses").textContent = noteMasques(masques);
  $("grilleCourses").innerHTML = res.length ? res.map(carteHTML).join("") : `<div class="empty">Aucun lieu ne correspond à ces filtres.</div>`;
}
function renderActivites(){
  $("chipsActivites").innerHTML = chipsHTML(["Toutes", ...new Set(activites.map(a => a.c))], "act", "act");
  const q = $("rechercheActivites").value.toLowerCase().trim();
  const base = activites.filter(actif).filter(a => (filtre.act === "Toutes" || a.c === filtre.act) && (!q || (a.t + a.q + a.d).toLowerCase().includes(q)));
  $("prixActivites").innerHTML = chipsPrixHTML("pxa", filtre.tria, "tri-act");
  const {res, masques} = appliquerPrix(base, filtre.pxa, filtre.tria);
  $("noteActivites").textContent = noteMasques(masques);
  $("grilleActivites").innerHTML = res.length ? res.map(carteHTML).join("") : `<div class="empty">Aucune activité ne correspond à ces filtres.</div>`;
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
  const res = catalogue().filter(actif).filter(o => favoris.includes(keyOf(o)));
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
function budgetSauve(){ const b = Number(lsGet("sa_budget", 10)); return Number.isFinite(b) ? Math.min(30, Math.max(0, Math.round(b))) : 10; }
let jour = {budget:budgetSauve(), moment:momentActuel(), envie:"Un peu de tout", tirage:0, nbIdees:6};

function reset(){ jour.tirage = 0; jour.nbIdees = 6; renderAujourdhui(); }
function setBudget(v){
  jour.budget = Number(v);
  lsSet("sa_budget", jour.budget);
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
        <span class="idea-r"><span class="price ${i.p === 0 ? "free" : ""}">${euros(i.p)}</span>${(() => { const k = keyOf(i), on = favoris.includes(k); return `<button class="fav ${on ? "on" : ""}" data-fav="${esc(k)}" aria-pressed="${on}" aria-label="${on ? "Retirer des favoris" : "Ajouter aux favoris"} : ${esc(i.t)}">${on ? "★" : "☆"}</button>`; })()}${(() => { const k = keyOf(i), dp = dansPanier(k); return `<button type="button" class="pan-ico ${dp ? "on" : ""}" data-panier="${esc(k)}" aria-pressed="${dp}" aria-label="${dp ? "Retirer du panier" : "Ajouter au panier"} : ${esc(i.t)}">🛒</button>`; })()}</span>
        <p>${esc(i.q)} · ${esc(i.d)}</p>
      </article>`).join("")
    : `<div class="empty" style="margin-top:0;">Aucune idée pour ce créneau. Essaie un autre moment ou une autre envie.</div>`;
  $("moreIdeas").style.display = res.length > jour.nbIdees ? "" : "none";
}
function renderAujourdhui(){
  const r = $("budgetRange");
  r.value = jour.budget; $("budgetNum").textContent = jour.budget;
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
const renderAll = () => { renderPanier(); renderMarches(); renderGratuit(); renderBonsPlans(); renderCourses(); renderActivites(); renderBourse(); renderFavoris(); renderAccueil(); };

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
    ${menusHTML(item, false)}
    <dl class="fiche-grid">
      <div><dt>💶 Budget</dt><dd>${esc(d.budget)}</dd></div>
      <div><dt>⏱ Temps estimé</dt><dd>${esc(d.duree)}</dd></div>
      <div><dt>📍 Localisation</dt><dd>${esc(lieu)}</dd></div>
    </dl>
    <button type="button" class="btn-star" id="btnStar" data-fav="${esc(keyOf(item))}"></button>
    <button type="button" class="btn-star btn-pan" id="btnPan" data-panier="${esc(keyOf(item))}"></button>
    <a class="btn-maps" href="https://www.google.com/maps/search/?api=1&query=${requete}" target="_blank" rel="noopener noreferrer">Voir sur la carte</a>
    <p class="fiche-note">Prix et durées indicatifs : vérifie les horaires avant de te déplacer.</p>`;
  majBtnStar($("btnStar"));
  majBtnPan($("btnPan"));
  const dlg = $("fiche");
  if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
}
function fermerFiche(){ const dlg = $("fiche"); if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
let toastTimer;
function toast(msg){
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ============================================================
   COMPTE ÉTUDIANT + PANIER
   - Sans configuration : compte « local » (enregistré sur l'appareil, mot de passe haché).
   - Avec BACKEND (Supabase) : vrai compte en ligne (inscription, e-mail de confirmation,
     connexion, mot de passe oublié, suppression) et panier synchronisé sur tous les appareils.
   ============================================================ */
const DOMAINES_ETUDIANTS = ["u-picardie.fr", "etud.u-picardie.fr"]; // à vérifier avec l'université
const EXIGER_EMAIL_ETUDIANT = false;                                  // true = refuse les autres e-mails
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ETABLISSEMENTS = ["Université de Picardie Jules Verne (UPJV)", "Autre université", "École (ingénieur, commerce, art…)", "BTS / IUT / lycée", "Autre"];
const enLigne = shared;
const cleSession = "sa_session", cleComptes = "sa_comptes", cleSb = "sa_sb";
class ErrUtilisateur extends Error {}
const ko = m => new ErrUtilisateur(m);
const lsDel = k => { try { localStorage.removeItem(k); } catch(e){} };

let user = null;      // {id, email, prenom, etab, created}
let session = null;   // en ligne : {access_token, refresh_token, expires_at}
let vueCompte = "inscription";
let confirmSuppr = false;

const estEmailEtudiant = email => { const d = (email.split("@")[1] || "").toLowerCase(); return DOMAINES_ETUDIANTS.some(x => d === x || d.endsWith("." + x)); };
function verifierMdp(m){
  if (m.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
  if (!/[A-Za-z]/.test(m) || !/\d/.test(m)) return "Le mot de passe doit contenir au moins une lettre et un chiffre.";
  return "";
}

/* ---------- Panier ---------- */
const clePanier = () => "sa_panier_" + (user ? user.id : "invite");
const CHAMPS_PANIER = ["id","t","c","cat","q","d","m","p","ts","contact","demo","fin","ok","menus"];
function chargerPanier(){
  const brut = lsGet(clePanier(), []);
  panier = Array.isArray(brut) ? brut.filter(x => x && typeof x.t === "string") : [];
}
function sauverPanier(){ lsSet(clePanier(), panier); if (user && enLigne) planifierSyncPanier(); }
function instantane(it){
  const o = {};
  CHAMPS_PANIER.forEach(f => { if (it[f] !== undefined) o[f] = it[f]; });
  if (typeof o.d === "string" && o.d.length > 400) o.d = o.d.slice(0, 400);
  if (o.menus !== undefined) o.menus = Array.isArray(o.menus) ? o.menus.filter(x => Array.isArray(x) && x.length >= 2).slice(0, 12).map(x => [String(x[0]).slice(0, 160), String(x[1]).slice(0, 40)]) : [];
  return o;
}
const dansPanier = k => panier.some(x => keyOf(x) === k);
function catalogue(){
  const tous = [...bonsPlans, ...courses, ...activites, ...GRATUITS, ...annonces(), ...idees.map(i => ({...i, m:euros(i.p), ok:true}))];
  const vus = new Set();
  return tous.filter(o => { const k = keyOf(o); if (vus.has(k)) return false; vus.add(k); return true; });
}
function prixIndicatif(it){
  if (typeof it.p === "number") return it.p;
  const m = String(it.m || "");
  const r = m.match(/(\d+(?:[.,]\d+)?)\s*€/);
  if (r) return parseFloat(r[1].replace(",", "."));
  if (/gratuit|entrée libre/i.test(m)) return 0;
  return null;
}
const arrondi = n => Math.round(n * 100) / 100;
function basculerPanier(k){
  const i = panier.findIndex(x => keyOf(x) === k);
  if (i > -1) { panier.splice(i, 1); toast("Retiré de ton panier"); }
  else {
    const it = catalogue().find(o => keyOf(o) === k);
    if (!it) return;
    panier.push(instantane(it)); toast("Ajouté à ton panier 🛒");
  }
  sauverPanier(); renderAll(); renderIdees();
  document.querySelectorAll(".btn-pan[data-panier]").forEach(majBtnPan);
}
function majBtnPan(b){
  const on = dansPanier(b.dataset.panier);
  b.classList.toggle("on", on);
  b.textContent = on ? "✓ Dans mon panier" : "🛒 Ajouter au panier";
}
function renderPanier(){
  const n = panier.length;
  const badge = $("panCount"); badge.textContent = n; badge.hidden = n === 0;
  $("btnPanier").setAttribute("aria-label", n ? "Mon panier (" + n + ")" : "Mon panier");
  let total = 0, sans = 0;
  panier.filter(actif).forEach(it => { const p = prixIndicatif(it); if (p === null) sans++; else total += p; });
  $("panierBanniere").innerHTML = user
    ? `<div class="pan-banniere"><span>Panier de <strong>${esc(user.prenom)}</strong> · enregistré ${enLigne ? "sur ton compte" : "sur cet appareil"}.</span></div>`
    : `<div class="pan-banniere"><span>Crée ton compte étudiant pour retrouver ton panier à chaque visite${enLigne ? ", sur tous tes appareils" : " (sur cet appareil)"}.</span><button type="button" class="btn-primary" data-action="compte-open">Créer mon compte</button></div>`;
  $("panierResume").innerHTML = n ? `<div class="pan-resume">
      <div class="pan-total"><strong>${total === 0 ? "0 €" : euros(arrondi(total))}</strong><span>Budget estimé · ${n} élément${n > 1 ? "s" : ""}${sans ? " · " + sans + " sans prix connu" : ""}</span></div>
      <div class="pan-actions"><button type="button" class="btn-ghost" data-action="panier-copier">Copier ma liste</button><button type="button" class="btn-ghost" data-action="panier-vider">Vider le panier</button></div>
    </div>` : "";
  $("grillePanier").innerHTML = n ? panier.map(carteHTML).join("")
    : `<div class="empty">Ton panier est vide. Touche « 🛒 Ajouter au panier » sur une carte pour la garder ici.</div>`;
}
function copierPanier(){
  const lignes = panier.map(it => { const p = prixIndicatif(it); return "- " + it.t + (it.q ? " (" + it.q + ")" : "") + " : " + (p === null ? "prix à vérifier" : p === 0 ? "gratuit" : euros(p)); });
  const texte = "Mon panier StudiAmiens\n" + lignes.join("\n");
  const ok = () => toast("Liste copiée ✓");
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(texte).then(ok, () => toast("Copie impossible sur ce navigateur"));
  else toast("Copie impossible sur ce navigateur");
}
function fusionnerPanier(autres){
  const vus = new Set(panier.map(keyOf));
  (Array.isArray(autres) ? autres : []).forEach(it => {
    if (it && typeof it.t === "string" && !vus.has(keyOf(it))) { panier.push(instantane(it)); vus.add(keyOf(it)); }
  });
  sauverPanier(); renderAll();
}

/* ---------- Comptes locaux ---------- */
const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
const deb64 = s => Uint8Array.from(atob(s), ch => ch.charCodeAt(0));
async function deriver(mdp, sel, iter){
  if (!window.crypto || !crypto.subtle) throw ko("Ce navigateur ne permet pas de créer un compte sécurisé. Essaie avec un navigateur à jour.");
  const cle = await crypto.subtle.importKey("raw", new TextEncoder().encode(mdp), "PBKDF2", false, ["deriveBits"]);
  return b64(await crypto.subtle.deriveBits({name:"PBKDF2", hash:"SHA-256", salt:sel, iterations:iter}, cle, 256));
}
function ouvrirSessionLocale(c){
  user = {id:c.id, email:c.email, prenom:c.prenom, etab:c.etab, created:c.created};
  lsSet(cleSession, {id:c.id});
}
async function inscrireLocal(d){
  const comptes = lsGet(cleComptes, []);
  if (comptes.some(c => c.email === d.email)) throw ko("Un compte existe déjà avec cet e-mail. Connecte-toi plutôt.");
  const sel = crypto.getRandomValues(new Uint8Array(16)), iter = 150000;
  const c = {id:"u" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8), email:d.email, prenom:d.prenom, etab:d.etab,
    sel:b64(sel), iter, hash:await deriver(d.mdp, sel, iter), created:new Date().toISOString()};
  comptes.push(c); lsSet(cleComptes, comptes);
  if (!lsGet(cleComptes, []).some(x => x.id === c.id)) throw ko("Impossible d'enregistrer le compte : le stockage du navigateur est bloqué.");
  ouvrirSessionLocale(c);
}
async function connecterLocal(email, mdp){
  const c = lsGet(cleComptes, []).find(x => x.email === email);
  const mauvais = ko("E-mail ou mot de passe incorrect.");
  if (!c) throw mauvais;
  if (await deriver(mdp, deb64(c.sel), c.iter) !== c.hash) throw mauvais;
  ouvrirSessionLocale(c);
}

/* ---------- Comptes en ligne (Supabase Auth) ---------- */
function messageErreurSb(d){
  const m = String(d && (d.msg || d.error_description || d.message || d.error) || "");
  if (/already (been )?registered/i.test(m)) return "Un compte existe déjà avec cet e-mail. Connecte-toi plutôt.";
  if (/invalid login/i.test(m)) return "E-mail ou mot de passe incorrect.";
  if (/not confirmed/i.test(m)) return "Confirme d'abord ton e-mail (lien reçu par message), puis reconnecte-toi.";
  if (/password/i.test(m) && /(short|weak|least|characters)/i.test(m)) return "Mot de passe trop faible : 8 caractères minimum.";
  if (/rate limit|too many|security purposes/i.test(m)) return "Trop de tentatives. Réessaie dans quelques minutes.";
  return "Une erreur est survenue. Réessaie dans un instant.";
}
async function sb(chemin, {method = "GET", body, token, headers = {}} = {}){
  const r = await fetch(BACKEND.url + chemin, {
    method, body: body ? JSON.stringify(body) : undefined,
    headers: {apikey:BACKEND.key, Authorization:"Bearer " + (token || BACKEND.key), "Content-Type":"application/json", ...headers}
  });
  const txt = await r.text(); let data = null;
  try { data = txt ? JSON.parse(txt) : null; } catch(e){}
  if (!r.ok) throw ko(messageErreurSb(data));
  return data;
}
const userDepuisSb = u => { const meta = u.user_metadata || {}; return {id:u.id, email:u.email, prenom:meta.prenom || String(u.email || "").split("@")[0], etab:meta.etab || "", created:u.created_at}; };
function ouvrirSessionSb(tok){
  if (tok.user) user = userDepuisSb(tok.user);
  session = {access_token:tok.access_token, refresh_token:tok.refresh_token, expires_at:Date.now() + (Number(tok.expires_in) || 3600) * 1000};
  lsSet(cleSb, {...session, user});
}
function viderSessionSb(){ session = null; lsDel(cleSb); }
async function rafraichirSb(){
  if (!session) return false;
  try { ouvrirSessionSb(await sb("/auth/v1/token?grant_type=refresh_token", {method:"POST", body:{refresh_token:session.refresh_token}})); return true; }
  catch(e){ viderSessionSb(); return false; }
}
async function jetonValide(){
  if (!session) return null;
  if (session.expires_at - Date.now() < 60000 && !(await rafraichirSb())) return null;
  return session ? session.access_token : null;
}
async function inscrireSb(d){
  const r = await sb("/auth/v1/signup", {method:"POST", body:{email:d.email, password:d.mdp, data:{prenom:d.prenom, etab:d.etab}}});
  if (r && r.access_token) { ouvrirSessionSb(r); return "connecte"; }
  return "confirmer";
}
async function connecterSb(email, mdp){
  ouvrirSessionSb(await sb("/auth/v1/token?grant_type=password", {method:"POST", body:{email, password:mdp}}));
}
let tSync = null;
function planifierSyncPanier(){ clearTimeout(tSync); tSync = setTimeout(pousserPanier, 700); }
async function pousserPanier(){
  try {
    const tok = await jetonValide(); if (!tok || !user) return;
    await sb("/rest/v1/paniers?on_conflict=user_id", {method:"POST", token:tok, headers:{Prefer:"resolution=merge-duplicates,return=minimal"},
      body:{user_id:user.id, items:panier, updated_at:new Date().toISOString()}});
  } catch(e){}
}
async function tirerPanier(){
  try {
    const tok = await jetonValide(); if (!tok || !user) return;
    const r = await sb("/rest/v1/paniers?select=items&user_id=eq." + encodeURIComponent(user.id), {token:tok});
    fusionnerPanier(r && r[0] ? r[0].items : []);
  } catch(e){}
}
async function traiterRetourEmail(){
  if (!enLigne || location.hash.length < 20) return;
  const p = new URLSearchParams(location.hash.slice(1));
  const tok = p.get("access_token"); if (!tok) return;
  const type = p.get("type");
  history.replaceState(null, "", location.pathname + location.search);
  try {
    const u = await sb("/auth/v1/user", {token:tok});
    ouvrirSessionSb({access_token:tok, refresh_token:p.get("refresh_token"), expires_in:p.get("expires_in"), user:u});
    apresConnexion();
    if (type === "recovery") ouvrirCompte("nouveau-mdp"); else toast("E-mail confirmé, bienvenue ! 🎓");
  } catch(e){ toast("Ce lien n'est plus valide. Demande un nouvel e-mail."); }
}

/* ---------- Session ---------- */
function restaurerSession(){
  if (enLigne) {
    const s = lsGet(cleSb, null);
    if (s && s.access_token && s.user) { session = {access_token:s.access_token, refresh_token:s.refresh_token, expires_at:s.expires_at}; user = s.user; }
  } else {
    const s = lsGet(cleSession, null);
    const c = s && lsGet(cleComptes, []).find(x => x.id === s.id);
    if (c) user = {id:c.id, email:c.email, prenom:c.prenom, etab:c.etab, created:c.created};
  }
}
function apresConnexion(){
  const invite = lsGet("sa_panier_invite", []);
  chargerPanier();
  fusionnerPanier(invite);
  lsDel("sa_panier_invite");
  if (enLigne) tirerPanier();
  majBoutonCompte(); renderAll();
}
async function deconnecter(){
  const ancien = user;
  if (enLigne && session) { try { await sb("/auth/v1/logout", {method:"POST", token:session.access_token}); } catch(e){} }
  if (enLigne) { viderSessionSb(); if (ancien) lsDel("sa_panier_" + ancien.id); } else lsDel(cleSession);
  user = null; confirmSuppr = false; vueCompte = "connexion";
  chargerPanier(); majBoutonCompte(); renderAll(); renderIdees();
  fermerCompte(); toast("Tu es déconnecté·e");
}
async function supprimerCompte(){
  const ancien = user;
  if (enLigne) {
    const tok = await jetonValide();
    if (!tok) throw ko("Ta session a expiré. Reconnecte-toi puis réessaie.");
    await sb("/rest/v1/rpc/supprimer_mon_compte", {method:"POST", token:tok, body:{}});
    viderSessionSb();
  } else {
    lsSet(cleComptes, lsGet(cleComptes, []).filter(c => c.id !== ancien.id));
    lsDel(cleSession);
  }
  lsDel("sa_panier_" + ancien.id);
  user = null; confirmSuppr = false; vueCompte = "inscription";
  chargerPanier(); majBoutonCompte(); renderAll(); renderIdees();
  fermerCompte(); toast("Ton compte a été supprimé");
}

/* ---------- Interface du compte ---------- */
function majBoutonCompte(){
  const b = $("btnCompte");
  b.classList.toggle("connecte", !!user);
  $("compteLblFull").textContent = user ? user.prenom : "Créer ton compte étudiant";
  $("compteLblShort").textContent = user ? user.prenom : "Compte";
  b.setAttribute("aria-label", user ? "Mon compte : " + user.prenom : "Créer ton compte étudiant");
  $("drawerCompte").textContent = user ? "Mon compte (" + user.prenom + ")" : "Créer ton compte étudiant";
}
function ouvrirCompte(vue){
  confirmSuppr = false;
  vueCompte = vue || (user ? "profil" : "inscription");
  rendreCompte();
  const dlg = $("compte");
  if (dlg.showModal) { if (!dlg.open) dlg.showModal(); } else dlg.setAttribute("open", "");
}
function fermerCompte(){ const dlg = $("compte"); if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
function rendreCompte(){
  if (user && vueCompte !== "nouveau-mdp") vueCompte = "profil";
  if (!user && (vueCompte === "profil" || vueCompte === "nouveau-mdp")) vueCompte = "connexion";
  const info = enLigne
    ? `<p class="compte-info">🔒 Ton compte est créé en ligne : tu retrouves ton panier sur tous tes appareils.</p>`
    : `<p class="compte-info">ℹ️ Mode démo : ton compte reste enregistré sur cet appareil uniquement. Aucune donnée n'est envoyée sur internet.</p>`;
  const vues = {
    inscription: () => ({kicker:"Compte étudiant", titre:"Crée ton compte étudiant", html: info + `
      <form id="formInscription" novalidate autocomplete="on"><div class="form-grid">
        <div class="field"><label for="iPrenom">Prénom ou pseudo</label><input id="iPrenom" type="text" maxlength="30" autocomplete="given-name" required></div>
        <div class="field"><label for="iEmail">E-mail</label><input id="iEmail" type="email" maxlength="120" autocomplete="email" placeholder="prenom.nom@etud.u-picardie.fr" required><p class="hint">Utilise de préférence ton e-mail étudiant.</p></div>
        <div class="field"><label for="iEtab">Établissement</label><select id="iEtab">${ETABLISSEMENTS.map(x => `<option>${esc(x)}</option>`).join("")}</select></div>
        <div class="field"><label for="iMdp">Mot de passe</label><div class="mdp-wrap"><input id="iMdp" type="password" maxlength="100" autocomplete="new-password" required><button type="button" class="mdp-voir" data-action="mdp-voir" data-cible="iMdp">Afficher</button></div><p class="hint">8 caractères minimum, avec au moins une lettre et un chiffre.</p></div>
        <div class="field"><label for="iMdp2">Confirmer le mot de passe</label><input id="iMdp2" type="password" maxlength="100" autocomplete="new-password" required></div>
        <label class="case"><input type="checkbox" id="iCgu"><span>J'accepte que mon prénom, mon e-mail, mon établissement et mon panier soient enregistrés pour faire fonctionner mon compte. Je peux supprimer mon compte à tout moment. <a href="confidentialite.html" target="_blank" rel="noopener">Politique de confidentialité</a>.</span></label>
      </div><p class="form-err" id="compteErr" role="alert"></p>
      <button type="submit" class="btn-primary">Créer mon compte</button></form>
      <p class="compte-bas">Déjà un compte ? <button type="button" class="lien-btn" data-action="compte-vue" data-vue="connexion">Se connecter</button></p>`}),
    connexion: () => ({kicker:"Compte étudiant", titre:"Content de te revoir", html: info + `
      <form id="formConnexion" novalidate autocomplete="on"><div class="form-grid">
        <div class="field"><label for="cEmail">E-mail</label><input id="cEmail" type="email" autocomplete="email" required></div>
        <div class="field"><label for="cMdp">Mot de passe</label><div class="mdp-wrap"><input id="cMdp" type="password" autocomplete="current-password" required><button type="button" class="mdp-voir" data-action="mdp-voir" data-cible="cMdp">Afficher</button></div></div>
      </div><p class="form-err" id="compteErr" role="alert"></p>
      <button type="submit" class="btn-primary">Se connecter</button></form>
      <p class="compte-bas"><button type="button" class="lien-btn" data-action="compte-vue" data-vue="oubli">Mot de passe oublié ?</button></p>
      <p class="compte-bas">Pas encore de compte ? <button type="button" class="lien-btn" data-action="compte-vue" data-vue="inscription">Créer mon compte</button></p>`}),
    oubli: () => ({kicker:"Compte étudiant", titre:"Mot de passe oublié", html: enLigne ? `
      <p class="compte-info">Indique ton e-mail : si un compte existe, tu recevras un lien pour choisir un nouveau mot de passe.</p>
      <form id="formOubli" novalidate><div class="form-grid"><div class="field"><label for="oEmail">E-mail</label><input id="oEmail" type="email" autocomplete="email" required></div></div>
      <p class="form-err" id="compteErr" role="alert"></p><button type="submit" class="btn-primary">Envoyer le lien</button></form>
      <p class="compte-bas"><button type="button" class="lien-btn" data-action="compte-vue" data-vue="connexion">← Retour à la connexion</button></p>` : `
      <p class="compte-info">En mode démo, il n'y a pas d'e-mail de réinitialisation : le compte est enregistré sur cet appareil uniquement. Tu peux créer un nouveau compte avec une autre adresse.</p>
      <p class="compte-bas"><button type="button" class="lien-btn" data-action="compte-vue" data-vue="connexion">← Retour à la connexion</button></p>`}),
    confirmer: () => ({kicker:"Presque fini", titre:"Vérifie ta boîte mail", html: `
      <div class="confirm-mail"><div class="big" aria-hidden="true">✉️</div>
      <p>On t'a envoyé un lien de confirmation. Clique dessus pour activer ton compte, puis reviens te connecter.</p>
      <p class="hint">Pense à regarder dans les courriers indésirables.</p></div>
      <p class="compte-bas"><button type="button" class="lien-btn" data-action="compte-vue" data-vue="connexion">Se connecter</button></p>`}),
    "nouveau-mdp": () => ({kicker:"Compte étudiant", titre:"Choisis un nouveau mot de passe", html: `
      <form id="formNouveauMdp" novalidate><div class="form-grid">
        <div class="field"><label for="nMdp">Nouveau mot de passe</label><div class="mdp-wrap"><input id="nMdp" type="password" autocomplete="new-password" required><button type="button" class="mdp-voir" data-action="mdp-voir" data-cible="nMdp">Afficher</button></div><p class="hint">8 caractères minimum, avec au moins une lettre et un chiffre.</p></div>
        <div class="field"><label for="nMdp2">Confirmer</label><input id="nMdp2" type="password" autocomplete="new-password" required></div>
      </div><p class="form-err" id="compteErr" role="alert"></p><button type="submit" class="btn-primary">Enregistrer</button></form>`}),
    profil: () => {
      const u = user, etu = estEmailEtudiant(u.email);
      const date = u.created ? new Date(u.created).toLocaleDateString("fr-FR") : "—";
      return {kicker:"Mon compte", titre:"Bonjour " + u.prenom, html: `
      <div class="profil"><div class="avatar" aria-hidden="true">${esc((u.prenom || "?").charAt(0).toUpperCase())}</div>
        <div><p class="profil-nom">${esc(u.prenom)}</p><p class="profil-mail">${esc(u.email)}${etu ? ` <span class="tag-etu">E-mail étudiant ✓</span>` : ""}</p></div></div>
      <dl class="fiche-grid">
        <div><dt>🎓 Établissement</dt><dd>${esc(u.etab || "Non renseigné")}</dd></div>
        <div><dt>📅 Compte créé le</dt><dd>${esc(date)}</dd></div>
        <div><dt>🛒 Mon panier</dt><dd>${panier.length} élément${panier.length > 1 ? "s" : ""}</dd></div>
        <div><dt>💾 Enregistrement</dt><dd>${enLigne ? "En ligne, sur ton compte" : "Sur cet appareil uniquement"}</dd></div>
      </dl>
      <button type="button" class="btn-primary" data-go="panier">Voir mon panier</button>
      <p class="form-err" id="compteErr" role="alert"></p>
      ${confirmSuppr ? `<div class="compte-confirm"><strong>Cette action est définitive.</strong> Ton compte et ton panier seront effacés.<div><button type="button" class="btn-primary" style="margin:0;width:auto;padding:12px 22px;font-size:15px;" data-action="suppr-compte-ok">Oui, supprimer</button><button type="button" class="btn-ghost" data-action="suppr-compte-non">Annuler</button></div></div>`
        : `<div class="profil-actions"><button type="button" class="btn-ghost" data-action="deconnexion">Se déconnecter</button><button type="button" class="lien-danger" data-action="suppr-compte">Supprimer mon compte</button></div>`}`};
    }
  };
  const v = (vues[vueCompte] || vues.inscription)();
  $("compteKicker").textContent = v.kicker; $("compteTitre").textContent = v.titre; $("compteCorps").innerHTML = v.html;
}
async function traiterFormulaire(f){
  const err = $("compteErr");
  const dire = (m, ok) => { if (err) { err.textContent = m; err.classList.toggle("ok", !!ok); } };
  if (f.id === "formInscription") {
    const d = {prenom:$("iPrenom").value.trim(), email:$("iEmail").value.trim().toLowerCase(), etab:$("iEtab").value, mdp:$("iMdp").value};
    if (!d.prenom) throw ko("Indique ton prénom ou un pseudo.");
    if (!EMAIL_RE.test(d.email)) throw ko("Cette adresse e-mail n'est pas valide.");
    if (EXIGER_EMAIL_ETUDIANT && !estEmailEtudiant(d.email)) throw ko("Utilise ton adresse e-mail étudiante (" + DOMAINES_ETUDIANTS.join(", ") + ").");
    const pb = verifierMdp(d.mdp); if (pb) throw ko(pb);
    if (d.mdp !== $("iMdp2").value) throw ko("Les deux mots de passe ne sont pas identiques.");
    if (!$("iCgu").checked) throw ko("Coche la case pour accepter l'enregistrement de tes données.");
    if (enLigne) { if (await inscrireSb(d) === "confirmer") { vueCompte = "confirmer"; rendreCompte(); return; } }
    else await inscrireLocal(d);
    apresConnexion(); rendreCompte(); toast("Bienvenue " + user.prenom + " ! 🎓");
  } else if (f.id === "formConnexion") {
    const email = $("cEmail").value.trim().toLowerCase(), mdp = $("cMdp").value;
    if (!EMAIL_RE.test(email) || !mdp) throw ko("Renseigne ton e-mail et ton mot de passe.");
    if (enLigne) await connecterSb(email, mdp); else await connecterLocal(email, mdp);
    apresConnexion(); rendreCompte(); toast("Content de te revoir, " + user.prenom + " !");
  } else if (f.id === "formOubli") {
    const email = $("oEmail").value.trim().toLowerCase();
    if (!EMAIL_RE.test(email)) throw ko("Cette adresse e-mail n'est pas valide.");
    try { await sb("/auth/v1/recover", {method:"POST", body:{email}}); } catch(e){ if (!(e instanceof ErrUtilisateur)) throw e; }
    dire("Si un compte existe avec cet e-mail, un lien vient d'être envoyé.", true);
  } else if (f.id === "formNouveauMdp") {
    const m = $("nMdp").value, pb = verifierMdp(m);
    if (pb) throw ko(pb);
    if (m !== $("nMdp2").value) throw ko("Les deux mots de passe ne sont pas identiques.");
    const tok = await jetonValide(); if (!tok) throw ko("Ce lien a expiré. Demande un nouvel e-mail.");
    await sb("/auth/v1/user", {method:"PUT", token:tok, body:{password:m}});
    vueCompte = "profil"; rendreCompte(); toast("Mot de passe mis à jour ✓");
  }
}
document.addEventListener("submit", async e => {
  const f = e.target;
  if (!f.closest || !f.closest("#compteCorps")) return;
  e.preventDefault();
  const btn = f.querySelector("button[type=submit]"); if (btn) btn.disabled = true;
  try { await traiterFormulaire(f); }
  catch(ex) {
    const err = $("compteErr");
    if (err) { err.classList.remove("ok"); err.textContent = ex instanceof ErrUtilisateur ? ex.message : "Connexion impossible. Vérifie ta connexion internet et réessaie."; }
  }
  if (btn) btn.disabled = false;
});
$("compte").addEventListener("click", e => { if (e.target === $("compte")) fermerCompte(); });

/* Un seul écouteur pour tous les clics (aucun onclick inline) */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-go],[data-action],[data-panier],[data-fav],[data-del],[data-detail],[data-filter],[data-budget],[data-moment],[data-envie],[data-rub]");
  if (!t) return;
  const d = t.dataset;
  if (d.panier) return basculerPanier(d.panier);
  if (d.fav) return toggleFav(d.fav);
  if (d.del) return supprimer(d.del);
  if (d.detail) return ouvrirFiche(d.detail);
  if (d.filter) {
    filtre[d.filter] = d.v;
    return ({bp:renderBonsPlans, courses:renderCourses, act:renderActivites, bourse:renderBourse, g0:renderGratuit, pxc:renderCourses, pxa:renderActivites})[d.filter]();
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
    case "tri-courses": filtre.tric = !filtre.tric; return renderCourses();
    case "tri-act": filtre.tria = !filtre.tria; return renderActivites();
    case "partager": {
      toggleMenu(false);
      const url = location.href.split("#")[0];
      if (navigator.share) { navigator.share({title:"StudiAmiens", text:"Les bons plans étudiants à Amiens : manger, sortir, se cultiver et faire ses courses à petit prix.", url}).catch(() => {}); return; }
      if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(url).then(() => toast("Lien copié ✓"), () => toast("Copie impossible sur ce navigateur")); return; }
      return toast("Copie impossible sur ce navigateur");
    }
    case "compte-open": toggleMenu(false); return ouvrirCompte();
    case "compte-close": return fermerCompte();
    case "compte-vue": vueCompte = d.vue; confirmSuppr = false; return rendreCompte();
    case "mdp-voir": {
      const champ = $(d.cible); const montre = champ.type === "password";
      champ.type = montre ? "text" : "password"; t.textContent = montre ? "Masquer" : "Afficher"; return;
    }
    case "deconnexion": return deconnecter();
    case "suppr-compte": confirmSuppr = true; return rendreCompte();
    case "suppr-compte-non": confirmSuppr = false; return rendreCompte();
    case "suppr-compte-ok": return supprimerCompte().catch(ex => { const er = $("compteErr"); if (er) er.textContent = ex instanceof ErrUtilisateur ? ex.message : "Suppression impossible pour le moment. Réessaie."; });
    case "panier-copier": return copierPanier();
    case "panier-vider": panier = []; sauverPanier(); renderAll(); renderIdees(); return toast("Panier vidé");
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
restaurerSession();
chargerPanier();
majBoutonCompte();
renderAll();
renderAujourdhui();
go("aujourdhui");
chargerRemote();
if (enLigne && user) { tirerPanier(); }
traiterRetourEmail();
