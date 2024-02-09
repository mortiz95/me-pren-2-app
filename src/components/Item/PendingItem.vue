<template>
  <ion-card @click="goToNextGameInfo()">
    <ion-card-header>
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-justify-content-between">
          <ion-col size="auto">
            <ion-card-title>
              <div>
                <ion-grid>
                  <ion-row class="ion-align-items-center">
                    <ion-col size="2">
                      <ion-icon
                        :icon="locationOutline"
                        class="search-info__icon"
                      ></ion-icon>
                    </ion-col>
                    <ion-col>
                      <h3 class="ion-no-margin ion-text-uppercase">
                        {{ nextGameInfo.search.place }}
                      </h3>
                    </ion-col>
                    <ion-col>
                      <ion-icon class="ion-float-end" :icon="chevronForward"></ion-icon>
                    </ion-col>
                  </ion-row>
                  <ion-row class="ion-align-items-center">
                    <ion-col size="2">
                      <ion-icon
                        :icon="calendarOutline"
                        class="search-info__icon"
                      ></ion-icon>
                    </ion-col>
                    <ion-col>
                      <h5 class="ion-no-margin">{{ searchDateParsed }}</h5>
                    </ion-col>
                  </ion-row>
                  <ion-row class="ion-align-items-center">
                    <ion-col size="2">
                      <ion-icon
                        :icon="hourglassOutline"
                        class="search-info__icon"
                      ></ion-icon>
                    </ion-col>
                    <ion-col>
                      <h6
                        class="ion-no-margin ion-text-capitalize"
                        style="{status}"
                      >
                        {{ status }}
                      </h6>
                    </ion-col>
                  </ion-row>
                  <ion-row class="ion-align-items-center">
                    <ion-col size="2">
                      <ion-icon
                        :icon="informationCircleOutline"
                        class="search-info__icon"
                      ></ion-icon>
                    </ion-col>
                    <ion-col>
                      <p class="ion-no-margin">
                        Lugares totales:
                        {{ nextGameInfo.search?.spots }} &nbsp;/ &nbsp;{{
                          nextGameInfo.search?.size?.text
                        }}&nbsp;/&nbsp;
                        {{ nextGameInfo.search?.gender?.text }}&nbsp;/&nbsp;
                        {{
                          nextGameInfo.search?.grassType?.text
                        }}&nbsp;/&nbsp;{{ nextGameInfo.search?.type?.text }}
                      </p>
                    </ion-col>
                  </ion-row>
                  <ion-row class="ion-align-items-center ion-margin-top">
                    <ion-col size="auto">
                      <u class="ion-float-end">Darse de baja</u>
                    </ion-col>
                  </ion-row>
                </ion-grid>
              </div>
            </ion-card-title>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-header>
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
  closeCircleOutline,
  hourglassOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import useDateParser from "@/composables/date";
import { computed, ref } from "vue";
import Historical from "@/types/Historical";
import { Timestamp } from "firebase/firestore";

const { parseDateTimeStampToISO } = useDateParser();

const router = useRouter();


const props = defineProps<{
  nextGameInfo: Historical;
}>();

const searchDateParsed = computed(() => {
  const firestoreTimestamp = new Timestamp(
    props.nextGameInfo.search.date.seconds,
    props.nextGameInfo.search.date.nanoseconds
  );
  return parseDateTimeStampToISO(firestoreTimestamp);
});

const status = computed(() => {
  return props.nextGameInfo.status === "pending" ? "Abierto" : "Cerrado";
});

 const goToNextGameInfo = () => {
 router.push({
    name: "NextGameInfo",
    params: { 
    info: JSON.stringify(props.nextGameInfo.search)
    },
  query: { 
    comeFromPending: 'yes' 
  }
  }); 
};
 
</script>
  
    <style scoped>
ion-card {
  background: transparent;
}

ion-icon,
ion-card-title,
ion-card-subtitle {
  color: var(--white);
}

.search-info__icon {
  font-size: 30px;
}

u {
  font-size: 14px !important;
  color: var(--red);
}
</style>