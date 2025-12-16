<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import UserDisplay from './UserDisplay.vue'
import Button from '../inputs/Button.vue'
import useUserStore from '../../stores/userStore'
import type { UserData } from '../../types/User'

const { t } = useI18n()
const userStore = useUserStore()

const props = defineProps<{ user?: UserData }>()

const meId = computed(() => userStore.currentUser?.id ?? null)
const userId = computed(() => props.user?.id ?? null)
const isMe = computed(() => !!meId.value && meId.value === userId.value)
const isFollowing = computed(() => userId.value ? userStore.isFollowing(userId.value) : false)
const btnLabel = computed(() => (isFollowing.value ? t('unfollow') : t('follow')))

const handleClick = () => {
  if (!userId.value || !meId.value || isMe.value) return
  userStore.toggleFollow(userId.value)
}

onMounted(() => {
  if (userId.value) userStore.loadFollowingStatusFor(userId.value)
})
</script>

<template>
  <article class="p-2 flex justify-between items-center">
    <UserDisplay :username="props.user?.username ?? '—'" />
    <Button
      v-if="userId && !isMe"
      :label="btnLabel"
      size="sm"
      :inverse="!isFollowing"
      type="button"
      @click="handleClick"
    />
  </article>
</template>
