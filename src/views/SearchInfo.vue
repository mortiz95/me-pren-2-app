<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row class="ion-align-items-center">
            <ion-col size="6">
              <ion-icon :icon="chevronBackOutline" @click="goBack()"></ion-icon>
            </ion-col>
            <ion-col size="6">
              <ion-icon :icon="shareOutline" class="ion-float-end"></ion-icon>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-segment :value="selectedTab">
              <ion-segment-button value="info" @click="selectedTab = 'info'">
                <ion-label>Info</ion-label>
              </ion-segment-button>
              <ion-segment-button value="players" @click="selectedTab = 'players'">
                <ion-label>Jugadores</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="selectedTab === 'info'" class="ion-padding-horizontal">
        <ion-grid class="wrapper">
          <div>
            <ion-row class="ion-align-items-center">
              <ion-col size="auto">
                <h2 class="ion-text-capitalize">
                  {{ searchInfo.province }}, {{ searchInfo.city }}
                </h2>
              </ion-col>
              <ion-col class="ion-text-end">
                <ion-chip :class="checkIsFull === 'FULL' ? 'chip-danger' : 'chip-success'"
                  class="mr-5 ion-padding-vertical">
                  {{ checkIsFull }}
                </ion-chip>
              </ion-col>
            </ion-row>
          </div>
          <div class="border-bottom">
            <ion-row class="ion-align-items-center">
              <ion-col size="auto">
                <ion-icon :icon="locationOutline"></ion-icon>
              </ion-col>
              <ion-col>
                <ion-text class="ion-text-uppercase">
                  {{ searchInfo.place }}</ion-text>
              </ion-col>
            </ion-row>
            <ion-row class="ion-align-items-center">
              <ion-col size="auto">
                <ion-icon :icon="calendarOutline"></ion-icon>
              </ion-col>
              <ion-col class="ion-text-capitalize">
                {{ searchDateParsed }}
              </ion-col>
            </ion-row>
            <ion-row class="ion-align-items-center ion-padding-bottom">
              <ion-col size="auto">
                <ion-icon :icon="gameControllerOutline"></ion-icon>
              </ion-col>
              <ion-col class="ion-text-capitalize">
                {{ searchInfo.sport }}
              </ion-col>
            </ion-row>
          </div>
          <div class="border-bottom ion-padding-vertical">
            <ion-row>
              <ion-col size="auto">Creado por: </ion-col>
              <ion-col size="auto" class="ion-text-capitalize">{{
                searchInfo.organizerInfo.fullName
              }}</ion-col>
            </ion-row>
          </div>
          <div class="border-bottom ion-padding-vertical">
            <ion-row class="ion-align-items-center">
              <ion-col size="4">Info del evento: </ion-col>
              <ion-col size="8">
                <Chips v-if="Object.keys(searchInfo.size).length > 0" :chips="searchSize"> </Chips>

                <Chips v-if="Object.keys(searchInfo.type).length > 0" :chips="searchType"> </Chips>

                <Chips v-if="Object.keys(searchInfo.gender).length > 0" :chips="searchGender"> </Chips>

                <Chips v-if="Object.keys(searchInfo.grassType).length > 0" :chips="searchGrassType"> </Chips>
              </ion-col>
            </ion-row>
          </div>
          <div class="border-bottom ion-padding-vertical">
            <ion-row class="mt-5">
              <ion-col>
                <ion-text>Evento pago: {{ searchPaymentTitle }}</ion-text>
              </ion-col>
            </ion-row>
          </div>
          <div v-if="searchInfo.description != ''" class="border-bottom ion-text-capitalize ion-padding-vertical">
            <ion-row>
              <ion-col size="auto">Description: </ion-col>
              <ion-col size="auto">{{ searchInfo.description }}</ion-col>
            </ion-row>
          </div>
          <ion-row style="flex: 1; align-items: flex-end">
            <ion-col size="12">
              <ion-button v-if="checkIfParticipating" id="open-action-sheet" class="btn-unsubscribe" expand="full"
                shape="round">DARSE DE BAJA
              </ion-button>
              <ion-button v-else @click="goToConfirmReservation()" class="btn-secondary" expand="full"
                shape="round">UNIRSE
              </ion-button>
              <ion-action-sheet trigger="open-action-sheet" header="Esta seguro que desea darse de baja?"
                class="my-custom-action-sheet" :buttons="actionSheetButtons" backdropDismiss="false"
                @didDismiss="logResult($event)"></ion-action-sheet>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div v-if="loading" class="spinner-container">
          <ion-spinner></ion-spinner>
        </div>
      </div>
      <div v-if="selectedTab === 'players'" class="ion-padding-horizontal">
        <ion-grid class="wrapper">
          <ion-row>
            <ion-col>
              <ProgressBar :searchSpots="searchInfo.spots" :totalUsersIdAttending="searchInfo.usersAttending.length"
                class="ion-margin-top"></ProgressBar>
            </ion-col>
          </ion-row>
          <ion-row class="mt-10">
            <ion-col size="6" v-for="(item, index) in searchInfo.usersAttending" :key="index">
              <PlayerItem :playerInfo="{
                id: item.id,
                name: item.name,
                lastName: item.lastName,
              }"></PlayerItem>
            </ion-col>
          </ion-row>
          <ion-row style="flex: 1; align-items: flex-end">
            <ion-col size="12">
              <ion-button v-if="checkIfParticipating" id="open-action-sheet" class="btn-unsubscribe" expand="full"
                shape="round">DARSE DE BAJA
              </ion-button>
              <ion-button v-else @click="goToConfirmReservation()" expand="full" class="btn-secondary"
                shape="round">UNIRSE
              </ion-button>
              <ion-action-sheet trigger="open-action-sheet" header="Esta seguro que desea darse de baja?"
                class="my-custom-action-sheet" :buttons="actionSheetButtons" backdropDismiss="false"
                @didDismiss="logResult($event)"></ion-action-sheet>
            </ion-col>
          </ion-row>

        </ion-grid>

        <div v-if="loading" class="spinner-container">
          <ion-spinner></ion-spinner>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { onIonViewDidEnter } from "@ionic/vue";
