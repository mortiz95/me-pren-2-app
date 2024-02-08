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
      <div v-show="!loading"  v-if="selectedTab === 'active'">
        <div v-if="searchStore.searchesActiveByUser.length != 0">
          <ActiveSearchItem
            v-for="(item, index) in searchStore.searchesActiveByUser"
            :key="index"
            :searchInfo="item"
          >
          </ActiveSearchItem>
        </div>
        <div v-else class="flex-justify-center ion-padding">
          No hay datos disponibles.
        </div>
      </div>

      <div v-if="selectedTab === 'past'" >
        <div v-if="searchStore.searchesPreviousByUser.length != 0">
          <ActiveSearchItem
            v-for="(item, index) in searchStore.searchesPreviousByUser"
            :key="index"
            :searchInfo="item"
          >
          </ActiveSearchItem>
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
import { useSearchStore } from "../store/search";
import ActiveSearchItem from "../components/Item/ActiveSearchItem.vue";

const loading = ref(true);
const searchStore = useSearchStore();
const selectedTab = ref("active");

onIonViewWillEnter(async () => {
  searchStore.clearData();
  await searchStore.loadActiveSearchesByCurrentUser();
  await searchStore.loadPastSearchesByCurrentUser();
  loading.value = false;
});

onIonViewDidLeave(() => {
  loading.value = true;
});

</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
}
</style>