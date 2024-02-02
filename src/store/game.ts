import { defineStore } from 'pinia';
import { db, auth } from '@/firebase';
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs
} from 'firebase/firestore';
import { Game } from '../types/Game'
import { Timestamp } from 'firebase/firestore';

const gamesCollection = collection(db, 'games');

export const useGameStore = defineStore('game', {

  state: () => ({
    games: [] as Game[],
    gamesActiveByUser: [] as Game[],
    gamesPreviousByUser: [] as Game[],
  }),

  actions: {
     async loadGames() {
      try {
          const currentDate = Timestamp.now();
          const q = query(gamesCollection, where('date', '>=', currentDate));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.games.push(doc.data() as Game)
          });
          
      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },

    async loadActiveGamesByUser() {
      try {
        const currentDate = Timestamp.now();
        const q = query(gamesCollection, 
          where('organizerId', '==', auth!.currentUser!.uid),
          where('date', '>', currentDate),
          orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.gamesActiveByUser.push(doc.data() as Game)
        });
        console.log(' this.gamesActiveByUser', this.gamesActiveByUser)
      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },


    async loadPastGamesByUser() {
      try {
        const currentDate = Timestamp.now();
        const gamesCollection = collection(db, 'games');
        const q = query(gamesCollection, 
          where('organizerId', '==', auth!.currentUser!.uid),
          where('date', '<', currentDate),
          orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.gamesPreviousByUser.push(doc.data() as Game)
        });
      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },

    async addGame(newGame: any) {
      console.log(newGame)
      const gameDate = new Date(newGame.date);
      try {
        const newGameInfo: Game = {
          country: newGame.country,
          province: newGame.province,
          city:  newGame.city,
          place:  newGame.place,
          date:  Timestamp.fromDate(gameDate),
          organizerId: newGame.organizerId,
          organizerInfo: newGame.organizerInfo,
          dateCreated: Timestamp.now(),
          sport: newGame.sport,
          spots: newGame.spots,
          payment: newGame.payment,
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
      this.gamesActiveByUser = []
      this.gamesPreviousByUser = []
      this.gamesPreviousByUser = []
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

