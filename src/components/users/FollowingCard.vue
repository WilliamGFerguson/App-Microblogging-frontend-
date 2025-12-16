<script setup lang="ts">
import UserAvatar from './UserAvatar.vue';
import type { UserData } from '../../types/User';
import { useI18n } from 'vue-i18n';
import useUserStore from '../../stores/userStore';

const { t } = useI18n()
const userStore = useUserStore()

const props = defineProps<{
  user: UserData
}>()

const onToggleFollow = async () => {
  if (!props.user.id) return;
  try {
    await userStore.toggleFollow(props.user.id);
    await userStore.getFollowingUsers()
  }
  catch (e: any) {}
};
</script>

<template>
  <div class="w-full flex justify-between items-center p-2 border-b-1 border-[var(--border)] hover:bg-neutral-400/10 group transition-all">
    <div class="flex items-center gap-5">
      <UserAvatar />
      <p class="font-bold">{{ props.user.username }}</p>
    </div>
    <p class="link opacity-0 group-hover:opacity-100" @click="onToggleFollow">{{ t('unfollow') }}</p>
  </div>
</template>