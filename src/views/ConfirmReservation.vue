<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row v-if="showInfo" class="ion-align-items-center">
            <ion-col size="auto">
              <ion-icon :icon="chevronBackOutline" @click="goBack()"></ion-icon>
            </ion-col>
            <ion-col>
              <h2 class="ion-no-margin ion-margin-start">Confirmar reserva</h2>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="showInfo" class="ion-padding-horizontal">
        <ion-grid class="wrapper">
          <ion-row>
            <ion-col size="10">
              <h1 class="ion-text-capitalize">
                {{ searchInfo.province }}, {{ searchInfo.city }}
              </h1>
            </ion-col>
          </ion-row>
          <ion-row class="ion-align-items-center">
            <ion-col size="2">
              <ion-icon :icon="locationOutline"></ion-icon>
            </ion-col>
            <ion-col size="10">
              <ion-text class="ion-text-uppercase">
                {{ searchInfo.place }}</ion-text
              >
            </ion-col>
          </ion-row>
          <ion-row class="ion-align-items-center">
            <ion-col size="2">
              <ion-icon :icon="calendarOutline"></ion-icon>
            </ion-col>
            <ion-col size="10">
              {{ searchDateParsed }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12" class="ion-text-center">
              <h4><u>Reservando un lugar para:</u></h4>
            </ion-col>
            <ion-col size="12" class="ion-text-center ion-text-capitalize">
              <ion-icon :icon="personCircle" class="user-icon"></ion-icon>
              <h2>{{ myUserName }}</h2>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <h6>Antes de confirmar tenga en cuenta lo siguiente: </h6>
              <ul class="ion-no-padding ion-padding-start">
                <li>
                  En caso de no asistir, debera darse de baja en la busqueda dentro
                del apartado
                <u @click="goToPending()"> Por jugar </u>. Caso contrario recibira una advertencia y posterior baja del sistema.
                <u></u>
                </li>
                <li class="mt-5">Si es partido se juega en una cancha paga, debera abonarle el monto correspondiente
                    a la persona que realizo dicha reserva.
                </li>
              </ul>

            </ion-col>
          </ion-row>
          <ion-row style="flex: 1; align-items: flex-end">
            <ion-col size="12">
              <ion-button @click="joinSearch()" expand="full" shape="round" class="button-join"
                >Confirmar</ion-button
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div v-else>
        <ion-grid class="wrapper-success">
          <ion-row
            style="flex: 1"
            class="ion-align-items-center ion-justify-content-center"
          >
            <ion-col size="10">
              <div class="ion-align-items-center flex-column ion-text-center">
                <ion-icon
                  :icon="checkmarkCircleOutline"
                  class="icon-60"
                ></ion-icon>
                <h1>Te has unido correctamente</h1>
                <ion-text class="ion-text-center">
                  Puedes ver tus proximos juegos en el apartado
                  <u @click="goToPending()"> Por jugar </u>.</ion-text
                >
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <ion-button class="ion-padding-horizontal button-join" expand="full" shape="round" @click="backToSearches()">
              Volver a Buscar
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
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
  personCircle,
  checkmarkCircleOutline
} from "ionicons/icons";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Search from "../types/Search";
import useDateParser from "@/composables/date";
import { Timestamp } from "firebase/firestore";
import { useUserStore } from "@/store/user";
import { useSearchStore } from "@/store/search";

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const showInfo = ref(true);

//Param info
const routeParam: any = route?.params?.info;
const searchInfo: Search = JSON.parse(routeParam);

const { parseDateTimeStampToISO } = useDateParser();
const userStore = useUserStore();
const searchStore = useSearchStore();

onIonViewDidEnter(() => {
  loading.value = false;
});

const searchDateParsed = computed(() => {
  const firestoreTimestamp = new Timestamp(
    searchInfo.date.seconds,
    searchInfo.date.nanoseconds
  );
  return parseDateTimeStampToISO(firestoreTimestamp);
});

const joinSearch = async () => {
  showInfo.value = false;
  await searchStore.addPlayerToSearch(searchInfo.id)
  await userStore.addSearchToMySearchesAttended(searchInfo.id) //Historical

};

const myUserName = computed(() => {
  return userStore.myUserInfo.name + " " + userStore.myUserInfo.lastName;
});

const goToPending = () => {
  router.push("/tabs/tab4");
};

const backToSearches = () => {
  router.push("/tabs/tab1");
};

const goBack = () => {
  router.back();
};
</script>
  
  <style scoped>
ion-icon {
  font-size: 30px;
}

.user-icon {
  font-size: 70px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 82vh;
  padding: 0;
}

.wrapper-success {
  display: flex;
  flex-direction: column;
  min-height: 84vh;
  padding: 0;
}
.icon-60 {
  font-size: 60px;
}

.button-join{
  --background: var(--rose);
  --color: var(--white);
}
</style>