<template>
  <article class="relative bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 flex flex-col h-full"
    :class="featured ? 'ring-2 ring-secondary' : ''">
    <span v-if="featured"
      class="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
      Most Popular
    </span>

    <h3 class="text-xl font-heading text-primary dark:text-primary-300 mb-2">{{ name }}</h3>

    <p class="mb-4">
      <span class="text-3xl font-heading text-neutral-900 dark:text-neutral-100">{{ price }}</span>
      <span class="text-neutral-500 dark:text-neutral-400 ml-1">{{ priceSuffix }}</span>
    </p>

    <p class="text-neutral-600 dark:text-neutral-300 mb-6">{{ tagline }}</p>

    <ul class="space-y-3 mb-8 flex-1">
      <li v-for="(feature, index) in features" :key="index" class="flex items-start gap-2">
        <span class="text-primary-600">•</span>
        <span class="text-neutral-700 dark:text-neutral-300">{{ feature }}</span>
      </li>
    </ul>

    <NuxtLink :to="{ path: '/contact', query: { service: name } }"
      class="block text-center bg-secondary hover:bg-red-800 dark:hover:bg-red-900 dark:bg-red-800 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300">
      Get Started
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  price: { type: String, required: true },
  priceSuffix: { type: String, default: '/month' },
  tagline: { type: String, default: '' },
  features: { type: Array as () => string[], default: () => [] },
  featured: { type: Boolean, default: false }
})
</script>
