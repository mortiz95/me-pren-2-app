<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row>
            <ion-col size="9" class="ion-padding-horizontal">
                <h2>Crear Evento</h2>
                <p>Haz un post indicando cuanto jugadores necesitas para que se sumen a tu equipo.</p>
            </ion-col>
            <ion-col>
              <ion-button
                @click="handleSubmit"
                class="ion-float-right ion-margin-top"
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
        <ion-list class="ion-padding-horizontal">
          <ion-item lines="none" class="ion-margin-top">
            <ion-select
              :value="game.sport"
              @ionChange="handleSport($event)"
              label="* Deporte"
              label-placement="stacked"
              :interface-options="options"
            >
              <ion-select-option selected value="futbol"
                >Futbol</ion-select-option
              >
              <ion-select-option value="basket">Basket</ion-select-option>
              <ion-select-option value="paddle">Paddle</ion-select-option>
              <ion-select-option value="tenis">Tenis</ion-select-option>
              <ion-select-option value="hockey">Hockey</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-input
              v-model="game.province"
              readonly
              label="* Provincia"
              label-placement="floating"
            ></ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-input
              required
              autofocus="true"
              v-model="game.city"
              label="* Municipio"
              label-placement="floating"
            >
            </ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-input
              required
              v-model="game.place"
              label="* En que cancha jugaras?"
              label-placement="floating"
            ></ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-input
              required
              v-model="game.spots"
              type="number"
              label="* Cuantos jugadores necesitas?"
              label-placement="floating"
            ></ion-input>
          </ion-item>

          <ion-item lines="none" class="ion-padding-top">
            <ion-input
              required
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
              :min="currentDateFormattedDate_ISO_8601" 
              :max="datetimeMaxDate"
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
              <ion-row v-if="game.sport === 'futbol'">
                <ion-col>
                  <Tags :tags="gameSize" @tagClicked="saveTagGameSize"> </Tags>
                </ion-col>
              </ion-row>
              <ion-row v-if="game.sport === 'futbol'">
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

          <ion-item lines="none" class="ion-margin-vertical">
            <ion-textarea
              class="custom"
              :counter="true"
              maxlength="100"
              label="Descripcion"
              label-placement="floating"
              placeholder="Enter text"
            ></ion-textarea>
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

<script setup lang='ts'>
import {
  femaleOutline,
  maleOutline,
  maleFemaleOutline,
  bodyOutline,
  trophyOutline,
  barbellOutline,
  leafOutline,
  invertMode,
  checkmarkOutline 
} from "ionicons/icons";

import { computed, ref } from "vue";
import Tags from "../components/Tags.vue";
import { auth } from "@/firebase";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import useDateParser from "@/composables/date";
import { useGameStore } from "@/store/game";

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

const store = useGameStore();

const game = ref({
  country: "Argentina",
  province: "Salta",
  city: "",
  date: currentDateFormattedDate_ISO_8601,
  place: "",
  createdByUser: auth!.currentUser!.uid,
  dateCreated: Timestamp.now(),
  sport: "futbol",
  spots: null,
  gender: [],
  type: [],
  size: [],
  grassType: [],
  status: "",
  description: "",
  usersAttending: [],
  usersWaiting: [],
});

const options: any = {
      cssClass: "my-custom-interface",
    };

const gameGender = [
  { text: "Masculino", value: "Male", icon: maleOutline },
  { text: "Femenino", value: "Female", icon: femaleOutline },
  { text: "Mixto", value: "Mix", icon: maleFemaleOutline },
];
const gameType = [
  { text: "Entrenamiento", value: "Training", icon: barbellOutline },
  { text: "Amistoso", value: "Friendly", icon: bodyOutline },
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
  { text: "Cesped Sintetico", value: "SGrass", icon: invertMode },
  { text: "Cesped Natural", value: "NGrass", icon: leafOutline },
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
  game.value.gender = gameGender;
};

const saveTagGameSize = (gameSize: any) => {
  game.value.size = gameSize;
};

const saveTagGameGrassType = (gameGrassType: any) => {
  game.value.grassType = gameGrassType;
};

const handleSport = (ev: any) => {
  game.value.sport = ev.detail.value;
};

const handleSubmit = () => {
  if (game.value.city != "") {
    if (game.value.place != "") {
      if (game.value.date != "") {
        if (game.value.spots && game.value.spots > 0 && game.value.spots < 6) {
          isFormError.value = false;
          store.addGame(game.value)
        } else {
          formErrorText.value = "Debe elegir entre 1 y 5 jugadores";
          isFormError.value = true;
          return;
        }
      } else {
        formErrorText.value = "Debe completar los campos obligatorios";
        isFormError.value = true;
        return;
      }
    } else {
      formErrorText.value = "Debe completar los campos obligatorios";
      isFormError.value = true;
      return;
    }
  } else {
    formErrorText.value = "Debe completar los campos obligatorios";
    isFormError.value = true;
    return;
  }
};

const datetimeMaxDate = computed(() => {
  const today = new Date();
  const next30Days = new Date(today);
  next30Days.setDate(today.getDate() + 30);
  return format(
  next30Days,
  "yyyy-MM-dd'T'HH:mm:ssXXX"
); 
}

)
</script>

<style scoped>

</style>