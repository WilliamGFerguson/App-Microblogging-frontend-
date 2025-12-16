<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import useUserStore from '../../stores/userStore';

const userStore = useUserStore()
const props = defineProps<{
  type?: string
  options?: string[]
}>()

const styleData: Record<string, string> = {
  default: "flex flex-col",
  emoji: "grid grid-cols-4",
}
const styles = computed(() => styleData[props.type || "emoji"])

const emojis = ["😀", "😂", "👍", "😍", "🔥", "🤪", "👽", "🥴"]
const divRef = ref<HTMLDivElement | null>(null)

const handleClick = (event: MouseEvent) => {
  const target = event.target as Node
  if (divRef.value && !divRef.value.contains(target)) {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener("click", handleClick)
})

onBeforeUnmount(() => {
  window.removeEventListener("click", handleClick)
})

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="absolute h-max w-max bg-white rounded-sm border-1 border-[var(--border)] overflow-hidden z-50" :class="styles" ref="divRef">
    <div v-for="emoji in emojis" class="p-2 rounded-sm hover:bg-[var(--color-neutral-200)]" @click="userStore.updateNewPost(emoji)">{{ emoji }}</div>
  </div>
</template>