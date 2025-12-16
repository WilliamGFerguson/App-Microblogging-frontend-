<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string
  size: string
  inverse?: boolean
  type?: 'button' | 'submit' | 'reset'
  action?: string
}>()

const sizeData: Record<string, string> = {
  sm: "text-sm font-medium px-3 py-1",
  md: "text-xl font-bold px-3",
  lg: "text-xl font-bold px-6 py-1",
  xl: "text-2xl font-bold px-6 py-2 w-full",
}

const styleData: Record<string, string> = {
  default: "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white",
  inverse: "bg-[var(--bg)] hover:bg-[var(--bg)] text-[var(--accent)] hover:text-[var(--accent-hover)] border-2 border-[var(--accent)] hover:border-[var(--accent-hover)]"
}

const size = computed(() => sizeData[props.size || "sm"])
const inverse = computed(() => props.inverse ? styleData["inverse"] : styleData["default"])

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button :type="props.type ?? 'submit'" :class="[size, inverse]" class="cap rounded-full" @click="emit('click')">
    {{ props.label }}
  </button>
</template>