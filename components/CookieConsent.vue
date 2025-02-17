<template>
    <div v-if="showBanner" class="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 shadow-lg p-4 border-t border-neutral-200 dark:border-neutral-600 transition-colors duration-300">
      <div class="container mx-auto flex flex-col md:flex-row items-center gap-4">
        <div class="flex-1">
          <p class="text-sm text-neutral-600 dark:text-neutral-300">
            We use cookies to enhance your experience. By continuing to visit this site, 
            you agree to our use of cookies.
            <NuxtLink 
              to="/privacy" 
              class="text-primary dark:text-primary-300 hover:underline dark:hover:text-primary-200"
            >
              Learn more
            </NuxtLink>
          </p>
        </div>
        <div class="flex gap-2">
          <button
            @click="acceptCookies"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-800 dark:hover:bg-primary-700 transition-colors duration-300"
          >
            Accept
          </button>
          <button
            @click="declineCookies"
            class="px-4 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-300"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const showBanner = ref(false)
  const cookieConsent = useCookie('cookie_consent')
  
  onMounted(() => {
    if (!cookieConsent.value) {
      showBanner.value = true
    }
  })
  
  const acceptCookies = () => {
    cookieConsent.value = 'accepted'
    showBanner.value = false
  }
  
  const declineCookies = () => {
    cookieConsent.value = 'declined'
    showBanner.value = false
  }
  </script>