import { createSlice } from "@reduxjs/toolkit";
import { ApplyInitialState, PokemonTypeInitialState } from "../../utils/Types";
import { getInitialPokemonData } from "../reducers/getInitialPokemonData";
import { getPokemonData } from "../reducers/getPokemonData";

const initialState: PokemonTypeInitialState = {
    allPokemon: undefined,
    randomPokemons: undefined
};

export const PokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        //This handles the giving the data into the useEffects into the search.tsx when the asycnThunk is loaded
        builder.addCase(getInitialPokemonData.fulfilled, (state, action) => {
            state.allPokemon = action.payload;
        })

        builder.addCase(getPokemonData.fulfilled, (state, action) => {
            state.randomPokemons = action.payload;
        })

    },
})

export const { } = PokemonSlice.actions;