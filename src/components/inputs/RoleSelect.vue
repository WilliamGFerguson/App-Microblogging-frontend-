<script setup lang="ts">
import UserIcon from '../icons/UserIcon.vue';
import ModeratorIcon from '../icons/ModeratorIcon.vue';
import AdminIcon from '../icons/AdminIcon.vue';
import type { UserData } from '../../types/User';

const props = defineProps<{
  role: UserData['role']
}>()

const isSelectedRole = (role: UserData['role']) => {
  return props.role === role
}

const emit = defineEmits<{
  (e: 'change-role', role: UserData['role']): void
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <UserIcon :active="isSelectedRole('user')" :disabled="isSelectedRole('user')" size="sm" @change-role="emit('change-role', 'user')" />
    <ModeratorIcon :active="isSelectedRole('moderator')" :disabled="isSelectedRole('moderator')" @change-role="emit('change-role', 'moderator')" />
    <AdminIcon :active="isSelectedRole('admin')" :disabled="isSelectedRole('admin')" @change-role="emit('change-role', 'admin')" />
  </div>
</template>