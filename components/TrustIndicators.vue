<template>
  <section aria-labelledby="trust-heading" class="bg-neutral-50 dark:bg-neutral-800 py-16">
    <div class="container mx-auto px-4">
      <h2 id="trust-heading" class="sr-only">Our Credentials</h2>
      <div class="grid md:grid-cols-3 gap-8 text-center">
        <div v-for="(item, index) in indicators" :key="index" class="p-6" :class="{ 'animate-count-up': hasAnimated }">
          <div class="text-4xl font-heading text-primary dark:text-primary-300 mb-2">
            {{ item.value }}
          </div>
          <p class="text-neutral-600 dark:text-neutral-300">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
const indicators = ref([
  { value: 15, label: 'Years Experience' },
  { value: 500, label: 'Projects Completed' },
  { value: 98, label: 'Client Satisfaction' }
])

const target = ref<HTMLElement | null>(null)
const hasAnimated = ref(false)

// Configure intersection observer
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && !hasAnimated.value) {
    hasAnimated.value = true

    // Optional: Add custom animation logic
    document.querySelectorAll('.animate-count-up').forEach((el, index) => {
      (el as HTMLElement).style.setProperty('--delay', `${index * 150}ms`)
    })
  }
})
</script>

<style>
.animate-count-up {
  @apply opacity-0 translate-y-4;
  animation: countUp 0.6s ease-out forwards;
}

@keyframes countUp {
  to {
    @apply opacity-100 translate-y-0;
  }
}

.dark .animate-count-up {
  animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
}
</style>