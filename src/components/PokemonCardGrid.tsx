import React from 'react'
import { IoGitCompare } from 'react-icons/io5'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { pokemonTypeInterFace, userPokemonsType } from '../utils/Types'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCompare } from '../app/slices/PokemonSlice'
import { setToast, clearToasts } from '../app/slices/AppSlice'
import { addPokemonToList } from '../app/reducers/addPokemonToList'
import { removePokemonFromUserList } from '../app/reducers/removePokemonFromUserList'


//NOTE: If youre dealing with array kind of data add some brackets for the types that youre dealing
const PokemonCardGrid = ({ pokemons }: { pokemons: userPokemonsType[] }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();


    return (
        <div className='pokemon-card-grid-container'>
            <div className='pokemon-card-grid'>
                {
                    pokemons && pokemons.length > 0 && pokemons?.map((data: userPokemonsType) => {
                        return (
                            <div className='pokemon-card' key={data.id}>
                                <div className="pokemon-card-list">
                                    {location.pathname.includes("/pokemon") || location.pathname.includes("/search")
                                        ? (<FaPlus className='plus' onClick={() => dispatch(addPokemonToList(data))} />) : (<FaTrash className="trash" onClick={async () => { await dispatch(removePokemonFromUserList({ id: data.firebaseId! })); dispatch(setToast(`Pokemon ${data.name} removed successfully`)); }} />)
                                    }

                                </div>
                                <div className="pokemon-card-compare">
                                    <IoGitCompare
                                        onClick={() => {
                                            dispatch(addToCompare(data));
                                            dispatch(setToast(`${data.name} is now added to the compareQueue`));
                                        }} />
                                </div>
                                <h3 className='pokemon-card-title'>{data.name}</h3>
                                <img src={data.image} alt="pokemon-image" className='pokemon-card-image' loading='lazy' onClick={() => navigate(`/pokemon/${data.id}`)} />
                                <div className="pokemon-card-types">
                                    {data.types.map((type: pokemonTypeInterFace, index: number) => {
                                        const keys = Object.keys(type);
                                        return (
                                            <div className='pokemon-card-types-type' key={index}>
                                                <img src={type[keys[0]].image} alt="pokemon-type" className='pokemon-card-types-type-image' loading='lazy' />
                                                <h6 className='pokemon-card-types-type-text'>{keys[0]}</h6>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PokemonCardGrid