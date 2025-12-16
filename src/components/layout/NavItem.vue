<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router'
import type { MainTab } from '../../types/MainTab';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const props = defineProps<{
  label: string,
  href: string,
  icon: Object
}>()

const routeName = computed(() => {
  if (props.href === '') return 'home'
  return props.href as MainTab
})
</script>

<template>
  <RouterLink 
    :to="{ name: routeName }" 
    class="flex items-center text-sm gap-1 py-3 transition-all font-semibold opacity-60 hover:opacity-100 lg:text-3xl lg:gap-4" 
    active-class="text-[var(--accent)] cursor-default opacity-100">
      <component class="opacity-0 absolute -z-10 lg:opacity-100 lg:static lg:z-10" :is="props.icon" />
      <p>{{ t(props.label) }}</p>
  </RouterLink>
</template>