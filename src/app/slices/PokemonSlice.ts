import { createSlice } from "@reduxjs/toolkit";
import { ApplyInitialState, generatedPokemonType, PokemonTypeInitialState } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";

const initialState: PokemonTypeInitialState = {
    allPokemon: undefined,
    randomPokemons: undefined,
    compareQueue: []
};

export const PokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        addToCompare: (state, action) => {
            const index = state.compareQueue.findIndex(
                (pokemon: generatedPokemonType) => pokemon.id === action.payload.id
            );
            if (index === -1) {
                if (state.compareQueue.length === 2) {
                    state.compareQueue.pop();
                }
                state.compareQueue.unshift(action.payload);
            }
        },
        removeFromCompareQueue: (state, action) => {
            const queIndex = state.compareQueue.findIndex((pokemon: generatedPokemonType) => pokemon.id === action.payload);
            const queue = [...state.compareQueue];
            queue.splice(queIndex, 1);
            state.compareQueue = queue;
        }
    },

    extraReducers: (builder) => {

        builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
            state.allPokemon = action.payload;
        })

        builder.addCase(getPokemonData.fulfilled, (state, action) => {
            state.randomPokemons = action.payload;
        })

    },
})

export const { addToCompare, removeFromCompareQueue } = PokemonSlice.actions;