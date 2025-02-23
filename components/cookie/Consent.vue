<template>
  <div v-if="showBanner" class="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 shadow-lg p-4 border-t border-neutral-200 dark:border-neutral-600 transition-colors duration-300 z-50">
    <div class="container mx-auto flex flex-col md:flex-row items-center gap-4">
      <div class="flex-1">
        <p class="text-sm text-neutral-600 dark:text-neutral-300">
          We use cookies to enhance your experience. 
          <NuxtLink 
            to="/cookie-policy" 
            class="text-primary dark:text-primary-300 hover:underline dark:hover:text-primary-200"
          >
            Manage preferences
          </NuxtLink>. By continuing, you agree to our 
          <NuxtLink 
            to="/privacy" 
            class="text-primary dark:text-primary-300 hover:underline dark:hover:text-primary-200"
          >
            Privacy Policy
          </NuxtLink>.
        </p>
      </div>
      <div class="flex gap-2">
        <button
          @click="declineCookies"
          class="btn-secondary px-4 py-2"
        >
          Decline
        </button>
        <button
          @click="acceptCookies"
          class="btn-primary px-4 py-2"
        >
          Accept All
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type CookiePreferences = {
  essential: boolean
  performance: boolean
  analytics: boolean
  marketing: boolean
}

const showBanner = ref(false)
const cookieConsent = useCookie<CookiePreferences | undefined>('cookie_preferences')

// Handle cookie format migration
onMounted(() => {
  // Check if cookie exists with old format
  if (cookieConsent.value && typeof cookieConsent.value === 'string') {
    cookieConsent.value = undefined // Clear invalid format
  }

  // Show banner if no valid preferences exist
  if (!cookieConsent.value) {
    showBanner.value = true
  }
})

const acceptCookies = () => {
  cookieConsent.value = {
    essential: true,
    performance: true,
    analytics: true,
    marketing: false
  }
  showBanner.value = false
}

const declineCookies = () => {
  cookieConsent.value = {
    essential: true, // Essential cookies cannot be declined
    performance: false,
    analytics: false,
    marketing: false
  }
  showBanner.value = false
}
</script>