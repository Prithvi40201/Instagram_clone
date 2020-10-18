// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCv5fS-_XJC5vvo6JOzeN96v-_8LYUL5Ps",
    authDomain: "insta-clone-prith.firebaseapp.com",
    databaseURL: "https://insta-clone-prith.firebaseio.com",
    projectId: "insta-clone-prith",
    storageBucket: "insta-clone-prith.appspot.com",
    messagingSenderId: "799688677218",
    appId: "1:799688677218:web:2855de84342feeafaafe3b",
    measurementId: "G-DYW5W8SDZ7"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


