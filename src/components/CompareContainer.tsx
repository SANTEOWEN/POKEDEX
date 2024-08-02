import React from 'react'
import { userPokemonsType } from '../utils/Types'

function CompareContainer({ pokemon = undefined, isEmpty = false, }: { pokemon?: userPokemonsType; isEmpty?: boolean; }) {

    return <div className='compare-container'>{
        isEmpty && (<div className='empty'>
            <button></button>
            <h3>Add Pokemon to comparison</h3>
        </div>)
    }</div>
}

export default CompareContainer