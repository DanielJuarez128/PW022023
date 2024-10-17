const express = require('express');
const axios = require('axios');
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('views'));

let pokemons = []; 

app.get('/api/pokemons', (req, res) => {
    res.json(pokemons); 
});

app.get('/api/pokemon/', async (req, res) => {
    const { name } = req.query; 
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        res.json(response.data);
    } catch (error) {
        console.error(error); 
        res.status(404).send('Pokémon not found'); 
    }
});

app.post('/api/pokemon', async (req, res) => {
    const { name } = req.body;
    const existingPokemon = pokemons.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existingPokemon) {
        return res.status(400).send('Pokémon already exists');
    }
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const newPokemon = {
            name: response.data.name,
            image: response.data.sprites.front_default,
        };
        pokemons.push(newPokemon);
        res.status(201).json(newPokemon);
    } catch (error) {
        console.error(error);
        res.status(404).send('Pokémon not found');
    }
});

app.put('/api/pokemon/', async (req, res) => {
    const { name } = req.query;
    const { newName } = req.body;
    const index = pokemons.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
    if (index === -1) {
        return res.status(404).send('Pokémon not found');
    }
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${newName.toLowerCase()}`);
        const updatedPokemon = {
            name: response.data.name,
            image: response.data.sprites.front_default,
        };
        pokemons[index] = updatedPokemon;
        res.json(updatedPokemon); 
    } catch (error) {
        console.error(error); 
        res.status(404).send('New Pokémon not found'); 
    }
});

app.delete('/api/pokemon/', (req, res) => {
    const { name } = req.query; 
    const index = pokemons.findIndex(p => p.name.toLowerCase() === name.toLowerCase());
    if (index === -1) {
        return res.status(404).send('Pokémon not found');
    }
    pokemons.splice(index, 1); 
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});