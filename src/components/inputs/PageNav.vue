<script setup lang="ts">
import ChevronIcon from '../icons/ChevronIcon.vue';
import { computed } from 'vue';

const props = defineProps<{
  modelValue: number //Selected Page
  totalPages: number
  totalItems: number
}>()

const activeLeftChevron = computed(() => {
  return props.modelValue !== 1
})

const activeRightChevron = computed(() => {
  return props.totalPages > props.modelValue
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change-page', value: string): void
}>()

const selectPageByNum = (page: number) => {
  emit('update:modelValue', page)
}

const changePage = (dir: string) => {
  emit('change-page', dir)
}
</script>

<template>
  <div class="flex w-fit justify-between items-center gap-1 md:gap-3 lg:gap-5">
    <ChevronIcon direction="left" @change-page="changePage" :active="activeLeftChevron" />
    <div class="flex items-center gap-4 text-xl">
      <p 
        v-for="page in props.totalPages"
        :key="page" 
        @click="selectPageByNum(page)" 
        :class="page === props.modelValue ? 'pointer-events-none cursor-default text-2xl font-bold text-[var(--accent)]' : 'cursor-pointer hover:opacity-80'"
        >{{ page }}</p>
    </div>
    <ChevronIcon @change-page="changePage" :active="activeRightChevron" />
  </div>
</template>