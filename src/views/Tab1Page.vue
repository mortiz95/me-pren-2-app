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
      <li v-for="item in items" :key="item.id">
        {{ item.id }}
        <button>Update</button>
        <button>Delete</button>
      </li>
    </ul>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewWillEnter } from '@ionic/vue';
import { loadItems, items } from '../composables/firestore/useMatches';

onIonViewWillEnter(async ()  => {

  await loadItems(); // Load items when the component is mounted

})


</script>
