<template>
 <ion-chip class="ion-no-margin">
  <ion-grid>
    <ion-row class="ion-align-items-center">
      <ion-col size="auto" class="ion-no-padding">
        <ion-icon class="player-icon mr-10" :icon="accessibilityOutline"> </ion-icon>
      </ion-col>
      <ion-col  class="ion-no-padding">
        <ion-text class="ion-text-capitalize ion-no-margin">
          {{ playerInfo.name }} {{ playerInfo.lastName }}{{ checkIsMe(playerInfo.id) ? '&nbsp;(Tu)': ''  }}
         </ion-text>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-chip>
</template>
  
  <script setup lang="ts">

import {
  accessibilityOutline
} from "ionicons/icons";
import { ref, onMounted, computed } from "vue";
import { auth } from "@/firebase";


const props = defineProps<{
  playerInfo: any;
}>();

const checkIsMe = (userId: any) => {
  return userId === auth!.currentUser!.uid;
};



</script>
  
  <style scoped>

  ion-chip {
    --background: var(--light-black) !important;
    border: 2px solid var(--black);
    width: 100%;
    font-size:14px !important;
    height: 60px;
  }

   .player-icon{
    font-size: 30px !important;
  }

</style>
  