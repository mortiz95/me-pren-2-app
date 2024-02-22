<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-grid class="ion-padding">
                    <ion-row class="ion-align-items-center">
                        <ion-col size="auto">
                            <ion-icon :icon="chevronBackOutline" class="ion-align-item-start"
                                @click="goToHistorial()"></ion-icon>
                        </ion-col>
                        <ion-col>
                            <h2 class="ion-no-margin ion-margin-start">Editar busqueda</h2>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
      <form v-if="showForm" @submit.prevent="handleSubmit()">
        <div>
          <ion-list :inset="false">

            <ion-item>
              <ion-icon :icon="footballOutline" class="ion-padding-end"></ion-icon>
              <ion-select :value="searchInfo.sport" label="Deporte" color="light" label-placement="stacked"
                class="ion-text-capitalize" :interface-options="options" :toggle-icon="chevronDownCircleOutline"
                :expanded-icon="remove">
                <ion-select-option selected value="futbol">Futbol</ion-select-option>
                <!--<ion-select-option value="basket">Basket</ion-select-option>
                <ion-select-option value="paddle">Paddle</ion-select-option>
                <ion-select-option value="tenis">Tenis</ion-select-option>
                <ion-select-option value="hockey">Hockey</ion-select-option> -->
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-icon :icon="locationOutline" class="ion-padding-end"></ion-icon>
              <ion-select :value="searchInfo.province" label="Provincia" color="light" label-placement="stacked"
                :interface-options="options" :toggle-icon="chevronDownCircleOutline" :expanded-icon="remove">
                <ion-select-option value="salta">Salta</ion-select-option>
                <!--                                              <ion-select-option value="basket">Basket</ion-select-option>
                <ion-select-option value="paddle">Paddle</ion-select-option>
                <ion-select-option value="tenis">Tenis</ion-select-option>
                <ion-select-option value="hockey">Hockey</ion-select-option> -->
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-icon :icon="businessOutline" class="ion-padding-end"></ion-icon>
              <ion-select :value="searchInfo.city" @ionChange="handleChangeCity($event)"
                :toggle-icon="chevronDownCircleOutline" :expanded-icon="remove" label="* Municipio" color="light"
                label-placement="stacked" class="title-city ion-text-capitalize" :interface-options="options">
                <ion-select-option value="capital">Capital</ion-select-option>
                <ion-select-option value="san Lorenzo">San Lorenzo</ion-select-option>
                <ion-select-option value="cerrillos">
                  Cerrillos
                </ion-select-option>
                <ion-select-option value="vaqueros">
                  Vaqueros</ion-select-option>
                <ion-select-option value="san luis">San Luis</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-icon slot="start" :icon="pinOutline" class="ion-no-margin"></ion-icon>
              <ion-input required color="light" v-model="searchInfo.place" class="ion-margin-start"
                label="* En que cancha jugaras?" label-placement="floating"></ion-input>
            </ion-item>

            <ion-item>
              <ion-icon slot="start" :icon="peopleCircleOutline" class="ion-no-margin"></ion-icon>
              <ion-input required color="light" v-model="searchInfo.spots" class="ion-margin-start" type="number"
                label="* Cuantos jugadores necesitas?" label-placement="floating"></ion-input>
            </ion-item>


            <ion-item>
              <ion-icon slot="start" :icon="calendarOutline" class="ion-no-margin"></ion-icon>
              <ion-input required color="light" class="ion-text-capitalize ion-margin-start"
                v-model="searchDateParsed" label="* Fecha del partido" label-placement="floating"
                @click="toggleDateTimeInput()"></ion-input>
              <ion-datetime v-if="dateTimeVisible" v-model="searchDateParseISO" ref="refDatetime" class="ion-margin-vertical"
                @ionChange="handleDateTimeChange" :max="datetimeMaxDate">
                <ion-buttons slot="buttons">
                  <ion-button color="success" @click="toggleDateTimeInput()">CANCELAR</ion-button>
                  <ion-button color="success" @click="confirm()">OK</ion-button>
                </ion-buttons>
              </ion-datetime>
            </ion-item>

            <ion-item>
              <ion-icon :icon="cashOutline" class="ion-padding-end"></ion-icon>
              <ion-select :value="searchInfoPaymentParse" @ionChange="handleHasToPay($event)"
                :toggle-icon="chevronDownCircleOutline" :expanded-icon="remove" label="Es un evento pago?" color="light"
                label-placement="stacked" class="title-city ion-text-capitalize" :interface-options="options">
                <ion-select-option selected value="true">Si</ion-select-option>
                <ion-select-option value="false">No</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item>
              <ion-icon slot="start" :icon="informationCircleOutline" class="ion-no-margin"></ion-icon>
              <ion-grid class="ion-padding-vertical ion-no-padding ion-margin-start">

                <ion-row>
                  <ion-col>
                    <ion-text>
                      Indica tipo de partido:</ion-text>
                  </ion-col>
                </ion-row>
                <ion-row class="ion-margin-bottom">
                  <ion-col>
                    <Chips :chips="searchType" @tagClicked="saveChipsearchType" :chipSelected="searchInfo.type">
                    </Chips>
                  </ion-col>
                </ion-row>
                <ion-row v-if="searchInfo.sport === 'futbol'">
                  <ion-col>
                    <ion-text>
                      Indica tamaño del partido:</ion-text>
                  </ion-col>
                </ion-row>
                <ion-row v-if="searchInfo.sport === 'futbol'" class="ion-margin-bottom">
                  <ion-col>
                    <Chips :chips="searchSize" @tagClicked="saveChipsearchSize" :chipSelected="searchInfo.size">
                    </Chips>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col>
                    <ion-text>
                      Indica genero:</ion-text>
                  </ion-col>
                </ion-row>
                <ion-row class="ion-margin-bottom">
                  <ion-col>
                    <Chips :chips="searchGender" @tagClicked="saveChipsearchGender" :chipSelected="searchInfo.gender">
                    </Chips>
                  </ion-col>
                </ion-row>
                <ion-row v-if="searchInfo.sport === 'futbol'">
                  <ion-col>
                    <ion-text>
                      Indica el tipo de terreno:</ion-text>
                  </ion-col>
                </ion-row>
                <ion-row v-if="searchInfo.sport === 'futbol'">
                  <ion-col>
                    <Chips :chips="searchGrassType" @tagClicked="saveChipsearchGrassType" :chipSelected="searchInfo.grassType">
                    </Chips>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-item>

            <ion-item>
              <ion-icon slot="start" :icon="peopleCircleOutline" class="ion-no-margin"></ion-icon>
              <ion-textarea v-model="searchInfo.description" class="custom ion-margin-start" color="light"
                :clear-on-edit="true" :counter="true" maxlength="100" label="Añade informacion extra"
                label-placement="floating"
                placeholder="Agrega informacion extra, por ej: Buscas arquero, defensor o delantero"></ion-textarea>
            </ion-item>

            <div class="btn-create">
              <ion-button v-if="showForm" @click="handleSubmit" expand="block"
                class="btn-secondary ion-text-uppercase ion-margin"
               :disabled="disableButton"  >
                ACTUALIZAR
              </ion-button>
            </div>


          </ion-list>
        </div>
      </form>
      <div v-else>
        <ion-grid class="wrapper">
          <ion-row style="flex: 1" class="ion-align-items-center ion-justify-content-center">
            <ion-col size="10">
              <div class="ion-align-items-center flex-column">
                <ion-icon :icon="checkmarkCircleOutline" class="icon-60"></ion-icon>
                <h1>Creado correctamente</h1>
                <ion-text class="ion-text-center">
                  Puede ver tus busquedas creadas en el apartado
                  <u @click="goToHistorial()"> Busquedas </u>.</ion-text>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <ion-toast :isOpen="isFormError" class="custom-toast" position="bottom" :message="formErrorText" :duration="2000"
        @didDismiss="isFormError = false"></ion-toast>
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
  footballOutline,
  chevronDownCircleOutline,
  remove,
  locationOutline,
  businessOutline,
  pinOutline,
  ticketOutline,
  peopleCircleOutline,
  informationCircleOutline,
  cashOutline,
  calendarOutline
} from "ionicons/icons";

