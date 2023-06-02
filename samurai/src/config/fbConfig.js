import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "samurai-d86ce.firebaseapp.com",
    projectId: "samurai-d86ce",
    storageBucket: "samurai-d86ce.appspot.com",
    messagingSenderId: "559576004280",
    appId: "1:559576004280:web:033ec595607e9b4a57264d",
    measurementId: "G-WLHD2MKWJ3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots:true });
const storage = firebase.storage();

export {storage, firebase as default}