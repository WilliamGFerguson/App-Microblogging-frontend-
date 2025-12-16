<script setup lang="ts">
import { computed } from 'vue';
import type { UserData } from '../../types/User';
import type { SizeType } from '../../types/SizeType';

const props = defineProps<{
  size?: SizeType
  disabled?: boolean
  active?: boolean
}>()

const styleData: Record<SizeType, { stroke: string, style: string }> = {
  sm: {
    stroke: "2",
    style: "size-5.5 cursor-pointer hover:opacity-80 scale-105"
  },
  md: {
    stroke: "2.5",
    style: "size-6"
  }
}

const disabled = computed(() => props.disabled ? "pointer-events-none cursor-default hover:opacity-100" : "")
const active = computed(() => props.active ? ["text-[var(--accent)]", disabled] : "")
const styles = computed(() => {
  const size = props.size ?? "md"
  return {
    stroke: styleData[size].stroke,
    style: styleData[size].style
  }
})

const emit = defineEmits<{
  (e: 'change-role', role: UserData['role']): void
}>()
</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    :stroke-width="styles.stroke" 
    stroke="currentColor" 
    class="" 
    :class="[active, styles.style]"
    @click="emit('change-role', 'user')"
    >
    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
</template>