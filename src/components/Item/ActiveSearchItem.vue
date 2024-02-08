<template>
    <ion-card>
      <ion-card-header>
        <ion-grid class="ion-no-padding ion-no-margin">
          <ion-row>
            <ion-col size="10">
              <ion-card-title>
                <div class="container-card-title">
                  <ion-icon :icon="locationOutline" class="ion-margin-end search-info__icon"></ion-icon> {{ searchInfo.place }}
                </div>
              </ion-card-title>
              <ion-card-subtitle>
                <div class="container-card-subtitle">
                 <ion-icon :icon="calendarOutline" class="ion-margin-end search-info__icon"></ion-icon>
                 {{ parseDateTimeStampToISO(searchInfo?.date) }}
                </div>
                <div class="container-card-subtitle">
                 <ion-icon :icon="ticketOutline" class="ion-margin-end search-info__icon"></ion-icon>
                 {{checkIsFull() }}  
                </div>
              </ion-card-subtitle>
            </ion-col>
            <ion-col size="1">
              <ion-icon class="ion-float-end" :icon="pencilOutline"></ion-icon>
            </ion-col>
            <ion-col size="1">
              <ion-icon class="ion-float-end" :icon="trashOutline"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-header>
      <ion-card-content >
        <div v-if="showAllInfo">
            <ion-grid class="ion-no-padding">
              <ion-row>
                <ion-col size="1">
                 <ion-icon class="search-info__icon" :icon="informationCircleOutline"></ion-icon> 
                </ion-col>
                <ion-col size="11">
                  <ion-row>
                    <ion-col size="auto"> Lugares totales: {{ searchInfo?.spots }} </ion-col>
                    <ion-col size="auto"> 
                      <span class="ml-5"> / </span> {{ searchInfo?.size?.text }} </ion-col>
                    <ion-col size="auto"> 
                      <span class="ml-5"> / </span>  {{ searchInfo?.gender?.text }} <ion-icon class="search-info-badge__icon " v-if="searchInfo.gender" :icon="searchInfo.gender.icon"></ion-icon>
                    </ion-col>
                  </ion-row>

                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="1">
                 <ion-icon class="search-info__icon" :icon="peopleOutline"></ion-icon> 
                </ion-col>
                <ion-col size="11">
                  <ion-row>
                    <ion-col 
                      size="12"
                      v-if="searchInfo.usersAttending.length > 0" 
                      >
                      <div     
                        v-for="(item, index) in searchInfo.usersAttending"
                       :key="index">
                      </div>
                    </ion-col>
                    <ion-col v-else size="12">
                      <div>No hay jugadores anotados</div>
                    </ion-col>
                  </ion-row>
                </ion-col>
              </ion-row>
          </ion-grid>
        </div>
        <div>
          <ion-grid class="ion-no-padding mt-5">
            <ion-row>
              <ion-col class="ion-text-center">
                <div v-if="!showAllInfo"   @click="showAllInfo = !showAllInfo">Ver mas</div>
                <div v-else  @click="showAllInfo = !showAllInfo" >Ver menos</div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </ion-card-content>
    </ion-card>
  </template>
    
    <script setup lang="ts">
  import { chevronForward, locationOutline, calendarOutline, pencilOutline, trashOutline, informationCircleOutline, ticketOutline, peopleOutline } from "ionicons/icons";
  import { useRouter } from 'vue-router';
  import { Search } from '../../types/Search'
  import useDateParser from "@/composables/date";
  import { ref } from "vue";
  
  
  const props = defineProps<{
    searchInfo: Search;
  }>();
  
  const router =  useRouter();
  
  const {
    parseDateTimeStampToISO
  } = useDateParser();

  const showAllInfo  = ref(false);
    
  const checkIsFull = ()  => {
   return props.searchInfo ? (props.searchInfo.spots === props.searchInfo.usersAttending.length ? 'FULL' : 'Disponibles: '  + props.searchInfo.spots) : ''
  }
  
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