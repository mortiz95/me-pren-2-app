<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row>
            <ion-col size="9" class="ion-padding-horizontal">
                <h2>Busca Partidos</h2>
                <p>Aqui encontraras a las jugadores que estan buscando sumar gente a su equipo .</p>
            </ion-col>
            <ion-col>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <Game 
        v-for="item in gameStore.games" 
        :key="item.id"
        :gameInfo="item"
        >
      </Game>

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
  checkmarkOutline,
} from "ionicons/icons";

import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import { useGameStore } from '../store/game';
import Game from '../components/Item/GameItem.vue'

const gameStore = useGameStore();

onIonViewDidEnter(()  => {
   gameStore.loadGames()
})

onIonViewDidLeave(()  => {
   gameStore.clearData()
})

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
