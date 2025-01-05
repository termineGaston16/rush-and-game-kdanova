// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Player } from "../INTERFACES/types";
import { PLAYERS_IN_DB } from "../BASEDATAPREV";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJYTx97aB-CaIPECdW4kTFWC4FfMOkJu8",
  authDomain: "rush-and-game.firebaseapp.com",
  projectId: "rush-and-game",
  storageBucket: "rush-and-game.firebasestorage.app",
  messagingSenderId: "222473493111",
  appId: "1:222473493111:web:641804225fdcae45e9c472"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// OBTENER 10 JUGADORES Y ORDENARLOS
export const getPlayersFromDB = (playersOrderedLocally: Player[]): Player[] => {

  try {
    const arrayDBOrdered = PLAYERS_IN_DB.sort((a, b) => b.score - a.score)
    return [...playersOrderedLocally, ...arrayDBOrdered.slice(playersOrderedLocally.length, playersOrderedLocally.length + 10)]

  } catch (error) {

    console.error(error)
    throw error

  }

}

// VALIDAR LOGIN