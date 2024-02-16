<template>
  <ion-page>
    <ion-header class="ion-padding-horizontal">
      <ion-toolbar>
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <ion-col size="2">
              <ion-avatar>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </ion-avatar>
            </ion-col>
            <ion-col size="8">
              <ion-row>
                <ion-col size="12">
                  <h5 class="ion-no-margin">CARLOS MATIAS</h5>
                </ion-col>
                <ion-col size="12">5 partidos jugados</ion-col>
              </ion-row>
            </ion-col>
            <ion-col size="2" class="ion-text-end">
              <ion-icon :icon="settingsOutline" class="icon-settings"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <div>
        <ion-grid>
          <ion-row class="ion-margin-top ion-align-items-center">
            <ion-col>
              <h4 class="ion-no-margin">Sobre Mi</h4>
            </ion-col>
            <ion-col>
              <div class="ion-float-end">
                <ion-icon :icon="pencilOutline" class="ion-float-end icon-edit"></ion-icon>
                <ion-text>Editar</ion-text>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <div>
                <ion-list lines="true">
                  <ion-item>
                    <ion-icon aria-hidden="true" :icon="maleOutline" slot="start"></ion-icon>
                    <ion-label>Genero</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon aria-hidden="true" :icon="locationOutline" slot="start"></ion-icon>
                    <ion-label>Ciudad</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon aria-hidden="true" :icon="balloonOutline" slot="start"></ion-icon>
                    <ion-label>Fecha de Nacimiento</ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon aria-hidden="true" :icon="callOutline" slot="start"></ion-icon>
                    <ion-label>Numero de telefono: </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon aria-hidden="true" :icon="shirtOutline" slot="start"></ion-icon>
                    <ion-label>Equipo: </ion-label>
                  </ion-item>
                </ion-list>
              </div>
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-top ion-align-items-center">
            <ion-col size="12">
              <h4 class="ion-no-margin">Proximos por jugar:</h4>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
               
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">

            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import {
  settingsOutline,
  pencilOutline,
  maleOutline,
  maleFemaleOutline,
  bodyOutline,
  trophyOutline,
  barbellOutline,
  flagOutline,
  balloonOutline,
  locationOutline,
  callOutline,
  shirtOutline
} from "ionicons/icons";


</script>

<style scoped>
ion-content {
  --background: var(--black) !important
}

.icon-settings {
  font-size: 30px;
}

.icon-edit {
  font-size: 25px !important;
}</style>