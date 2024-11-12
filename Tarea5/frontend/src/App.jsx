import React from 'react';
import CreatePokemonForm from './components/CreatePokemonForm';
import UpdatePokemonForm from './components/UpdatePokemonForm';
import DeletePokemonForm from './components/DeletePokemonForm';
import PokemonList from './components/PokemonList';

function App() {
    return (
        <div>
            <h1>CRUD de Pokémon</h1>
            <CreatePokemonForm />
            <PokemonList />
            <UpdatePokemonForm />
            <DeletePokemonForm />
        </div>
    );
}

export default App;
