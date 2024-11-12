import React, { useEffect, useState } from 'react';
import { getPokemonList } from './PokemonAPI';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        async function fetchPokemon() {
            const data = await getPokemonList();
            setPokemonList(data);
        }
        fetchPokemon();
    }, []);

    return (
        <div>
            <h2>Lista de Pokémon</h2>
            <ul>
                {pokemonList.map((pokemon) => (
                    <li key={pokemon.name}>
                        {pokemon.name} <img src={pokemon.image} alt={pokemon.name} width="50" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonList;
