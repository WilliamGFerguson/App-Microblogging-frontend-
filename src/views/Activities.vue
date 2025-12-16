<script setup lang="ts">
import MainLayout from '../components/layout/MainLayout.vue';
import ActivityCard from '../components/users/ActivityCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const activities = [
  { activity: "like", date: "20/08/2025" },
  { activity: "follow", date: "19/08/2025" },
  { activity: "like", date: "18/08/2025" },
  { activity: "register", date: "18/08/2025" }
]
</script>

<template>
  <MainLayout>
    <section class="flex flex-col gap-10 px-40 py-5 bg-[var(--bg)]">
      <h2>{{ t('activities') }}</h2>
      <div class="flex flex-col items-center gap-5">
        <ActivityCard v-for="item in activities" :activity="item.activity" :date="item.date" />
      </div>
    </section>
  </MainLayout>
</template>

<style scoped>
section {
  grid-area: main;
}
</style>