<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row>
            <ion-col v-if="showForm" size="10">
              <h3>Estas buscando jugadores?</h3>
              <p>
                Crea una busqueda indicando cuantos jugadores necesitas para que se sumen a tu
                equipo.
              </p>
            </ion-col>
            <ion-col v-else>
              <ion-button
                @click="showForm = true"
                class="ion-margin-top"
                fill="outline"
              >
                <ion-icon :icon="chevronBackOutline" class="mr-5"></ion-icon>
                Atras
              </ion-button>
            </ion-col>
            <ion-col size="2">
              <ion-button
                v-if="showForm"
                @click="handleSubmit"
                class="ion-float-right ion-margin-top btn-secondary"
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
      <form v-if="showForm" @submit.prevent="handleSubmit()">
        <div>
          <ion-list :inset="true" lines="inset">
            <ion-item>
              <!--             <ion-select
              :value="search.sport"
              @ionChange="handleSport($event)"
              label="Deporte"
              label-placement="stacked"
              disabled
              :interface-options="options"
            >
              <ion-select-option selected value="futbol"
                >Futbol</ion-select-option
              >
              <ion-select-option value="basket">Basket</ion-select-option>
              <ion-select-option value="paddle">Paddle</ion-select-option>
              <ion-select-option value="tenis">Tenis</ion-select-option>
              <ion-select-option value="hockey">Hockey</ion-select-option> -
            </ion-select> -->
              <ion-input
                v-model="search.sport"
                readonly
                label="Deporte"
                label-placement="floating"
                class="ion-text-capitalize"
              ></ion-input>
            </ion-item>

            <ion-item class="ion-margin-top">
              <ion-input
                v-model="search.province"
                readonly
                label="Provincia"
                label-placement="floating"
                class="ion-text-capitalize"
              ></ion-input>
            </ion-item>

            <ion-item class="ion-margin-top">
              <ion-select
                    :value="city"
                    @ionChange="handleChangeCity($event)"
                    label="Municipio"
                    label-placement="stacked"
                    class="title-city ion-text-capitalize"
                    :interface-options="options"
                  >
                    <ion-select-option selected value="capital"
                      >Capital</ion-select-option
                    >
                    <ion-select-option value="san Lorenzo"
                      >San Lorenzo</ion-select-option
                    >
                    <ion-select-option value="cerrillos">
                      Cerrillos
                    </ion-select-option>
                    <ion-select-option value="vaqueros">
                      Vaqueros</ion-select-option
                    >
                    <ion-select-option value="san luis"
                      >San Luis</ion-select-option
                    >
              </ion-select>
            </ion-item>

            <ion-item class="ion-margin-top">
              <ion-select
                :value="search.payment"
                @ionChange="handleHasToPay($event)"
                label="* Es un evento pago?"
                label-placement="stacked"
                :interface-options="options"
              >
                <ion-select-option selected value="true">Si</ion-select-option>
                <ion-select-option value="false">No</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item class="ion-margin-top">
              <ion-input
                required
                v-model="search.place"
                label="* En que cancha jugaras?"
                label-placement="floating"
              ></ion-input>
            </ion-item>

            <ion-item class="ion-margin-top">
              <ion-input
                required
                v-model="search.spots"
                type="number"
                label="* Cuantos jugadores necesitas?"
                label-placement="floating"
              ></ion-input>
            </ion-item>

            <ion-item class="ion-margin-top">
              <ion-input
                required
                v-model="selectedDateTimeParsed"
                label="* Fecha"
                label-placement="floating"
                @click="toggleDateTimeInput()"
              ></ion-input>
              <ion-datetime
                v-if="dateTimeVisible"
                v-model="search.date"
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

            <ion-item class="ion-margin-top">
              <ion-text class="ion-padding-top">
                Agrega informacion extra a tu partido:</ion-text
              >

              <ion-grid class="ion-padding-top ion-no-padding">
                <ion-row class="ion-margin-bottom">
                  <ion-col>
                    <Chips :chips="searchGender" @tagClicked="saveChipsearchGender">
                    </Chips>
                  </ion-col>
                </ion-row>
                <ion-row class="ion-margin-bottom">
                  <ion-col>
                    <Chips :chips="searchType" @tagClicked="saveChipsearchType">
                    </Chips>
                  </ion-col>
                </ion-row>
                <ion-row
                  v-if="search.sport === 'futbol'"
                  class="ion-margin-bottom"
                >
                  <ion-col>
                    <Chips :chips="searchSize" @tagClicked="saveChipsearchSize">
                    </Chips>
                  </ion-col>
                </ion-row>
                <ion-row
                  v-if="search.sport === 'futbol'"
                >
                  <ion-col>
                    <Chips
                      :chips="searchGrassType"
                      @tagClicked="saveChipsearchGrassType"
                    >
                    </Chips>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>

            <div class="ion-margin-start">
              <ion-textarea
                v-model="search.description"
                class="custom"
                :clear-on-edit="true"
                :counter="true"
                maxlength="100"
                label="Descripcion"
                label-placement="floating"
                placeholder="Agrega informacion extra, por ej: Buscas arquero, defensor o delantero"
              ></ion-textarea>
            </div>
          </ion-list>
        </div>
      </form>
      <div v-else>
        <ion-grid class="wrapper">
          <ion-row
            style="flex: 1"
            class="ion-align-items-center ion-justify-content-center"
          >
            <ion-col size="10">
              <div class="ion-align-items-center flex-column">
                <ion-icon
                  :icon="checkmarkCircleOutline"
                  class="icon-60"
                ></ion-icon>
                <h1>Creado correctamente</h1>
                <ion-text class="ion-text-center">
                  Puede ver tus busquedas creadas en el apartado
                  <u @click="goToHistorial()"> Busquedas </u>.</ion-text
                >
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

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
  checkmarkOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
} from "ionicons/icons";

