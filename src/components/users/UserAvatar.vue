<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  size?: string
}>()

const styleData: Record<string, string> = {
  sm: "h-8",
  md: "h-12",
  lg: "h-20",
  xl: "h-30"
}

const size = computed(() => styleData[props.size || "sm"])
</script>

<template>
  <img src="../../assets/logo-full.png" alt="User avatar" :class="size" class="h-8 rounded-full bg-blue-500">
</template>