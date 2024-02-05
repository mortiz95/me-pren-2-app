<template>
  <ion-card @click="goToGameInfo()">
    <ion-card-header class="ion-no-padding ion-padding-horizontal ion-padding-top">
      <ion-grid class="ion-no-padding ion-no-margin">
        <ion-row class="ion-align-items-center">
          <ion-col size="10">
            <ion-card-title>
              <div class="container-card-title">
                <ion-icon
                  :icon="locationOutline"
                  class="ion-margin-end game-info__icon"
                ></ion-icon>
                {{ gameInfo.place }}
              </div>
            </ion-card-title>
            <ion-card-subtitle>
              <div class="container-card-subtitle">
                <ion-icon
                  :icon="calendarOutline"
                  class="ion-margin-end game-info__icon"
                ></ion-icon>
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
            <ion-card-subtitle class="ion-text-capitalize">{{
              gameInfo?.organizerInfo.fullName
            }}</ion-card-subtitle>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-top">
          <ion-col size="3"> Info </ion-col>
          <ion-col>
            <ion-badge
              :color="checkIsFull() === 'FULL' ? 'danger' : 'warning'"
              class="tags mr-5"
            >
              {{ checkIsFull() }}
            </ion-badge>

            <ion-badge
              v-if="Object.keys(gameInfo.size).length > 0"
              color="light"
              class="ion-text-center tags mr-5"
            >
              {{ gameInfo?.size?.text }}
            </ion-badge>

            <ion-badge
              v-if="Object.keys(gameInfo.grassType).length > 0"
              color="light"
              class="ion-text-center tags mr-5"
            >
              <div>
                {{ gameInfo?.grassType?.text }}
              </div>
              <ion-icon
                class="game-info-badge__icon"
                v-if="gameInfo.grassType"
                :icon="gameInfo.grassType.icon"
              ></ion-icon>
            </ion-badge>

            <ion-badge
              v-if="Object.keys(gameInfo.gender).length > 0"
              color="light"
              class="ion-text-center tags mr-5"
            >
              <div>
                {{ gameInfo?.gender?.text }}
              </div>
              <ion-icon
                class="game-info-badge__icon"
                v-if="gameInfo.gender"
                :icon="gameInfo.gender.icon"
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
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { Game } from "../../types/Game";
import useDateParser from "@/composables/date";

const props = defineProps<{
  gameInfo: Game;
}>();

const router = useRouter();

const { parseDateTimeStampToISO } = useDateParser();

const goToGameInfo = () => {
  router.push({
    name: "GameInfo",
    params: { info: JSON.stringify(props.gameInfo) },
  });
};

const checkIsFull = () => {
  return props.gameInfo
    ? props.gameInfo.spots === props.gameInfo.usersAttending.length
      ? "FULL"
      : props.gameInfo.spots + " lugares"
    : "";
};
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

.game-info-badge__icon {
  margin-left: 3px;
  color: var(--dark);
}

.container-card-title,
.container-card-subtitle {
  display: flex;
  align-items: center;
}
</style>