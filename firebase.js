import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCqw9khUKGUR9XU4cMSeX7_gTZYmVKlmJQ",
    authDomain: "ultimate-ninja-67.firebaseapp.com",
    databaseURL: "https://ultimate-ninja-67.firebaseio.com",
    projectId: "ultimate-ninja-67",
    storageBucket: "ultimate-ninja-67.appspot.com",
    messagingSenderId: "246024766381",
    appId: "1:246024766381:web:50eb134eb0659e461d9724",
};

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

export const db = app.firestore();

// no analitycs

// go authentication
// enable google
// valid email
// web sdk configuration
// change .env
