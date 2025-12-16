<script setup lang="ts">
import { computed } from 'vue';
import type { UserData } from '../../types/User';

const props = defineProps<{
  disabled?: boolean
  active?: boolean
}>()

const disabled = computed(() => props.disabled ? "pointer-events-none cursor-default hover:opacity-100" : "")
const active = computed(() => props.active ? ["text-[var(--accent)]", disabled] : "")

const emit = defineEmits<{
  (e: 'change-role', role: UserData['role']): void
}>()
</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke-width="2" 
    stroke="currentColor" 
    class="size-6 cursor-pointer hover:opacity-80" 
    :class="[active, disabled]"
    @click="emit('change-role', 'admin')"
    >
    <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
  </svg>
</template>