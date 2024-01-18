# Projet Node.js - Gestion des Pokemons

Ce projet est une application Node.js qui utilise Express.js comme framework web et Sequelize comme ORM pour interagir avec une base de données SQLite. L'objectif principal de l'application est de gérer les informations sur les Pokemons, telles que leur nom, type, niveau et évolution.

## Configuration de la base de données

Le projet utilise Sequelize pour établir une connexion à une base de données SQLite. Le fichier de base de données est stocké dans le répertoire `storage/database.sqlite`. Vous pouvez configurer la connexion à la base de données en modifiant les paramètres du modèle Sequelize dans le fichier principal.

```javascript
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'storage/database.sqlite',
});
```

## Modèle de données Pokemon

Le modèle de données Pokemon est défini à l'aide de Sequelize dans le fichier principal. Il comprend les champs suivants :

- `name` : Le nom du Pokemon (chaîne de caractères, non nul).
- `type_pokemon` : Le type du Pokemon (chaîne de caractères, non nul).
- `level` : Le niveau du Pokemon (entier, non nul, minimum 1).
- `evolution` : Le stade d'évolution du Pokemon (chaîne de caractères, non nul).

```javascript
const Pokemon = sequelize.define('Pokemon', {
    // ...
});
```

## Routes API

L'application expose plusieurs routes API pour effectuer des opérations CRUD (Create, Read, Update, Delete) sur les Pokemons. Les routes comprennent :

- `GET /pokemons` : Récupérer tous les Pokemons.
- `GET /pokemons/:id` : Récupérer un Pokemon spécifique par son ID.
- `POST /pokemons` : Créer un nouveau Pokemon.
- `PUT /pokemons/:id` : Mettre à jour un Pokemon existant.
- `DELETE /pokemons/:id` : Supprimer un Pokemon par son ID.

Chaque route effectue des opérations sur la base de données en utilisant le modèle Sequelize correspondant.

## Validation des données

Les données entrées par l'utilisateur sont validées pour assurer qu'elles correspondent aux types de données attendus. Les erreurs de validation renvoient des réponses appropriées avec des messages d'erreur.

## Démarrage du serveur

Le serveur écoute sur le port 3000. Vous pouvez le démarrer en exécutant le fichier principal.

N'oubliez pas d'installer les dépendances nécessaires en exécutant `npm install` avant de démarrer le serveur.