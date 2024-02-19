<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-grid class="ion-padding">
          <ion-row class="ion-align-items-center">
            <ion-col size="2" class="ion-no-padding">
              <ion-avatar>
                <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
              </ion-avatar>
            </ion-col>
            <ion-col size="7" class="ion-no-padding">
              <ion-row class="ion-padding-start">
                <ion-col size="12">
                  <h5 class="ion-no-margin">CARLOS MATIAS</h5>
                </ion-col>
                <ion-col size="12">
                  <div>5 partidos jugados</div>
                </ion-col>
                <ion-col size="12">
                  <div>Rating: 5</div>
                </ion-col>
              </ion-row>
            </ion-col>
            <ion-col size="3" class="ion-text-end">
              <ion-icon :icon="settingsOutline" class="icon-settings"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div v-if="showInfo" class="ion-margin-top">
        <ion-grid>
          <ion-row class="ion-align-items-center">
            <ion-col>
              <h4 class="ion-no-margin">Sobre Mi</h4>
            </ion-col>
            <ion-col>
              <div class="ion-float-end" @click="goToProfileEditInfo()">
                <ion-icon :icon="pencilOutline" class="ion-float-end icon-edit"></ion-icon>
                <ion-text>Editar</ion-text>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <div>
                <ion-list lines="true" class="ion-no-padding">
                  <ion-item>
                    <ion-icon aria-hidden="true" :icon="maleOutline" slot="start"></ion-icon>
                    <ion-label> {{ userStore.myUserInfo.gender }} </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon aria-hidden="true" :icon="locationOutline" slot="start"></ion-icon>
                    <ion-label>{{ userStore.myUserInfo.city }} </ion-label>
                  </ion-item>
                  <ion-item>
                    <ion-icon aria-hidden="true" :icon="balloonOutline" slot="start"></ion-icon>
                    <ion-label>{{ userStore.myUserInfo.dateOfBirth }} </ion-label>
                  </ion-item>
                </ion-list>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <h4 class="ion-no-margin">Habilidades:</h4>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-list lines="true" class="ion-no-padding">
                <ion-item>
                  <ion-icon aria-hidden="true" :icon="cellularOutline" slot="start"></ion-icon>
                  <ion-label>{{ userStore.myUserInfo.levelExperience }} </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon aria-hidden="true" :icon="flashOutline" slot="start"></ion-icon>
                  <ion-label>{{ userStore.myUserInfo.motivation }} </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon aria-hidden="true" :icon="footballOutline" slot="start"></ion-icon>
                  <ion-label>{{ userStore.myUserInfo.position }}</ion-label>
                </ion-item>
              </ion-list>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <ion-button @click="goToProfileEditInfo()" class="btn-secondary" shape="round" expand="full">VER TODO</ion-button>
            </ion-col>
          </ion-row>
          <ion-row class="ion-margin-top ion-align-items-center">
            <ion-col size="12">
              <h4 class="ion-no-margin">Proximos por jugar:</h4>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <div v-show="!loading">
                <div v-if="userStore.myNextGames.length > 0">
                  <PendingItem v-for="(item, index) in userStore.myNextGames" :key="index" :nextGameInfo="item"
                    :index="index + 1" @removeUser="showingLoading">
                  </PendingItem>
                </div>
                <div v-else class="flex-column ion-padding ion-align-items-center">
                  <div>
                    <p>No tienes próximos juegos</p>
                  </div>
                  <div @click="goToSearch()">
                    <p class="ion-no-margin"><u>Buscar</u></p>
                  </div>
                </div>
              </div>
              <div v-show="loading" class="loading">
                <ion-spinner></ion-spinner>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewDidLeave } from '@ionic/vue';
import {
  settingsOutline,
  pencilOutline,
  maleOutline,
  maleFemaleOutline,
  bodyOutline,
  trophyOutline,
  barbellOutline,
  flagOutline,
  balloonOutline,
  locationOutline,
  callOutline,
  shirtOutline,
  cellularOutline,
  flashOutline,
  footballOutline,
} from "ionicons/icons";

import { useUserStore } from "@/store/user";
import PendingItem from "@/components/Item/PendingItem.vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const showInfo = ref(true);
const loading = ref(true);

onIonViewWillEnter(async () => {
  await userStore.loadMyNextGames();
  loading.value = false;
});

onIonViewDidLeave(() => {
  loading.value = true;
});

const goToSearch = () => {
  router.push("/tabs/tab1");
};

const goToProfileEditInfo = () => {
  router.push({
    name: "ProfileEditInfo",
  });
};

const showingLoading = async () => {
  loading.value = true;
  await userStore.loadMyNextGames();
  loading.value = false;
};

</script>

<style scoped>
ion-toolbar {
  --background: var(--bg-start) !important;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
}

.icon-settings {
  font-size: 30px;
}

.wrapper-success {
  display: flex;
  flex-direction: column;
  min-height: 75vh;
  padding: 0;
}

.icon-edit {
  font-size: 25px !important;
}

.icon-60 {
  font-size: 60px;
}</style>