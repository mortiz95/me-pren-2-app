<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar>
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="searchOutline" />
          <ion-label>Buscar</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon aria-hidden="true" :icon="addCircleOutline" />
          <ion-label>Crear</ion-label>
        </ion-tab-button>

<!--         <ion-tab-button tab="tab4" href="/tabs/tab4">
          <ion-icon aria-hidden="true" :icon="ticketOutline" />
          <ion-label>Por jugar</ion-label>
        </ion-tab-button> -->

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon aria-hidden="true" :icon="albumsOutline" />
          <ion-label>Busquedas</ion-label>
        </ion-tab-button> 

        <ion-tab-button tab="tab5" href="/tabs/tab5">
          <ion-icon aria-hidden="true" :icon="personCircleOutline" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { searchOutline, addCircleOutline, albumsOutline, personCircleOutline,ticketOutline } from 'ionicons/icons';
</script>
