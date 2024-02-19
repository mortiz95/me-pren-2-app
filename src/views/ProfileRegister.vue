<template>
    <ion-page>
        <ion-content>
            <form @submit.prevent="handleSubmit()">
                <ion-grid>
                    <ion-row>
                        <ion-col size="12">
                            <div class="card-profile">
                                <ion-row>
                                    <ion-col>
                                        <h1 class="ion-padding-start">COMPLETA TU PERFIL</h1>
                                    </ion-col>
                                </ion-row>
                                <ion-row class="ion-align-items-center">
                                    <ion-col size="auto">
                                        <h4 class="ion-no-margin ion-padding-start"><u>Informacion Basica:</u></h4>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-list :inset="false" lines="inset" class="ion-no-margin ion-no-padding">
                                            <ion-item>
                                                <ion-icon slot="start" :icon="flagOutline"
                                                    class="ion-no-margin ion-margin-end"></ion-icon>
                                                <ion-input v-model="userInfo.country" readonly color="light" label="Pais"
                                                    label-placement="floating" class="ion-text-capitalize"></ion-input>
                                            </ion-item>

                                            <ion-item>
                                                <ion-icon :icon="locationOutline" class="ion-padding-end"></ion-icon>
                                                <ion-select :value="userInfo.province" label="Provincia" color="light"
                                                    label-placement="stacked" :interface-options="options"
                                                    :toggle-icon="chevronDownCircleOutline" :expanded-icon="remove">
                                                    <ion-select-option value="salta">Salta</ion-select-option>
                                                    <!--                                              <ion-select-option value="basket">Basket</ion-select-option>
                                                <ion-select-option value="paddle">Paddle</ion-select-option>
                                                <ion-select-option value="tenis">Tenis</ion-select-option>
                                                <ion-select-option value="hockey">Hockey</ion-select-option> -->
                                                </ion-select>
                                            </ion-item>

                                            <ion-item>
                                                <ion-icon :icon="businessOutline" class="ion-padding-end"></ion-icon>
                                                <ion-select :value="userInfo.city" @ionChange="handleCity($event)"
                                                    :toggle-icon="chevronDownCircleOutline" :expanded-icon="remove"
                                                    label="Municipio" color="light" label-placement="stacked"
                                                    class="title-city ion-text-capitalize" :interface-options="options">
                                                    <ion-select-option value="capital">Capital</ion-select-option>
                                                    <ion-select-option value="san Lorenzo">San Lorenzo</ion-select-option>
                                                    <ion-select-option value="cerrillos">
                                                        Cerrillos
                                                    </ion-select-option>
                                                    <ion-select-option value="vaqueros">
                                                        Vaqueros</ion-select-option>
                                                    <ion-select-option value="san luis">San Luis</ion-select-option>
                                                </ion-select>
                                            </ion-item>

                                            <ion-item>
                                                <ion-icon :icon="footballOutline" class="ion-padding-end"></ion-icon>
                                                <ion-select :value="userInfo.sport" label="Deporte" color="light"
                                                    label-placement="stacked" :interface-options="options"
                                                    :toggle-icon="chevronDownCircleOutline" :expanded-icon="remove">

                                                    <ion-select-option selected value="futbol">Futbol</ion-select-option>
                                                    <!--                                              <ion-select-option value="basket">Basket</ion-select-option>
                                                <ion-select-option value="paddle">Paddle</ion-select-option>
                                                <ion-select-option value="tenis">Tenis</ion-select-option>
                                                <ion-select-option value="hockey">Hockey</ion-select-option> -->
                                                </ion-select>
                                            </ion-item>

                                            <ion-item>
                                                <ion-icon slot="start" :icon="balloonOutline"
                                                    class="ion-no-margin ion-margin-end"></ion-icon>
                                                <ion-input required color="light" v-model="selectedDOBTimeParsed"
                                                    label="Fecha de nacimiento" label-placement="floating"
                                                    @click="toggleDateTimeInput()" class="ion-no-padding"></ion-input>
                                            </ion-item>
                                            <ion-datetime v-if="dateTimeVisible" v-model="userInfo.dateOfBirth"
                                                ref="refDatetime" class="ion-margin-vertical"
                                                @ionChange="handleDateTimeChange" :min="1990"
                                                :max="currentDateFormattedDate_ISO_8601">
                                                <ion-buttons slot="buttons">
                                                    <ion-button color="success"
                                                        @click="toggleDateTimeInput()">CANCELAR</ion-button>
                                                    <ion-button color="success" @click="confirmDOB()">OK</ion-button>
                                                </ion-buttons>
                                            </ion-datetime>



                                            <ion-item>
                                                <ion-icon :icon="maleFemaleOutline" class="ion-padding-end"></ion-icon>
                                                <ion-select :value="userInfo.gender" @ionChange="handleGender($event)"
                                                    label="Genero" label-placement="floating" color="light"
                                                    :interface-options="options" class="ion-text-capitalize"
                                                    :toggle-icon="chevronDownCircleOutline" :expanded-icon="remove">
                                                    <ion-select-option selected value="male">Masculino</ion-select-option>
                                                    <ion-select-option value="female">Femenino</ion-select-option>
                                                    <ion-select-option value="unknown">Prefiero no
                                                        decirlo</ion-select-option>
                                                </ion-select>
                                            </ion-item>
                                        </ion-list>
                                    </ion-col>
                                </ion-row>
                                <ion-row class="ion-align-items-center">
                                    <ion-col size="auto">
                                        <h4 class="ion-no-margin ion-padding-start"><u>Mis habilidades:</u> </h4>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col>
                                        <ion-list :inset="false" lines="inset" class="ion-no-margin ion-no-padding">

                                            <ion-item>
                                                <ion-icon :icon="shirtOutline" class="ion-padding-end"></ion-icon>
                                                <ion-select :value="userInfo.position" multiple
                                                    :toggle-icon="chevronDownCircleOutline" :expanded-icon="remove"
                                                    @ionChange="handlePosition($event)" label="Posicion:"
                                                    label-placement="floating" color="light" :interface-options="options"
                                                    class="ion-text-capitalize ion-select-skills">
                                                    <ion-select-option value="keeper">Arquero</ion-select-option>
                                                    <ion-select-option value="defender">Defensor</ion-select-option>
                                                    <ion-select-option value="midfielder">Mediocampista</ion-select-option>
                                                    <ion-select-option selected
                                                        value="forward">Delantero</ion-select-option>
                                                </ion-select>
                                            </ion-item>

                                            <ion-item>
                                                <ion-icon :icon="flashOutline" class="ion-padding-end"></ion-icon>
                                                <ion-select :value="userInfo.motivation"
                                                    :toggle-icon="chevronDownCircleOutline" multiple :expanded-icon="remove"
                                                    @ionChange="handleMotivation($event)" label="Motivacion:"
                                                    label-placement="floating" color="light" class="ion-select-skills"
                                                    :interface-options="options">
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
                                                <ion-icon :icon="cellularOutline" class="ion-padding-end"></ion-icon>
                                                <ion-select :value="userInfo.level" :toggle-icon="chevronDownCircleOutline"
                                                    class="ion-select-skills" :expanded-icon="remove"
                                                    @ionChange="handleLevel($event)" label="Nivel:"
                                                    label-placement="floating" color="light" :interface-options="options">
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
                                    </ion-col>
                                </ion-row>
                                <ion-row style="flex:1" class="ion-align-items-center">
                                    <ion-col>
                                        <div v-if="loading" class="ion-text-center">
                                            <ion-spinner />
                                        </div>
                                        <div v-else>
                                            <ion-button @click="handleSubmit" expand="block"
                                                class="btn-secondary ion-text-uppercase" fill="outline">
                                                CONTINUAR
                                            </ion-button>
                                        </div>
                                    </ion-col>
                                </ion-row>
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </form>
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import {
    shareOutline,
    personOutline,
    locationOutline,
    calendarOutline,
    gameControllerOutline,
    cellularOutline,
    flashOutline,
    footballOutline,
    maleFemaleOutline,
    businessOutline,
    flagOutline,
    balloonOutline,
    shirtOutline,
    chevronDownCircleOutline
} from "ionicons/icons";
import { Timestamp } from "firebase/firestore";
import { ref } from "vue";
import useDateParser from "@/composables/date";
import { add, remove } from 'ionicons/icons';
import { format } from "date-fns";
import { useUserStore } from "@/store/user";
import { useRouter } from "vue-router";

