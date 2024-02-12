<template>
  <ion-card @click="goToSearchInfo()">
    <ion-card-header
      class="ion-no-padding ion-padding-horizontal ion-padding-top"
    >
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row>
          <ion-col size="10">
            <ion-card-title>
              <div class="container-card-title ion-text-uppercase">
                <ion-icon
                  :icon="locationOutline"
                  class="ion-margin-end search-info__icon"
                ></ion-icon>
                {{ searchInfo.place }}
              </div>
            </ion-card-title>
            <ion-card-subtitle>
              <div class="container-card-subtitle ion-text-capitalize">
                <ion-icon
                  :icon="calendarOutline"
                  class="ion-margin-end search-info__icon"
                ></ion-icon>
                {{ parseDateTimeStampToISO(searchInfo?.date) }}
              </div>
            </ion-card-subtitle>
            <ion-card-subtitle v-show="checkIfParticipating">
              <div class="container-card-subtitle">
                <ion-chip>
                  <ion-icon
                    :icon="happyOutline"
                    class="search-info__icon"
                  ></ion-icon>
                  <ion-label>
                    {{ checkIfParticipating ? "Ya te has unido" : "" }}
                  </ion-label>
                </ion-chip>
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
        <!--         <ion-row class="ion-margin-top">
          <ion-col size="3"> Creado por </ion-col>
          <ion-col>
            <ion-card-subtitle class="ion-text-capitalize">{{
              searchInfo?.organizerInfo.fullName
            }}</ion-card-subtitle>
          </ion-col>
        </ion-row> -->
        <ion-row class="ion-margin-top">
          <ion-col size="2"> Info </ion-col>
          <ion-col>
            <ion-badge
              :color="checkIsFull() === 'FULL' ? 'danger' : 'warning'"
              class="tags mr-5"
            >
              {{ checkIsFull() }}
            </ion-badge>

            <ion-badge
              v-if="Object.keys(searchInfo.size).length > 0"
              color="dark"
              class="ion-text-center tags mr-5"
            >
              {{ searchInfo?.size?.text }}
            </ion-badge>

            <ion-badge
              v-if="Object.keys(searchInfo.grassType).length > 0"
              color="dark"
              class="ion-text-center tags mr-5"
            >
              <div>
                {{ searchInfo?.grassType?.text }}
              </div>
              <ion-icon
                class="search-info-badge__icon"
                v-if="searchInfo.grassType"
                :icon="searchInfo.grassType.icon"
              ></ion-icon>
            </ion-badge>

            <ion-badge
              v-if="Object.keys(searchInfo.gender).length > 0"
              color="dark"
              class="ion-text-center tags mr-5"
            >
              <div>
                {{ searchInfo?.gender?.text }}
              </div>
              <ion-icon
                class="search-info-badge__icon"
                v-if="searchInfo.gender"
                :icon="searchInfo.gender.icon"
              ></ion-icon>
            </ion-badge>

            <ion-badge
              v-if="Object.keys(searchInfo.type).length > 0"
              color="dark"
              class="ion-text-center tags mr-5"
            >
              <div>
                {{ searchInfo?.type?.text }}
              </div>
              <ion-icon
                class="search-info-badge__icon"
                v-if="searchInfo.type"
                :icon="searchInfo.type.icon"
              ></ion-icon>
            </ion-badge>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card-content>
  </ion-card>
</template>
  
  <script setup lang="ts">
import {
  chevronForward,
  locationOutline,
  calendarOutline,
  happyOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { Search } from "../../types/Search";
import { db, auth } from "@/firebase";
import useDateParser from "@/composables/date";
import { computed } from "vue";

const props = defineProps<{
  searchInfo: Search;
}>();

const router = useRouter();

const { parseDateTimeStampToISO } = useDateParser();

const goToSearchInfo = () => {
  router.push({
    name: "SearchInfo",
    params: {
      info: JSON.stringify(props.searchInfo),
    },
  });
};

const checkIsFull = () => {
  return props.searchInfo
    ? props.searchInfo.spots === props.searchInfo.usersAttending.length
      ? "FULL"
      : getSpotsAvailable() + " lugares"
    : "";
};

const getSpotsAvailable = () => {
  if (props.searchInfo.usersIdAttending) {
    return props.searchInfo.spots - props.searchInfo.usersIdAttending.length;
  } else {
    return props.searchInfo.spots;
  }
};

const checkIfParticipating = computed(() => {
  const usersAttending = props.searchInfo.usersIdAttending;
  // Verifica si usersAttending está definido y no es nulo
  if (usersAttending) {
    // Convierte usersAttending en un array
    const array = Array.isArray(usersAttending)
      ? usersAttending
      : [usersAttending];

    const isParticipating = array.includes(auth!.currentUser!.uid);
    return isParticipating;
  }
  return false;
});
</script>

  <style scoped>
ion-chip {
  --background: var(--light-black);
  --color: #adefd1;
  font-size: 12px;
  margin-left: 0px;
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

.search-info__icon {
  font-size: 20px;
}

.search-info-badge__icon {
  margin-left: 3px;
  color: var(--dark);
}

.container-card-title,
.container-card-subtitle {
  display: flex;
  align-items: center;
}
</style>