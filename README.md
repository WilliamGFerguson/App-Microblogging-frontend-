Application de microblogging (type Twitter)

Description du projet

Ce projet est une application web de microblogging inspirée des plateformes sociales de type Twitter. Elle permet aux utilisateurs de consulter et de publier des messages courts, favorisant des interactions rapides et dynamiques. L’objectif principal du projet est de démontrer la mise en place d’une architecture frontend complète et structurée, intégrant la gestion des rôles et des permissions, la navigation entre les différentes pages, ainsi qu’une expérience utilisateur fluide et cohérente.

L’application met l’accent sur les bonnes pratiques de développement frontend, notamment la séparation des responsabilités, la réutilisabilité des composants et la gestion de l’état, tout en offrant une interface moderne, responsive et accessible.

Fonctionnalités principales

Page d’accueil accessible à tous
   -	Affichage des publications publiques
   -	Accessible même sans compte utilisateur
Gestion des utilisateurs et des rôles
   -	Les utilisateurs non connectés ont un accès limité à la page d’accueil
   -	Les utilisateurs avec le rôle admin ont accès à une page dédiée Utilisateurs. Depuis cette page, l’administrateur peut :
      o	Consulter la liste des utilisateurs
      o	Modifier leurs informations
      o	Bannir des comptes
Interaction
   -	Un utilisateur connecté peut ajouter des publications, interagir avec ceux de d’autres utilisateurs (aimer, commenter), s’abonner à des utilisateurs, ainsi que modifier leurs informations.
Thème clair / sombre automatique
   -	Le thème de l’application (light ou dark) s’adapte automatiquement à la préférence définie dans le navigateur de l’utilisateur
i18n
   -	L’application prend en charge l’internationalisation et est disponible en français et en anglais.
Simulation de backend
   -	Puisque je n’ai pas fait le backend de l’application, j’ai décidé de ne pas l’inclure, et de simuler du mieux possible le backend dans le frontend. Des délais de chargement sont donc présents lorsque l’application tente de récupérer des données du serveur. Un utilisateur temporaire est directement défini dans le code afin de simuler le comportement de l’application, en tant qu’administrateur.

Technologies utilisées
   -	Vue.js 3
   -  TypeScript
   -	Tailwind
   -	Pinia
   -	Toastify

Installation et lancement du projet
1.	Cloner le dépôt Git
git clone <url-du-repo>
2.	Installer les dépendances
npm install
3.	Lancer l’application
npm run app

L’application sera alors accessible localement dans le navigateur.
