<template>
  <ion-card @click="goToSearchInfo()">
    <ion-card-header class="ion-no-padding ion-padding-horizontal ion-padding-top">
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-align-items-end">
          <ion-col size="auto">
            <ion-card-title>
              <div class="container-card-title">
                <ion-icon :icon="locationOutline" class="ion-margin-end search-info__icon ion-text-capitalize"></ion-icon>
                {{ searchInfo.place }}
              </div>
            </ion-card-title>
          </ion-col>
          <ion-col size="auto">
            <ion-label color="warning" class="ion-margin-start">
              {{ checkIfParticipating ? "Ya te has unido" : "" }}
            </ion-label>
          </ion-col>
          <ion-col class="ion-text-end">
            <ion-icon :icon="chevronForward"></ion-icon>
          </ion-col>
        </ion-row>

        <ion-row class="mt-5">
          <ion-col size="12">
            <ion-card-subtitle>
              <div class="container-card-subtitle ion-text-capitalize">
                <ion-icon :icon="calendarOutline" class="ion-margin-end search-info__icon"></ion-icon>
                {{ parseDateTimeStampToISO(searchInfo?.date) }}
              </div>
            </ion-card-subtitle>
          </ion-col>
        </ion-row>
        <ion-row class="mt-5">
          <ion-col size="auto"> 
            <ion-icon :icon="informationOutline" class="ion-margin-end search-info__icon ion-text-capitalize"></ion-icon>
          </ion-col>
          <ion-col>
            <ion-chip :class="checkIsFull() === 'FULL' ? 'chip-danger' : 'chip-success'" class="mr-5">
              {{ checkIsFull() }}
            </ion-chip>

            <template v-if="searchInfo.size">
              <ion-chip color="dark" class="ion-text-center mr-5">
                <div>{{ searchInfo.size.text }}</div>
              </ion-chip>
            </template>

            <template v-if="searchInfo.gender">
              <ion-chip color="dark" class="ion-text-center mr-5">
                <div>{{ searchInfo.gender.text }}</div>
                <ion-icon class="chip_icon" :icon="searchInfo.gender.icon"></ion-icon>
              </ion-chip>
            </template>

            <template v-if="searchInfo.type">
              <ion-chip color="dark" class="ion-text-center mr-5">
                <div>{{ searchInfo.type.text }}</div>
                <ion-icon class="chip_icon" :icon="searchInfo.type.icon"></ion-icon>
              </ion-chip>
            </template>

            <template v-if="searchInfo.grassType">
              <ion-chip color="dark" class="ion-text-center mr-5">
                <div>{{ searchInfo.grassType.text }}</div>
                <ion-icon class="chip_icon" :icon="searchInfo.grassType.icon"></ion-icon>
              </ion-chip>
            </template>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-header>
    <ion-card-content>
    </ion-card-content>
  </ion-card>
</template>
  
<script setup lang="ts">
import {
  chevronForward,
  locationOutline,
  calendarOutline,
  happyOutline,
  informationOutline
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { Search } from "../../types/Search";
import { db, auth } from "@/firebase";
import useDateParser from "@/composables/date";
import { computed } from "vue";

const props = defineProps<{
  searchInfo: Search;
}>();

const router = useRouter();

const { parseDateTimeStampToISO } = useDateParser();

const goToSearchInfo = () => {
  router.push({
    name: "SearchInfo",
    params: {
      info: JSON.stringify(props.searchInfo),
    },
  });
};

const checkIsFull = () => {
  return props.searchInfo
    ? getSpotsAvailable() == 0
      ? "FULL"
      : getSpotsAvailable() == 1 ? "Disponible:" + getSpotsAvailable() + " lugar"  :   "Disponible: " + getSpotsAvailable() + " lugares"
    : "";
};

const getSpotsAvailable = () => {
  if (props.searchInfo.usersIdAttending) {
    return props.searchInfo.spots - props.searchInfo.usersIdAttending.length;
  } else {
    return props.searchInfo.spots;
  }
};

const checkIfParticipating = computed(() => {
  const usersAttending = props.searchInfo.usersIdAttending;
  // Verifica si usersAttending está definido y no es nulo
  if (usersAttending) {
    // Convierte usersAttending en un array
    const array = Array.isArray(usersAttending)
      ? usersAttending
      : [usersAttending];

    const isParticipating = array.includes(auth!.currentUser!.uid);
    return isParticipating;
  }
  return false;
});
</script>

<style scoped>

ion-card {
  background: transparent;
}

ion-icon,
ion-card-title,
ion-card-subtitle,
ion-card-content {
  color: var(--white);
}


</style>