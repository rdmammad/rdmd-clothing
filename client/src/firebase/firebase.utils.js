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

export const createUserProfileDocument = async (userAuth, additionalData)=>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);     //documentReference
  const snapShot = await userRef.get();                                     //documentReference

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData,
        })
    }
    catch (e) {
        console.log('error creating user', e.message());
    }
  }

  return userRef;
};

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeTitle: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

   return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;