const express = require('express');
const axios = require('axios');
const Pokemon = require('../models/pokemon.model');
const router = express.Router();

// Obtener lista de Pokémon
router.get('/', async (req, res) => {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
});

// Endpoint para crear un nuevo Pokémon
router.post('/', async (req, res) => {
    const { name } = req.body;
    
    try {
        // Consultar la PokeAPI para obtener los datos del Pokémon
        const pokeApiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokemonData = pokeApiResponse.data;

        // Crear el objeto Pokémon con los datos obtenidos
        const pokemon = new Pokemon({
            name: pokemonData.name,
            image: pokemonData.sprites.front_default
        });

        // Guardar en la base de datos
        await pokemon.save();

        res.json(pokemon);
    } catch (error) {
        console.error('Error al obtener datos de la PokeAPI o guardar en la base de datos:', error.message);
        res.status(400).send('Error al crear el Pokémon. Asegúrate de que el nombre sea válido.');
    }
});

// Actualizar un Pokémon
router.put('/:oldName', async (req, res) => {
    const { oldName } = req.params;
    const { newName } = req.body;

    try {
        // Verificar que el nuevo nombre exista en la PokeAPI
        const pokeApiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${newName.toLowerCase()}`);
        const pokemonData = pokeApiResponse.data;

        // Encontrar el Pokémon actual en la base de datos
        const existingPokemon = await Pokemon.findOne({ name: oldName });
        if (!existingPokemon) {
            return res.status(404).send('Pokémon no encontrado en la base de datos.');
        }

        // Actualizar los datos del Pokémon en la base de datos con los datos de la PokeAPI
        existingPokemon.name = pokemonData.name;
        existingPokemon.image = pokemonData.sprites.front_default; // Actualiza la imagen

        await existingPokemon.save();

        res.json(existingPokemon);
    } catch (error) {
        console.error('Error al actualizar el Pokémon:', error.message);
        res.status(400).send('Error al actualizar el Pokémon. Verifica que el nombre del Pokémon exista en la PokeAPI.');
    }
});

// Eliminar un Pokémon
router.delete('/:name', async (req, res) => {
    try {
        await Pokemon.findOneAndDelete({ name: req.params.name });
        res.send('Pokémon eliminado');
    } catch (error) {
        res.status(400).send('Error al eliminar el Pokémon');
    }
});

module.exports = router;
