<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row>
            <ion-col size="12">
              <h2>Mis Busquedas</h2>
              <p>
                Aqui encontraras el historial de las busquedas que has creado.
              </p>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-segment :value="selectedTab">
              <ion-segment-button
                value="active"
                @click="selectedTab = 'active'"
              >
                <ion-label>Activas</ion-label>
              </ion-segment-button>
              <ion-segment-button
                value="past"
                @click="selectedTab = 'past'"
              >
                <ion-label>Pasadas</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-show="!loading"  v-if="selectedTab === 'active'" class="ion-padding-horizontal">
        <div v-if="gameStore.gamesActiveByUser.length != 0">
          <ActiveGameItem
            v-for="(item, index) in gameStore.gamesActiveByUser"
            :key="index"
            :gameInfo="item"
          >
          </ActiveGameItem>
        </div>
        <div v-else class="flex-justify-center ion-padding">
          No hay datos disponibles.
        </div>
      </div>

      <div v-if="selectedTab === 'past'" class="ion-padding-horizontal">
        <div v-if="gameStore.gamesPreviousByUser.length != 0">
          <ActiveGameItem
            v-for="(item, index) in gameStore.gamesPreviousByUser"
            :key="index"
            :gameInfo="item"
          >
          </ActiveGameItem>
        </div>
        <div v-else class="flex-justify-center ion-padding">
          No hay datos disponibles.
        </div>
      </div>
      <div v-show="loading" class="loading">
        <ion-spinner></ion-spinner>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  femaleOutline,
  maleOutline,
  maleFemaleOutline,
  bodyOutline,
  trophyOutline,
  barbellOutline,
  leafOutline,
  invertMode,
} from "ionicons/icons";

import {
  onIonViewDidEnter,
  onIonViewDidLeave,
  onIonViewWillEnter,
  onIonViewWillLeave,
} from "@ionic/vue";
import { ref } from "vue";
import { useGameStore } from "../store/game";
import ActiveGameItem from "../components/Item/ActiveGameItem.vue";

const loading = ref(true);
const gameStore = useGameStore();
const selectedTab = ref("active");

onIonViewWillEnter(async () => {
  gameStore.clearData();
  await gameStore.loadActiveGamesByUser();
  await gameStore.loadPastGamesByUser();
  loading.value = false;
});

onIonViewDidLeave(() => {
  loading.value = true;
});

const gameGender = [
  { text: "Masculino", value: "M", icon: maleOutline },
  { text: "Femenino", value: "F", icon: femaleOutline },
  { text: "Mixto", value: "Mix", icon: maleFemaleOutline },
];
const gameType = [
  { text: "Entrenamiento", value: "T", icon: barbellOutline },
  { text: "Amistoso", value: "F", icon: bodyOutline },
  { text: "Partido de campeonato", value: "GC", icon: trophyOutline },
];
const gameSize = [
  { text: "5 VS 5", value: "5VS5" },
  { text: "7 VS 7", value: "7VS7" },
  { text: "8 VS 8", value: "8VS8" },
  { text: "9 VS 9", value: "9VS9" },
  { text: "11 VS 11", value: "5VS5" },
];
const gameGrassType = [
  { text: "Cesped Sintetico", value: "CS", icon: invertMode },
  { text: "Cesped Natural", value: "CN", icon: leafOutline },
];
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
}
</style>