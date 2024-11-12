import React, { useState } from 'react';
import { createPokemon } from './PokemonAPI';

function CreatePokemonForm() {
    const [pokemonName, setPokemonName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newPokemon = await createPokemon(pokemonName);
            alert(`¡Pokémon ${newPokemon.name} creado exitosamente!`);
            setPokemonName(''); // Limpiar el input
        } catch (error) {
            console.error('Error al crear el Pokémon:', error);
            alert('Error al crear el Pokémon.');
        }
    };

    return (
        <div>
            <h2>Crear un nuevo Pokémon</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del Pokémon"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreatePokemonForm;