import {
  chevronBackOutline,
  informationOutline,
  shareOutline,
  personOutline,
  locationOutline,
  calendarOutline,
  gameControllerOutline,
  openOutline,
  accessibilityOutline
} from "ionicons/icons";

import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

import Search from "../types/Search";

import useDateParser from "@/composables/date";

import { Timestamp } from "firebase/firestore";
import { auth } from "@/firebase";
import { useUserStore } from "@/store/user";

import Chips from "@/components/Chips/Chip.vue";
import ProgressBar from "../components/Progress-bar/ProgressBar.vue";
import PlayerItem from "../components/Item/PlayerItem.vue"

import { useSearchStore } from "@/store/search";

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const selectedTab = ref("info");

//Param info
const routeParamInfo: any = route?.params?.info;
const searchInfo: Search = JSON.parse(routeParamInfo);

const { parseDateTimeStampToISO } = useDateParser();
const userStore = useUserStore();
const searchStore = useSearchStore();

const actionSheetButtons = [
  {
    text: 'Confirmar',
    role: 'destructive',
    data: {
      action: 'delete',
    },
  },
  {
    text: 'Cancelar',
    role: 'cancel',
    data: {
      action: 'cancel',
    },
  },
];

const logResult = async (ev: CustomEvent) => {
  const optionSelected = ev.detail.data.action
  if (optionSelected === 'delete') {
    //await unsubscribe()
  }
};

const searchDateParsed = computed(() => {
  const firestoreTimestamp = new Timestamp(
    searchInfo.date.seconds,
    searchInfo.date.nanoseconds
  );
  return parseDateTimeStampToISO(firestoreTimestamp);
});

const searchPaymentTitle = computed(() => {
  return (searchInfo.payment ? 'Si' : 'No')
})

const searchSize = computed(() => {
  return [searchInfo.size];
});

const searchType = computed(() => {
  return [searchInfo.type];
});

const searchGender = computed(() => {
  return [searchInfo.gender];
});

const searchGrassType = computed(() => {
  return [searchInfo.grassType];
});

const getSpotsAvailable = computed(() => {
  if (searchInfo.usersIdAttending) {
    return searchInfo.spots - searchInfo.usersAttending.length;
  }
  else {
    return searchInfo.spots
  }
});

const checkIsFull = computed(() => {
  return searchInfo
    ? getSpotsAvailable.value == 0
      ? "FULL"
      : getSpotsAvailable.value == 1 ? "Disponible:" + getSpotsAvailable.value + " lugar"  :   "Disponible: " + getSpotsAvailable.value + " lugares"
    : "";
});

const unsubscribe = async () => {
  await userStore.removeSearchFromMySearchedAttended(searchInfo.id);
  await searchStore.removeMeFromSearch(searchInfo.id)
  console.log("Se ha eliminado de mis buscadas");
};

const goToConfirmReservation = async () => {
  router.push({ name: "ConfirmReservation" });
};


const checkIfParticipating = computed(() => {
  const usersAttending: any = searchInfo.usersIdAttending || [];
  if (usersAttending) {
    const isParticipating = usersAttending.includes(auth!.currentUser!.uid);
    return isParticipating;
  }
  return false;
});

const goBack = () => {
  router.back();
};
onIonViewDidEnter(() => {
  loading.value = false;
});
</script>
  
<style scoped>
ion-action-sheet.my-custom-action-sheet {
  --background: var(--black);
  --backdrop-opacity: 0.6;
  --button-color: var(--white);
  --color: #fff;
}

ion-icon {
  font-size: 25px;
}

ion-text {
  font-size: 16px;
}

.border-bottom {
  border-bottom: 1px solid var(--white);
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 76vh;
  padding: 0;
}
</style>
  