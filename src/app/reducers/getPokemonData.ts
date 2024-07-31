import { createAsyncThunk } from "@reduxjs/toolkit";
import { generatedPokemonType, genericPokemonType } from "../../utils/Types";
import axios from "axios";
import { images, defaultImages } from "../../utils/getPokemonImages";
import { pokemonTypes } from "../../utils/getPokemonTypes";

export const getPokemonData = createAsyncThunk("pokemon/randomPokemon", async (pokemons: genericPokemonType[]) => {
    try {
        const pokemonsData: generatedPokemonType[] = [];
        for await (const pokemon of pokemons) {
            const { data }: { data: { id: number; types: { type: genericPokemonType }[] } } = await axios.get(pokemon.url);

            const types = data.types.map(({ type: { name } }: { type: { name: string } }) => ({
                //@ts-expect-error
                [name]: pokemonTypes[name],
            })
            );


            //@ts-expect-error
            let image: string | undefined = images[data.id];
            if (!image) {
                //@ts-expect-error
                image = defaultImages[data.id];
            }

            if (image) {
                pokemonsData.push({
                    name: pokemon.name,
                    id: data.id,
                    image,
                    types,
                });
            }
        }

        console.log({ pokemonsData });
        return pokemonsData;

    } catch (err) {
        console.log(`Error: ${err}`);
    }

})