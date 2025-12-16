<script setup lang="ts">
import UserDisplay from '../users/UserDisplay.vue';
import LangSelect from './LangSelect.vue';
import useUserStore from '../../stores/userStore';
import { useI18n } from 'vue-i18n';

const { t }= useI18n()

const userStore = useUserStore()
</script>

<template>
  <header class="flex justify-between items-center bg-[var(--bg)] px-2 lg:px-5 border-b-5 border-[var(--bg-dark)]">
    <div>
      <UserDisplay v-if="userStore.currentUser" :username="userStore.currentUser.username" />
      <p v-else class="pl-5 text-xl text-start hover:cursor-pointer hover:opacity-80 transition-all" @click="userStore.toggleAuthForm()">{{ t("login") }}</p>
    </div>
    <img src="../../assets/logo-text.png" alt="Gazouille Logo" class="h-[75%]">
    <LangSelect />
  </header>
</template>

<style>
header {
  grid-area: head;
}
</style>