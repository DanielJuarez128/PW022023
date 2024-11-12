const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/pokemon';

export const getPokemonList = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createPokemon = async (name) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
    });
    return response.json();
};

export const updatePokemon = async (oldName, newName) => {
    const response = await fetch(`${API_URL}/${oldName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newName }),
    });
    return response.json();
};

export const deletePokemon = async (name) => {
    const response = await fetch(`${API_URL}/${name}`, {
        method: 'DELETE',
    });
    return response.json();
};
