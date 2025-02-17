<template>
<article class="bg-white dark:bg-neutral-800 rounded-lg shadow-md hover:shadow-xl overflow-hidden hover:transform hover:scale-[1.02] transition-all">    <!-- <NuxtImg :src="image" :alt="`Portrait of ${name}`" class="w-full h-64 object-cover" loading="lazy" /> -->
    <picture>
      <source :srcset="image" type="image/webp">
      <img :src="image" :alt="`Portrait of ${name}`" class="w-full h-64 object-cover" loading="lazy">
    </picture>

    <div class="p-6">
      <h3 class="text-lg font-heading text-primary dark:text-primary-300">{{ name }}</h3>
      <h4 class="text-secondary dark:text-primary-200 font-semibold text-base mb-2">{{ role }}</h4>

      <div class="flex flex-wrap gap-2">
        <p>{{ bio }}</p>
        <span v-for="(cert, index) in certifications" :key="index"
          class="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-200 rounded-full transition-colors">
          {{ cert }}
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  role: String,
  bio: String,
  image: String,
  certifications: Array
})
</script>