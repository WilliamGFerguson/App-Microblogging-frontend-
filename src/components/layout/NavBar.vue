<script setup lang="ts">
import NavItem from './NavItem.vue';
import mainNavData from '../../utils/mainNavData';
import useUserStore from '../../stores/userStore';
import { computed } from 'vue';

const userStore = useUserStore()

const filteredNavItems = computed(() => {
  const currentRole = userStore.currentUser?.role ? userStore.currentUser.role : "guest"
  return mainNavData.filter(item => item.role.includes(currentRole))
})
</script>

<template>
  <nav class="flex justify-center text-3xl bg-[var(--bg)] border-b-5 border-[var(--bg-dark)] lg:border-0 lg:pl-10 lg:pt-15">
    <ul class="w-full h-min flex px-1 justify-between lg:flex-col">
      <NavItem v-for="item in filteredNavItems" :label="item.label" :href="item.href" :icon="item.icon" />
    </ul>
  </nav>
</template>

<style scoped>
nav {
  grid-area: nav;
}
</style>