<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
  label?: string
  value?: string
  modelValue?: string
  fit?: boolean
  type?: "text" | "password"
}>()

const styleData: Record<string, string> = {
  default: "w-full py-2 px-3 text-lg",
  fit: "text-center py-1 px-2"
}

const styles = computed(() => props.fit ? styleData['fit'] : styleData['default'])

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void
}>()
</script>

<template>
  <div class="flex flex-col items-start gap-2">
    <b v-if="props.label" class="cap text-lg pl-3">{{ props.label }}</b>
    <input :type="props.type || 'text'"
      class="rounded-sm outline-1 outline-[var(--border)] focus:outline-[var(--accent)] hover:bg-neutral-500/5" 
      :class="styles"
      minlength="3"
      :value="props.value"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>