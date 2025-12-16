<script setup lang="ts">
import SearchIcon from '../icons/SearchIcon.vue';

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="relative">
    <input 
      type="text" 
      class="w-full h-full px-1 rounded-sm outline-1 outline-[var(--border)] focus:outline-[var(--accent)] hover:bg-neutral-500/5"
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <SearchIcon class="absolute right-[5px] top-[6px]" />
  </div>
</template>