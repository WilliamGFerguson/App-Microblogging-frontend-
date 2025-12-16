<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import TextInput from '../inputs/TextInput.vue';
import Button from '../inputs/Button.vue';
import useUserStore from '../../stores/userStore';
import useSessionStore from '../../stores/sessionStore';
import axios from 'axios';
import { toastError } from '../../utils/notify';

const { t } = useI18n()
const userStore = useUserStore()
const sessionStore = useSessionStore()

const userInfo = {
  username: ref<string>(""),
  email: ref<string>(""),
  password: ref<string>("")
}
const currentPassword = ref<string>("")

onMounted(() => fetchUserInfo())

const fetchUserInfo = () => {
  userInfo.username.value = userStore.currentUser?.username || ""
  userInfo.email.value = userStore.currentUser?.email || ""
  currentPassword.value = ""
  userInfo.password.value = ""
}

const isModified = () => {
  const usernameChanged = userInfo.username.value !== userStore.currentUser?.username
  const emailChanged = userInfo.email.value !== userStore.currentUser?.email
  const passwordChanged = userInfo.password.value !== ""

  return usernameChanged || emailChanged || passwordChanged
}

const modifiedKeys = computed(() => 
  [
    userInfo.username.value !== userStore.currentUser?.username && "username",
    userInfo.email.value !== userStore.currentUser?.email && "email",
    userInfo.password.value !== "" && "password"
  ].filter(Boolean) as string[]
)

const confirmEdit = async () => {
  if (isModified()) {
    const body: Record<string, any> = {}

    modifiedKeys.value.forEach(key => {
      body[key] = (userInfo as any)[key].value
    })

    if (modifiedKeys.value.includes("password")) {
      body.currentPassword = currentPassword.value
    }

    axios.patch('http://localhost:3000/users/me', body, { headers: sessionStore.auth })
      .then(() => location.reload())
      .catch((err) => toastError(err.response.data.code))
    return
  }
}
</script>

<template>
  <form class="flex flex-col gap-8 px-30 py-10" @submit.prevent="confirmEdit">
    <h2 class="self-start">{{ t('acc_details') }}</h2>
    <TextInput :label="t('username')" v-model="userInfo.username.value" :value="userInfo.username.value" />
    <TextInput :label="t('email')" v-model="userInfo.email.value" :value="userInfo.email.value" />
    <TextInput :label="t('current_password')" v-model="currentPassword" :value="currentPassword" type="password" />
    <TextInput :label="t('new_password')" v-model="userInfo.password.value" :value="userInfo.password.value" type="password" />
    <div v-if="isModified()" class="flex gap-5 w-60 self-end mr-5">
      <Button :label="t('cancel')" size="lg" :inverse="true" type="button" @click="fetchUserInfo" />
      <Button :label="t('confirm')" size="lg" />
    </div>
  </form>
</template>