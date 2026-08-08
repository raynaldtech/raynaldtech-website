<template>
  <article class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 h-full text-center">
    <div
      class="mx-auto mb-4 w-14 h-14 rounded-lg bg-primary-100 dark:bg-neutral-700 flex items-center justify-center">
      <slot name="icon"></slot>
    </div>
    <h3 class="text-lg font-heading text-primary dark:text-primary-300 mb-2">{{ title }}</h3>
    <p class="text-neutral-600 dark:text-neutral-300 text-sm">{{ description }}</p>
  </article>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>
