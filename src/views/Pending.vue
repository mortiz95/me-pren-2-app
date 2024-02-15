<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row>
            <ion-col size="auto" class="ion-no-padding">
              <h2>Te anotaste en una busqueda? </h2>
            </ion-col>
            <ion-col size="auto" class="ion-no-padding" >
              <ion-title size="small" class="ion-no-padding ion-padding-bottom">
                Aquí encontrarás la información de las búsquedas en las que te has registrado para participar.
              </ion-title>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
        <div v-if="showInfo">
         <div v-show="!loading">
           <div v-if="userStore.myNextGames.length > 0">
          <PendingItem
            v-for="(item, index) in userStore.myNextGames"
            :key="index"
            :nextGameInfo="item"
            :index="index + 1"
            @removeUser="showingLoading"
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
        </div> 
        <div v-else>
        <ion-grid class="wrapper-success">
          <ion-row
            style="flex: 1"
            class="ion-align-items-center ion-justify-content-center"
          >
            <ion-col size="10">
              <div class="ion-align-items-center flex-column ion-text-center">
                <ion-icon
                  :icon="personRemoveOutline"
                  class="icon-60"
                ></ion-icon>
                <h1>Te has dado de baja correctamente</h1>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <ion-button class="ion-padding-horizontal btn-secondary ion-text-uppercase" expand="full" shape="round" @click="backToPending()">
              Volver
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
        </div>
    </ion-content>
  </ion-page>
</template>
  
  <script setup lang="ts">
import { useUserStore } from "@/store/user";
import {
  personRemoveOutline
} from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  onIonViewDidLeave,
} from "@ionic/vue";
import PendingItem from "@/components/Item/PendingItem.vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { ref } from "vue";

const loading = ref(true);
const userStore = useUserStore();
const showInfo = ref(true);

onIonViewDidLeave(() => {
  loading.value = true;
});

onIonViewWillEnter(async () => {
  await userStore.loadMyNextGames();
  loading.value = false;
});

const showingLoading = () => {
  showInfo.value = false;
};

const backToPending = async  () => {
  await userStore.loadMyNextGames();
  showInfo.value = true;
};


</script>
  
<style>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
}

.wrapper-success {
  display: flex;
  flex-direction: column;
  min-height: 75vh;
  padding: 0;
}

.icon-60 {
  font-size: 60px;
}

</style>