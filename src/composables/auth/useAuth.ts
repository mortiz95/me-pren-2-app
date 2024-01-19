// src/composables/useFirebase.ts

import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth();

const error = ref<string | null>(null);

const login = async (email: string, password: string) => {
  try {
    error.value = null;
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    error.value = err.message;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (err: any) {
    console.error(err.message);
  }
};

export { error, login, logout };
