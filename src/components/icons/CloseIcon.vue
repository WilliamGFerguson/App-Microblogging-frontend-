<script setup lang="ts">
const props = defineProps<{
  size?: string
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'clear'): void
}>()
</script>

<template>
  <svg v-if="props.size === 'sm'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="red" class="size-7 hover:opacity-80 cursor-pointer" @click="emit('clear')">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="size-8 hover:scale-105 hover:opacity-80" @click="emit('close')">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
</template>