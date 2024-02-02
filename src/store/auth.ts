import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from '@/firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import User from '../types/User'
import { useUserStore } from "@/store/user";

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
          name: user.name,
          lastName: user.lastName,
          email: user.email,
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
          .then(async(userCredential) => {
            // Signed in 
            this.isLoggedIn = true;
             this.error = null
             const store = useUserStore();
             await store.loadMyUserInfo(auth!.currentUser!.uid)
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