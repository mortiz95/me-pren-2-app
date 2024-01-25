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
          <ion-input
            v-model="game.province"
            :disabled="true"
            label="* Provincia"
            label-placement="floating"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
          <ion-input
            v-model="game.city"
            label="* Municipio"
            label-placement="floating"
          >
          </ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
          <ion-input
            v-model="game.place"
            label="* En que cancha jugas?"
            label-placement="floating"
          ></ion-input>
        </ion-item>

        <ion-item class="ion-padding-top">
          <ion-input
            v-model="game.spots"
            type="number"
            label="* Cuantos jugadores necesitas?"
            label-placement="floating"
          ></ion-input>
        </ion-item>

       <ion-item lines="none" class="ion-padding-top">
          <ion-input v-model="selectedDateTimeParsed" label="* Fecha" label-placement="floating" @click="toggleDateTimeInput()"></ion-input>
          <ion-datetime v-if="dateTimeVisible" v-model="game.date" ref="refDatetime" class="ion-margin-vertical" @ionChange="handleDateTimeChange">
            <ion-buttons slot="buttons">
              <ion-button color="success" @click="toggleDateTimeInput()">Cancelar</ion-button>
              <ion-button color="success" @click="confirm()">Ok</ion-button>
            </ion-buttons>
          </ion-datetime>
        </ion-item> 

        <ion-item lines="none" class="ion-padding-top">
          <ion-label v-model="game.gender">
            Que tipo de partido es? Mixto, Masculino, Femenino</ion-label
          >
        </ion-item>

        <ion-item lines="none" class="ion-padding-top">
          <ion-label v-model="game.type"
            >Que tipo de partido es? Amistoso, Entrenamiento, Partido de
            campeonato</ion-label
          >
        </ion-item>

        <ion-item lines="none" class="ion-padding-top">
          <ion-label v-model="game.size"
            >5VS, 6V6, 7V7, 8VS8, 9VS9, 11VS11</ion-label
          >
        </ion-item>

        <ion-item lines="none" class="ion-padding-top">
          <ion-label v-model="game.grassType"
            >Tipo de cancha: Cesped sintetico o natural</ion-label
          >
        </ion-item>

        <ion-button @click="submitForm">Submit</ion-button>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { auth } from "@/firebase";
import { Timestamp } from "firebase/firestore";
import { format } from 'date-fns';
import  useDateParser   from "@/composables/date";

const { parseDate } = useDateParser();

const dateTimeVisible = ref(false);
const refDatetime = ref();

const currentDate = new Date();
const currentDateFormattedDate_ISO_8601 = format(currentDate, "yyyy-MM-dd'T'HH:mm:ssXXX"); // ISO 8601 format

const selectedDateTimeParsed = ref(parseDate(currentDateFormattedDate_ISO_8601)) 

const game = ref({
  country: 'Argentina',
  province: 'Salta',
  city: '',
  date: currentDateFormattedDate_ISO_8601,
  place: '',
  createdByUser: auth!.currentUser!.uid,
  dateCreated: Timestamp.now(),
  spots: 1,
  gender: '',
  type: '',
  size: '',
  grassType: '',
  status: '',
  description: '',
  usersAttending: [],
  usersWaiting: [],
});

const toggleDateTimeInput = () => {
  dateTimeVisible.value = !dateTimeVisible.value;
};

const confirm = () => {
  refDatetime.value.$el.confirm();
  toggleDateTimeInput();
};

const handleDateTimeChange = (event: CustomEvent) => {
  game.value.date = event.detail.value
  selectedDateTimeParsed.value = parseDate(event.detail.value)
 
};

const submitForm = () => {};
</script>

<style scoped>
</style>