import { computed, ref } from "vue";
import Chips from "../components/Chips/Chip.vue";
import { auth } from "@/firebase";
import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";
import useDateParser from "@/composables/date";
import { useSearchStore } from "@/store/search";
import { useRouter , useRoute} from "vue-router";
import { onIonViewDidLeave } from "@ionic/vue";
import Search from "@/types/Search";

const { parseDate, parseDateTimeStampToISO, parseDateStampToISOHours } = useDateParser();
const router = useRouter();
const route = useRoute();

const showForm = ref(true);
const dateTimeVisible = ref(false);
const refDatetime = ref();
const formErrorText = ref();
const isFormError = ref(false);

//Param info
const routeParamInfo: any = route?.params?.info;
const searchInfo: Search = JSON.parse(routeParamInfo);
console.log(searchInfo)
const currentDate = new Date();
const currentDateFormattedDate_ISO_8601 = format(
  currentDate,
  "yyyy-MM-dd'T'HH:mm:ssXXX"
); // ISO 8601 format


const selectedDateTimeParsed = ref();
selectedDateTimeParsed.value = searchInfo.date


const storeSearch = useSearchStore();

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
  selectedDateTimeParsed.value = selectedDateTimeParsed
};

const handleChangeCity = (event: CustomEvent) => {
  searchInfo.city = event.detail.value;
};

