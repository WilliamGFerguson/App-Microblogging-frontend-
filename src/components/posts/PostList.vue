<script setup lang="ts">
import { onMounted, computed } from 'vue';
import PostCard from './PostCard.vue';
import PostNotFound from '../layout/NotFound.vue';
import useUserStore from '../../stores/userStore';
import postStore from '../../stores/postStore';

const userStore = useUserStore()
const posts = postStore()

onMounted(() => {
  posts.load(1, false); //load la page 1
});

const maxHeigth = computed(() => userStore.currentUser ? "max-h-[74vh]" : "max-h-[calc(100vh-100px)]")
</script>

<template>
  <div v-if="posts.items.length > 0" :class="maxHeigth" class="w-full overflow-y-auto px-1 lg:px-5">
     <PostCard v-for="p in posts.items" :key="p.id" :post="p" />
     <div v-if="posts.hasNext" class="flex justify-center py-4">
      <button class="px-4 py-2 border rounded" @click="posts.load(posts.page + 1, true)" :disabled="posts.loading">
        {{ posts.loading ? '...' : 'Plus' }}
      </button>
    </div>
  </div>
  <PostNotFound v-else />
</template>