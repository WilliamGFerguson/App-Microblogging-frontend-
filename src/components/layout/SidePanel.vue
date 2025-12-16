<script setup lang="ts">
import WhoToFollow from '../users/WhoToFollow.vue';
</script>

<template>
  <section class="w-full bg-[var(--bg)]">
    <WhoToFollow />
  </section>
</template>

<style scoped>
section {
  grid-area: side;
}
</style>