<script setup lang="ts">
import MainLayout from '../components/layout/MainLayout.vue';
import CreatePost from '../components/posts/CreatePost.vue';
import PostList from '../components/posts/PostList.vue';
import useUserStore from '../stores/userStore';

const userStore = useUserStore()
</script>

<template>
  <MainLayout>
    <section class="h-full min-h-0 flex flex-col items-center pt-3 bg-[var(--bg)] border-r-5 lg:border-x-5 border-[var(--bg-dark)]">
      <CreatePost v-if="userStore.currentUser" />
      <PostList class="min-h-0 flex-1 overflow-y-auto" />
    </section>
  </MainLayout>
</template>

<style scoped>
section {
  grid-area: main;
}
</style>