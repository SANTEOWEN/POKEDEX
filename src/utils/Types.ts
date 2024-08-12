export interface ApplyInitialState {
    toasts: string[];
    userInfo: undefined | { email: string };
    currentPokemonTab: string;

}

export interface currentPokemonType {
    id: number,
    name: string,
    types: pokemonTypeInterFace[];
    image: string;
    stats: pokemonStatsType[];
    encounters: string[];
    evolution: { level: number, pokemon: { name: string, url: string } }[];
    pokemonAbilities: { abilities: string[], moves: string[] };
    evelutionLevel: number;
}


export interface PokemonTypeInitialState {
    allPokemon: undefined | genericPokemonType[];
    randomPokemons: undefined | generatedPokemonType[];
    compareQueue: generatedPokemonType[];
    userPokemons: userPokemonsType[];
    currentPokemon: currentPokemonType | undefined;
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

export interface pokemonStatsType {
    name: string,
    value: string,
}