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
        const docRef = doc(db, 'users', userId);
        const doc_ = await getDoc(docRef);

        if(doc_.exists()){
          const userData = doc_.data() as User
          userData.id = doc_.id; // Add user ID to my user data
          this.userInfo = userData as User
        }
      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },

    async loadMyUserInfo(userId: any) {
      try {
        const docRef = doc(db, 'users',  auth!.currentUser!.uid);
        const doc_ = await getDoc(docRef);
        if(doc_.exists()){
          const userData = doc_.data() as User
          userData.id = doc_.id; // Add user ID to my user data
          this.myUserInfo = userData as User
        }

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