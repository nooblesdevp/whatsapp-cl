// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6T5uSPD08x59H_iqkokpR_irsvuw-SWM",
  authDomain: "whatsapp-clone-fd762.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-fd762.firebaseio.com",
  projectId: "whatsapp-clone-fd762",
  storageBucket: "whatsapp-clone-fd762.appspot.com",
  messagingSenderId: "224098467179",
  appId: "1:224098467179:web:1d8b0f653f9fe59983a02e",
  measurementId: "G-S1NK4V8NJR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
