import { defineStore } from 'pinia';
import { db, auth } from '@/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  arrayUnion
} from 'firebase/firestore';


export const useGameStore = defineStore('game', {

  state: () => ({
    games: [] as any[] 
  }),

  actions: {
    async loadGames() {
      try {
        const docRef = doc(db, "games", auth!.currentUser!.uid)
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
          const data = docSnap.data();
          console.log("Doc data: ", docSnap.data())
          this.games = [...data.records]
        }

      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },

    async addGame(newGame: any) {
      try {
        const docRef = doc(db, "games", auth!.currentUser!.uid)
        await updateDoc(docRef, {
          games: arrayUnion(newGame)
        })

      } catch (error: any) {
        console.error('Error adding game:', error.message);
      }
    },

    clearData(){
      this.games = []
    },

    async removeGame(gameId: string) {
      try {
       
      } catch (error: any) {
        console.error('Error removing game:', error.message);
      }
    },

    async updateGame(updatedGame: any) {
      try {
      
      } catch (error: any) {
        console.error('Error updating game:', error.message);
      }
    },
  },
});

