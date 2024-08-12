import React from 'react'
import { pokemonStatType, pokemonTypeInterFace, userPokemonsType } from '../utils/Types'
import { FaPlus } from 'react-icons/fa';
import { pokemonTypes } from '../utils/getPokemonTypes';
import { useAppDispatch } from '../app/hooks';
import { removeFromCompareQueue } from '../app/slices/PokemonSlice';
import { useNavigate } from 'react-router-dom';
import { addPokemonToList } from '../app/reducers/addPokemonToList';

function CompareContainer({ pokemon = undefined, isEmpty = false, }: { pokemon?: userPokemonsType; isEmpty?: boolean; }) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const createStatsArray = (
        //This declares a function named createStatsArray that takes two parameters

        //types: An array of pokemonTypeInterFace objects
        types: pokemonTypeInterFace[],

        //statType: A value of type pokemonStatType
        statType: pokemonStatType
    ) => {

        //statsArray is initialized as an empty array that will hold objects with name and image properties.
        const statsArray: { name: string; image: string }[] = [];

        //statsSet is a Set used to keep track of unique stat names.
        const statsSet = new Set<string>();

        //This loops through each type in the types array.
        types.forEach((type: pokemonTypeInterFace) => {

            //This gets the first (and presumably only) key from the type object.
            const key = Object.keys(type)[0]
            console.log({ type })

            //This iterates through each stat in the specified statType for the current type.
            type[key][statType].forEach((stat: string) => {

                //If the stat is not already in statsSet,
                if (!statsSet.has(stat)) {

                    //it adds a new object to statsArray with the stat's name and corresponding image.
                    statsArray.push({ name: stat, image: (pokemonTypes as any)[stat].image });

                    //It then adds the stat to statsSet to mark it as processed.
                    statsSet.add(stat);
                }
            });
        });
        return statsArray;
    };

    const getStats = () => {
        return (
            <>
                <div className="pokemon-types">
                    <h4 className="pokemon-type-title">Strength</h4>
                    <div className="pokemon-type-icons">
                        {createStatsArray(pokemon?.types!, "strength").map(
                            (stat: { image: string }) => (
                                <div className="pokemon-type">
                                    <img src={stat.image} alt="" className="pokemon-type-image" />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="pokemon-types">
                    <h4 className="pokemon-type-title">Weakness</h4>
                    <div className="pokemon-type-icons">
                        {createStatsArray(pokemon?.types!, "weakness").map(
                            (stat: { image: string }) => (
                                <div className="pokemon-type">
                                    <img src={stat.image} alt="" className="pokemon-type-image" />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="pokemon-types">
                    <h4 className="pokemon-type-title">Resistance</h4>
                    <div className="pokemon-type-icons">
                        {createStatsArray(pokemon?.types!, "resistance").map(
                            (stat: { image: string }) => (
                                <div className="pokemon-type">
                                    <img src={stat.image} alt="" className="pokemon-type-image" />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="pokemon-types">
                    <h4 className="pokemon-type-title">Vulnerable</h4>
                    <div className="pokemon-type-icons">
                        {createStatsArray(pokemon?.types!, "vulnerable").map(
                            (stat: { image: string }) => (
                                <div className="pokemon-type">
                                    <img src={stat.image} alt="" className="pokemon-type-image" />
                                </div>
                            )
                        )}
                    </div>
                </div>
            </>
        );
    };
    return (
        <div className='compare-container'>
            {isEmpty && (
                <div className='empty'>
                    <button>
                        <FaPlus />
                    </button>
                    <h3>Add Pokemon to comparison</h3>
                </div>
            )}
            {pokemon && (
                <div className="compare-element" key={pokemon?.id}>
                    <div className="compare-info">
                        <div className="compare-details">
                            <h3>{pokemon?.name}</h3>
                            <img src={pokemon?.image} alt="pokemon" className='compare-image' />
                        </div>
                        <div className="pokemon-types-container">
                            <div className="pokemon-types">
                                <h4 className='pokemon-type-title'>Type</h4>
                                <div className="pokemon-type-icons">{
                                    pokemon?.types.map((type: pokemonTypeInterFace) => {
                                        const keys = Object.keys(type)
                                        return (
                                            <div className="pokemon-type">
                                                <img src={type[keys[0]].image} alt="pokemon-type" className='pokemon-type-image' />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            {getStats()}
                        </div>
                    </div>
                    <div className="compare-action-buttons">
                        <button className='compare-btn' onClick={() => dispatch(addPokemonToList(pokemon))}>Add</button>
                        <button className='compare-btn' onClick={() => navigate(`/pokemon/${pokemon?.id}`)}>View</button>
                        <button className='compare-btn' onClick={() => dispatch(removeFromCompareQueue({ id: pokemon?.id }))}>Remove</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompareContainer