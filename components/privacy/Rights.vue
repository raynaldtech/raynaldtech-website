<!-- components/privacy/Rights.vue -->
<template>
  <div>
    <h3>Your POPIA Rights</h3>
    <p>Under South African law, you have the right to:</p>
    <div class="space-y-4 my-6">
      <div 
        v-for="(right, index) in rights" 
        :key="index"
        class="flex items-start gap-3"
      >
        <div class="w-6 h-6 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mt-1">
          {{ index + 1 }}
        </div>
        <div>
          <h4 class="font-semibold">{{ right.title }}</h4>
          <p class="text-sm text-neutral-600 dark:text-neutral-300">
            {{ right.description }}
          </p>
        </div>
      </div>
    </div>
    <p>To exercise these rights, contact our Information Officer at 
      <a href="mailto:dpo@raynaldtech.com" class="text-secondary hover:underline">
        dpo@raynaldtech.com
      </a>
    </p>
  </div>
</template>

<script setup lang="ts">
const rights = [
  {
    title: 'Access',
    description: 'Request copies of your personal data'
  },
  {
    title: 'Correction',
    description: 'Update inaccurate or incomplete information'
  },
  {
    title: 'Deletion',
    description: 'Remove data under certain conditions'
  },
  {
    title: 'Objection',
    description: 'Opt-out of specific data processing'
  }
]
</script>