<template>
    <button @click="toggleDark"
        class="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        aria-label="Toggle dark mode">
        <Transition name="icon" mode="out-in">
            <SunIcon v-if="isDark" class="w-6 h-6 text-yellow-500" />
            <MoonIcon v-else class="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
        </Transition>
    </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'

const isDark = ref(false)

onMounted(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    isDark.value = savedTheme
        ? savedTheme === 'dark'
        : systemDark

    updateTheme()
})

const toggleDark = () => {
    isDark.value = !isDark.value
    updateTheme()
}

const updateTheme = () => {
    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}
</script>

<style>
.icon-enter-active,
.icon-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.icon-enter-from,
.icon-leave-to {
    opacity: 0;
    transform: scale(0.8);
}
</style>