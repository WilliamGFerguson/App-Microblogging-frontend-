<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps<{
  activity: string
  date: string
}>()
</script>

<template>
  <div class="w-full flex justify-between">
    <p>{{ t(`${props.activity}_act`, {username: 'user123'}) }}</p>
    <p class="opacity-50">{{ props.date }}</p>
  </div>
</template>