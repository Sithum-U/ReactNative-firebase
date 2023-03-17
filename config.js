import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBRI4toUt8zZKMFXOmNh6uThzU_M6JT5PI",
    authDomain: "reactnative-firebase-711f3.firebaseapp.com",
    projectId: "reactnative-firebase-711f3",
    storageBucket: "reactnative-firebase-711f3.appspot.com",
    messagingSenderId: "285493938071",
    appId: "1:285493938071:web:ce7099688fba8ed040e6d2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase };
