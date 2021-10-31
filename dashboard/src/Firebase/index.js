import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";
import "firebase/messaging";
import "firebase/analytics";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBEa2TEzzfKQ-bjl98S_LZcgNTCKZk1ehA",
  authDomain: "blubrd-921db.firebaseapp.com",
  projectId: "blubrd-921db",
  storageBucket: "blubrd-921db.appspot.com",
  messagingSenderId: "978397190493",
  appId: "1:978397190493:web:fb72babb72b088eed070b4",
  measurementId: "G-XPR1HKWQ1W",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();
const database = firebase.database();
const auth = firebase.auth();
const firestore = firebase.firestore();

// Authentication for Google
var googleProvider = new firebase.auth.GoogleAuthProvider();
// Authentication for Facebook
var facebookProvider = new firebase.auth.FacebookAuthProvider();
// Authentication for Twitter
var twitterProvider = new firebase.auth.TwitterAuthProvider();

export {
  firestore,
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
  database,
  storage,
  firebase as default,
};