const saveChipsearchType = (searchType: any) => {
  searchInfo.type = searchType;
};

const saveChipsearchGender = (searchGender: any) => {
  searchInfo.gender = searchGender;
};

const saveChipsearchSize = (searchSize: any) => {
  searchInfo.size = searchSize;
};

const saveChipsearchGrassType = (searchSizeGrassType: any) => {
  searchInfo.grassType = searchSizeGrassType;
};

/* const handleSport = (ev: any) => {
  searchInfo.sport = ev.detail.value;
}; */

const handleHasToPay = (ev: any) => {
  searchInfo.payment = Boolean(ev.detail.value);
};

const searchInfoPaymentParse = computed(() => {
    return searchInfo.payment ? "true" : "false"
})

const disableButton = computed(() => {
  try {
    if (searchInfo.city != "") {
      if (searchInfo.place != "") {
        if (searchInfo.date != null) {
          if (
            searchInfo.spots &&
            searchInfo.spots > 0 &&
            searchInfo.spots < 10
          ) {
              return false
          } else {
            return true;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }

})

const handleSubmit = async () => {
  try {
    if (searchInfo.city != "") {
      if (searchInfo.place != "") {
        if (searchInfo.date != null) {
          if (
            searchInfo.spots &&
            searchInfo.spots > 0 &&
            searchInfo.spots < 10
          ) {
            isFormError.value = false;
            await storeSearch.updateSearch(searchInfo);
            showForm.value = false;
          } else {
            formErrorText.value = "Debe elegir entre 1 y 10 jugadores";
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

const searchDateParsed = computed(() => {

  const firestoreTimestamp = new Timestamp(
    selectedDateTimeParsed.value.seconds,
    selectedDateTimeParsed.value.nanoseconds
  );
  
  return parseDateTimeStampToISO(firestoreTimestamp);
});

const datetimeMaxDate = computed(() => {
  const today = new Date();
  const next30Days = new Date(today);
  next30Days.setDate(today.getDate() + 30);
  return format(next30Days, "yyyy-MM-dd'T'HH:mm:ssXXX");
});

const searchDateParseISO = computed(() => {
    const firestoreTimestamp = new Timestamp(
    searchInfo.date.seconds,
    searchInfo.date.nanoseconds
  );

  return format(parseDateStampToISOHours(firestoreTimestamp), "yyyy-MM-dd'T'HH:mm:ssXXX"); 
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

.btn-create {
  margin-top: 40px;
}

.border-bottom {
  border-bottom: 1px solid var(--white);
}
</style>