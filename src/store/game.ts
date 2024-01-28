import { defineStore } from 'pinia';
import { db, auth } from '@/firebase';
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';


type Game = {
  country: string;
  province: string;
  city: string;
  date: Timestamp;
  place: string;
  createdByUser: string;
  dateCreated: Timestamp,
  sport: string;
  spots: number;
  gender: {
    text: string,
    value: string,
    icon: string
  }[];
  type: {
    text: string,
    value: string,
    icon: string
  }[];
  size: {
    text: string,
    value: string
  }[];
  grassType: {
    text: string,
    value: string,
    icon: string
  }[];
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
      loadGames() {
      try {
       const currentDate = Timestamp.now();
          const q = query(collection(db, "games"), where('date', '>=', currentDate));
          const unsubscribe =  onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.games.push(doc.data());
            });
          });
        
      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },

    async addGame(newGame: any) {

      const gameDate = new Date(newGame.date);

      try {
        const newGameInfo: Game = {
          country: newGame.country,
          province: newGame.province,
          city:  newGame.city,
          place:  newGame.place,
          date:  Timestamp.fromDate(gameDate),
          createdByUser: auth!.currentUser!.uid,
          dateCreated: Timestamp.now(),
          sport: newGame.sport,
          spots: newGame.spots,
          gender: newGame.gender,
          type: newGame.type,
          size: newGame.size,
          grassType: newGame.grassType,
          status: newGame.status,
          description: newGame.description,
          usersAttending:  [],
          usersWaiting:  [],
        };


        // Generate a new random ID for the game created
       const newGameRef = doc(collection(db,"games"))

        await setDoc(doc(db, "games", newGameRef.id), newGameInfo);
  
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

