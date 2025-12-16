<script setup lang="ts">

const adds = {
  vintage: {
    img: new URL("../../assets/add_vintage-story.png", import.meta.url).href,
    url: "https://www.vintagestory.at/"
  },
  mazda: {
    img: new URL("../../assets/add_mazda.jpg", import.meta.url).href,
    url: "https://www.mazda.ca/"
  },
  mcdo: {
    img: new URL("../../assets/add_mcdo.jpg", import.meta.url).href,
    url: "https://www.mcdonalds.com/ca/en-ca.html"
  }
}
</script>

<template>
  <section class="h-full w-full grid grid-rows-3 gap-2 p-2 bg-[var(--bg)]">
    <div v-for="add in adds" class="overflow-hidden">
      <a :href="add.url" target="_blank">
        <div :style="{ '--add-url': `url(${add.img})`}" class="add h-full w-full cursor-pointer hover:scale-105 transition-all"></div>
      </a>
    </div>
  </section>
</template>

<style scoped>
section {
  grid-area: adds;
}
.add {
  background-image: var(--add-url);
  background-size: cover;
  background-position: bottom;
}
</style>