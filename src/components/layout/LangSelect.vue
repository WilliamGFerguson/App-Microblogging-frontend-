<script setup lang="ts">
import useUserStore from '../../stores/userStore';

const userStore = useUserStore()

const activeStyle = "pointer-events-none hover:cursor-default font-bold text-[var(--accent)]"

const langClass = (lang: string) => {
  return userStore.lang === lang ? activeStyle : 'hover:cursor-pointer'
}
</script>

<template>
  <div class="h-max flex items-center text-lg gap-1 lg:gap-3">
      <p :class="langClass('fr')" class="w-6 transition-all" @click="userStore.changeLang('fr')">FR</p>
      <div class="h-6 w-[2px] bg-[var(--text)]"></div>
      <p :class="langClass('en')" class="w-6 transition-all" @click="userStore.changeLang('en')">EN</p>
    </div>
</template>