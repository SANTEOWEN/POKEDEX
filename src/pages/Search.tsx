import React from 'react'
import Wrapper from '../section/Wrapper'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getInitialPokemonData } from '../app/reducers/getInitialPokemonData';
import { getPokemonData } from '../app/reducers/getPokemonData';
import PokemonCardGrid from '../components/PokemonCardGrid';

function Search() {
  const dispatch = useAppDispatch()

  //To get all of the fetch data we need to pass the initial states into the useAppselector so we can use its data into our components.
  const { allPokemon, randomPokemons } = useAppSelector(({ pokemon }) => pokemon);

  useEffect(() => {
    dispatch(getInitialPokemonData())
  }, [dispatch])

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon];

      //This gives us a random ID for our pokemon data list.
      const randomPokemonId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);

      dispatch(getPokemonData(randomPokemonId));
    }

  }, [allPokemon, dispatch])


  return (
    <>
      <div className="search">
        <input type="text" />
        <PokemonCardGrid pokemons={randomPokemons!} />
      </div>
    </>
  )
}

export default Wrapper(Search);