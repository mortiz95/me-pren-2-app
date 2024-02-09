<template>
  <ion-card >
    <ion-card-header class="ion-no-padding ion-padding-horizontal ion-padding-top">
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-align-items-center">
          <ion-col size="10">
            <ion-card-title>
              <div class="container-card-title">
                <ion-icon
                  :icon="locationOutline"
                  class="ion-margin-end search-info__icon"
                ></ion-icon>
                {{ nextGameInfo.search.place }}
              </div>
            </ion-card-title>
            <ion-card-subtitle>
              <div class="container-card-subtitle">
                <ion-icon
                  :icon="calendarOutline"
                  class="ion-margin-end search-info__icon"
                ></ion-icon>
                {{ searchDateParsed }}
               <!--  {{ parseDateTimeStampToISO(nextGameInfo?.search.date) }} -->
              </div>
            </ion-card-subtitle>
          </ion-col>
          <ion-col>
            <ion-icon class="ion-float-end" :icon="chevronForward"></ion-icon>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-header>
    <ion-card-content>
      <ion-grid class="ion-no-padding">
        <ion-row class="ion-margin-top">
          <ion-col size="3"> Creado por </ion-col>
          <ion-col>
            <ion-card-subtitle class="ion-text-capitalize">{{
              nextGameInfo?.search.organizerInfo.fullName
            }}</ion-card-subtitle>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-top">
          <ion-col size="3"> Info </ion-col>
          <ion-col>
            <ion-badge
              :color="checkIsFull() === 'FULL' ? 'danger' : 'warning'"
              class="tags mr-5"
            >
              {{ checkIsFull() }}
            </ion-badge>

            <ion-badge
              v-if="Object.keys(nextGameInfo?.search.size).length > 0"
              color="light"
              class="ion-text-center tags mr-5"
            >
              {{ nextGameInfo?.search?.size?.text }}
            </ion-badge>

            <ion-badge
              v-if="Object.keys(nextGameInfo?.search.grassType).length > 0"
              color="light"
              class="ion-text-center tags mr-5"
            >
              <div>
                {{ nextGameInfo?.search?.grassType?.text }}
              </div>
              <ion-icon
                class="search-info-badge__icon"
                v-if="nextGameInfo?.search.grassType"
                :icon="nextGameInfo?.search.grassType.icon"
              ></ion-icon>
            </ion-badge>

            <ion-badge
              v-if="Object.keys(nextGameInfo?.search.gender).length > 0"
              color="light"
              class="ion-text-center tags mr-5"
            >
              <div>
                {{ nextGameInfo?.search?.gender?.text }}
              </div>
              <ion-icon
                class="search-info-badge__icon"
                v-if="nextGameInfo?.search.gender"
                :icon="nextGameInfo?.search.gender.icon"
              ></ion-icon>
            </ion-badge>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>
  
    <script setup lang="ts">
  import { chevronForward, locationOutline, calendarOutline, pencilOutline, trashOutline, informationCircleOutline, ticketOutline, peopleOutline } from "ionicons/icons";
  import { useRouter } from 'vue-router';
  import useDateParser from "@/composables/date";
  import { computed, ref } from "vue";
  import  Historical from "@/types/Historical";
import { Timestamp } from "firebase/firestore";

  const { parseDateTimeStampToISO } = useDateParser();
  
  const props = defineProps<{
    nextGameInfo: Historical;
  }>();

  console.log(props.nextGameInfo)


const searchDateParsed = computed(() => {
  const firestoreTimestamp = new Timestamp(
    props.nextGameInfo.search.date.seconds,
    props.nextGameInfo.search.date.nanoseconds
  );
  return parseDateTimeStampToISO(firestoreTimestamp);
});


  const checkIsFull = () => {
  return props.nextGameInfo
    ? props.nextGameInfo.search.spots === props.nextGameInfo.search.usersAttending.length
      ? "FULL"
      : props.nextGameInfo.search.spots + " lugares"
    : "";
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
  
  .search-info__icon { 
    font-size: 20px;
  }
  
  .search-info-badge__icon  {
    margin-left: 3px;
  }
  
  .container-card-title, .container-card-subtitle {
    display: flex;
    align-items: center;
  }

  .container-card-subtitle{
    margin-top:5px;
    margin-bottom: 5px;
  }
  ion-badge.purple {
      --background: purple;
      --color: white;
      --padding-end: 20px;
      --padding-start: 20px;
    }
  
  </style>