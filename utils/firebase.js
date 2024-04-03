// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAxeC1puK7Lii_MnoUKq14EO7mT_aTNTmE',
  authDomain: 'todo-list-9c0cf.firebaseapp.com',
  projectId: 'todo-list-9c0cf',
  storageBucket: 'todo-list-9c0cf.appspot.com',
  messagingSenderId: '752477145778',
  appId: '1:752477145778:web:45859a160ad6a9d92c97ab',
  measurementId: 'G-ZWGZSQT6KW',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
