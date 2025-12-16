<script setup lang="ts">
import MainLayout from '../components/layout/MainLayout.vue';
import SearchBar from '../components/inputs/SearchBar.vue';
import Button from '../components/inputs/Button.vue';
import PageNav from '../components/inputs/PageNav.vue';
import UserInfoHeader from '../components/users/UserInfoHeader.vue';
import UserInfo from '../components/users/UserInfo.vue';
import useUserStore from '../stores/userStore';
import useSessionStore from '../stores/sessionStore';
import { useI18n } from 'vue-i18n';
import { onMounted } from 'vue';

const { t } = useI18n()

const userStore = useUserStore()
const sessionStore = useSessionStore()

onMounted(async () => userStore.fetchUsers())
</script>

<template>
  <MainLayout>
    <section class="flex flex-col items-center pt-5 px-10 gap-10 bg-[var(--bg)] border-r-5 lg:border-x-5 border-[var(--bg-dark)]">
      <div class="grid grid-cols-3 w-full h-8">
        <div class="flex items-end gap-2">
          <h2>{{ t('users') }}</h2>
          <p class="text-xl opacity-60">({{ userStore.allUsers.length || 0 }})</p>
        </div>
        <SearchBar v-model="userStore.filterValue" />
        <div class="justify-self-end self-center">
          <Button :label="t('create')" size="md" @click="userStore.toggleAuthForm('create')" />
        </div>
      </div>
      <div class="flex flex-col gap-3 w-full">
        <UserInfoHeader />
        <UserInfo 
          v-for="user in userStore.usersFiltered" 
          :key="user.id" 
          :user="user" 
        />
      </div>
      <PageNav 
        v-if="userStore.usersFiltered.length >= 14"
        v-model="sessionStore.currentPage" 
        :total-pages="sessionStore.totalPages" 
        :total-items="sessionStore.totalItems" 
        class="place-self-center" 
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