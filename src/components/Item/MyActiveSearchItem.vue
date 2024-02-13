<template>
  <ion-card>
    <ion-card-header
      class="ion-no-padding ion-padding-horizontal ion-padding-top"
    >
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row>
          <ion-col size="10">
            <ion-card-title>
              <div class="container-card-title">
                <ion-icon
                  :icon="locationOutline"
                  class="ion-margin-end search-info__icon ion-text-capitalize"
                ></ion-icon>
                {{ searchInfo.place }}
              </div>
            </ion-card-title>
          </ion-col>
          <ion-col size="1">
            <ion-icon class="ion-float-end" :icon="pencilOutline"></ion-icon>
          </ion-col>
          <ion-col size="1">
            <ion-icon class="ion-float-end" :icon="trashOutline"></ion-icon>
          </ion-col>
        </ion-row>

        <ion-row class="mt-5">
          <ion-col size="12">
            <ion-card-subtitle>
              <div class="container-card-subtitle ion-text-capitalize">
                <ion-icon
                  :icon="calendarOutline"
                  class="ion-margin-end search-info__icon"
                ></ion-icon>
                {{ parseDateTimeStampToISO(searchInfo?.date) }}
              </div>
            </ion-card-subtitle>
          </ion-col>
           </ion-row>

        <ion-row class="mt-5">
          <ion-col size="12">
            <ProgressBar
              :searchSpots="searchInfo.spots"
              :totalUsersIdAttending="searchInfo.usersAttending.length"
            ></ProgressBar>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-header>
    <ion-card-content>
      <div v-if="showAllInfo">
        <ion-grid class="ion-no-padding">
          <ion-row class="mt-5">
            <ion-col size="12" v-if="searchInfo.usersAttending.length > 0">
              <div
                  v-for="(item, index) in searchInfo.usersAttending"
                  :key="index"
                  class="ion-text-capitalize ion-no-margin"
                >
                  <ion-chip>
                    <ion-label> {{ item.name }} {{ item.lastName }} </ion-label>
                </ion-chip>
              </div>
            </ion-col>
          </ion-row>
          <ion-row class="mt-5">
            <ion-col size="12">
              <ion-row>
                <ion-chip v-if="searchInfo.size.text" class="chip-transparent">
                  <ion-label> {{ searchInfo?.size?.text }} </ion-label>
                </ion-chip>
                <ion-chip v-if="searchInfo.gender.text" class="chip-transparent">
                  <ion-label> {{ searchInfo?.gender?.text }} </ion-label>
                  <ion-icon :icon="searchInfo.gender.icon"></ion-icon>
                </ion-chip>
                <ion-chip v-if="searchInfo.type.text" class="chip-transparent">
                  <ion-label> {{ searchInfo?.type?.text }}</ion-label>
                  <ion-icon :icon="searchInfo.type.icon"></ion-icon>
                </ion-chip>
                <ion-chip v-if="searchInfo.grassType.text" class="chip-transparent">
                  <ion-label> {{ searchInfo?.grassType?.text }}</ion-label>
                  <ion-icon :icon="searchInfo.grassType.icon"></ion-icon>
                </ion-chip>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
      <div>
        <ion-grid class="ion-no-padding mt-5">
          <ion-row>
            <ion-col class="ion-text-center">
              <div v-if="!showAllInfo" @click="showAllInfo = !showAllInfo">
                Ver mas
              </div>
              <div v-else @click="showAllInfo = !showAllInfo">Ver menos</div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-card-content>
  </ion-card>
</template>
    
    <script setup lang="ts">
import {
  chevronForward,
  locationOutline,
  calendarOutline,
  pencilOutline,
  trashOutline,
  informationCircleOutline,
  ticketOutline,
  peopleOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { Search } from "../../types/Search";
import useDateParser from "@/composables/date";
import { computed, ref } from "vue";
import ProgressBar from "../Progress-bar/ProgressBar.vue";

const props = defineProps<{
  searchInfo: Search;
}>();

const router = useRouter();

const { parseDateTimeStampToISO } = useDateParser();

const showAllInfo = ref(false);

const checkIsFull = () => {
  return props.searchInfo
    ? props.searchInfo.spots === props.searchInfo.usersAttending.length
      ? "FULL"
      : "Disponibles: " + getAvailableSpots()
    : "";
};

const getAvailableSpots = () => {
  return props.searchInfo.spots - props.searchInfo.usersAttending.length;
};
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

ion-chip {
  --background: var(--transparent);
  font-size: 12px;
  margin-left: 0px;
  border: 1px solid var(--white);
}

.chip-transparent{
  --background: var(--black);
}

.search-info__icon {
  font-size: 22px;
}

.container-card-title,
.container-card-subtitle {
  display: flex;
  align-items: center;
}

.container-card-subtitle {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>