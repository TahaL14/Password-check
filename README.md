# PassCheck - Vérificateur de Mots de Passe

Un outil web interactif pour vérifier la robustesse de vos mots de passe avec une interface multilingue (Français/Anglais).

## Fonctionnalités

- **Évaluation de robustesse** : Score sur 10 basé sur plusieurs critères
- **Estimation du temps de crack** : Calcul du temps nécessaire pour craquer le mot de passe
- **Suggestions d'amélioration** : Conseils pour renforcer votre mot de passe
- **Interface multilingue** : Support français et anglais
- **Design responsive** : Compatible mobile et desktop
- **Affichage/masquage du mot de passe** : Bouton pour voir le mot de passe saisi

## Utilisation

1. Ouvrez le fichier `index.html` dans votre navigateur
2. Entrez votre mot de passe dans le champ de saisie
3. Cliquez sur "Évaluer" pour obtenir l'analyse
4. Consultez le score, le temps de crack estimé et les suggestions

## Critères d'évaluation

Le score est calculé selon ces critères :
- **Longueur** : Minimum 8 caractères, optimal 12+
- **Variété des caractères** :
  - Lettres majuscules (A-Z)
  - Lettres minuscules (a-z)
  - Chiffres (0-9)
  - Caractères spéciaux (!@#$%^&*)
- **Complexité** : Éviter les répétitions de caractères

## Conseils de sécurité

- Utilisez au moins 12 caractères
- Mélangez lettres majuscules et minuscules
- Incluez des chiffres et des caractères spéciaux
- Évitez les informations personnelles évidentes
- Utilisez un mot de passe unique pour chaque service

## Langues supportées

- 🇫🇷 Français
- 🇬🇧 English

## Structure du projet

```
Password-check/
├── index.html          # Page principale
├── script.js           # Logique JavaScript
├── styles.css          # Styles CSS
├── .gitignore          # Fichiers à ignorer par Git
└── README.md           # Documentation
```

## Technologies utilisées

- **HTML5** : Structure de la page
- **CSS3** : Styles et design responsive
- **JavaScript** : Logique d'évaluation et interface

## Fonctionnalités techniques

- Calcul de score basé sur l'entropie
- Estimation du temps de crack avec force brute
- Génération de suggestions personnalisées
- Interface responsive avec CSS Grid/Flexbox
- Système de traduction JavaScript

