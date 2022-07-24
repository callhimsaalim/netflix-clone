// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG68_gCnnGGjtNMd1oQOWR9rKuFHEbSXA",
  authDomain: "netflix-clone-5786.firebaseapp.com",
  projectId: "netflix-clone-5786",
  storageBucket: "netflix-clone-5786.appspot.com",
  messagingSenderId: "549203833433",
  appId: "1:549203833433:web:d97d67592b2ae9fee67748"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()   //check if app already initialized, if not initialize -nextJS server side points
const db = getFirestore()
const auth = getAuth()  // returns auth function associated with that project created on the firebase-console

export default app
export { auth, db }
