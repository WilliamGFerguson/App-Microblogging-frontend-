<script setup lang="ts">
import useUserStore from '../../stores/userStore';
import CloseIcon from '../icons/CloseIcon.vue';
import AuthTextInput from '../inputs/AuthTextInput.vue';
import Button from '../inputs/Button.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { apiLogin, apiRegister } from '../../utils/api';
import Swal from 'sweetalert2';
import { toastError, toastSuccess } from '../../utils/notify';

const { t } = useI18n()
const userStore = useUserStore()

const username = ref<string>("")
const email = ref<string>("")
const password = ref<string>("")
const passwordConfirm = ref<string>("")

const handleSubmit = () => {
  switch (userStore.formType) {
    case "login":
      handleLogin()
      break
    case "signup":
      handleSignup()
      break
    default:
      console.log("Error");
      break
  }
}

const handleLogin = async () => {
  try {
    if (!username.value || !password.value) {
      toastError(t('missing_fields') || 'Missing field');
    }
    const { user } = await apiLogin(username.value, password.value)
    userStore.setCurrentUser(user)
    userStore.toggleAuthForm()
    username.value = ""
    password.value = ""
    toastSuccess(t('Succesfully logged in!') || 'Succesfully logged in!');
  } catch (err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err?.message || 'Login failed'
    })
  }
}

const handleSignup = async () => {
  try {
    if (!username.value || !email.value || !password.value || !passwordConfirm.value){
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Missing field'
      })
      return;
    }
    if (password.value !== passwordConfirm.value) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Password does not match with confirm field'
      })
      return;
    }
    //tentative d'inscription
    const register = await apiRegister(username.value, email.value, password.value);

    //si l'api d'inscription renvoie pas de token, auto-login
    if (!register.token) {
      const {user} = await apiLogin(username.value, password.value);
      userStore.setCurrentUser(user);      
    } else {
      userStore.setCurrentUser(register.user);//sinon, on a deja le token
    }

    username.value = '';
    email.value = '';
    password.value = '';
    passwordConfirm.value = '';
    userStore.toggleAuthForm();
    toastSuccess(t('signup_success') || 'Succesfully signed up!');
  } catch (err: any) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err?.message || 'Signup failed'
    })
  }
}

const isLoginForm = () => {
  return userStore.formType === 'login'
}

const forgotPassword = () => {
  window.alert("Not my problem!")
}
</script>

<template>
  <div class="relative flex flex-col gap-10 rounded-sm px-15 pt-10 pb-4 bg-neutral-50 text-neutral-900">
     <CloseIcon class="absolute text-black top-3 right-3 z-99 hover:cursor-pointer" @close="userStore.toggleAuthForm" />
     <h1 class="cap">{{ t(userStore.formType) }}</h1>
     <form class="flex flex-col gap-10" @submit.prevent="handleSubmit">
      <div class="flex flex-col gap-7">
        <AuthTextInput label="username" v-model="username" />
        <AuthTextInput v-if="!isLoginForm()" label="email" v-model="email" />
        <AuthTextInput label="password" v-model="password" @forgot-password="forgotPassword" />
        <AuthTextInput v-if="!isLoginForm()" label="confirm_password" v-model="passwordConfirm" />
      </div>
      <div class="flex flex-col items-center gap-4">
        <Button :label="isLoginForm() ? t('login') : t('confirm')" size="xl" />
        <div class="flex items-center gap-2">
          <p>{{ isLoginForm() ? t('not_member') : t('already_member') }}?</p>
          <p class="text-orange-500 hover:cursor-pointer hover:opacity-60" @click="userStore.changeFormType(isLoginForm() ? 'signup' : 'login')">{{ isLoginForm() ? t('signup') : t('login') }}</p>
        </div>
      </div>
     </form>
  </div>
</template>