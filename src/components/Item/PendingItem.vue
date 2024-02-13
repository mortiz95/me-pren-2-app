<template>
  <ion-card>
    <ion-card-header>
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-justify-content-between">
          <ion-col size="auto">
            <ion-card-title>
              <div>
                <ion-grid class="ion-no-padding">
                  <ion-row class="ion-align-items-center">
                    <ion-col size="2">
                      <ion-icon
                        :icon="locationOutline"
                        class="search-info__icon"
                      ></ion-icon>
                    </ion-col>
                    <ion-col size="9">
                      <h3 class="ion-no-margin ion-text-uppercase">
                        {{ nextGameInfo.search.place }}
                      </h3>
                    </ion-col>
                    <ion-col size="1">
                      <ion-icon @click="goToNextGameInfo()" class="ion-float-end" :icon="chevronForward"></ion-icon>
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
                      <h5 class="ion-no-margin ion-text-capitalize">{{ searchDateParsed }}</h5>
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
                      <h5
                        class="ion-no-margin ion-text-capitalize"
                      >
                        {{ status }}
                      </h5>
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

                      <ion-chip v-if="nextGameInfo.search?.size.text">
                  <ion-label> {{ nextGameInfo?.search?.size?.text }} </ion-label>
                </ion-chip>
                <ion-chip v-if="nextGameInfo.search?.gender.text">
                  <ion-label> {{ nextGameInfo.search?.gender?.text }} </ion-label>
                  <ion-icon :icon="nextGameInfo.search?.gender.icon"></ion-icon>
                </ion-chip>
                <ion-chip v-if="nextGameInfo.search?.type.text">
                  <ion-label> {{ nextGameInfo?.search?.type?.text }}</ion-label>
                  <ion-icon :icon="nextGameInfo.search?.type.icon"></ion-icon>
                </ion-chip>
                <ion-chip v-if="nextGameInfo.search?.grassType.text">
                  <ion-label> {{ nextGameInfo?.search?.grassType?.text }}</ion-label>
                  <ion-icon :icon="nextGameInfo.search?.grassType.icon"></ion-icon>
                </ion-chip>

                    </ion-col>
                  </ion-row>
                  <ion-row>
                    <ion-col size="12" class="ion-text-center button-container">
                      <ion-button
                        fill="clear"
                        id="open-action-sheet"
                        color="danger"
                        expand="full"
                        ><u>Darse de baja</u>
                      </ion-button>
                      <ion-action-sheet
                        trigger="open-action-sheet"
                        header="Esta seguro que desea darse de baja?"
                        class="my-custom-action-sheet"
                        :buttons="actionSheetButtons"
                        backdropDismiss="false"
                        @didDismiss="logResult($event)"
                      ></ion-action-sheet>
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

  const logResult = async (ev: CustomEvent)  => {
    const optionSelected = ev.detail.data.action
    if(optionSelected === 'delete'){
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
  text-transform: none; /* Reset text-transform for ion-button */
}

ion-chip {
  --background: var(--black);
  color: var(--white);
  font-size: 10px;
  margin-left: 0px;
  border: 1px solid var(--white);
}

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