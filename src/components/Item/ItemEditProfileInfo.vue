<template>
  <ion-item>
    <ion-grid class="ion-no-padding">
      <ion-row class="ion-align-items-center">
        <ion-col size="auto">
          <ion-icon :icon="personOutline"></ion-icon>
        </ion-col>
        <ion-col size="auto">
          <ion-row class="ion-padding-start">
            <ion-col size="12">Genero</ion-col>
            <ion-col size="12">Hombre</ion-col>
          </ion-row>
        </ion-col>
        <ion-col size="">
          <ion-icon :icon="pencilOutline" class="ion-float-end"></ion-icon>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>
</template>
     
<script setup lang="ts">

import {
  accessibilityOutline,
  personOutline,
  pencilOutline
} from "ionicons/icons";
import { ref, onMounted, computed } from "vue";
import { auth } from "@/firebase";


const props = defineProps<{
  userEditInfo: any;
}>();



</script>
     
<style scoped></style>
     