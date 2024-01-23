import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

 const firebaseConfig = {
  apiKey: "AIzaSyB2LbF3YKriqqbUZILxgZOIAyo27Wmhz7o",
  authDomain: "mepren2-app.firebaseapp.com",
  projectId: "mepren2-app",
  storageBucket: "mepren2-app.appspot.com",
  messagingSenderId: "737663797408",
  appId: "1:737663797408:web:c807a3105f8198449b61c5",
  measurementId: "G-6HMFWW5741"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const db = getFirestore(app);

export { db, auth }