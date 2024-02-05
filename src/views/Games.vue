<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row class="ion-align-items-end">
            <ion-col size="auto" class="ion-no-padding"> <div><h2>Busquedas en Salta,</h2></div> </ion-col>
            <ion-col class="ion-no-padding ml-5">
              <ion-select
                    :value="city"
                    @ionChange="handleChangeCity($event)"
                    justify="start"
                    class="title-city ion-text-capitalize"
                    :interface-options="options"
                  >
                    <ion-select-option selected value="capital"
                      >Capital</ion-select-option
                    >
                    <ion-select-option value="san lorenzo"
                      >San Lorenzo</ion-select-option
                    >
                    <ion-select-option value="cerrillos">
                      Cerrillos
                    </ion-select-option>
                    <ion-select-option value="vaqueros">
                      Vaqueros</ion-select-option
                    >
                    <ion-select-option value="san luis"
                      >San Luis</ion-select-option
                    >
              </ion-select>
            </ion-col>
          </ion-row>
              <p>
                Aqui encontraras las busquedas creados por personas que
                necesitan sumar jugadores a su equipo.
              </p>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Calendar class="fixed-component"></Calendar>
      <div v-show="!loading" class="scrolling-list">
        <div v-if="gameStore.games.length > 0">
          <GameItem
            v-for="item in gameStore.games"
            :key="item.id"
            :gameInfo="item"
          >
          </GameItem>
        </div>
        <div v-else class="flex-justify-center no-data">
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

import { onIonViewDidEnter, onIonViewDidLeave } from "@ionic/vue";
import { useGameStore } from "../store/game";
import GameItem from "../components/Item/GameItem.vue";
import Calendar from "../components/Calendar/Calendar.vue";
import { ref } from "vue";

const gameStore = useGameStore();
const loading = ref(true);
const city = ref("capital");

onIonViewDidEnter(async () => {
  gameStore.clearData();
  await gameStore.loadGames(city.value);
  loading.value = false;
});

onIonViewDidLeave(() => {
  loading.value = true;
  gameStore.clearData();
});

const options: any = {
  cssClass: "my-custom-interface",
};

const handleChangeCity = (event: any) => {
  city.value = event.detail.value

};

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
.scrolling-list {
  margin-top: 80px; /* Adjust to match the height of the fixed component */
  overflow-y: auto; /* Enable vertical scrolling for the list */
  height: calc(100vh - 80px); /* Adjust to fit the remaining viewport height */
}

.no-data {
  margin-top: 35vh; /* Adjust to match the height of the fixed component */
  overflow-y: auto; /* Enable vertical scrolling for the list */
  height: calc(100vh - 35vh); /* Adjust to fit the remaining viewport height */
}
.fixed-component {
  width: 100%;
  overflow-x: auto;
  position: fixed;
  z-index: 999; /* Ensure it's above the scrolling list */
  background-color: rgb(100, 101, 103);
}

.title-city {
  font-size: 20px;
  color: var(--gray);
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
}
</style>