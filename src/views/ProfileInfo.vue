<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-grid class="ion-padding">
                    <ion-row class="ion-align-items-center">
                        <ion-col size="auto">
                            <ion-icon :icon="chevronBackOutline" class="ion-align-item-start" @click="backToProfile()"></ion-icon>
                        </ion-col>
                        <ion-col>
                            <h2 class="ion-no-margin ion-margin-start">Edita tu info</h2>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div>
                <ion-grid class="ion-padding-horizontal">
                    <ion-row class="ion-align-items-center">
                        <ion-col>
                            <h4 class="ion-no-margin">Informacion basica</h4>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-list class="ion-no-padding ion-no-margin">
                                <ItemEditProfileInfo 
                                v-for="(item,index) in userEditBasicInfo"
                                :key="index"
                                :userEditInfo="item">
                                </ItemEditProfileInfo>
                            </ion-list>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-align-items-center">
                        <ion-col>
                            <h4 class="ion-no-margin">Informacion basica</h4>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-list class="ion-no-padding ion-no-margin">
                                <ItemEditProfileInfo 
                                v-for="(item,index) in userEditSkillsInfo"
                                :key="index"
                                :userEditInfo="item">
                                </ItemEditProfileInfo>
                            </ion-list>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>
    
<script setup lang="ts">
import { onIonViewDidEnter } from "@ionic/vue";
import {
    chevronBackOutline,
    informationOutline,
    shareOutline,
    personOutline,
    locationOutline,
    calendarOutline,
    gameControllerOutline,
    personCircle,
    checkmarkCircleOutline,
    pencilOutline
} from "ionicons/icons";
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Search from "../types/Search";
import useDateParser from "@/composables/date";
import { Timestamp } from "firebase/firestore";
import { useUserStore } from "@/store/user";
import { useSearchStore } from "@/store/search";

import ItemEditProfileInfo from "@/components/Item/ItemEditProfileInfo.vue";

const router = useRouter();
const route = useRoute();
const showInfo = ref(true);
const showSpinner = ref(false);

const userStore = useUserStore();
const searchStore = useSearchStore();
const userEditBasicInfo: any = ref([]);
const userEditSkillsInfo: any = ref([]);


const myUserName = computed(() => {
    return userStore.myUserInfo.name + " " + userStore.myUserInfo.lastName;
});

const loadUserInfo = () => {
    userEditBasicInfo.value.push({ title: 'Genero', value: userStore.myUserInfo.gender })
    userEditBasicInfo.value.push({ title: 'Fecha de nacimiento', value: userStore.myUserInfo.dateOfBirth })
    userEditBasicInfo.value.push({ title: 'Ciudad', value: userStore.myUserInfo.city })
    userEditSkillsInfo.value.push({ title: 'Motivacion', value: userStore.myUserInfo.motivation })
    userEditSkillsInfo.value.push({ title: 'Nivel', value: userStore.myUserInfo.levelExperience })
    userEditSkillsInfo.value.push({ title: 'Posicion', value: userStore.myUserInfo.position })
};


const backToProfile = () => {
    router.push("/tabs/tab5");
};

const goBack = () => {
    router.back();
};

loadUserInfo()
</script>
    
<style scoped>
ion-icon {
    font-size: 25px;
}

.user-icon {
    font-size: 70px;
}

.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 82vh;
    padding: 0;
}

.wrapper-success {
    display: flex;
    flex-direction: column;
    min-height: 84vh;
    padding: 0;
}

.icon-60 {
    font-size: 60px;
}

.loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75vh;
}
</style>