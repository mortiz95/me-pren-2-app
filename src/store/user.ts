import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export const useUserStore= defineStore('user', {
  state: () => ({
    user: 0,
  }),
  actions: {
    loadUserInfo() {

    },
    addUser() {

    },
    removeUser() {

    },
    updateUser() {

    },
  },
});