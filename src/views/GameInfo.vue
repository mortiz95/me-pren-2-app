<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row>
            <ion-col size="6">
              <ion-icon :icon="chevronBackOutline" @click="goBack()"></ion-icon>
            </ion-col>
            <ion-col size="6">
              <ion-icon :icon="shareOutline" class="ion-float-end"></ion-icon>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-segment :value="selectedTab">
              <ion-segment-button value="info" @click="selectedTab = 'info'">
                <ion-label>Info</ion-label>
              </ion-segment-button>
              <ion-segment-button
                value="players"
                @click="selectedTab = 'players'"
              >
                <ion-label>Jugadores</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="selectedTab === 'info'" class="ion-padding">
        <ion-grid class="border-bottom">
          <ion-row class="ion-align-items-center">
            <ion-col size="2">
              <ion-icon :icon="locationOutline"></ion-icon>
            </ion-col>
            <ion-col size="10">
              <ion-text class="ion-text-uppercase">
                {{ gameInfo.place }}</ion-text
              >
            </ion-col>
          </ion-row>
          <ion-row class="ion-align-items-center">
            <ion-col size="2">
              <ion-icon :icon="calendarOutline"></ion-icon>
            </ion-col>
            <ion-col size="10">
              {{ gameDateParsed }}
            </ion-col>
          </ion-row>
        </ion-grid>
        <div v-if="loading" class="spinner-container">
          <ion-spinner></ion-spinner>
        </div>
      </div>
      <div v-if="selectedTab === 'players'">
        <ion-grid>
          <ion-row>
            <ion-col>
              <h1>hola 2</h1>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div v-if="loading" class="spinner-container">
          <ion-spinner></ion-spinner>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { onIonViewDidEnter } from "@ionic/vue";
import {
  chevronBackOutline,
  informationOutline,
  shareOutline,
  personOutline,
  locationOutline,
  calendarOutline,
} from "ionicons/icons";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Game } from "../types/Game";
import useDateParser from "@/composables/date";
import { Timestamp } from "firebase/firestore";

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const selectedTab = ref("info");

const routeParam: any = route?.params?.info;
const gameInfo: Game = JSON.parse(routeParam);

const { parseDateTimeStampToISO } = useDateParser();

const gameDateParsed = computed(() => {
  const firestoreTimestamp = new Timestamp(
    gameInfo.date.seconds,
    gameInfo.date.nanoseconds
  );
  return parseDateTimeStampToISO(firestoreTimestamp);
});

const goBack = () => {
  router.back();
};
onIonViewDidEnter(() => {
  loading.value = false;
});
</script>
  
  <style scoped>
ion-icon {
  font-size: 30px;
}
.border-bottom {
  border-bottom: 1px solid var(--white);
}
</style>
  