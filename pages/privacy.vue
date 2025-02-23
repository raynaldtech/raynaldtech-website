<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
    <!-- Progress Indicator -->
    <div class="h-1 bg-primary-100 dark:bg-neutral-800">
      <div class="h-full bg-secondary transition-all duration-300" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <main class="container mx-auto px-4 py-16 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-16">
        <NuxtLink to="/" class="inline-block mb-6">
          <picture>
            <source srcset="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" type="image/webp">
            <img src="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" alt="Raynald Tech Logo" class="h-16 mx-auto">
          </picture>
          <!-- <NuxtImg 
            src="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" 
            alt="Raynald Tech Logo"
            class="h-16 mx-auto"
          /> -->
        </NuxtLink>
        <h1 class="text-4xl font-heading text-primary-900 dark:text-neutral-100 mb-4">
          Privacy Policy
        </h1>
        <p class="text-neutral-600 dark:text-neutral-300">
          Effective Date: {{ new Date().toLocaleDateString('en-ZA') }}
        </p>
      </div>

      <!-- Table of Contents -->
      <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 mb-12 sticky top-6">
        <h2 class="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-4">
          Contents Overview
        </h2>
        <ul class="space-y-2">
          <li v-for="(section, index) in sections" :key="index">
            <a :href="'#' + section.id"
              class="flex items-center text-neutral-600 dark:text-neutral-300 hover:text-secondary transition-colors"
              @click.prevent="scrollToSection(section.id)">
              <DocumentTextIcon class="w-4 h-4 mr-2" />
              {{ section.title }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Content Sections -->
      <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
        <section v-for="(section, index) in sections" :key="index" :id="section.id" class="mb-12 last:mb-0">
          <div class="flex items-center mb-6">
            <div class="w-8 h-8 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mr-3">
              {{ index + 1 }}
            </div>
            <h2 class="text-2xl font-heading text-primary-900 dark:text-neutral-100">
              {{ section.title }}
            </h2>
          </div>
          <div class="prose dark:prose-invert max-w-none">
            <component :is="section.content" />
          </div>
        </section>
      </div>

      <!-- Back to Top -->
      <div class="mt-12 text-center">
        <button @click="scrollToTop" class="btn-secondary flex items-center mx-auto" aria-label="Back to top">
          <ArrowUpIcon class="w-5 h-5 mr-2" />
          Back to Top
        </button>
      </div>
    </main>

    <!-- Footer Note -->
    <div class="border-t border-neutral-200 dark:border-neutral-700 mt-16 py-8">
      <div class="container mx-auto px-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        <p>For data requests, contact our DPO at
          <a href="mailto:dpo@raynaldtech.com" class="text-secondary hover:text-secondary-700 transition-colors">
            dpo@raynaldtech.com
          </a>
        </p>
        <!-- pages/privacy.vue -->
        <NuxtLink to="/privacy#updates"
          class="inline-block mt-2 text-primary-600 dark:text-primary-300 hover:text-secondary hover:underline transition-colors">
          View Version History →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
import { DocumentTextIcon, ArrowUpIcon } from '@heroicons/vue/24/outline'

const sections = [
  {
    id: 'updates',
    title: 'Update History',
    content: resolveComponent('PrivacyUpdates')
  },
  {
    id: 'data-collection',
    title: 'Data We Collect',
    content: resolveComponent('PrivacyDataCollection')
  },
  {
    id: 'usage',
    title: 'How We Use Information',
    content: resolveComponent('PrivacyUsage')
  },
  {
    id: 'protection',
    title: 'Data Protection',
    content: resolveComponent('PrivacyProtection')
  },
  {
    id: 'rights',
    title: 'Your Rights',
    content: resolveComponent('PrivacyRights')
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    content: resolveComponent('PrivacyCookies')
  }
]

// Reuse scroll functionality from Terms
const scrollProgress = ref(0)
const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})

const updateScrollProgress = () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = (window.scrollY / windowHeight) * 100
  scrollProgress.value = Math.min(Math.max(scrolled, 0), 100)
}
useSeoMeta({
  title: 'Privacy Policy | Raynald Tech ICT Solutions',
  description: 'Learn how we protect your personal information in compliance with POPIA. Our data practices for IT services in Nelspruit and South Africa.',
  keywords: 'privacy policy, data protection, POPIA compliance, South Africa data law, personal information, IT security',
  ogTitle: 'Data Protection & Privacy Practices - Raynald Tech',
  ogDescription: 'Your digital rights and our data handling procedures under South African privacy laws',
  //ogImage: `${config.public.siteUrl}/images/og-privacy.jpg`,
  ogUrl: `${config.public.siteUrl}/privacy`,
  //twitterCard: 'summary_large_image',
  robots: 'privacy, follow'
})
</script>

<style>
/* Reuse terms page styles */
.prose {
  color: #374151;
  line-height: 1.6;
}

.prose h3 {
  @apply text-xl font-semibold mt-6 mb-4 text-primary-800 dark:text-primary-200;
}

.prose table {
  @apply w-full my-6 border-collapse;
}

.prose th {
  @apply bg-neutral-100 dark:bg-neutral-700 text-left px-4 py-3;
}

.prose td {
  @apply border-t border-neutral-200 dark:border-neutral-700 px-4 py-3;
}

.dark .prose {
  color: #d1d5db;
}

.btn-secondary {
  @apply inline-flex items-center px-6 py-3 border border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-colors focus:ring-2 focus:ring-secondary focus:ring-offset-2;
}
</style>