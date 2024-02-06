<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
            <ion-grid class="ion-padding">
          <ion-row class="ion-align-items-center" >
            <ion-col size="auto">
              <ion-icon :icon="chevronBackOutline" @click="goBack()"></ion-icon>
            </ion-col>
            <ion-col>
              <h2 class="ion-no-margin ion-margin-start"> Confirmar reserva</h2>
            </ion-col>
          </ion-row>
        </ion-grid>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">

  
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  import { useRouter, useRoute } from "vue-router";
  import {
  chevronBackOutline,

} from "ionicons/icons";
 
  const router = useRouter();

   const goBack = () => {
    router.back();
  };
  
  </script>
  

  <style scoped>
ion-icon {
  font-size: 30px;
}
</style>