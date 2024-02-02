import { defineStore } from 'pinia';
import { db } from '@/firebase';
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
  getDoc
} from 'firebase/firestore';
import User from '../types/User'
import { Timestamp } from 'firebase/firestore';
import { auth } from "@/firebase";

export const useUserStore= defineStore('user', {
  state: () => ({
    myUserInfo: {} as User,
    userInfo: {} as User,
  }),
  actions: {
    async loadUserInfo(userId: any) {
      try {
        const currentDate = Timestamp.now();
        const docRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(docRef);

        if(userDocSnapshot.exists()){
          this.userInfo = userDocSnapshot.data() as User
        }
      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },

    async loadMyUserInfo(userId: any) {
      try {
        const currentDate = Timestamp.now();
        const docRef = doc(db, 'users',  auth!.currentUser!.uid);
        const userDocSnapshot = await getDoc(docRef);
        if(userDocSnapshot.exists()){
          this.myUserInfo = userDocSnapshot.data() as User
        }
        console.log('loadMyUserInfo', this.myUserInfo)

      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },
    removeUser() {

    },
    updateUser() {

    },
  },
});