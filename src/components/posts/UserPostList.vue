<script setup lang="ts">
import { onMounted } from 'vue';
import PostCard from './PostCard.vue';
import PostNotFound from '../layout/NotFound.vue';
import useUserStore from '../../stores/userStore';
import usePostStore from '../../stores/postStore';

const userStore = useUserStore()
const postStore = usePostStore()

onMounted(() => {
  const user = userStore.currentUser
  if (user) {
    postStore.loadFromUser(user.id)
  }
});
</script>

<template>
  <div v-if="postStore.userPosts.length > 0" class="max-h-[calc(100vh-240px)] w-full overflow-y-auto px-10 pt-5">
    <PostCard v-for="p in postStore.userPosts" :key="p.id" :post="p" :compact="true" />
  </div>
  <PostNotFound v-else />
</template>