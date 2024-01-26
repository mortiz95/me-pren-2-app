<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-no-padding">
          <ion-row class="ion-align-items-center ion-margin">
            <ion-col>
              <div class="left-title ion-align-items-center">
                <ion-title>Crear juego</ion-title>
              </div>
            </ion-col>
            <ion-col>
              <ion-button
                @click="handleSubmit"
                class="ion-float-right"
                fill="outline"
              >
                <ion-icon :icon="checkmarkOutline"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <form @submit.prevent="handleSubmit()">
        <ion-list lines="none" class="ion-padding-horizontal">
          <ion-item>
            <ion-input
              v-model="game.province"
              :disabled="true"
              label="* Provincia"
              label-placement="floating"
            ></ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-input
              autofocus="true"
              v-model="game.city"
              label="* Municipio"
              label-placement="floating"
            >
            </ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-input
              v-model="game.place"
              label="* En que cancha jugas?"
              label-placement="floating"
            ></ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-input
              v-model="game.spots"
              type="number"
              label="* Cuantos jugadores necesitas?"
              label-placement="floating"
            ></ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-input
              v-model="selectedDateTimeParsed"
              label="* Fecha"
              label-placement="floating"
              @click="toggleDateTimeInput()"
            ></ion-input>
            <ion-datetime
              v-if="dateTimeVisible"
              v-model="game.date"
              ref="refDatetime"
              class="ion-margin-vertical"
              @ionChange="handleDateTimeChange"
            >
              <ion-buttons slot="buttons">
                <ion-button color="success" @click="toggleDateTimeInput()"
                  >Cancelar</ion-button
                >
                <ion-button color="success" @click="confirm()">Ok</ion-button>
              </ion-buttons>
            </ion-datetime>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-label> Anade informacion extra a tu partido: </ion-label>

            <ion-grid class="ion-padding-top ion-padding">
              <ion-row>
                <ion-col>
                  <Tags :tags="gameGender" @tagClicked="saveTagGameGender">
                  </Tags>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <Tags :tags="gameType" @tagClicked="saveTagGameType"> </Tags>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <Tags :tags="gameSize" @tagClicked="saveTagGameSize"> </Tags>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <Tags
                    :tags="gameGrassType"
                    @tagClicked="saveTagGameGrassType"
                  >
                  </Tags>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-item>
        </ion-list>
      </form>
      <ion-toast
        :isOpen="isFormError"
        class="custom-toast"
        position="bottom"
        :message="formErrorText"
        :duration="2000"
        @didDismiss="isFormError = false"
      ></ion-toast>
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
  checkmarkOutline,
} from "ionicons/icons";

import { ref } from "vue";
import Tags from "../components/Tags.vue";
import { auth } from "@/firebase";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import useDateParser from "@/composables/date";

const { parseDate } = useDateParser();

const dateTimeVisible = ref(false);
const refDatetime = ref();
const formErrorText = ref();
const isFormError = ref(false);

const currentDate = new Date();
const currentDateFormattedDate_ISO_8601 = format(
  currentDate,
  "yyyy-MM-dd'T'HH:mm:ssXXX"
); // ISO 8601 format

const selectedDateTimeParsed = ref(
  parseDate(currentDateFormattedDate_ISO_8601)
);

const game = ref({
  country: "Argentina",
  province: "Salta",
  city: "",
  date: currentDateFormattedDate_ISO_8601,
  place: "",
  createdByUser: auth!.currentUser!.uid,
  dateCreated: Timestamp.now(),
  spots: null,
  gender: "",
  type: "",
  size: "",
  grassType: "",
  status: "",
  description: "",
  usersAttending: [],
  usersWaiting: [],
});

const gameGender = [
  { text: "Masculino", value: "M", icon: maleOutline },
  { text: "Femenino", value: "F", icon: femaleOutline },
  { text: "Mixto", value: "Mix", icon: maleFemaleOutline },
];

const gameType = [
  { text: "Entrenamiento", value: "T", icon: barbellOutline },
  { text: "Amistoso", value: "F", icon: bodyOutline },
  { text: "Partido de campeonato", value: "GC", icon: trophyOutline },
];
const gameSize = [
  { text: "5 VS 5", value: "5VS5" },
  { text: "7 VS 7", value: "7VS7" },
  { text: "8 VS 8", value: "8VS8" },
  { text: "9 VS 9", value: "9VS9" },
  { text: "11 VS 11", value: "5VS5" },
];
const gameGrassType = [
  { text: "Cesped Sintetico", value: "CS", icon: invertMode },
  { text: "Cesped Natural", value: "CN", icon: leafOutline },
];

const toggleDateTimeInput = () => {
  dateTimeVisible.value = !dateTimeVisible.value;
};

const confirm = () => {
  refDatetime.value.$el.confirm();
  toggleDateTimeInput();
};

const handleDateTimeChange = (event: CustomEvent) => {
  game.value.date = event.detail.value;
  selectedDateTimeParsed.value = parseDate(event.detail.value);
};

const saveTagGameType = (gameType: any) => {
  game.value.type = gameType;
};

const saveTagGameGender = (gameGender: any) => {
  game.value.type = gameGender;
};

const saveTagGameSize = (gameSize: any) => {
  game.value.type = gameSize;
};

const saveTagGameGrassType = (gameGrassType: any) => {
  game.value.type = gameGrassType;
};

const handleSubmit = () => {
  if (game.value.city != "") {
    if (game.value.place != "") {
      if (game.value.date != "") {
        if (game.value.spots && game.value.spots > 0 && game.value.spots < 6) {
          isFormError.value = false;
        } else {
          formErrorText.value = "Debe elegir entre 1 y 5 jugadores";
          isFormError.value = true;
          return
        }
      } else {
        formErrorText.value = "Debe completar los campos obligatorios";
        isFormError.value = true;
        return
      }
    } else {
      formErrorText.value = "Debe completar los campos obligatorios";
      isFormError.value = true;
      return
    }
  } else {
    formErrorText.value = "Debe completar los campos obligatorios";
    isFormError.value = true;
    return
  }
};
</script>

<style scoped>
</style>