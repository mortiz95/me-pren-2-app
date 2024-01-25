import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { db, auth } from '@/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useGameStore } from '../store/game'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    error: null as any,
  }),

  actions: {
       async register(user: any) {
        await createUserWithEmailAndPassword(auth, user.email, user.password)
       .then(async (userCredential) => {
         // Signed up 
         this.isLoggedIn = true;
         await setDoc(doc(db, "users", userCredential.user.uid), {});
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
            const store = useGameStore();
             store.clearData()
             store.loadGames()
             this.error = null
            // ...
          })
          .catch((error) => {
            console.log('error.code', error.code)
            if(error.code === "auth/invalid-credential"){
               this.error = "* Datos Invalidos";
            }
            
          });
     }
  }

});