# Projet Birthday

## Description

Ce projet est une application web pour gérer les cadeaux, conçue avec un backend en Node.js et un frontend en React avec Vite. Il utilise également un service worker pour les notifications push et la gestion des états en ligne/hors ligne.

## Prérequis

- Node.js et npm doivent être installés sur votre machine.
- Une instance de MySQL ou MariaDB pour la base de données.
- Accès à phpMyAdmin pour importer la base de données.

## Configuration Backend

1. Clonez le dépôt du projet.
   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo
   npm install
2. Créez un fichier .env à la racine du projet backend
3. Démarrez le serveur backend.
   ```bash
   nodemon run dev  # Pour le développement
   #ou 
   npm start

## Configuration front_end

1. Allez dans le répertoire front_end.
    ```bash
    cd front_end
    npm install
    npm run dev

2. Accédez à l'application via l'URL http://localhost:5173/gifts.

## Guide PWA
1. Ouvrez l'application dans votre navigateur.
2. Vous devriez voir un message ou un bouton pour installer l'application en tant que Progressive Web App (PWA). Suivez les instructions du navigateur pour l'installer.

## Test des notifications 

1. Accédez à la route /Gifts/create pour tester les notifications push.
2. Assurez-vous que les notifications sont activées pour votre site dans les paramètres du navigateur.
