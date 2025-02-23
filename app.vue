<template>
  <div>
    <NuxtLayout>
      <CookieConsent />
      <NuxtPage/>
      <!-- <RealTimeChatWidget/> -->
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { RouterConfig } from '@nuxt/schema'
useSeoMeta({
  author: 'Raynald Tech ICT Solutions',
  themeColor: '#13775F',
  mobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black-translucent'
})
onBeforeMount(() => {
  if (typeof localStorage !== 'undefined') {
    const theme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (theme === 'dark' || (!theme && systemDark)) {
      document.documentElement.classList.add('dark')
    }
  }
})
</script>