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

    async loadMyUserInfo() {
      try {
        const docRef = doc(db, "users", auth!.currentUser!.uid);
        const docSnap = await getDoc(docRef);
        console.log("myUserInfo()", docSnap.data());
        if (docSnap.exists()) {
          const userData = docSnap.data() as User;
          userData.id = docSnap.id; // Add user ID to my user data
          this.myUserInfo = userData as User;
        }
      } catch (error: any) {
        console.error("Error loading my user info:", error.message);
      }
    },

    async addSearchToMySearchedAttended(search: Search) {
      try {
        const searchDocRef = doc(db, "users", auth!.currentUser!.uid);

        await updateDoc(searchDocRef, {
          attendedSearches: arrayUnion({
            search: search,
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

    removeUser() {},
    updateUser() {},
  },
});
