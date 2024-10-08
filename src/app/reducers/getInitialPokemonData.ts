import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonsRoute } from "../../utils/Constants";
import axios from "axios";

// This thunk fetches the initial data from the PokeAPI and logs it to the console.
export const getInitialPokemonData = createAsyncThunk("pokemon/initialData", async () => {
    try {
        const { data } = await axios.get(pokemonsRoute);
        console.log({ data });
        return data.results;
    } catch (err) {
        console.error(err);
    }
})