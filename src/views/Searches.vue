<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row>
            <ion-col size="auto" class="ion-no-padding">
              <ion-row class="ion-align-items-baseline">
                <ion-col size="auto" class="ion-no-padding">
                  <h2>Busquedas en Salta,</h2>
                </ion-col>
                <ion-col size="auto" class="ion-no-padding ml-5">
                  <ion-select :value="city" @ionChange="handleChangeCity($event)" justify="start"
                    class="title-city ion-text-capitalize ion-align-self-end" :interface-options="options">
                    <ion-select-option selected value="capital">Capital</ion-select-option>
                    <ion-select-option value="san lorenzo">San Lorenzo</ion-select-option>
                    <ion-select-option value="cerrillos">
                      Cerrillos
                    </ion-select-option>
                    <ion-select-option value="vaqueros">
                      Vaqueros</ion-select-option>
                    <ion-select-option value="san luis">San Luis</ion-select-option>
                  </ion-select>
                </ion-col>
              </ion-row>
            </ion-col>
            <ion-col size="auto" class="ion-no-padding">
              <ion-title size="small" class="ion-no-padding ion-padding-bottom">
                Aquí encontrarás las búsquedas creadas por personas
                que buscan sumar jugadores a su equipo.
              </ion-title>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <Calendar class="fixed-component" @returnDaySelected="loadSearchesByDay"></Calendar>
      <div v-show="!loading" class="scrolling-list">
        <div v-if="searchStore.searches.length > 0">
          <SearchItem v-for="item in searchStore.searches" :key="item.id" :searchInfo="item">
          </SearchItem>
        </div>
        <div v-else class="flex-justify-center no-data ion-text-center">
          No hay busquedas disponibles <br> para esta fecha.
        </div>
      </div>
      <div v-show="loading" class="loading">
        <ion-spinner></ion-spinner>
      </div>
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
} from "ionicons/icons";

import { onIonViewDidEnter, onIonViewDidLeave } from "@ionic/vue";
import { useSearchStore } from "../store/search";
import { useRoute } from "vue-router";
import SearchItem from "../components/Item/SearchItem.vue";
import Calendar from "../components/Calendar/Calendar.vue";
import { ref } from "vue";
import { Timestamp } from "firebase/firestore";

const route = useRoute();
const searchStore = useSearchStore();
const loading = ref(true);
const city = ref("capital");

const date = ref(Timestamp.now());

onIonViewDidEnter(async () => {
  //Get today's games
  loading.value = true;
  await searchStore.loadSearches(city.value, date.value);
  loading.value = false;
});

const options: any = {
  cssClass: "my-custom-interface",
};

const handleChangeCity = (event: any) => {
  city.value = event.detail.value
};

const loadSearchesByDay = async (day: any) => {
  if (day.includes('Hoy')) {
    date.value = Timestamp.now();
    await searchStore.loadSearches(city.value, date.value);
  } else {
    date.value = parseDateStringToTimestamp(day)
    await searchStore.loadSearches(city.value, date.value);
  }
};
const parseDateStringToTimestamp = (dateString: any) => {

  const currentDate = new Date();

  // Mapea los nombres de los días de la semana en español a inglés
  const dayMappings: any = {
    'lun': 'Mon',
    'mar': 'Tue',
    'mié': 'Wed',
    'jue': 'Thu',
    'vie': 'Fri',
    'sáb': 'Sat',
    'dom': 'Sun'
  };
  const [dayOfWeek, dayOfMonth] = dateString.split(' ');
  const englishDayOfWeek = dayMappings[dayOfWeek];

  // Obtén el día del mes a partir de la cadena
  const dayOfMonthNumber = parseInt(dayOfMonth);

  // Crea una nueva fecha con el año, mes y día actual, y establece la hora a la medianoche (00:00:00)
  const formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayOfMonthNumber);

  // Convierte la fecha formateada a Timestamp
  return Timestamp.fromDate(formattedDate);
};


</script>

<style scoped>
.scrolling-list {
  margin-top: 80px;
  /* Adjust to match the height of the fixed component */
  overflow-y: auto;
  /* Enable vertical scrolling for the list */
  height: calc(100vh - 80px);
  /* Adjust to fit the remaining viewport height */
}

.no-data {
  margin-top: 30vh;
  /* Adjust to match the height of the fixed component */
  overflow-y: auto;
  /* Enable vertical scrolling for the list */
  height: calc(100vh - 35vh);
  /* Adjust to fit the remaining viewport height */
}

.fixed-component {
  width: 100%;
  overflow-x: auto;
  position: fixed;
  z-index: 999;
  /* Ensure it's above the scrolling list */
  background-color: rgb(100, 101, 103);
}

.title-city {
  font-size: 18px;
  color: var(--gray);
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
}
</style>