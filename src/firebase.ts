import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

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

firebase.initializeApp(config);

const firestore = firebase.firestore();
firebase.firestore().enablePersistence();
const FieldPath = firebase.firestore.FieldPath;
const Timestamp = firebase.firestore.Timestamp;

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const analytics = firebase.analytics();

export {
  firebase,
  firestore,
  FieldPath,
  Timestamp,
  auth,
  googleProvider,
  analytics,
};
