import React from 'react'
import { useAppSelector } from '../../app/hooks'

function CapableMoves() {
    const pokemonData = useAppSelector(({ pokemon: { currentPokemon } }) => currentPokemon)


    return (
        <div className='capable-moves'>
            <h1 className='capable-moves-title'>Abilities</h1>
            <ul className='capable-moves-list ability'>
                {
                    pokemonData?.pokemonAbilities.abilities.map((encounter: string) => (
                        <li key={encounter} className='move'>
                            {encounter}
                        </li>
                    ))
                }
            </ul>
            <h1 className='capable-moves-title'>Moves</h1>
            <ul className='capable-moves-list'>
                {
                    pokemonData?.pokemonAbilities.moves.map((encounter: string) => (
                        <li key={encounter} className='move'>
                            {encounter}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default CapableMoves