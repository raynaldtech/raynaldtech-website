<template>
    <header class="bg-white dark:bg-neutral-800 shadow-sm sticky top-0 z-50">
        <!-- Skip Navigation -->
        <a href="#main-content"
            class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:p-2 focus:rounded focus:ring-2 focus:ring-primary">
            Skip to main content
        </a>
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-20">
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center gap-3 group" aria-label="Home">
                    <picture>
                        <source srcset="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" type="image/webp">
                        <img src="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" alt="Raynald Tech Logo"
                            class="h-12 transition-transform group-hover:scale-105" loading="eager" height="48"
                            :modifiers="{ quality: 90 }">
                    </picture>
                    <!-- <NuxtImg src="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" alt="Raynald Tech Logo"
                        class="h-12 w-12 transition-transform group-hover:scale-105" loading="eager" width="48"
                        height="48" :modifiers="{ quality: 90 }" /> -->
                    <span class="text-xl font-heading font-bold text-primary dark:text-primary-400">
                        RAYNALD TECH
                    </span>
                </NuxtLink>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center gap-8" aria-label="Main navigation">
                    <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path"
                        class="text-neutral-600 dark:text-neutral-300 hover:text-primary dark:hover:text-primary-300 px-3 py-2 rounded-lg font-medium transition-colors relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-primary after:dark:bg-primary-300 after:w-0 after:transition-all hover:after:w-4/5">
                        {{ link.label }}
                    </NuxtLink>
                    <NuxtLink to="/contact"
                        class="block text-center flex-shrink-0 bg-secondary hover:bg-red-800 dark:hover:bg-red-900 dark:bg-red-800 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300">
                        Contact Us
                    </NuxtLink>
                    <ThemeToggle />
                </nav>

                <!-- Mobile Menu Toggle -->
                <button @click="isMenuOpen = !isMenuOpen"
                    class="md:hidden p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                    <Bars3Icon class="w-6 h-6" />
                </button>
            </div>

            <!-- Mobile Menu -->
            <Transition>
                <div v-show="isMenuOpen" class="md:hidden absolute w-full bg-white dark:bg-neutral-800 shadow-lg container mx-auto">
                    <div class="px-4 pt-2 pb-4 space-y-2">
                        <div class="px-4 py-3">
                            <ThemeToggle />
                        </div>
                        <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path"
                            class="block px-4 py-3 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg">
                            {{ link.label }}
                        </NuxtLink>
                        <NuxtLink to="/contact"
                            class="block text-center bg-secondary hover:bg-red-800 dark:hover:bg-red-800 dark:bg-red-900 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300">
                            Contact Us
                        </NuxtLink>
                    </div>
                </div>
            </Transition>
        </div>
    </header>
</template>

<script setup lang="ts">
import { Bars3Icon } from '@heroicons/vue/24/outline'

const isMenuOpen = ref(false)

const navLinks = [
    { label: 'Home', path: '/', current: true },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    //{ label: 'Contact', path: '/contact' }
]

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.md\\:hidden') && isMenuOpen.value) {
        isMenuOpen.value = false
    }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.router-link-active {
    @apply text-primary-800 dark:text-primary-300 font-semibold;
}

.router-link-active::after {
    @apply w-4/5;
}
</style>