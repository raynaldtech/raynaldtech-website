<!-- components/privacy/Updates.vue -->
<template>
    <div>
      <h3>Version History</h3>
      <div class="space-y-6">
        <div 
          v-for="(update, index) in updates"
          :key="index"
          class="pl-6 border-l-2 border-secondary"
        >
          <div class="flex items-baseline gap-3 mb-2">
            <span class="text-secondary font-semibold">v{{ update.version }}</span>
            <span class="text-sm text-neutral-500 dark:text-neutral-400">{{ update.date }}</span>
          </div>
          <ul class="list-disc space-y-2 pl-4">
            <li v-for="(change, cIndex) in update.changes" :key="cIndex">{{ change }}</li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const updates = [
    {
      version: '1.0',
      date: '2025-02-17',
      changes: [
        'Initial privacy policy release',
        'Basic data collection machenism',
        'Data Protection Measures Details',
        'Contact information section',
        'Cookie consent management details',
        'Data Rights details'
      ]
    }
  ]
  </script>