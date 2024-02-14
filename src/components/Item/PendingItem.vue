<template>
  <ion-card>
    <ion-card-header class="ion-no-padding ion-padding-horizontal ion-padding-top">
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-align-items-center">
          <ion-col size="auto">
            <ion-card-title>
              <div class="container-card-title">
                <ion-icon :icon="locationOutline" class="ion-margin-end search-info__icon ion-text-capitalize"></ion-icon>
                {{ nextGameInfo.search.place }}
              </div>
            </ion-card-title>
          </ion-col>
          <ion-col class="ion-text-end">
            <ion-icon @click="goToNextGameInfo()" class="ion-float-end" :icon="chevronForward"></ion-icon>
          </ion-col>
        </ion-row>

        <ion-row class="mt-5">
          <ion-col size="12">
            <ion-card-subtitle>
              <div class="container-card-subtitle ion-text-capitalize">
                <ion-icon :icon="calendarOutline" class="ion-margin-end search-info__icon"></ion-icon>
                {{ searchDateParsed }}
              </div>
            </ion-card-subtitle>
          </ion-col>
        </ion-row>

        <ion-row class="mt-5">
          <ion-col size="12">
            <ion-card-subtitle>
              <div class="container-card-subtitle ion-text-capitalize">
                <ion-icon :icon="hourglassOutline" class="ion-margin-end search-info__icon"></ion-icon>
                {{ status }}
              </div>
            </ion-card-subtitle>
          </ion-col>
        </ion-row>

        <ion-row class="mt-5">
          <ion-col size="auto">
            <ion-icon :icon="informationCircleOutline"
              class="ion-margin-end search-info__icon ion-text-capitalize"></ion-icon>
          </ion-col>
          <ion-col>

            <template v-if="nextGameInfo.search?.size">
              <ion-chip color="dark" class="ion-text-center mr-5">
                <div>{{ nextGameInfo.search?.size.text }}</div>
              </ion-chip>
            </template>

            <template v-if="nextGameInfo.search?.gender">
              <ion-chip color="dark" class="ion-text-center mr-5">
                <div>{{ nextGameInfo.search?.gender.text }}</div>
                <ion-icon class="chip_icon" :icon="nextGameInfo.search?.gender.icon"></ion-icon>
              </ion-chip>
            </template>

            <template v-if="nextGameInfo.search?.type">
              <ion-chip color="dark" class="ion-text-center mr-5">
                <div>{{ nextGameInfo.search?.type.text }}</div>
                <ion-icon class="search-chip_icon" :icon="nextGameInfo.search?.type.icon"></ion-icon>
              </ion-chip>
            </template>

            <template v-if="nextGameInfo.search?.grassType">
              <ion-chip color="dark" class="ion-text-center mr-5">
                <div>{{ nextGameInfo.search?.grassType.text }}</div>
                <ion-icon class="search-chip_icon" :icon="nextGameInfo.search?.grassType.icon"></ion-icon>
              </ion-chip>
            </template>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" class="ion-text-center button-container">
            <ion-button fill="clear" id="open-action-sheet" expand="full" class="btn-unsubscribe-clear"><u>Darse de baja</u>
            </ion-button>
            <ion-action-sheet trigger="open-action-sheet" header="Esta seguro que desea darse de baja?"
              class="my-custom-action-sheet" :buttons="actionSheetButtons" backdropDismiss="false"
              @didDismiss="logResult($event)"></ion-action-sheet>
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
import { computed, onMounted, ref } from "vue";
import Historical from "@/types/Historical";
import { Timestamp } from "firebase/firestore";
import { useUserStore } from "@/store/user";
import { useSearchStore } from "@/store/search";

const { parseDateTimeStampToISO } = useDateParser();

const router = useRouter();
const userStore = useUserStore();
const searchStore = useSearchStore();

const props = defineProps<{
  nextGameInfo: Historical;
}>();

const actionSheetButtons = [
  {
    text: 'Confirmar',
    role: 'destructive',
    data: {
      action: 'delete',
    },
  },
  {
    text: 'Cancelar',
    role: 'cancel',
    data: {
      action: 'cancel',
    },
  },
];

const logResult = async (ev: CustomEvent) => {
  const optionSelected = ev.detail.data.action
  if (optionSelected === 'delete') {
    //await removeUserFromSearch()
  }
};

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
    }
  });
};

const removeUserFromSearch = async () => {
  await userStore.removeSearchFromMySearchedAttended(props.nextGameInfo.searchId)
  await searchStore.removeMeFromSearch(props.nextGameInfo.searchId)
}

</script>
  
<style scoped>
.button-container ion-button::part(native) {
  text-transform: none;
  /* Reset text-transform for ion-button */
}

ion-card {
  background: transparent;
}

ion-icon,
ion-card-title,
ion-card-subtitle,
ion-card-content {
  color: var(--white);
}

u {
  font-size: 16px !important;
  color: var(--red);
}

ion-action-sheet.my-custom-action-sheet {
  --background: var(--black);
  --backdrop-opacity: 0.6;
  --button-color: var(--white);
  --color: #fff;
}
</style>