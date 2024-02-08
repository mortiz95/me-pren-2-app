<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row>
            <ion-col size="12">
              <h2>Partidos por jugar</h2>
              <p>
                Aqui encontraras las busquedas en las que te has anotado para
                participar.
              </p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-show="!loading">
        <div v-if="searchStore.myNextGames.length > 0">
          <PendingItem
            v-for="(item, index) in searchStore.myNextGames"
            :key="index"
            :searchInfo="item"
          >
          </PendingItem>
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
import { useSearchStore } from "@/store/search";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  onIonViewDidLeave,
} from "@ionic/vue";
import PendingItem from "@/components/Item/PendingItem.vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { ref } from "vue";

const loading = ref(true);
const searchStore = useSearchStore();

onIonViewDidLeave(() => {
  loading.value = true;
});

onIonViewWillEnter(async () => {
  await searchStore.loadMyNextGames();
  loading.value = false;
});
</script>
  
<style>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
}

</style>