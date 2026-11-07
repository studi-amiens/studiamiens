# StudiAmiens — site prêt pour GitHub Pages

## Contenu du dossier
- `index.html` : la page du site (à la racine, obligatoire)
- `style.css` : tout le design (couleurs, mise en page)
- `script.js` : toutes les fonctionnalités (budget du jour, favoris, fiches, bourse…)
- `copanier.html` : l'application « Faire mes courses » (ÉcoPanier)
- `logo.png` : le logo de l'en-tête
- `favicon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `manifest.webmanifest` : icône de l'onglet et installation sur l'écran d'accueil du téléphone
- `confidentialite.html` : page « Mentions légales et confidentialité » (MODÈLE : les passages surlignés en jaune sont à compléter)
- `404.html` : page affichée si l'adresse n'existe pas
- `.nojekyll` : dit à GitHub de publier les fichiers tels quels
- `optionnel/supabase.sql` : seulement pour de VRAIS comptes en ligne et une bourse partagée (voir plus bas)

## Publier sur GitHub Pages (gratuit)
1. Créez un compte sur github.com.
2. Cliquez sur « New repository ». Nom : `studiamiens`. Choisissez « Public » (obligatoire en gratuit). Créez-le.
3. Dans le dépôt : « Add file » > « Upload files ». Faites glisser TOUS les fichiers de ce dossier
   (pas le zip : les fichiers, dont `.nojekyll` et le dossier `optionnel`). Cliquez « Commit changes ».
4. « Settings » > « Pages ». Dans « Build and deployment » : Source = « Deploy from a branch »,
   Branch = `main`, dossier = `/ (root)`. Cliquez « Save ».
5. Attendez 1 à 2 minutes. Votre site sera sur : https://VOTRE-PSEUDO.github.io/studiamiens/
   (astuce : nommez le dépôt `VOTRE-PSEUDO.github.io` pour obtenir https://VOTRE-PSEUDO.github.io/ sans nom de dossier).

## Mettre à jour le site plus tard
Remplacez simplement le fichier modifié dans le dépôt (« Add file » > « Upload files », même nom) puis « Commit changes ».

## Ne pas perdre votre site actuel
GitHub Pages est un hébergement séparé : votre site Netlify reste en ligne tant que vous ne le supprimez pas.
Ne supprimez rien chez Netlify avant d'avoir vérifié que la nouvelle adresse fonctionne.
Gardez aussi une copie de ce dossier sur votre ordinateur.

## Compte étudiant et panier
Le bouton « Créer ton compte étudiant » (en haut à droite) et « Mon panier » fonctionnent tout de suite, en deux modes :

**Mode démo (par défaut, rien à configurer)**
- Le compte (prénom, e-mail, mot de passe) est enregistré dans le navigateur de l'étudiant, sur cet appareil uniquement.
  Le mot de passe est haché (PBKDF2), jamais stocké en clair. Aucune donnée n'est envoyée sur internet.
- Limites : pas de connexion depuis un autre appareil, pas d'e-mail de confirmation, pas de « mot de passe oublié ».

**Mode en ligne (vrais comptes, gratuit avec Supabase)**
1. Créez un projet sur supabase.com (offre gratuite).
2. « SQL Editor » : collez et exécutez `optionnel/supabase.sql`.
3. « Authentication » > « URL Configuration » : mettez dans « Site URL » l'adresse de votre site
   (ex. https://studiamiens.github.io/studiamiens/) et ajoutez-la aussi dans « Redirect URLs ».
   Gardez « Confirm email » activé : l'étudiant reçoit un lien de confirmation.
4. « Project Settings » > « API » : copiez « Project URL » et la clé « anon public ».
5. Ouvrez `script.js`, tout en haut : `const BACKEND = { url: "https://xxxx.supabase.co", key: "votre-clé-anon" };`
   N'utilisez JAMAIS la clé « service_role » dans ce fichier : il est public.
6. Remplacez le fichier dans GitHub (« Add file » > « Upload files »).
Le service d'e-mails gratuit de Supabase est limité en nombre d'envois par heure : pour beaucoup d'inscriptions, configurez un SMTP.

**Avant de collecter de vraies adresses e-mail (mode en ligne)**
Vous devenez responsable de données personnelles : ajoutez une page de mentions légales et de politique de confidentialité
(qui est responsable, quelles données, combien de temps, comment les supprimer). L'étudiant peut déjà supprimer son compte depuis « Mon compte ».

**Réglages dans `script.js`**
- `DOMAINES_ETUDIANTS` : domaines e-mail étudiants reconnus (badge « E-mail étudiant ✓ »). À vérifier avec l'université.
- `EXIGER_EMAIL_ETUDIANT = true` : refuse les inscriptions avec un autre e-mail.

## Compléter les menus et prix
Dans `script.js`, chaque restaurant, cafétéria ou bar de la liste `courses` (ou `activites` pour les bars) accepte une ligne
`menus:[["Nom du menu","Prix"], ["Autre formule","Prix"]]`. Exemple :
`{t:"Mon resto", c:"Burgers", q:"Adresse", d:"Description.", m:"≈ 10 €", menus:[["Menu étudiant : burger + frites + boisson","9,90 €"]], ok:true},`
Les lieux sans `menus` affichent « Carte détaillée à compléter ».

## Avant d'annoncer le site
- Ouvrez `confidentialite.html` et remplissez tous les passages surlignés en jaune (éditeur, contact, durées…), puis supprimez l'encadré « Modèle à compléter ».
- Pour l'installer comme une appli : sur Android, menu du navigateur > « Installer l'application » ; sur iPhone, bouton Partager > « Sur l'écran d'accueil ».

## À savoir
- L'onglet « Courses » charge Tailwind et ses icônes depuis internet : il faut une connexion.
- Favoris et annonces de la bourse sont enregistrés dans le navigateur de chaque visiteur.
  Pour les partager entre tous les étudiants, utilisez le mode en ligne décrit plus haut (même base Supabase).
- Les prix, horaires et durées sont indicatifs et à vérifier régulièrement.
