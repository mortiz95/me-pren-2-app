<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row class="ion-align-items-center">
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
      <div v-if="selectedTab === 'info'" class="ion-padding-horizontal">
        <ion-grid class="wrapper">
          <div>
            <ion-row>
              <ion-col size="10">
                <h1>{{ gameInfo.province }}, {{ gameInfo.city }}</h1>
              </ion-col>
            </ion-row>
          </div>
          <div class="border-bottom ion-padding-vertical">
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
            <ion-row class="ion-align-items-center">
              <ion-col size="2">
                <ion-icon :icon="gameControllerOutline"></ion-icon>
              </ion-col>
              <ion-col size="10" class="ion-text-capitalize">
                {{ gameInfo.sport }}
              </ion-col>
            </ion-row>
          </div>
          <div class="border-bottom">
            <div class="ion-padding-vertical">
              <ion-row class="ion-align-items-center">
                <ion-col size="auto">Lugares disponibles: </ion-col>
                <ion-col>
                  <ion-badge color="success" class="tags">  {{ checkIsFull }} </ion-badge>
                </ion-col>
              </ion-row>
            </div>
          </div>
          <div class="border-bottom">
            <div class="ion-padding-vertical">
              <ion-row class="ion-align-items-center ion-padding-vertical">
                <ion-col size="4">Info del evento: </ion-col>
                <ion-col size="8">
                  <Tags :tags="gameSize"> </Tags>

                  <Tags :tags="gameType"> </Tags>

                  <Tags :tags="gameGender"> </Tags>

                  <Tags :tags="gameGrassType"> </Tags>
                </ion-col>
              </ion-row>
            </div>
          </div>
          <div class="border-bottom">
            <ion-row class="ion-padding-vertical">
              <ion-col size="auto">Creado por: </ion-col>
              <ion-col size="auto">{{ gameInfo.createdByUser }}</ion-col>
            </ion-row>
          </div>
          <div v-if="gameInfo.description != ''" class="border-bottom">
            <ion-row class="ion-padding-vertical">
              <ion-col size="auto">Description: </ion-col>
              <ion-col size="auto">{{ gameInfo.description }}</ion-col>
            </ion-row>
          </div>
          <ion-row style="flex: 1; align-items: flex-end">
            <ion-col size="12">
              <ion-button @click="goToConfirmReservation()" color="warning" expand="full">Unirse</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div v-if="loading" class="spinner-container">
          <ion-spinner></ion-spinner>
        </div>
      </div>
      <div v-if="selectedTab === 'players'" class="ion-padding-horizontal">
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
  gameControllerOutline,
} from "ionicons/icons";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Game } from "../types/Game";
import useDateParser from "@/composables/date";
import { Timestamp } from "firebase/firestore";
import Tags from "@/components/Tags/Tags.vue";

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const selectedTab = ref("info");

//Param info
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

const gameSize = computed(() => {
  return [gameInfo.size];
});

const gameType = computed(() => {
  return [gameInfo.type];
});

const gameGender = computed(() => {
  return [gameInfo.gender];
});

const gameGrassType = computed(() => {
  return [gameInfo.grassType];
});

const availableSpots = computed(() => {
  return gameInfo.spots - gameInfo.usersAttending.length
});

const checkIsFull = computed(() => {
  return gameInfo ? (gameInfo.spots === gameInfo.usersAttending.length ? 'FULL' : 'Quedan: ' + availableSpots.value + ' lugares') : ''
});

const goToConfirmReservation = () => {
  router.push({ name: "ConfirmReservation" });
};

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

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 76vh;
  padding: 0;
}
</style>
  