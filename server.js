const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// Connexion à la base de données SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'storage/database.sqlite',
});

// Définition du modèle Pokemon
const Pokemon = sequelize.define('Pokemon', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type_pokemon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    evolution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Fonction pour valider le type de données
function validateDataType(value, expectedType, fieldName) {
    if (typeof value !== expectedType) {
        throw new Error(`Le champ ${fieldName} doit être de type ${expectedType}`);
    }
}

// Synchronisation du modèle avec la base de données
sequelize.sync();

// Route pour récupérer tous les Pokemons
app.get('/pokemons', async (req, res) => {
    const pokemons = await Pokemon.findAll();
    res.json(pokemons);
});

// Route pour récupérer un Pokemon
app.get('/pokemons/:id', async (req, res) => {
    const pokemonId = req.params.id;
    const pokemon = await Pokemon.findByPk(pokemonId);

    if (!pokemon) {
        return res.status(404).json({ message: 'Pokemon non trouvé' });
    }

    res.json(pokemon);
});

// Route pour créer un nouveau Pokemon
app.post('/pokemons', async (req, res) => {
    const { name, type_pokemon, level, evolution } = req.body;
    try {
        // Validation des types de données
        validateDataType(name, 'string', 'name');
        validateDataType(type_pokemon, 'string', 'type_pokemon');
        validateDataType(level, 'number', 'level');
        validateDataType(evolution, 'string', 'evolution');

        const newPokemon = await Pokemon.create({
            name,
            type_pokemon,
            level,
            evolution,
        });

        res.json(newPokemon);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

// Route pour mettre à jour un Pokemon
app.put('/pokemons/:id', async (req, res) => {
    const pokemonId = req.params.id;
    const updatePokemon = req.body;

    // Vérification si le Pokemon existe
    const existingPokemon = await Pokemon.findByPk(pokemonId);
    if (!existingPokemon) {
        return res.status(404).json({ message: 'Pokemon non trouvé' });
    }

    try {
        // Validation des types de données dans la mise à jour
        if (updatePokemon.name) {
            validateDataType(updatePokemon.name, 'string', 'name');
        }
        if (updatePokemon.type_pokemon) {
            validateDataType(updatePokemon.type_pokemon, 'string', 'type_pokemon');
        }
        if (updatePokemon.level) {
            validateDataType(updatePokemon.level, 'number', 'level');
        }
        if (updatePokemon.evolution) {
            validateDataType(updatePokemon.evolution, 'string', 'evolution');
        }

        // Mise à jour du Pokemon
        await Pokemon.update(updatePokemon, {
            where: { id: pokemonId },
        });

        const updatedPokemon = await Pokemon.findByPk(pokemonId);
        res.json(updatedPokemon);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});


// Route pour supprimer un Pokemon
app.delete('/pokemons/:id', async (req, res) => {
    const pokemonId = req.params.id;

    // Vérification si le Pokemon existe
    const existingPokemon = await Pokemon.findByPk(pokemonId);
    if (!existingPokemon) {
        return res.status(404).json({ message: 'Pokemon non trouvé' });
    }

    // Suppression du Pokemon
    await Pokemon.destroy({
        where: { id: pokemonId },
    });

    res.json({ message: `Suppression du Pokemon avec l'ID ${pokemonId}` });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});