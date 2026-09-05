# MFC — Site vitrine (Milkshakes, Café & Glaces)

Site one-page en HTML / CSS / JS pur (aucun framework, aucune installation nécessaire) présentant le menu de **MFC** : milkshakes, cafés et glaces, avec une vidéo en fond sur la page d'accueil.

## Structure du projet

```
mfc-site/
├── index.html              → la page (structure)
├── css/
│   └── style.css           → tous les styles (thème rouge & blanc)
├── js/
│   └── script.js           → le menu (produits/prix) + interactions
└── assets/
    ├── video/
    │   ├── hero-bg.mp4      → vidéo de fond (format large compatibilité)
    │   └── hero-bg.webm     → vidéo de fond (format plus léger)
    └── img/
        └── hero-poster.jpg  → image affichée pendant le chargement de la vidéo
```

## Modifier le menu (produits / prix)

Tout se passe dans **`js/script.js`**, tout en haut du fichier, dans le tableau `menuData`.

Chaque produit est une ligne comme celle-ci :

```js
{ category: "milkshakes", name: "Milkshake Fraise", price: "35 MAD", desc: "Fraises fraîches, lait entier, glace vanille" },
```

Pour modifier un produit : change `name`, `price` ou `desc`.
Pour ajouter un produit : copie une ligne et colle-la juste en dessous, dans la bonne catégorie.
Pour supprimer un produit : supprime la ligne entière.

La `category` doit rester exactement l'une de : `"milkshakes"`, `"cafes"`, `"glaces"`.

## Modifier les infos de contact (adresse, téléphone, horaires)

Dans **`index.html`**, cherche la section `<footer class="site-footer" id="contact">` vers la fin du fichier : les lignes marquées `<!-- TODO Aya -->` sont à remplacer par les vraies infos.

## Changer la vidéo de fond

Remplace les fichiers dans `assets/video/` (`hero-bg.mp4` et `hero-bg.webm`) en gardant exactement les mêmes noms de fichier — tu n'as alors rien d'autre à changer.

## Lancer le site en local (aperçu avant de publier)

Aucune installation requise. Ouvre simplement `index.html` dans ton navigateur (double-clic, ou clic droit → Ouvrir avec → Chrome).

## Déploiement

Ce projet est un site 100% statique : il fonctionne tel quel sur Vercel, Netlify, GitHub Pages, etc. Voir les instructions fournies séparément pour créer le repo GitHub et déployer sur Vercel.
