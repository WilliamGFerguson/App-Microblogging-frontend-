<script setup lang="ts">
import MainLayout from '../components/layout/MainLayout.vue';
import UserAvatar from '../components/users/UserAvatar.vue';
import EditProfileForm from '../components/users/EditProfileForm.vue';
import UserPostList from '../components/posts/UserPostList.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const selectedTab = ref<string>("post")
const profileNavItems = ["post", "edit"]

const activeStyle = "pointer-events-none hover:cursor-default text-[var(--accent)]"

const tabClass = (tab: string) => tab === selectedTab.value ? activeStyle : 'hover:cursor-pointer'

const changeTab = (newTab: string) => {
  selectedTab.value = newTab
}
</script>

<template>
  <MainLayout>
    <section class="flex flex-col items-center p-5 bg-[var(--bg)]">
      <div class="relative w-full h-full px-8">
        <UserAvatar size="xl" class="absolute left-0" />
        <p class="text-4xl pb-2">{{ t('profile') }}</p>
        <ul class="flex items-end pl-30 border-b-2 border-[var(--border)] w-full h-min">
          <li v-for="tab in profileNavItems" :class="tabClass(tab)" 
            class="cap relative w-30 py-1 h-min font-bold hover:cursor-pointer hover:opacity-70 transition-all"
            @click="changeTab(tab)"
            > 
            {{ t(tab) }}
            <div v-if="tab === selectedTab" class="absolute top-8 w-full h-0.5 bg-[var(--accent)]"></div>
          </li>
        </ul>
        <div v-if="selectedTab === 'post'">
          <UserPostList />
        </div>
        <EditProfileForm v-else />
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
section {
  grid-area: main;
}
.active {
  background-color: var(--accent);
}
</style>