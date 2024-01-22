<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>

      <ul>
      <li v-for="item in gameStore.games" :key="item.id">
        {{ item.id }}
      </li>
    </ul>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewDidEnter } from '@ionic/vue';
import { useGameStore } from '../store/game';

const gameStore = useGameStore();

onIonViewDidEnter(()  => {
   gameStore.loadGames()
})


</script>