const { parseDate } = useDateParser();
const userStore = useUserStore();

const router = useRouter();
const dateTimeVisible = ref(false);
const refDatetime = ref();
const selectedDOBTimeParsed = ref();
const currentDate = new Date();
const currentDateFormattedDate_ISO_8601 = format(
    currentDate,
    "yyyy-MM-dd'T'HH:mm:ssXXX"
); // ISO 8601 format
const loading = ref(false)

const userInfo = ref({
    country: "argentina",
    province: "salta",
    city: "capital",
    gender: '',
    dateOfBirth: currentDateFormattedDate_ISO_8601,
    sport: "futbol",
    position: [],
    motivation: [],
    level: "",
    freeCreateSearch: 4,
    freeJoinSearch: 4,
    dateStartSubscription: '',
    dateEndOfSubscription: '',
    typeSubscription: 1,
    comments: []
});

const options: any = {
    cssClass: "my-custom-interface",
};

const handleCity = (event: CustomEvent) => {
    userInfo.value.city = event.detail.value
}

const handleGender = (event: CustomEvent) => {
    userInfo.value.gender = event.detail.value
}

const handlePosition = (event: CustomEvent) => {
    userInfo.value.position = event.detail.value
}

const handleMotivation = (event: CustomEvent) => {
    userInfo.value.motivation = event.detail.value
}

const handleLevel = (event: CustomEvent) => {
    userInfo.value.level = event.detail.value
}

const toggleDateTimeInput = () => {
    dateTimeVisible.value = !dateTimeVisible.value;
};

const handleDateTimeChange = (event: CustomEvent) => {
    selectedDOBTimeParsed.value = parseDate(event.detail.value);
};

const confirmDOB = () => {
    refDatetime.value.$el.confirm();
    toggleDateTimeInput();
};

const handleSubmit = async () => {
    try {
        loading.value = true
        await userStore.updateUserInfo(userInfo.value)
        router.replace("/tabs/tab1");
    } catch (error) {
        console.log(error)
    }
}

</script>
  
<style scoped>
.ion-select-skills {
    white-space: normal;
    font-size: 14px;
}

ion-icon {
    font-size: 20px;
}

.card-profile {
    border: 2px solid var(--white);
    border-bottom: none;
    height: 100vh;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

}
</style>

