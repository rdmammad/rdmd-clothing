import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAL3IXwhUtRN95wTuKzVtW9zU7iLJyc_28",
    authDomain: "rdmd-clothing.firebaseapp.com",
    databaseURL: "https://rdmd-clothing.firebaseio.com",
    projectId: "rdmd-clothing",
    storageBucket: "rdmd-clothing.appspot.com",
    messagingSenderId: "629393699497",
    appId: "1:629393699497:web:ba655adfae41ac95b16fb8",
    measurementId: "G-3NN80MSTMT"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;