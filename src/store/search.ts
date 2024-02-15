import { defineStore } from "pinia";
import { db, auth } from "@/firebase";
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
  arrayRemove,
  getDoc,
  limit,
} from "firebase/firestore";
import { Search } from "../types/Search";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const searchesCollection = collection(db, "searches");

export const useSearchStore = defineStore("search", {
  state: () => ({
    searches: [] as Search[],
    myActiveSearches: [] as Search[],
    myPastSearches: [] as Search[],
  }),

  actions: {
    async loadSearches(city: string, date: any) {
      try {
        const startTimestamp = date;
        const endTimestamp = new Timestamp(
          date.seconds + 86399,
          date.nanoseconds
        );
        const q = query(
          searchesCollection,
          where("city", "==", city),
          where("date", ">=", startTimestamp),
          where("date", "<=", endTimestamp)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // Show searches what are not equals to mine
          if (doc.data().organizerId != auth!.currentUser!.uid) {
            const searchData = doc.data() as Search;
            searchData.id = doc.id; // Add document ID to search data
            this.searches.push(searchData);
          }
        });
      } catch (error: any) {
        console.error("Error loading searches:", error.message);
      }
    },

    async loadMyActiveSearches() {
      try {
        const currentDate = Timestamp.now();
        const q = query(
          searchesCollection,
          where("organizerId", "==", auth!.currentUser!.uid),
          where("date", ">", currentDate),
          orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.myActiveSearches.push(doc.data() as Search);
        });
      } catch (error: any) {
        console.error("Error loading searches:", error.message);
      }
    },

    async loadMyPastSearches() {
      try {
        const currentDate = Timestamp.now();
        const q = query(
          searchesCollection,
          where("organizerId", "==", auth!.currentUser!.uid),
          where("date", "<", currentDate),
          orderBy("date", "desc"),
          limit(30)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.myPastSearches.push(doc.data() as Search);
        });
      } catch (error: any) {
        console.error("Error loading searches:", error.message);
      }
    },

    async addSearch(newSearch: any) {
      const searchDate = new Date(newSearch.date);
      try {
        const newSearchInfo: Search = {
          country: newSearch.country,
          province: newSearch.province,
          city: newSearch.city,
          place: newSearch.place,
          date: Timestamp.fromDate(searchDate),
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
          usersAttending: [],
          usersWaiting: [],
        };

        // Generate a new random ID for the search created
        const newSearchRef = doc(collection(db, "searches"));

        await setDoc(doc(db, "searches", newSearchRef.id), newSearchInfo);
      } catch (error: any) {
        console.error("Error adding search:", error.message);
      }
    },

    clearData() {
      this.searches = [];
      this.myActiveSearches = [];
      this.myPastSearches = [];
    },

    async addPlayerToSearch(searchId: any) {
      try {
        const searchRef = doc(db, "searches", searchId);

        await updateDoc(searchRef, {
          usersAttending: arrayUnion({
            id: userStore.myUserInfo.id,
            name: userStore.myUserInfo.name,
            lastName: userStore.myUserInfo.lastName,
          }),
        });

        await updateDoc(searchRef, {
          usersIdAttending: arrayUnion(userStore.myUserInfo.id),
        });
      } catch (error: any) {
        console.error("Error removing search:", error.message);
      }
    },

    async removeMeFromSearch(searchId: any) {
      try {
        const searchDocRef = doc(db, "searches", searchId);
        const docSnap = await getDoc(searchDocRef);

        // usersAttending
        if (docSnap.exists()) {
          const usersAttending = docSnap.data().usersAttending || []; // Ensure attendedSearches is an array
          const filteredUsersAttendingArray = usersAttending.filter(
            (item: any) => item.id !== auth!.currentUser!.uid
          );
          await updateDoc(searchDocRef, {
            usersAttending: filteredUsersAttendingArray,
          });
        }

        // usersIdAttending
        if (docSnap.exists()) {
          await updateDoc(searchDocRef, {
            usersIdAttending: arrayRemove(auth!.currentUser!.uid),
          });
        }
      } catch (error: any) {
        console.error("Error removing search:", error.message);
      }
    },

    async removeSearch(searchId: string) {
      try {
      } catch (error: any) {
        console.error("Error removing search:", error.message);
      }
    },

    async updateSearch(updatedSearch: any) {
      try {
      } catch (error: any) {
        console.error("Error updating search:", error.message);
      }
    },
  },
});
