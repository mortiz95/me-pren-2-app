import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyB2LbF3YKriqqbUZILxgZOIAyo27Wmhz7o",
  authDomain: "mepren2-app.firebaseapp.com",
  projectId: "mepren2-app",
  storageBucket: "mepren2-app.appspot.com",
  messagingSenderId: "737663797408",
  appId: "1:737663797408:web:c807a3105f8198449b61c5",
  measurementId: "G-6HMFWW5741"
});

export const db = getFirestore(firebaseApp);
