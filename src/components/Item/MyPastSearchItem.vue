<template>
    <ion-card>
      <ion-card-header
        class="ion-no-padding ion-padding-horizontal ion-padding-top"
      >
        <ion-grid class="ion-no-padding ion-no-margin">
          <ion-row>
            <ion-col size="12">
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
              <ion-card-subtitle>
                <div class="container-card-subtitle ion-text-capitalize">
                  <ion-icon
                    :icon="hourglassOutline"
                    class="ion-margin-end search-info__icon"
                  ></ion-icon>
                  {{ status }}
                </div>
              </ion-card-subtitle>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-header>
      <ion-card-content>
        <div v-if="showAllInfo">
          <ion-grid class="ion-no-padding">
            <ion-row class="mt-10">
            <ion-col size="12">
              <ProgressBar
                :searchSpots="searchInfo.spots"
                :totalUsersIdAttending="searchInfo.usersAttending.length"
              ></ProgressBar>
            </ion-col>
          </ion-row>
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
                  <ion-chip v-if="searchInfo.size.text" >
                    <ion-label> {{ searchInfo?.size?.text }} </ion-label>
                  </ion-chip>
                  <ion-chip v-if="searchInfo.gender.text">
                    <ion-label> {{ searchInfo?.gender?.text }} </ion-label>
                    <ion-icon :icon="searchInfo.gender.icon"></ion-icon>
                  </ion-chip>
                  <ion-chip v-if="searchInfo.type.text">
                    <ion-label> {{ searchInfo?.type?.text }}</ion-label>
                    <ion-icon :icon="searchInfo.type.icon"></ion-icon>
                  </ion-chip>
                  <ion-chip v-if="searchInfo.grassType.text">
                    <ion-label> {{ searchInfo?.grassType?.text }}</ion-label>
                    <ion-icon :icon="searchInfo.grassType.icon"></ion-icon>
                  </ion-chip>
              </ion-col>
            </ion-row>
            <ion-row class="mt-5">
              <ion-col>
                <ion-text>
                  {{ searchInfo.description }}
                </ion-text>
              </ion-col>
            </ion-row>
            <ion-row class="mt-5">
              <ion-col>
                <ion-text>
                  Evento pago: {{ searchPaymentTitle }}
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
        <div>
          <ion-grid class="ion-no-padding mt-5">
            <ion-row>
              <ion-col class="ion-text-center">
                <div v-if="!showAllInfo" @click="showAllInfo = !showAllInfo">
                  <u>Ver mas</u>
                </div>
                <div v-else @click="showAllInfo = !showAllInfo"><u> Ver menos </u></div>
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
    gameControllerOutline,
    hourglassOutline
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
  
  const searchPaymentTitle = computed(() => {
    return (props.searchInfo.payment ? 'Si' : 'No')
  })
  
  const status = computed(() => {
    switch (props.searchInfo.status) {
      case 'open':
        return 'Abierto';
      case 'close':
       return 'Cerrado';
      case 'cancelled':
       return 'Cancelado'
       default:
        return 'Desconocido';
    }
  })
  
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