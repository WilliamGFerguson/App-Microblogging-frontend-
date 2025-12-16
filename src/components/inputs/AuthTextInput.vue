<script setup lang="ts">
import { computed } from 'vue';
import useUserStore from '../../stores/userStore';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const userStore = useUserStore()

const props = defineProps<{
  label: string
  modelValue: string
}>()

const inputLabel = computed(() => {
  if (props.label === "username" && userStore.formType === "login") {
    return "username_email"
  }
  return props.label
})

const isPasswordInput = () => {
  return props.label === 'password' || props.label === 'confirm_password'
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'forgot-password'): void
}>()
</script>

<template>
  <div class="flex flex-col items-start gap-1">
    <p class="text-sm cap text-[var(--border-lt)]">{{ t(inputLabel) }}</p>
    <input required 
      :type="isPasswordInput() ? 'password' : 'text'" 
      class="w-80 py-2 px-3 text-lg rounded-sm outline-1 outline-[var(--border-lt)] focus:outline-[var(--border)]" 
      minlength="3"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <p v-if="props.label === 'password' && userStore.formType === 'login'" 
      class="text-orange-500 hover:cursor-pointer hover:opacity-60" 
      @click="emit('forgot-password')">
      Forgot password?
    </p>
  </div>
</template>

<style scoped>
</style>