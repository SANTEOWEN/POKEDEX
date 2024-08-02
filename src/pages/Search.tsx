import React from 'react'
import Wrapper from '../section/Wrapper'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getInitialPokemonData } from '../app/reducers/getInitialPokemonData';
import { getPokemonData } from '../app/reducers/getPokemonData';
import PokemonCardGrid from '../components/PokemonCardGrid';
import { debounce } from '../utils/Debounce';

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

  //We will be using debounce here for the performance optimization of the search bar
  //debounce gives a timeout of 3mileseconds for the search bar.
  const handleChange = debounce((value: string) => getPokemon(value), 300);


  const getPokemon = async (value: string) => {

    //This condition gives us a specific pokemon that we input from the search bar.
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) => pokemon.name.includes(value.toLowerCase())
      );
      dispatch(getPokemonData(pokemons!));
    } else {
      const clonedPokemons = [...allPokemon as []];
      //This gives us a random ID for our pokemon data list.
      const randomPokemonId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);

      dispatch(getPokemonData(randomPokemonId));
    }
  }



  return (
    <>
      <div className="search">

        {/*         //We change the onChange function from directly putting the getPokemon to the handleChangeDebounce function so it optimize the performance of the search bar. */}
        <input type="text" className='pokemon-searchbar' placeholder='Search Pokemon' onChange={(e) => handleChange(e.target.value)} />
        <PokemonCardGrid pokemons={randomPokemons!} />
      </div>
    </>
  )
}

export default Wrapper(Search);