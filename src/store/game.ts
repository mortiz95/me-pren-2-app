import { defineStore } from 'pinia';
import { db } from '@/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';

const refCollectionGames = collection(db, 'games');

export const useGameStore = defineStore('game', {

  state: () => ({
    games: [] as any[] // Use any[] for flexibility
  }),

  actions: {
    async loadGames() {
      try {
        const matchesCollection = refCollectionGames;
        const querySnapshot = await getDocs(matchesCollection);
        // Map the documents to objects with any type
        this.games = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error: any) {
        console.error('Error loading games:', error.message);
      }
    },

    async addGame(newGame: any) {
      try {
        const newGameRef = await addDoc(refCollectionGames, newGame);
        this.games.push({ ...newGame, id: newGameRef.id });
      } catch (error: any) {
        console.error('Error adding game:', error.message);
      }
    },

    async removeGame(gameId: string) {
      try {
        await deleteDoc(doc(db, 'games', gameId));
        this.games = this.games.filter((game) => game.id !== gameId);
      } catch (error: any) {
        console.error('Error removing game:', error.message);
      }
    },

    async updateGame(updatedGame: any) {
      try {
        const gameDocRef = doc(db, 'games', updatedGame.id);
        await updateDoc(gameDocRef, updatedGame);
        this.games = this.games.map((game) => (game.id === updatedGame.id ? updatedGame : game));
      } catch (error: any) {
        console.error('Error updating game:', error.message);
      }
    },
  },
});

