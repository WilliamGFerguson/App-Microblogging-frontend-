<script setup lang="ts">
import Header from './Header.vue';
import NavBar from './NavBar.vue';
import SidePanel from './SidePanel.vue';
import AddsSection from './AddsSection.vue';
import Modal from './Modal.vue';
import LoginForm from '../users/LoginForm.vue';
import CreateUserForm from '../users/CreateUserForm.vue';
import LoadingComp from './LoadingComp.vue';
import useUserStore from '../../stores/userStore';
import useSessionStore from '../../stores/sessionStore';
import usePostStore from '../../stores/postStore';
import { onMounted } from 'vue';

const userStore = useUserStore()
const sessionStore = useSessionStore()
const postStore = usePostStore()

onMounted(() => sessionStore.currentPage = 1)
</script>

<template>
  <Modal v-if="userStore.displayAuthForm">
    <LoginForm v-if="userStore.formType === 'login' || userStore.formType === 'signup'" />
    <CreateUserForm v-if="userStore.formType === 'create'" />
  </Modal>
  <Modal v-if="postStore.loading">
    <LoadingComp />
  </Modal>
  <main class="min-h-screen min-w-screen p-1 pb-0 lg:p-2 lg:pb-0 grid grid-cols-[1fr_3fr_1fr] grid-rows-[60px_min-content_5fr_7fr] lg:grid-rows-[60px_5fr_7fr]">
    <Header />
    <NavBar />
    <slot></slot>
    <SidePanel />
    <AddsSection />
  </main>
</template>

<style scoped>
main {
  grid-template-areas: 
    "head head head"
    "nav main side"
    "nav main adds";
}

@media(max-width: 1000px) {
  main {
    grid-template-areas: 
      "head head"
      "nav nav"
      "main side"
      "main adds";
  }
}
</style>