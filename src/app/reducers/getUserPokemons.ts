import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getDocs, query, where } from "firebase/firestore";
import { pokemonListRef } from "../../utils/FireBaseConfig";
import { userPokemonsType } from "../../utils/Types";
import { defaultImages, images } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/getPokemonTypes";

export const getUserPokemons = createAsyncThunk(
    "pokemons/userList",
    async (args, { getState }) => {
        try {

            const {
                app: { userInfo },
            } = getState() as RootState;
            if (!userInfo?.email) {
                return;
            }
            const firestoreQuery = query(
                pokemonListRef,
                where("email", "==", userInfo.email)
            );
            const fetchedPokemons = await getDocs(firestoreQuery);
            if (fetchedPokemons.docs.length) {
                const userPokemons: userPokemonsType[] = [];

                fetchedPokemons.forEach(async (pokemon) => {
                    const pokemons = await pokemon.data().pokemon;
                    //@ts-ignore
                    let image = images[pokemons.id];
                    if (!image) {
                        //@ts-ignore
                        image = defaultImages[pokemons.id]
                    }
                    //@ts-ignore
                    const types = pokemons.types.map((name: string) => ({
                        //@ts-ignore
                        [name]: pokemonTypes[name],
                    }));

                    userPokemons.push({
                        ...pokemons,
                        firebaseId: pokemon.id,
                        image,
                        types
                    });
                });
                console.log(userPokemons, "123")
                return userPokemons;
            }
            return [];
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
);