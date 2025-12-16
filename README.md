# Application de microblogging (type Twitter)

## Description du projet

Ce projet est une application web de microblogging inspirée des plateformes sociales de type Twitter. Elle permet aux utilisateurs de consulter et de publier des messages courts, favorisant des interactions rapides et dynamiques. L’objectif principal du projet est de démontrer la mise en place d’une architecture frontend complète et structurée, intégrant la gestion des rôles et des permissions, la navigation entre les différentes pages, ainsi qu’une expérience utilisateur fluide et cohérente.

L’application met l’accent sur les bonnes pratiques de développement frontend, notamment la séparation des responsabilités, la réutilisabilité des composants et la gestion de l’état, tout en offrant une interface moderne, responsive et accessible.

## Fonctionnalités principales

### Page d’accueil accessible à tous
- Affichage des publications publiques
- Accessible même sans compte utilisateur

### Gestion des utilisateurs et des rôles
- Les utilisateurs non connectés ont un accès limité à la page d’accueil
- Les utilisateurs avec le rôle admin ont accès à une page dédiée **Utilisateurs**. Depuis cette page, l’administrateur peut :
  - Consulter la liste des utilisateurs
  - Modifier leurs informations
  - Bannir des comptes

### Interaction
- Un utilisateur connecté peut :
  - Ajouter des publications
  - Interagir avec celles des autres utilisateurs (aimer, commenter)
  - S’abonner à des utilisateurs
  - Modifier ses informations

### Thème clair / sombre automatique
- Le thème de l’application (light ou dark) s’adapte automatiquement à la préférence définie dans le navigateur de l’utilisateur

### Internationalisation (i18n)
- L’application prend en charge l’internationalisation et est disponible en français et en anglais

### Simulation de backend
- Le backend n’étant pas développé, il est simulé dans le frontend :
  - Des délais de chargement sont présents pour imiter la récupération des données
  - Un utilisateur temporaire est défini dans le code pour simuler un administrateur

## Technologies utilisées
- Vue.js 3
- TypeScript
- Tailwind
- Pinia
- Toastify

## Installation et lancement du projet

Pour installer les dépendances et lancer l’application, exécutez les commandes suivantes dans votre terminal :

```bash
git clone https://github.com/WilliamGFerguson/App-Microblogging-frontend-
cd App-Microblogging-frontend-
npm install
npm run app