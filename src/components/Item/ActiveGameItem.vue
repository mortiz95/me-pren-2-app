<template>
    <ion-card @click="goToGameInfo()" >
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
              </ion-card-subtitle>
            </ion-col>
            <ion-col size="1">
              <ion-icon class="ion-float-end" :icon="pencilOutline"></ion-icon>
            </ion-col>
            <ion-col size="1">
              <ion-icon class="ion-float-end" :icon="removeCircleOutline"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-header>
      <ion-card-content>
        <ion-grid class="ion-no-padding">
          <ion-row class="ion-margin-top">
            <ion-col size="2"> Info </ion-col>
            <ion-col class="">
              <div color="light" class="tags">
                Lugares: {{ gameInfo?.spots }} /   {{checkIsFull() }} /   {{ gameInfo?.size?.text }} /    {{ gameInfo?.gender?.text }}
               <ion-icon class="game-info-badge__icon " v-if="gameInfo.gender" :icon="gameInfo.gender.icon"></ion-icon>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card-content>
    </ion-card>
  </template>
    
    <script setup lang="ts">
  import { chevronForward, locationOutline, calendarOutline, pencilOutline, removeCircleOutline } from "ionicons/icons";
  import { useRouter } from 'vue-router';
  import { Game } from '../../types/Game'
  import useDateParser from "@/composables/date";
  
  
  const props = defineProps<{
    gameInfo: Game;
  }>();
  
  const router =  useRouter();
  
  const {
    parseDateTimeStampToISO
  } = useDateParser();
  
  const goToGameInfo = ()  => {
    router.push({ name: 'GameInfo', params:  { info: JSON.stringify(props.gameInfo) } });
  }
  
  const checkIsFull = ()  => {
   return props.gameInfo ? (props.gameInfo.spots === props.gameInfo.usersAttending.length ? 'FULL' : 'Quedan: ' + props.gameInfo.spots + ' lugares') : ''
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
  
  ion-badge.purple {
      --background: purple;
      --color: white;
      --padding-end: 20px;
      --padding-start: 20px;
    }
  
  </style>