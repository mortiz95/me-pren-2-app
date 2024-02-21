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
          country: '',
          province: '',
          city: '',
          registerDate: Timestamp.now(),
          attendedSearches: [],
          ownerField: false,
          subscriptionType: 1,
          rating: [],
          phone: 0,
          lastLogin: Timestamp.now(),
          gender: '',
          dateOfBirth: null,
          sport: "futbol",
          position: [],
          motivation: [],
          level: "",
          freeCreateSearch: 4,
          freeJoinSearch: 4,
          dateStartSubscription: null,
          dateEndOfSubscription: null,
          typeSubscription: 1,
          comments: []
        };
         // Signed up 
         this.isLoggedIn = true;
         //await setDoc(doc(db, "users", userCredential.user.uid), userInfo);
         const store = useUserStore();
         await store.addUser(userCredential.user.uid, userInfo)
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
             await store.loadMyUserInfo()
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