<script setup lang="ts">
import { computed } from 'vue';
import TextInput from './TextInput.vue';
const props = defineProps<{
  value: string
  active: boolean
}>()

const value = computed(() => props.value)

</script>

<template>
  <div class="h-full flex justify-center items-center">
    <TextInput v-if="props.active" :value="value" :fit="true"/>
    <p v-else>{{ props.value }}</p>
  </div>
</template>