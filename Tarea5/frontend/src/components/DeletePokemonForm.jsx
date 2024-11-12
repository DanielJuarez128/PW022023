import React, { useState } from 'react';
import { deletePokemon } from './PokemonAPI';

function DeletePokemonForm() {
    const [deleteName, setDeleteName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await deletePokemon(deleteName);
            alert(`¡Pokémon ${deleteName} eliminado exitosamente!`);
            setDeleteName(''); // Limpiar el input
        } catch (error) {
            console.error('Error al eliminar el Pokémon:', error);
            alert('Error al eliminar el Pokémon.');
        }
    };

    return (
        <div>
            <h2>Eliminar un Pokémon</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre del Pokémon"
                    value={deleteName}
                    onChange={(e) => setDeleteName(e.target.value)}
                    required
                />
                <button type="submit">Delete</button>
            </form>
        </div>
    );
}

export default DeletePokemonForm;
