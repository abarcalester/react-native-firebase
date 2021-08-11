import firebase from "firebase";

import "firebase/firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAEOp-UUk7jAVg2wfx-jXqIVxGP0rWIKXU",
    authDomain: "react-native-firebase-754dd.firebaseapp.com",
    databaseURL: "https://react-native-firebase-754dd-default-rtdb.firebaseio.com",
    projectId: "react-native-firebase-754dd",
    storageBucket: "react-native-firebase-754dd.appspot.com",
    messagingSenderId: "1030843930454",
    appId: "1:1030843930454:web:0c38a31172d5c02e18e8f7"
};

firebase.initializeApp(firebaseConfig);

export default firebase