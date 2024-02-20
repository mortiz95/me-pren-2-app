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
              <div v-if="checkIfInfoAboutMeExist()" class="flex-column ion-padding ion-align-items-center">
                <div>
                  <u>Añandir informacion.</u>
                </div>
              </div>
              <div v-else>
                <ion-list v-show="userStore.myUserInfo.province != ''" lines="true" class="ion-no-padding">
                  <ion-item>
                    <ion-icon aria-hidden="true" :icon="locationOutline" slot="start"></ion-icon>
                    <ion-label class="ion-text-capitalize"> {{ userStore.myUserInfo.province }} </ion-label>
                    <ion-icon v-if="userStore.myUserInfo.province == ''" slot="end" aria-hidden="true"
                      :icon="add"></ion-icon>
                  </ion-item>
                  <ion-item v-show="userStore.myUserInfo.city != ''">
                    <ion-icon aria-hidden="true" :icon="businessOutline" slot="start"></ion-icon>
                    <ion-label class="ion-text-capitalize">{{ userStore.myUserInfo.city }} </ion-label>
                    <ion-icon v-if="userStore.myUserInfo.city == ''" slot="end" aria-hidden="true" :icon="add"></ion-icon>
                  </ion-item>
                  <ion-item v-show="userStore.myUserInfo.dateOfBirth != null">
                    <ion-icon aria-hidden="true" :icon="balloonOutline" slot="start"></ion-icon>
                    <ion-label class="ion-text-capitalize">{{ parseDateStampToISO(userStore.myUserInfo.dateOfBirth) }}
                    </ion-label>
                    <ion-icon v-if="userStore.myUserInfo.dateOfBirth == null" slot="end" aria-hidden="true"
                      :icon="add"></ion-icon>
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
              <div>
                <ion-list :inset="false" lines="inset" class="ion-no-margin ion-no-padding">

                  <ion-item>
                    <ion-icon slot="start" :icon="shirtOutline"></ion-icon>
                    <ion-select :value="userStore.myUserInfo.position" multiple label="Posicion:"
                      label-placement="floating" color="light" :interface-options="options"
                      class="ion-text-capitalize ion-select-skills" disabled>
                      <ion-select-option value="keeper">Arquero</ion-select-option>
                      <ion-select-option value="defender">Defensor</ion-select-option>
                      <ion-select-option value="midfielder">Mediocampista</ion-select-option>
                      <ion-select-option selected value="forward">Delantero</ion-select-option>
                    </ion-select>
                  </ion-item>

                  <ion-item>
                    <ion-icon slot="start" :icon="flashOutline"></ion-icon>
                    <ion-select :value="userStore.myUserInfo.motivation" multiple label="Motivacion:" disabled
                      label-placement="floating" color="light" class="ion-select-skills" :interface-options="options">
                      <ion-select-option value="meetPeople">Hacer
                        nuevos
                        amigos</ion-select-option>
                      <ion-select-option value="playWFriends">Jugar con
                        amigos</ion-select-option>
                      <ion-select-option value="play">Jugar cuando tenga
                        ganas</ion-select-option>
                      <ion-select-option value="improve">Mejorar mis
                        habilidades</ion-select-option>
                    </ion-select>
                  </ion-item>

                  <ion-item>
                    <ion-icon slot="start" :icon="cellularOutline"></ion-icon>
                    <ion-select :value="userStore.myUserInfo.level" class="ion-select-skills" label="Nivel:" disabled
                      label-placement="floating" color="light" :interface-options="options"
                      placeholder="hola"
                      >
                      <ion-select-option value="beginner">Principiante:
                        Juegas muy
                        poco o casi nunca. No controlas bien el
                        balon.</ion-select-option>
                      <ion-select-option value="intermediate">Intermedio:
                        Has jugado antes
                        pero recreacionalmente. Tienes una habilidad
                        basica con el
                        balon.</ion-select-option>
                      <ion-select-option value="experienced">Experimentado: Has
                        jugado en
                        competiciones anteriormente. Controlas bien el
                        balon.</ion-select-option>
                      <ion-select-option value="advance">Avanzado: Has
                        jugado en ligas
                        competitivas. Tienes un muy buen control del
                        balon, disparos, pases
                        y tecnicas.</ion-select-option>
                      <ion-select-option value="expert">Experto: Has
                        participado
                        profesionalmente or semi-profesionalmente en
                        competiciones. Master
                        en control del balon, disparos, pases y
                        tecnicas.</ion-select-option>
                    </ion-select>
                  </ion-item>
                </ion-list>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <ion-button @click="goToProfileEditInfo()" class="btn-secondary" shape="round" expand="full">VER
                TODO</ion-button>
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
import { onIonViewDidLeave } from '@ionic/vue';
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
  businessOutline,
  add
} from "ionicons/icons";

import { useUserStore } from "@/store/user";
import PendingItem from "@/components/Item/PendingItem.vue";
import { onIonViewWillEnter } from "@ionic/vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import useDateParser from "@/composables/date";
import { Timestamp } from 'firebase/firestore';

const userStore = useUserStore();
const router = useRouter();
const showInfo = ref(true);
const loading = ref(true);

const options: any = {
  cssClass: "my-custom-interface"
};

const { parseDateStampToISO } = useDateParser();

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

const checkIfInfoAboutMeExist = () => {
  return (userStore.myUserInfo.province == '' && userStore.myUserInfo.city == '' && userStore.myUserInfo.dateOfBirth == null)
}

const checkIfInfoAboutSkillsExist = () => {
  return (userStore.myUserInfo.level == '' && userStore.myUserInfo.motivation.length == 0 && userStore.myUserInfo.position.length == 0)
}

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

.icon-edit {
  font-size: 25px !important;
}

.ion-select-skills::part(icon) {
  display: none;
}

</style>