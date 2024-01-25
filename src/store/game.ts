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
  arrayUnion,
  setDoc
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';


type Game = {
  country: string;
  province: string;
  city: string;
  date: string;
  place: string;
  createdByUser: string;
  dateCreated: Timestamp,
  spots: number;
  genderGame: string;
  gameType: string;
  gameSize: string;
  grassType: string;
  status: string;
  description: string;
  usersAttending: {
    userId: number
  }[];
  usersWaiting: {
    userId: number
  }[];
};

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
        const newGameInfo: Game = {
          country: newGame.country,
          province: newGame.province,
          city:  newGame.city,
          place:  newGame.place,
          date:  newGame.date,
          createdByUser: auth!.currentUser!.uid,
          dateCreated: Timestamp.now(),
          spots: newGame.spots,
          genderGame: newGame.genderGame,
          gameType: newGame.gameType,
          gameSize: newGame.gameSize,
          grassType: newGame.grassType,
          status: newGame.status,
          description: newGame.description,
          usersAttending:  [],
          usersWaiting:  [],
        };
        await setDoc(doc(db, "users", auth!.currentUser!.uid), newGameInfo);

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

