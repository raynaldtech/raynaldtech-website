<template>
  <main class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <!-- Hero Section -->
    <section class="bg-primary-900 text-neutral-100 py-20">
      <div class="container mx-auto px-4 text-center max-w-4xl">
        <h1 class="text-4xl md:text-6xl font-heading mb-6 animate-fade-in">
          Digital Accessibility Commitment
        </h1>
        <p class="text-xl text-primary-200 max-w-2xl mx-auto mb-8">
          Empowering everyone to experience technology without barriers
        </p>
        <div class="flex justify-center space-x-4">
          <NuxtLink to="/contact" class="btn-secondary" aria-label="Contact us about accessibility needs">
            Request Assistance
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Principles Grid -->
    <section class="container mx-auto px-4 py-16">
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div v-for="(principle, index) in principles" :key="index"
          class="bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div
            class="w-12 h-12 mb-4 p-2 bg-primary-100 dark:bg-primary-900 rounded-lg text-primary-600 dark:text-primary-300">
            <component :is="principle.icon" class="w-8 h-8" />
          </div>
          <h3 class="text-xl font-heading mb-2 text-primary-800 dark:text-primary-200">
            {{ principle.title }}
          </h3>
          <p class="text-neutral-600 dark:text-neutral-300">
            {{ principle.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Compliance Standards -->
    <section class="bg-neutral-100 dark:bg-neutral-800 py-16">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-3xl font-heading text-center mb-12 text-primary-900 dark:text-white">
          Our Compliance Framework
        </h2>
        <div class="space-y-8">
          <div v-for="standard in standards" :key="standard.title"
            class="bg-white dark:bg-neutral-700 p-6 rounded-lg border-l-4 border-secondary">
            <h3 class="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">
              {{ standard.title }}
            </h3>
            <p class="text-neutral-600 dark:text-neutral-300">
              {{ standard.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Accessibility Features -->
    <section class="container mx-auto px-4 py-16">
      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="space-y-6">
          <h2 class="text-3xl font-heading text-primary-900 dark:text-white">
            Built-In Accessibility Features
          </h2>
          <ul class="space-y-4">
            <li v-for="feature in features" :key="feature"
              class="flex items-center space-x-3 text-neutral-700 dark:text-neutral-300">
              <CheckCircleIcon class="w-6 h-6 text-secondary flex-shrink-0" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
        <div class="relative aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="animate-pulse bg-gradient-to-r from-primary-100 to-primary-300 dark:from-primary-800 dark:to-primary-900 w-full h-full" />
          </div>
          <div class="relative z-10 p-8">
            <div class="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg">
              <h3 class="text-lg font-heading mb-2">Try Our Demo</h3>
              <p class="text-sm mb-4">Experience our accessibility tools</p>
              <button class="btn-primary" aria-label="Open accessibility demo">
                Launch Interactive Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Feedback Section -->
    <section class="bg-primary-100 opacity-80 dark:bg-neutral-800 py-16">
      <div class="container mx-auto px-4 max-w-2xl">
        <div class="bg-primary-300 dark:bg-neutral-700 rounded-xl shadow-lg p-8">
          <h2 class="text-3xl font-heading text-center mb-8 text-primary-900 dark:text-white">
            Help Us Improve
          </h2>
          <form class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2 text-neutral-100 dark:text-neutral-300">
                Describe your accessibility experience
              </label>
              <textarea rows="4"
                class="w-full rounded-lg border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary"
                aria-describedby="feedbackHelp" />
              <p id="feedbackHelp" class="text-sm text-neutral-100 dark:text-neutral-400 mt-2">
                Please include specific pages or features
              </p>
            </div>
            <button type="submit" class="btn-secondary w-full" aria-label="Submit accessibility feedback">
              Send Feedback
            </button>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { CheckCircleIcon, AdjustmentsHorizontalIcon, EyeIcon, HandRaisedIcon } from '@heroicons/vue/24/outline'

const principles = [
  {
    icon: AdjustmentsHorizontalIcon,
    title: "Adaptable Interface",
    description: "Customizable viewing experiences with adjustable contrast, spacing, and text sizing"
  },
  {
    icon: EyeIcon,
    title: "Visual Clarity",
    description: "High contrast ratios and clear typography meeting WCAG 2.1 AA standards"
  },
  {
    icon: HandRaisedIcon,
    title: "Universal Control",
    description: "Full keyboard navigation and screen reader compatibility"
  }
]

const standards = [
  {
    title: "WCAG 2.1 AA Compliance",
    description: "Meeting all level AA success criteria for web accessibility"
  },
  {
    title: "ADA Title III Conformance",
    description: "Ensuring access for individuals with disabilities"
  },
  {
    title: "EN 301 549 Alignment",
    description: "Meeting European digital accessibility standards"
  }
]

const features = [
  "Keyboard Navigation Guides",
  "Screen Reader Optimization",
  "Alternative Text Descriptions",
  "Reduced Motion Options",
  "Color Contrast Adjuster",
  "Text-to-Speech Functionality"
]
</script>

<style>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-primary {
  @apply bg-secondary text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors duration-300 focus:ring-2 focus:ring-white focus:ring-offset-2;
}

.btn-secondary {
  @apply bg-transparent text-secondary-600 border-2 border-secondary-600 hover:bg-secondary-50 hover:border-secondary-700 hover:text-secondary-700 dark:bg-neutral-800 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-neutral-700 dark:hover:border-primary-200 dark:hover:text-primary-200 px-6 py-3 rounded-lg transition-colors duration-300 focus:ring-2 focus:ring-secondary-600 focus:ring-offset-2 dark:focus:ring-primary-300;
}
</style>