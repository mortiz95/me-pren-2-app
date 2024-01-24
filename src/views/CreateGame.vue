<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 2</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list class="ion-padding">
        <ion-item class="ion-padding-top">
          <ion-input v-model="input1" label="Provincia" label-placement="floating"></ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
           <ion-input v-model="input1" label="Municipio" label-placement="floating"></ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
          <ion-input v-model="input1" label="Lugar" label-placement="floating"></ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
          <ion-input v-model="input1" label="Confirmar Contraseña" label-placement="floating"></ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
          <ion-input label="Hora" label-placement="floating"></ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
          <ion-input v-model="input3" label="Cuantos jugadores necesitas?" label-placement="floating"></ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
          <ion-input v-model="input4" label="Que tipo de partido es? Mixto, Masculino, Femenino" label-placement="floating"></ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
          <ion-input v-model="input5" label="5VS, 6V6, 7V7, 8VS8, 9VS9, 11VS11" label-placement="floating"></ion-input>
        </ion-item>

        <ion-button @click="submitForm">Submit</ion-button>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/vue";

const input1 = ref("");
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const input5 = ref("");

const submitForm = () => {
  // Handle form submission logic
  console.log(
    "Form submitted:",
    input1.value,
    input2.value,
    input3.value,
    input4.value,
    input5.value
  );
};
</script>

<style scoped>
</style>