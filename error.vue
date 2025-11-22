<template>
    <main class="min-h-screen flex items-center justify-center text-center px-4">
      <div class="max-w-md mx-auto">
        <h1 class="text-9xl font-bold text-primary mb-8">404</h1>
        <p class="text-2xl text-neutral-600 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <NuxtLink 
          to="/"
          class="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-800 transition-colors"
        >
          Return Home
        </NuxtLink>
        
        <div class="mt-8 grid grid-cols-2 gap-4">
          <NuxtLink 
            v-for="link in quickLinks"
            :key="link.path"
            :to="link.path"
            class="text-neutral-600 hover:text-primary transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  const quickLinks = [
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy' }
  ]
  </script>