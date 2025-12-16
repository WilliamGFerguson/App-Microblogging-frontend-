<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps<{
  label?: string
}>()

const tagData: Record<string, string> = {
  post: "post_not_found",
  user: "user_not_found"
}

const tag = computed(() => tagData[props.label || "post"])
</script>

<template>
  <div class="h-full w-full pt-10">
    <h2 class="opacity-50">{{ t(tag) }}</h2>
  </div>
</template>