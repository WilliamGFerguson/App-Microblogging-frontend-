<script setup lang="ts">
import { ref } from 'vue';
import useUserStore from '../../stores/userStore';
import CloseIcon from '../icons/CloseIcon.vue';
import AuthTextInput from '../inputs/AuthTextInput.vue';
import RoleSelect from '../inputs/RoleSelect.vue';
import Button from '../inputs/Button.vue';
import type { UserData } from '../../types/User';
import { useI18n} from 'vue-i18n';
import axios from 'axios';
import useSessionStore from '../../stores/sessionStore';

const { t } = useI18n()
const userStore = useUserStore()
const sessionStore = useSessionStore()

const username = ref<string>("")
const email = ref<string>("")
const password = ref<string>("")
const role = ref<UserData['role']>("user")

const changeRole = (newRole: UserData['role']) => {
  role.value = newRole
}

const confirmCreate = () => {
  axios.post('http://localhost:3000/users', {
    username: username.value,
    email: email.value,
    password: password.value,
    role: role.value
  }, {
    headers: sessionStore.auth
  })
  .catch((err) => console.error(err))
  .finally(() => {
    userStore.toggleAuthForm
    location.reload()
  })
}
</script>

<template>
  <div class="relative flex flex-col gap-10 rounded-sm px-15 py-10 bg-neutral-50 text-neutral-900">
     <CloseIcon class="absolute text-black top-3 right-3 z-99 hover:cursor-pointer" @close="userStore.toggleAuthForm" />
     <h1 class="cap">{{ t('create') }}</h1>
     <form class="flex flex-col gap-10" @submit.prevent="confirmCreate">
      <div class="flex flex-col gap-7">
        <AuthTextInput label="username" v-model="username" />
        <AuthTextInput label="email" v-model="email" />
        <AuthTextInput label="password" v-model="password" />
        <RoleSelect :role="role" @change-role="changeRole" />
      </div>
      <div class="flex flex-col items-center gap-4">
        <Button :label="t('create')" size="xl" />
      </div>
     </form>
  </div>
</template>