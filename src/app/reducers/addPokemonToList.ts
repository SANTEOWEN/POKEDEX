import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokemonStatsType, pokemonTypeInterFace, userPokemonsType } from "../../utils/Types";
import { RootState } from "../store";
import { setToast } from "../slices/AppSlice";
import { addDoc } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FireBaseConfig";
import { getUserPokemons } from "./getUserPokemons";

export const addPokemonToList = createAsyncThunk("pokemon/addPokemon",
    async (pokemon: {
        id: number;
        name: string;
        types: pokemonTypeInterFace[] | string[];
        stats?: pokemonStatsType[];
    },
        { getState, dispatch }
    ) => {
        try {

            const {
                app: { userInfo },
                pokemon: { userPokemons },
            } = getState() as RootState;
            if (!userInfo?.email) {
                return dispatch(
                    setToast("Please login in order to add Pokemon to your collection")
                );
            }
            const index = userPokemons.findIndex((userPokemon: userPokemonsType) => {
                return userPokemon.name === pokemon.name;
            });
            if (index === -1) {
                let types: string[] = [];

                if (!pokemon.stats) {
                    pokemon.types.forEach((type: any) =>
                        types.push(Object.keys(type).toString())
                    );
                } else {
                    types = pokemon.types as string[];
                }

                await addDoc(pokemonListRef, {
                    pokemon: { id: pokemon.id, name: pokemon.name, types },
                    email: userInfo.email,
                });
                await dispatch(getUserPokemons());
                dispatch(setToast(`${pokemon.name} added to your collection`));
            } else {
                dispatch(
                    setToast(`You already have ${pokemon.name} in your collection`)
                );
            }

        } catch (err) {
            console.error(err);
        }
    }
);