<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-grid class="ion-padding">
          <ion-row>
            <ion-col size="12">
              <h2>Partidos pendientes</h2>
              <p>
                Aqui encontraras las busquedas en las que te has anotado para participar.
              </p>
            </ion-col>
          </ion-row>
        </ion-grid>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">Tab 4</ion-title>
          </ion-toolbar>
        </ion-header>
  
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  </script>
  