import { computed, ref } from "vue";
import Chips from "../components/Chips/Chip.vue";
import { auth } from "@/firebase";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import useDateParser from "@/composables/date";
import { useSearchStore } from "@/store/search";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";
import { onIonViewDidEnter, onIonViewDidLeave } from "@ionic/vue";

const { parseDate } = useDateParser();

const city = ref('capital')
const showForm = ref(true);
const dateTimeVisible = ref(false);
const refDatetime = ref();
const formErrorText = ref();
const isFormError = ref(false);
const eventHasBeenCreated = ref(false);
const router = useRouter();

const currentDate = new Date();
const currentDateFormattedDate_ISO_8601 = format(
  currentDate,
  "yyyy-MM-dd'T'HH:mm:ssXXX"
); // ISO 8601 format

const selectedDateTimeParsed = ref();

const store = useSearchStore();
const userStore = useUserStore();

const search = ref({
  country: "argentina",
  province: "salta",
  city: city.value,
  date: currentDateFormattedDate_ISO_8601,
  place: "",
  organizerId: auth!.currentUser!.uid,
  organizerInfo: {
    fullName: userStore.myUserInfo.name + " " + userStore.myUserInfo.lastName,
    email: userStore.myUserInfo.email ,
  },
  dateCreated: Timestamp.now(),
  sport: "futbol",
  spots: null,
  payment: true,
  gender: [],
  type: [],
  size: [],
  grassType: [],
  status: "open",
  description: "",
  usersAttending: [],
  usersIdAttending: [],
  usersWaiting: [],
});

onIonViewDidLeave(() => {
  showForm.value = true;
});

const options: any = {
  cssClass: "my-custom-interface",
};

const searchGender = [
  { text: "Masculino", value: "Male", icon: maleOutline },
  { text: "Femenino", value: "Female", icon: femaleOutline },
  { text: "Mixto", value: "Mix", icon: maleFemaleOutline },
];
const searchType = [
  { text: "Entrenamiento", value: "Training", icon: barbellOutline },
  { text: "Amistoso", value: "Friendly", icon: bodyOutline },
  { text: "Partido de campeonato", value: "GC", icon: trophyOutline },
];
const searchSize = [
  { text: "5 VS 5", value: "5VS5", icon: "" },
  { text: "7 VS 7", value: "7VS7", icon: "" },
  { text: "8 VS 8", value: "8VS8", icon: "" },
  { text: "9 VS 9", value: "9VS9", icon: "" },
  { text: "11 VS 11", value: "5VS5", icon: "" },
];
const searchGrassType = [
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
  selectedDateTimeParsed.value = parseDate(event.detail.value);
};

const handleChangeCity = (event: CustomEvent) => {
  search.value.city = event.detail.value;
};

const saveChipsearchType = (searchType: any) => {
  search.value.type = searchType;
};

const saveChipsearchGender = (searchGender: any) => {
  search.value.gender = searchGender;
};

const saveChipsearchSize = (searchSize: any) => {
  search.value.size = searchSize;
};

const saveChipsearchGrassType = (searchSizeGrassType: any) => {
  search.value.grassType = searchSizeGrassType;
};

const handleSport = (ev: any) => {
  search.value.sport = ev.detail.value;
};

const handleHasToPay = (ev: any) => {
  search.value.payment = Boolean(ev.detail.value) ;
};

const handleSubmit = async () => {
  try {
    if (search.value.city != "") {
      if (search.value.place != "") {
        if (search.value.date != "") {
          if (
            search.value.spots &&
            search.value.spots > 0 &&
            search.value.spots < 6
          ) {
            isFormError.value = false;
            await store.addSearch(search.value);
            showForm.value = false;
            eventHasBeenCreated.value = true;
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
  } catch (error) {
    console.log(error);
  }
};

const goToHistorial = () => {
  router.push("/tabs/tab3");
};

const datetimeMaxDate = computed(() => {
  const today = new Date();
  const next30Days = new Date(today);
  next30Days.setDate(today.getDate() + 30);
  return format(next30Days, "yyyy-MM-dd'T'HH:mm:ssXXX");
});
</script>

<style scoped>
.icon-60 {
  font-size: 60px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 65vh;
  padding: 0;
}
</style>