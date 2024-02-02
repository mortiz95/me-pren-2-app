<template>
    <ion-card>
      <ion-card-header>
        <ion-grid class="ion-no-padding ion-no-margin">
          <ion-row>
            <ion-col size="10">
              <ion-card-title>
                <div class="container-card-title">
                  <ion-icon :icon="locationOutline" class="ion-margin-end game-info__icon"></ion-icon> {{ gameInfo.place }}
                </div>
              </ion-card-title>
              <ion-card-subtitle>
                <div class="container-card-subtitle">
                 <ion-icon :icon="calendarOutline" class="ion-margin-end game-info__icon"></ion-icon>
                 {{ parseDateTimeStampToISO(gameInfo?.date) }}
                </div>
                <div class="container-card-subtitle">
                 <ion-icon :icon="ticketOutline" class="ion-margin-end game-info__icon"></ion-icon>
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
                 <ion-icon class="game-info__icon" :icon="informationCircleOutline"></ion-icon> 
                </ion-col>
                <ion-col size="11">
                  <ion-row>
                    <ion-col size="auto"> Lugares totales: {{ gameInfo?.spots }} </ion-col>
                    <ion-col size="auto"> 
                      <span class="ml-5"> / </span> {{ gameInfo?.size?.text }} </ion-col>
                    <ion-col size="auto"> 
                      <span class="ml-5"> / </span>  {{ gameInfo?.gender?.text }} <ion-icon class="game-info-badge__icon " v-if="gameInfo.gender" :icon="gameInfo.gender.icon"></ion-icon>
                    </ion-col>
                  </ion-row>

                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="1">
                 <ion-icon class="game-info__icon" :icon="peopleOutline"></ion-icon> 
                </ion-col>
                <ion-col size="11">
                  <ion-row>
                    <ion-col 
                      size="12"
                      v-if="gameInfo.usersAttending.length > 0" 
                      >
                      <div     
                        v-for="(item, index) in gameInfo.usersAttending"
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
  import { Game } from '../../types/Game'
  import useDateParser from "@/composables/date";
  import { ref } from "vue";
  
  
  const props = defineProps<{
    gameInfo: Game;
  }>();
  
  const router =  useRouter();
  
  const {
    parseDateTimeStampToISO
  } = useDateParser();

  const showAllInfo  = ref(false);
    
  const checkIsFull = ()  => {
   return props.gameInfo ? (props.gameInfo.spots === props.gameInfo.usersAttending.length ? 'FULL' : 'Disponibles: '  + props.gameInfo.spots) : ''
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
  
  .game-info__icon { 
    font-size: 20px;
  }
  
  .game-info-badge__icon  {
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