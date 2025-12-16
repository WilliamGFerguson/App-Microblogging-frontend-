<script setup lang="ts">
import { ref } from 'vue';
import SmileIcon from '../icons/SmileIcon.vue';
import Emojis from './Emojis.vue';

const displayEmojis = ref<boolean>(false)

const toggleEmojis = () => {
  displayEmojis.value = !displayEmojis.value
}

</script>

<template>
  <div class="relative cursor-pointer" @click.stop="toggleEmojis">
    <SmileIcon />
    <Emojis v-if="displayEmojis" @close="toggleEmojis" />
  </div>
</template>