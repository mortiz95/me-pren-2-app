<template>
  <ion-card @click="goToGameInfo()" >
    <ion-card-header>
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-align-items-center">
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
            <ion-card-subtitle>{{ gameInfo?.createdByUser }}</ion-card-subtitle>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-top">
          <ion-col size="3"> Info </ion-col>
          <ion-col>
            <ion-badge color="light" class="tags">
              Spots: {{ gameInfo?.spots }}</ion-badge
            >
            <ion-badge color="tertiary" class="tags">
              Disponibles: 1 / {{ gameInfo?.spots }}
            </ion-badge>

            <ion-badge 
             color="warning" 
             class="ion-text-center tags"
           >
             {{ gameInfo?.size?.text }}
           </ion-badge>

           <ion-badge 
             color="secondary" 
             class="ion-text-center tags"
           >
           <div>
             {{ gameInfo?.gender?.text }}
           </div>
             <ion-icon class="game-info-badge__icon " v-if="gameInfo.gender" :icon="gameInfo.gender.icon"></ion-icon>
           </ion-badge>

          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>
  
  <script setup lang="ts">
import { chevronForward, locationOutline, calendarOutline } from "ionicons/icons";
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


</style>