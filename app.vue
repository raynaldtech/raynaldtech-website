<template>
  <div>
    <NuxtLayout>
      <CookieConsent />
      <NuxtPage/>
      <RealTimeChatWidget/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
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