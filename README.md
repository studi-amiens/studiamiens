# StudiAmiens — site prêt pour GitHub Pages

## Contenu du dossier
- `index.html` : la page du site (à la racine, obligatoire)
- `style.css` : tout le design (couleurs, mise en page)
- `script.js` : toutes les fonctionnalités (budget du jour, favoris, fiches, bourse…)
- `copanier.html` : l'application « Faire mes courses » (ÉcoPanier)
- `favicon.svg` : l'icône de l'onglet
- `404.html` : page affichée si l'adresse n'existe pas
- `.nojekyll` : dit à GitHub de publier les fichiers tels quels
- `optionnel/supabase.sql` : seulement si vous branchez une bourse partagée (voir plus bas)

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

## À savoir
- L'onglet « Courses » charge Tailwind et ses icônes depuis internet : il faut une connexion.
- Favoris et annonces de la bourse sont enregistrés dans le navigateur de chaque visiteur.
  Pour partager la bourse entre tous les étudiants, il faut une base de données (Supabase, gratuit) :
  exécutez `optionnel/supabase.sql` puis renseignez `BACKEND = { url, key }` tout en haut de `script.js`.
- Les prix, horaires et durées sont indicatifs et à vérifier régulièrement.
