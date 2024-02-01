import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from '@/firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useGameStore } from '../store/game'
import { Timestamp } from 'firebase/firestore';

type User = {
  name: string;
  email: string;
  password: string,
  country: string;
  province: string;
  city: string;
  age: number;
  registerDate: Timestamp;
  createdGames: {
    GameId: string;
    Title: string;
    date: string;
  }[];
  attendedGames: {
    GameId: string;
  }[];
  ownerField: boolean;
  subscriptionType: number;
  rating:  {
    GameId: string;
    Rating: number;
  }[];
  phone: number;
  lastLogin: Timestamp;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    error: null as any,
  }),

  actions: {
       async register(user: any) {
        await createUserWithEmailAndPassword(auth, user.email, user.password)
       .then(async (userCredential) => {
        const userInfo: User = {
          name: '',
          email: user.email,
          password: user.password,
          country: 'Argentina',
          province: 'Salta',
          city: '',
          age: 30,
          registerDate: Timestamp.now(),
          createdGames: [],
          attendedGames:  [],
          ownerField: false,
          subscriptionType: 1,
          rating: [],
          phone: 0,
          lastLogin: Timestamp.now(),
        };
         // Signed up 
         this.isLoggedIn = true;
         await setDoc(doc(db, "users", userCredential.user.uid), userInfo);
         this.error = null
       })
       .catch((error) => {
         console.log('error.code', error.code)
         if(error.code === "auth/email-already-in-use"){
            this.error = "El Email ingresado ya existe";
         }

       });
     
    },

     async login(user :any){
        await signInWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            // Signed in 
            this.isLoggedIn = true;
             this.error = null
            // ...
          })
          .catch((error) => {
            console.log('error.code', error.code)
            if(error.code === "auth/invalid-credential"){
               this.error = "* Datos Invalidos. Eres nuevo? Registrate.";
            }
            
          });
     }
  }

});