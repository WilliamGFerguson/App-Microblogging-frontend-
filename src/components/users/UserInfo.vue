<script setup lang="ts">
import AdminIcon from '../icons/AdminIcon.vue';
import ModeratorIcon from '../icons/ModeratorIcon.vue';
import EditIcon from '../icons/EditIcon.vue';
import DeleteIcon from '../icons/DeleteIcon.vue';
import HybridInput from '../inputs/HybridInput.vue';
import { computed, ref } from 'vue';
import type { UserData } from '../../types/User';
import useSessionStore from '../../stores/sessionStore';
import useUserStore from '../../stores/userStore';
import axios from 'axios';
import { confirmDialog } from '../../utils/notify';

const sessionStore = useSessionStore()
const userStore = useUserStore()

const props = defineProps<{
  user: UserData
}>()

const editActive = ref<boolean>(false)
const newRole = ref<UserData['role']>(props.user.role)
const roleModified = computed(() => newRole.value !== props.user.role)

const verifyRole = (role: string) => {
  return newRole.value === role
}

const changeRole = async (role: UserData['role']) => {
  if (newRole.value === role) {
    newRole.value = 'user'
  } else {
    newRole.value = role
  }
}

const handleEditConfirm = async (action: "save" | "cancel") => {
  if (action === 'save') {
    axios.patch(`http://localhost:3000/users/${props.user.id}/role`, 
        { role: newRole.value },
        { headers: sessionStore.auth }
      )
      .catch((err) => console.error(err))
      .finally(() => userStore.fetchUsers())
  }
  editActive.value = false
  newRole.value = props.user.role
}

const confirmDelete = async () => {
  const confirm = await confirmDialog("Are you sure you want to delete this user?")
  if (confirm) {
    axios.delete(`http://localhost:3000/users/${props.user.id}`, 
      { headers: sessionStore.auth }
    )
    .catch((err) => console.error(err))
    .finally(() => userStore.fetchUsers())
  }
}
</script>

<template>
  <div 
    class="py-1 grid grid-cols-[minmax(min-content,1fr)_4fr_4fr_3fr_2fr_1.5fr] items-center w-full hover:bg-neutral-400/10 group transition-colors"
    :class="{ 'bg-neutral-400/10' : editActive }">
    <div v-if="editActive" class="flex justify-center gap-1">
      <AdminIcon :active="verifyRole('admin')" @change-role="changeRole('admin')" />
      <ModeratorIcon :active="verifyRole('moderator')" @change-role="changeRole('moderator')" />
    </div>
    <div v-else class="flex justify-center">
      <AdminIcon v-if="verifyRole('admin')" :disabled="true" />
      <ModeratorIcon v-else-if="verifyRole('moderator')" :disabled="true" />
      <div v-else></div>
    </div>
    <HybridInput :value="props.user.username" :active="editActive" />
    <HybridInput :value="props.user.email" :active="editActive" />
    <p>{{ props.user.createdAt.split('T')[0] }}</p>
    <p>{{ props.user.followers.length }}</p>
    <div v-if="!editActive" class="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
      <EditIcon class="cursor-pointer hover:opacity-80" @activate-edit="editActive = true" />
      <DeleteIcon class="cursor-pointer hover:opacity-80" @delete="confirmDelete" />
    </div>
    <div v-else class="flex gap-3">
      <p class="link" :class="{ 'pointer-events-none cursor-default opacity-0': !roleModified }" @click="handleEditConfirm('save')">Save</p>
      <p class="link" @click="handleEditConfirm('cancel')">Cancel</p>
    </div>
  </div>
</template>