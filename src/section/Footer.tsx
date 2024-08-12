import React from 'react'
import { signOut } from 'firebase/auth'
import { MdOutlinePowerSettingsNew } from 'react-icons/md'
import { firebaseauth } from '../utils/FireBaseConfig';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPokemonTab, setToast, setUserStatus } from '../app/slices/AppSlice';
import { pokemonTabs } from '../utils/Constants';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { currentPokemonTab } = useAppSelector(({ app }) => app);


  //This handles the logOut functionality using the firebase signOut functionality
  const handleLogout = () => {
    signOut(firebaseauth);
    dispatch(setUserStatus(undefined));
    dispatch(setToast("Logged out successfully!"));
  }


  const routes = [
    {
      name: pokemonTabs.description,
      value: "Description",
    },
    {
      name: pokemonTabs.evolution,
      value: "Evolution",
    },
    {
      name: pokemonTabs.locations,
      value: "Catching",
    },
    {
      name: pokemonTabs.moves,
      value: "Capable Moves",
    },
  ];


  return (
    <footer>
      <div className="block"></div>
      <div className="data">

        {location.pathname.includes('/pokemon') &&
          <ul>
            {routes.map((route) => {
              return <li key={route.name} className={`${currentPokemonTab === route.name ? "active" : ""}`} onClick={() => { dispatch(setPokemonTab(route.name)) }}>
                {route.value}
              </li>
            })}
          </ul>
        }

      </div>
      <div className="block">
        <MdOutlinePowerSettingsNew onClick={handleLogout} />
      </div>
    </footer>
  )
}

export default Footer