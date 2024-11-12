import React, { useState } from 'react';
import { updatePokemon } from './PokemonAPI';

function UpdatePokemonForm() {
    const [oldName, setOldName] = useState('');
    const [newName, setNewName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const updatedPokemon = await updatePokemon(oldName, newName);
            alert(`¡Pokémon actualizado a ${updatedPokemon.name} exitosamente!`);
            setOldName(''); // Limpiar el input
            setNewName(''); // Limpiar el input
        } catch (error) {
            console.error('Error al actualizar el Pokémon:', error);
            alert('Error al actualizar el Pokémon.');
        }
    };

    return (
        <div>
            <h2>Actualizar Pokémon</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre actual"
                    value={oldName}
                    onChange={(e) => setOldName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nuevo nombre"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdatePokemonForm;
