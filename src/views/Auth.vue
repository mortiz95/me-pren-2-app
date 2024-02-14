<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid class="centered-card">
        <ion-row>
            <ion-col size="12">
              <img class="logo" src="../assets/img/peltbaa.png" />
            </ion-col>

          <ion-col size="12" class="ion-text-center ion-margin-vertical">
             <div class="login-title">   
              &iexcl;Bienvenido&excl;
             </div>
             <div v-if="!isRegistering" class="login-subtitle">   
              Ya tienes una cuenta? Iniciar sesion.
             </div>
          </ion-col>

          <ion-col size="12">
            <ion-card class="ion-padding ion-no-margin">
              <ion-input
                type="email"
                v-model="userCredentials.email"
                label="Email"
                label-placement="floating"
                @click="resetError"
                color="success"
              />

              <ion-input
                v-if="isRegistering"
                v-model="userCredentials.name"
                type="text"
                label="Nombre"
                label-placement="floating"
                class="ion-margin-top"
                @click="resetError"
                color="success"
              />

              <ion-input
                v-if="isRegistering"
                v-model="userCredentials.lastName"
                type="text"
                label="Apellido"
                label-placement="floating"
                class="ion-margin-top"
                @click="resetError"
                color="success"
              />
              <ion-input
                type="password"
                v-model="userCredentials.password"
                label="Contraseña"
                :placeholder=" isRegistering? 'La contraseña debe contener al menos 6 caracteres' : ''"
                label-placement="floating"
                @click="resetError"
                class="ion-margin-top"
                color="success"
              />
              <ion-input
                v-if="isRegistering"
                v-model="userCredentials.confirmPassword"
                type="password"
                label="Confirmar Contraseña"
                label-placement="floating"
                class="ion-margin-top"
                @click="resetError"
                color="success"
              />

              <div v-if="error" class="ion-no-padding">
                <ion-text color="danger"> {{ error }} </ion-text>
              </div>

              <div v-if="loading" class="ion-text-center">
                <ion-spinner />
              </div>

              <ion-button
                v-else
                class="ion-no-margin ion-margin-top"
                expand="block"
                @click="authenticate"
                color="success"
              >
               {{ isRegistering ? 'REGISTRARSE' : 'ENTRAR' }}
              </ion-button>
              <div class="ion-margin-top ion-text-center">
                <span
                  class="ion-padding-top"
                  ><u>Olvidaste tu contraseña?</u></span
                >
              </div>
            </ion-card>
          </ion-col>
          <ion-col size="12" class="ion-text-center ion-margin-vertical">
             <div  v-if="!isRegistering" @click="toggleRegisterAndResetError">
               No tienes una cuenta? <u>Registrarse</u>
             </div>
             <div v-else @click="toggleRegisterAndResetError">
               Ya tienes una cuenta? <u>Login</u>
             </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { useSearchStore } from "@/store/search";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const userCredentials = ref({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  lastName: '',

});

const isRegistering = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const store = useSearchStore();
const error: any = ref();
const loading = ref(false);

const isEmailValid = computed(() => isValidEmail(userCredentials.value.email));
const isPasswordValid = computed(() =>
  isValidPassword(userCredentials.value.password)
);

const isConfirmPasswordValid = computed(() => {
  return isRegistering.value
    ? userCredentials.value.password === userCredentials.value.confirmPassword
    : true;
});

const isNameValid = computed(() => isValidName(userCredentials.value.name));
const isLastNameValid = computed(() => isValidLastName(userCredentials.value.lastName));

const isValidEmail = (email: any) => {
  return email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password: any) => {
  return password.trim() !== "" && password.length >= 6;
};

const isValidName = (name: any) => {
  return name.trim() !== "" 
};

const isValidLastName = (lastName: any) => {
  return lastName.trim() !== "" 
};
const resetError = () => {
  error.value = null;
};

const authenticate = async () => {
  try {
    loading.value = true;
    // new user
    if (isRegistering.value) {
      if (isConfirmPasswordValid.value) {
        if (isEmailValid.value && isPasswordValid.value && isNameValid.value && isLastNameValid.value ) {
          await authStore.register(userCredentials.value);
          if (!authStore.error) {
            store.clearData();
            goToTabs();
          } else error.value = authStore.error;
        } else error.value = "* Datos invalidos. Debe completar todos los campos";
      } else error.value = "* Las contraseñas no coinciden";
      //login
    } else {
      if (isEmailValid.value && isPasswordValid.value) {
        await authStore.login(userCredentials.value);
        if (!authStore.error) {
          store.clearData();
          goToTabs();
        } else error.value = authStore.error;
      } else error.value = "* Datos invalidos";
    }
    loading.value = false;
  } catch (error) {
    console.log(error);
  }
};

const goToTabs = () => {
  router.replace("/tabs/tab1");
};

const toggleRegisterAndResetError = () => {
  isRegistering.value = !isRegistering.value;
  resetError();
};

//onIonViewDidLeave(() => {
//  resetError();
//  loading.value = false;
//})
</script>

<style scoped>

.centered-card {
  max-width: 400px;
  margin: auto;
  margin-top: 15vh; 
  transform: translateY(-15%);
}

ion-card {
  border-radius: 15px;
}

.logo {
  margin-left: auto;
  margin-right: auto;
  display: block;
  width: 200px;
  height: 200px;
}

.login-title{
  font-size: 35px;
}

.login-subtitle{
  font-size: 18px;
}

</style>
