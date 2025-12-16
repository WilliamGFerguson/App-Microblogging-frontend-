<script setup lang="ts">
import MainLayout from '../components/layout/MainLayout.vue';

</script>

<template>
  <MainLayout>
    <section class="flex flex-col items-center pt-3 bg-[var(--bg)]">
      Messages
    </section>
  </MainLayout>
</template>

<style scoped>
section {
  grid-area: main;
}
</style>