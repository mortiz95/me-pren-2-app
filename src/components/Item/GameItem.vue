<template>
  <ion-card>
    <ion-card-header>
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-align-items-center">
          <ion-col size="10">
            <ion-card-title
              >{{ gameInfo.province }}, {{ gameInfo.city }}
            </ion-card-title>
            <ion-card-subtitle
              >{{ gameInfo.place }} /
              {{ parseDateTimeStampToISO_GetDay(gameInfo?.date) }}
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
        <ion-row>
          <ion-col size="3"> Hora </ion-col>
          <ion-col>
            <ion-card-subtitle>{{
              parseDateTimeStampToISO_GetHours(gameInfo?.date)
            }}</ion-card-subtitle>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-top">
          <ion-col size="3"> Creado por </ion-col>
          <ion-col>
            <ion-card-subtitle>{{ gameInfo?.createdByUser }}</ion-card-subtitle>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-top">
          <ion-col size="3"> Info </ion-col>
          <ion-col>
            <ion-badge color="warning" class="tags">
              Spots: {{ gameInfo?.spots }}</ion-badge
            >
            <ion-badge color="warning" class="tags">
              Disponibles: 1/2
            </ion-badge>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>
  
  <script setup lang="ts">
import { chevronForward } from "ionicons/icons";

import useDateParser from "@/composables/date";

const props = defineProps({
  gameInfo: {
    type: Object,
    required: true,
  },
});

const {
  parseDateTimeStampToISO,
  parseDateTimeStampToISO_GetHours,
  parseDateTimeStampToISO_GetDay,
} = useDateParser();

</script>

  <style scoped>
ion-card {
  background: transparent;
}

ion-card-title,
ion-card-subtitle,
ion-card-content {
  color: var(--white);
}

ion-icon {
  color: var(--white);
  font-size: 20px;
}

</style>