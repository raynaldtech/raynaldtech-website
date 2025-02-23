<template>
    <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <!-- Progress Indicator -->
      <div class="h-1 bg-primary-100 dark:bg-neutral-800">
        <div 
          class="h-full bg-secondary transition-all duration-300" 
          :style="{ width: scrollProgress + '%' }"
        ></div>
      </div>
  
      <main class="container mx-auto px-4 py-16 max-w-4xl">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl font-heading text-primary-900 dark:text-neutral-100 mb-4">
            Cookie Preferences
          </h1>
          <p class="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Manage your cookie settings to control how we use cookies and similar technologies
          </p>
        </div>
  
        <!-- Cookie Categories -->
        <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
          <!-- Essential Cookies -->
          <div class="pb-6 border-b border-neutral-200 dark:border-neutral-700 mb-6">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <ShieldCheckIcon class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  <h2 class="text-xl font-semibold text-primary-900 dark:text-neutral-100">
                    Essential Cookies
                  </h2>
                </div>
                <p class="text-neutral-600 dark:text-neutral-300 text-sm">
                  Required for basic site functionality. Cannot be disabled.
                </p>
              </div>
              <div class="flex items-center h-12">
                <span class="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm">
                  Always Active
                </span>
              </div>
            </div>
          </div>
  
          <!-- Performance Cookies -->
          <div class="pb-6 border-b border-neutral-200 dark:border-neutral-700 mb-6">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <CogIcon class="w-6 h-6 text-secondary" />
                  <h2 class="text-xl font-semibold text-primary-900 dark:text-neutral-100">
                    Performance Cookies
                  </h2>
                </div>
                <p class="text-neutral-600 dark:text-neutral-300 text-sm">
                  Help us improve website performance and user experience
                </p>
              </div>
              <Switch
                v-model="performanceEnabled"
                :class="performanceEnabled ? 'bg-secondary' : 'bg-neutral-200 dark:bg-neutral-700'"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                <span class="sr-only">Enable performance cookies</span>
                <span
                  :class="performanceEnabled ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                />
              </Switch>
            </div>
          </div>
  
          <!-- Analytics Cookies -->
          <div class="pb-6 border-b border-neutral-200 dark:border-neutral-700 mb-6">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <ChartBarIcon class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  <h2 class="text-xl font-semibold text-primary-900 dark:text-neutral-100">
                    Analytics Cookies
                  </h2>
                </div>
                <p class="text-neutral-600 dark:text-neutral-300 text-sm">
                  Collect anonymous usage data to help us improve our services
                </p>
              </div>
              <Switch
                v-model="analyticsEnabled"
                :class="analyticsEnabled ? 'bg-secondary' : 'bg-neutral-200 dark:bg-neutral-700'"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                <span class="sr-only">Enable analytics cookies</span>
                <span
                  :class="analyticsEnabled ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                />
              </Switch>
            </div>
          </div>
  
          <!-- Marketing Cookies -->
          <div class="pb-6 mb-6">
            <div class="flex items-start justify-between gap-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <MegaphoneIcon class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  <h2 class="text-xl font-semibold text-primary-900 dark:text-neutral-100">
                    Marketing Cookies
                  </h2>
                </div>
                <p class="text-neutral-600 dark:text-neutral-300 text-sm">
                  Used to deliver personalized content and ads (currently disabled)
                </p>
              </div>
              <Switch
                v-model="marketingEnabled"
                :class="marketingEnabled ? 'bg-secondary' : 'bg-neutral-200 dark:bg-neutral-700'"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors opacity-50 cursor-not-allowed"
                disabled
              >
                <span class="sr-only">Enable marketing cookies</span>
                <span
                  :class="marketingEnabled ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                />
              </Switch>
            </div>
          </div>
  
          <!-- Details Accordion -->
          <Disclosure v-slot="{ open }">
            <DisclosureButton
              class="w-full py-2 text-sm text-secondary hover:text-secondary-700 dark:hover:text-secondary-600 flex items-center justify-center gap-2"
            >
              <span>Advanced Cookie Details</span>
              <ChevronDownIcon :class="open ? 'rotate-180 transform' : ''" class="w-4 h-4" />
            </DisclosureButton>
            <DisclosurePanel class="pt-4">
              <div class="text-sm text-neutral-600 dark:text-neutral-300 space-y-4">
                <p>We use cookies to:</p>
                <ul class="list-disc pl-6 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Analyze site traffic patterns</li>
                  <li>Ensure secure operation of our services</li>
                </ul>
                <p>For full details, please review our 
                  <NuxtLink to="/privacy" class="text-secondary hover:underline">
                    Privacy Policy
                  </NuxtLink>
                </p>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>
  
        <!-- Sticky Footer -->
        <div class="sticky bottom-6 mt-8 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-sm text-neutral-600 dark:text-neutral-300 text-center md:text-left">
              Your preferences affect this website only
            </p>
            <div class="flex items-center gap-3">
              <button
                @click="resetPreferences"
                class="btn-secondary"
              >
                Reset Defaults
              </button>
              <button
                @click="savePreferences"
                class="btn-primary"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </main>
  
      <AppToast v-if="showToast" :message="toastMessage" @close="showToast = false" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import {
    Switch,
    Disclosure,
    DisclosureButton,
    DisclosurePanel
  } from '@headlessui/vue'
  import {
    ShieldCheckIcon,
    CogIcon,
    ChartBarIcon,
    MegaphoneIcon,
    ChevronDownIcon
  } from '@heroicons/vue/24/outline'

  // In cookie-preferences.vue
  const cookieConsent = useCookie<Record<string, boolean>>('cookie_preferences', {
    default: () => ({
      essential: true,
      performance: false,
      analytics: false,
      marketing: false
    })
  })
  
  // Cookie states
  const performanceEnabled = ref(cookieConsent.value.performance)
  const analyticsEnabled = ref(cookieConsent.value.analytics)
  const marketingEnabled = ref(cookieConsent.value.marketing)
  const showToast = ref(false)
  const toastMessage = ref('')
  
  // Scroll progress
  const scrollProgress = ref(0)

  
    
  const savePreferences = () => {
      cookieConsent.value = {
      essential: true,
      performance: performanceEnabled.value,
      analytics: analyticsEnabled.value,
      marketing: marketingEnabled.value
    }
    // Implement cookie setting logic here
    showToast.value = true
    toastMessage.value = 'Preferences saved successfully'
    setTimeout(() => showToast.value = false, 3000)
  }
  
  const resetPreferences = () => {
    performanceEnabled.value = true
    analyticsEnabled.value = false
    marketingEnabled.value = false
  }
  
  // Scroll progress logic (same as previous pages)
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
  title: 'Cookie Preferences - Raynald Tech',
  description: 'Manage your cookie settings for our IT services website',
  //ogImage: '/images/og-cookies.jpg'
})
  </script>
  
  <style>
  .btn-primary {
    @apply bg-secondary text-white px-6 py-2.5 rounded-lg 
           hover:bg-red-800 transition-colors focus:ring-2 focus:ring-secondary focus:ring-offset-2;
  }
  
  .btn-secondary {
    @apply bg-transparent border border-secondary text-secondary px-6 py-2.5 rounded-lg 
           hover:bg-secondary/10 transition-colors focus:ring-2 focus:ring-secondary focus:ring-offset-2;
  }
  
  .dark .btn-secondary {
    @apply border-primary-300 text-primary-300 hover:bg-primary-900/30;
  }
  </style>