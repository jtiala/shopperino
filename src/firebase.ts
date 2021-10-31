import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import "firebase/compat/firestore";
import {
  // getFirestore,
  // enableIndexedDbPersistence,
  FieldPath,
  Timestamp,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(config);
firebase.initializeApp(config); // firestoreCompat

const firestoreCompat = firebase.firestore();
firebase.firestore().enablePersistence();

// TODO: replace firestoreCompat with these
// const firestore = getFirestore(firebaseApp);
// enableIndexedDbPersistence(firestore);

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const analytics = getAnalytics(firebaseApp);

export {
  firestoreCompat,
  FieldPath,
  Timestamp,
  auth,
  googleProvider,
  analytics,
};
