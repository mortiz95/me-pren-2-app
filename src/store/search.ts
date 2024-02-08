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
import { Search } from '../types/Search'
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const searchesCollection = collection(db, 'searches');

export const useSearchStore = defineStore('search', {

  state: () => ({
    searches: [] as Search[],
    searchesActiveByUser: [] as Search[],
    searchesPreviousByUser: [] as Search[],
  }),

  actions: {
     async loadSearches(city: string) {
      try {
          const currentDate = Timestamp.now();
          const q = query(searchesCollection, 
            where('city', '==', city),
            where('date', '>=', currentDate)
            );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // Show searches what are not equals to mine
            if(doc.data().organizerId != auth!.currentUser!.uid){
              const searchData = doc.data() as Search;
              searchData.id = doc.id; // Add document ID to search data
              this.searches.push(searchData);
            }
          });
          
      } catch (error: any) {
        console.error('Error loading searches:', error.message);
      }
    },

    async loadActiveSearchesByCurrentUser() {
      try {
        const currentDate = Timestamp.now();
        const q = query(searchesCollection, 
          where('organizerId', '==', auth!.currentUser!.uid),
          where('date', '>', currentDate),
          orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.searchesActiveByUser.push(doc.data() as Search)
        });
      } catch (error: any) {
        console.error('Error loading searches:', error.message);
      }
    },


    async loadPastSearchesByCurrentUser() {
      try {
        const currentDate = Timestamp.now();
        const q = query(searchesCollection, 
          where('organizerId', '==', auth!.currentUser!.uid),
          where('date', '<', currentDate),
          orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.searchesPreviousByUser.push(doc.data() as Search)
        });
      } catch (error: any) {
        console.error('Error loading searches:', error.message);
      }
    },

    async addSearch(newSearch: any) {
      const searchDate = new Date(newSearch.date);
      try {
        const newSearchInfo: Search = {
          country: newSearch.country,
          province: newSearch.province,
          city:  newSearch.city,
          place:  newSearch.place,
          date:  Timestamp.fromDate(searchDate),
          organizerId: newSearch.organizerId,
          organizerInfo: newSearch.organizerInfo,
          dateCreated: Timestamp.now(),
          sport: newSearch.sport,
          spots: newSearch.spots,
          payment: newSearch.payment,
          gender: newSearch.gender,
          type: newSearch.type,
          size: newSearch.size,
          grassType: newSearch.grassType,
          status: newSearch.status,
          description: newSearch.description,
          usersAttending:  [],
          usersWaiting:  [],
        };

        // Generate a new random ID for the search created
        const newSearchRef = doc(collection(db,"searches"))

        await setDoc(doc(db, "searches", newSearchRef.id), newSearchInfo);
  
      } catch (error: any) {
        console.error('Error adding search:', error.message);
      }
    },

    clearData(){
      this.searches = []
      this.searchesActiveByUser = []
      this.searchesPreviousByUser = []

    },

    async addPlayerToSearch(searchId: any) {
      try {

       const searchRef = doc(db, "searches", searchId);

       await updateDoc(searchRef, {
        usersAttending: arrayUnion({
          id: userStore.myUserInfo.id,
          name: userStore.myUserInfo.name,
          lastName : userStore.myUserInfo.lastName,
        }) 
       });
       
      } catch (error: any) {
        console.error('Error removing search:', error.message);
      }
    },

    async removeMeFromSearch(searchId: any) {
      try {

       const searchRef = doc(db, "searches", searchId);

       await updateDoc(searchRef, {
        usersAttending: arrayRemove({
          id: userStore.myUserInfo.id,
          name: userStore.myUserInfo.name,
          lastName : userStore.myUserInfo.lastName,
        }) 
       });
       
      } catch (error: any) {
        console.error('Error removing search:', error.message);
      }
    },

    async removeSearch(searchId: string) {
      try {
       
      } catch (error: any) {
        console.error('Error removing search:', error.message);
      }
    },

    async updateSearch(updatedSearch: any) {
      try {
      
      } catch (error: any) {
        console.error('Error updating search:', error.message);
      }
    },
  },

});

