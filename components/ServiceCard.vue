<template>
  <article class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 h-full">
    <div class="flex items-center gap-4 mb-6">
      <div class="p-3 bg-primary-100 dark:bg-neutral-700 rounded-lg">
        <slot name="icon"></slot>
      </div>
      <div>
        <h3 class="text-xl font-heading text-primary dark:text-primary-300">{{ title }}</h3>
        <p class="text-secondary dark:text-primary-200 text-sm">{{ category }}</p>
      </div>
    </div>

    <p class="text-neutral-600 dark:text-neutral-300 mb-4">{{ description }}</p>

    <button @click="isExpanded = !isExpanded"
      class="text-primary-600 hover:text-primary-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
      :aria-expanded="isExpanded">
      {{ isExpanded ? 'Hide Details' : 'View Details' }}
    </button>

    <div v-if="isExpanded" class="mt-4 space-y-3">
      <div v-for="(spec, index) in specifications" :key="index" class="flex items-start gap-2">
        <span class="text-primary-600">•</span>
        <span class="text-neutral-700">{{ spec }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  category: String,
  description: String,
  specifications: Array
})

const isExpanded = ref(false)
</script>