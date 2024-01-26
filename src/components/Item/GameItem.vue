<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ gameInfo.province }}, {{ gameInfo.city }} </ion-card-title>
       <ion-card-subtitle>{{ gameInfo.place }} / {{ parseDateTimeStampToISO(gameInfo?.date) }} </ion-card-subtitle>  
    </ion-card-header>
      <ion-card-content>
        <ion-grid>
        <ion-row>
            <ion-col size="3">
                Creado por :
            </ion-col>
            <ion-col>
                <ion-card-subtitle>{{ gameInfo?.createdByUser }}</ion-card-subtitle>
            </ion-col>
        </ion-row>
        <ion-row>
            <ion-col size="3">
               Info
            </ion-col>
            <ion-col>
                <ion-badge color="dark" class="tags"> Spots: {{ gameInfo?.spots }}</ion-badge>
            </ion-col>
        </ion-row>

    </ion-grid>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script setup lang="ts">
  import useDateParser from "@/composables/date";
;
 const props = defineProps({
  gameInfo: {
    type: Object,
    required: true
  }
});

const { parseDateTimeStampToISO } = useDateParser();


  </script>