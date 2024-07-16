import React, { useEffect } from 'react'
import pokeballIcon from "../assets/pokeball-icon.png"
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom'
function Navbar() {
  const navigationRoutes = [
    {
      name: "Search",
      route: "/search",
    },
    {
      name: "Compare",
      route: "/compare",
    },
    {
      name: "Pokemon",
      route: "/pokemon",
    },
    {
      name: "My List",
      route: "/list",
    },
    {
      name: "About",
      route: "/about",
    },
  ];

  const location = useLocation();
  useEffect(() => {
    //we initialize the index variable to get the route index from the navigationRoutes array.
    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route)
    );

    //After we get the index route of the navigation routes we will pass it to our underline function so the function works as intended.
    underLine(index);
  }, [location.pathname, navigationRoutes])

  //This moves the underline indicators to the desired location using the parameter.
  function underLine(index: number) {
    var underlines = document.querySelectorAll<HTMLElement>(".underline");
    for (var i = 0; i < underlines.length; i++) {
      underlines[i].style.transform = "translate3d(" + index * 100 + "%,0,0)";
    }
  }



  return (
    <nav>
      <div className="block">
        <img src={pokeballIcon} alt="Pokeball-icon" className='' />
      </div>
      <div className="data">
        <ul>
          <div className="underline"></div>
          {/* <div className="underline"></div>
          <div className="underline"></div> */}
          {navigationRoutes.map(({ name, route }, index) => {
            return <Link
              to={route}
              key={index}
            >
              <li>{name}</li>
            </Link>
          })}
        </ul>
      </div>
      <div className="block">
        <GiHamburgerMenu />
      </div>
    </nav>
  )
}

export default Navbar