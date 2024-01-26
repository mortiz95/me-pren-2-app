<template>
  <ion-page>
    <ion-content :fullscreen="true">
            <ion-card class="ion-padding centered-card">
              <ion-input
                type="email"
                v-model="userCredentials.email"
                label="Email"
                label-placement="floating"
                @click="resetError"
                color="success"
              />
              <ion-input
                type="password"
                v-model="userCredentials.password"
                label="Contraseña"
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
                ENTRAR
              </ion-button>

              <div class="ion-margin-top ion-text-center">
                <span
                  @click="toggleRegisterAndResetError"
                  class="ion-padding-top"
                  ><u>Registrarse</u></span
                >
              </div>
            </ion-card>
 
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { useGameStore } from "@/store/game";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const userCredentials = ref({
  email: "",
  password: "",
  confirmPassword: "",
});

const isRegistering = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const store = useGameStore();
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

const isFormValid = computed(
  () =>
    isEmailValid.value && isPasswordValid.value && isConfirmPasswordValid.value
);

const isValidEmail = (email: any) => {
  // Implement your email validation logic here
  // Return true if the email is valid, otherwise false
  return email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password: any) => {
  // Implement your password validation logic here
  // Return true if the password is valid, otherwise false
  return password.trim() !== "" && password.length >= 6;
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
        if (isEmailValid.value && isPasswordValid.value) {
          await authStore.register(userCredentials.value);
          if (!authStore.error) {
            store.clearData();
            goToTabs();
          } else error.value = authStore.error;
        } else error.value = "* Datos invalidos";
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
  router.push("/tabs/tab1");
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
  /* Additional styling for the centered card */
  max-width: 400px; /* Set a maximum width if needed */
  margin: auto; /* Center horizontally */
  margin-top: 50vh; /* Center vertically */
  transform: translateY(-50%);
}

ion-card{
  border-radius: 15px;
}

</style>
