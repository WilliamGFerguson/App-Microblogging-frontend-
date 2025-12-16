<script setup lang="ts">
import { onMounted } from 'vue';
import MainLayout from '../components/layout/MainLayout.vue';
import FollowingCard from '../components/users/FollowingCard.vue';
import PageNav from '../components/inputs/PageNav.vue';
import useSessionStore from '../stores/sessionStore';
import useUserStore from '../stores/userStore';
import NotFound from '../components/layout/NotFound.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const sessionStore = useSessionStore()
const userStore = useUserStore()

onMounted(() => {
  userStore.getFollowingUsers()
})
</script>

<template>
  <MainLayout>
    <section class="flex flex-col justify-between items-center py-5 px-3 md:px-10 lg:px-50 bg-[var(--bg)] border-r-5 lg:border-x-5 border-[var(--bg-dark)]">
      <div class="w-full flex flex-col">
        <h2 class="pb-5">{{ t('following') }}</h2>
        <FollowingCard 
          v-if="userStore.followingUsers.length > 0" 
          v-for="user in userStore.followingUsers" 
          :key="user.id" 
          :user="user" />
        <NotFound v-else label="user" />
      </div>
      <PageNav 
        :class="{ 'opacity-0': userStore.currentUser && userStore.followingUsers.length < 15 }"
        v-model="sessionStore.currentPage" 
        :total-pages="sessionStore.totalPages" 
        :total-items="sessionStore.totalItems" 
        @change-page="sessionStore.changePage" 
      />
    </section>
  </MainLayout>
</template>

<style scoped>
section {
  grid-area: main;
}
</style>