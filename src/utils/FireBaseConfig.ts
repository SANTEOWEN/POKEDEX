import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDxMiYwzRw-zMHI_kk1NIdNzzg3RtnrxgI",
    authDomain: "pokedex-f202e.firebaseapp.com",
    projectId: "pokedex-f202e",
    storageBucket: "pokedex-f202e.appspot.com",
    messagingSenderId: "495717005831",
    appId: "1:495717005831:web:9851bd4b29316e5dfb08a2",
    measurementId: "G-SYVYF4169T"
};

const app = initializeApp(firebaseConfig);

export const firebaseauth = getAuth(app);

export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");

export const pokemonListRef = collection(firebaseDB, "pokemonList");