import { defineStore } from "pinia";
import { db } from "@/firebase";
import {
  collection,
  doc,
  setDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  updateDoc,
  collectionGroup,
  arrayUnion,
} from "firebase/firestore";
import User from "../types/User";
import { Timestamp } from "firebase/firestore";
import { auth } from "@/firebase";
import Search from "@/types/Search";
import Historical from "@/types/Historical";
import { AnimationStyles } from "@ionic/core/dist/types/utils/animation/animation-interface";

export const useUserStore = defineStore("user", {
  state: () => ({
    myUserInfo: {} as User,
    myNextGames: [] as Historical[],
    userInfo: {} as User,
  }),

  actions: {
    async loadUserInfo(userId: any) {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          userData.id = docSnap.id; // Add user ID to my user data
          this.userInfo = userData as User;
        }
      } catch (error: any) {
        console.error("Error loading user info:", error.message);
      }
    },

    async loadMyNextGames() {
      try {
        this.myNextGames = [];
        const docRef = doc(db, "users", auth!.currentUser!.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userNextGamesData = docSnap.data().attendedSearches;
          const pendingItem = userNextGamesData.filter(
            (item: any) => item.status === "pending"
          );
          pendingItem.forEach((pendingItem: any) => {
            this.myNextGames.push(pendingItem);
          });
        }
      } catch (error: any) {
        console.error("Error loading searches:", error.message);
      }
    },

    async loadMyUserInfo() {
      try {
        const docRef = doc(db, "users", auth!.currentUser!.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          userData.id = docSnap.id; // Add user ID to my user data
          this.myUserInfo = userData as User;
        }
      } catch (error: any) {
        console.error("Error loading my user info:", error.message);
      }
    },

    async addSearchToMySearchesAttended(searchId: string) {
      try {
        // Get updated doc with users attending ids
        const docRef = doc(db, "searches", searchId);
        const docSnap = await getDoc(docRef);

        const searchDocRef = doc(db, "users", auth!.currentUser!.uid);

        await updateDoc(searchDocRef, {
          attendedSearches: arrayUnion({
            search: docSnap.data(),
            searchId: searchId,
            status: "pending", //Pending, Completed, Failed
            userGone: false,
            starsRating: 0,
          }),
        });

        await this.loadMyNextGames();
      } catch (error: any) {
        console.error("Error loading adding to historical:", error.message);
      }
    },

    async removeSearchFromMySearchedAttended(searchId: string) {
      const searchDocRef = doc(db, "users", auth!.currentUser!.uid);
      const docSnap = await getDoc(searchDocRef);
      if (docSnap.exists()) {
        const attendedSearches = docSnap.data().attendedSearches || []; // Ensure attendedSearches is an array
        const filteredSearchesArray = attendedSearches.filter(
          (item: any) => item.searchId !== searchId
        );

        await updateDoc(searchDocRef, {
          attendedSearches: filteredSearchesArray,
        });
      }
    },

    async addUser(userId: any, userInfo: any) {
      try {
        await setDoc(doc(db, "users", userId), userInfo);
      } catch (error) {}
    },

   async updateUserInfo(userInfo: any) {
    try {
      if(userInfo.dateOfBirth != null){
        const dateString = userInfo.dateOfBirth;
        const dateObject = new Date(dateString);
        const parseDOB = Timestamp.fromDate(dateObject)
        userInfo.dateOfBirth = parseDOB
      }
      const docRef = doc(db, "users", auth!.currentUser!.uid);
      await updateDoc(docRef, userInfo);
    } catch (error) {
      
    }
   },
  },
});
