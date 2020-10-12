// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAnXP4yqfFLqdLLRgnrb2z8drDJ_ntj76o",
    authDomain: "whatsapp-cl-v1.firebaseapp.com",
    databaseURL: "https://whatsapp-cl-v1.firebaseio.com",
    projectId: "whatsapp-cl-v1",
    storageBucket: "whatsapp-cl-v1.appspot.com",
    messagingSenderId: "830837217217",
    appId: "1:830837217217:web:84e5a390748f72cdb00140",
    measurementId: "G-KSLD6H72P0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth, provider }
  export default db