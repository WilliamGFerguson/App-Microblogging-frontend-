<script setup lang="ts">
import UserAvatar from './UserAvatar.vue';

const props = defineProps<{
  username: string
}>()
</script>

<template>
  <div class="flex items-start gap-1 h-min">
    <UserAvatar class="avatar" />
    <div class="flex flex-col items-start max-h-8 text-sm">
      <p class="font-semibold">{{ props.username }}</p>
    </div>
  </div>
</template>

<style scoped>
@media(max-width: 1000px) {
  .avatar {
    position: absolute;
    opacity: 0;
    z-index: -10;
  }
}
</style>