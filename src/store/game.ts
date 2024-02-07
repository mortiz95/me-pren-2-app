import { defineStore } from 'pinia';
import { db, auth } from '@/firebase';
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { Game } from '../types/Game'
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const gamesCollection = collection(db, 'games');

export const useGameStore = defineStore('game', {

  state: () => ({
    games: [] as Game[],
    gamesActiveByUser: [] as Game[],
    gamesPreviousByUser: [] as Game[],
  }),

  actions: {
     async loadSearches(city: string) {
      try {
          const currentDate = Timestamp.now();
          const q = query(gamesCollection, 
            where('city', '==', city),
            where('date', '>=', currentDate)
            );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // Show searches what are not equals to mine
            if(doc.data().organizerId != auth!.currentUser!.uid){
              const gameData = doc.data() as Game;
              gameData.id = doc.id; // Add document ID to game data
              this.games.push(gameData);
            }
          });
          
      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },

    async loadActiveSearchesByCurrentUser() {
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
      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },


    async loadPastSearchesByCurrentUser() {
      try {
        const currentDate = Timestamp.now();
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

    async addSearch(newGame: any) {
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

    async addPlayerToSearch(gameId: any) {
      try {

       const gamesRef = doc(db, "games", gameId);

       await updateDoc(gamesRef, {
        usersAttending: arrayUnion({
          id: userStore.myUserInfo.id,
          name: userStore.myUserInfo.name,
          lastName : userStore.myUserInfo.lastName,
        }) 
       });
       
      } catch (error: any) {
        console.error('Error removing game:', error.message);
      }
    },

    async removeMeFromSearch(gameId: any) {
      try {

       const gamesRef = doc(db, "games", gameId);

       await updateDoc(gamesRef, {
        usersAttending: arrayRemove({
          id: userStore.myUserInfo.id,
          name: userStore.myUserInfo.name,
          lastName : userStore.myUserInfo.lastName,
        }) 
       });
       
      } catch (error: any) {
        console.error('Error removing game:', error.message);
      }
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

