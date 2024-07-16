import { useLocation } from "react-router-dom"

const location = useLocation()
export const navigationRoutes = [
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
        name: "About",
        route: "/about",
    },
]