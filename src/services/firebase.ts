// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDwpFnRoSlPkDstF_cVe7MEx-p1cUibg-U',
  authDomain: 'filmsapp-1b971.firebaseapp.com',
  projectId: 'filmsapp-1b971',
  storageBucket: 'filmsapp-1b971.firebasestorage.app',
  messagingSenderId: '127554693198',
  appId: '1:127554693198:web:6e2ef13ed9dadfc7787b1f',
  measurementId: 'G-KGD24P7J63',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export proprement typé
export const auth = getAuth(app);
export const db = getFirestore(app);