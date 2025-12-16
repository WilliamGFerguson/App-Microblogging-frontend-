<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>

<template>
  <div class="grid grid-cols-[minmax(min-content,1fr)_4fr_4fr_3fr_2fr_1.5fr]">
    <div></div>
    <b>{{ t('username') }}</b>
    <b>{{ t('email') }}</b>
    <b>{{ t('joined_date') }}</b>
    <b>{{ t('follower') }}</b>
    <div></div>
  </div>
</template>