export interface ApplyInitialState {
    toasts: string[];
    userInfo: undefined | { email: string };
}

export interface PokemonTypeInitialState {
    allPokemon: undefined | genericPokemonType[];
    randomPokemons: undefined | generatedPokemonType[];
    compareQueue: generatedPokemonType[];
}


export interface genericPokemonType {
    name: string;
    url: string;
}

export interface generatedPokemonType {
    name: string;
    id: number;
    image: string;
    types: pokemonTypeInterFace[];
}

export interface pokemonTypeInterFace {
    [key: string]: {
        image: string;
        resistance: string[];
        strength: string[];
        weakness: string[];
        vulnerable: string[];
    }
}

export interface userPokemonsType extends generatedPokemonType {
    firebaseId?: string;
}

export type pokemonStatType =
    | "vulnerable"
    | "weakness"
    | "strength"
    | "resistance";