<script setup lang="ts">
import { watch } from 'vue'
import useUserStore from '../../stores/userStore'
import UserCard from './UserCard.vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const userStore = useUserStore()

watch(() => userStore.currentUser?.id,(id) => {
    if (id) userStore.loadFollowSuggestions(4)},{immediate: true})
</script>

<template>
  <div class="flex flex-col justify-between px-10 py-5 gap-4 overflow-hidden">
    <h2 class="text-start pb-3 border-b-1 border-[var(--border)]">{{ t("who_to_follow") }}</h2>
    <UserCard
      v-for="u in userStore.suggestions"
      :key="u.id"
      :user="u"
    />
  </div>
</template>