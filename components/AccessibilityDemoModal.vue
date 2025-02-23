<template>
    <div v-if="isOpen" class="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div 
        class="bg-primary-300 dark:bg-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full"
        :class="{
          'dark:bg-neutral-900': activeContrast === 'dark-mode'
        }"
        role="dialog"
      >
        <!-- Header -->
        <div 
          class="p-6 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center"
          :class="{
            'dark:border-neutral-600': activeContrast === 'dark-mode'
          }"
        >
          <div>
            <h2 class="text-2xl font-heading text-neutral-900 dark:text-neutral-100">
              Accessibility Features Demo
            </h2>
            <p class="text-neutral-600 dark:text-neutral-300 mt-1">
              Experience and customize our accessibility tools
            </p>
          </div>
          <button 
            @click="closeModal"
            class="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Close demo"
          >
            <XMarkIcon class="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
          </button>
        </div>
  
        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Contrast Modes -->
          <section>
            <h3 class="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
              Contrast Preferences
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                v-for="mode in contrastModes"
                :key="mode.id"
                @click="setContrastMode(mode.id)"
                class="p-4 rounded-lg border-2 transition-colors"
                :class="[
                  activeContrast === mode.id 
                    ? 'border-secondary-600 dark:border-secondary-500 bg-secondary-50 dark:bg-secondary-900/30' 
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600',
                  mode.classes
                ]"
              >
                <span class="block text-sm font-medium text-neutral-600 dark:text-neutral-100">
                  {{ mode.label }}
                </span>
                <span class="block text-xs text-neutral-600 dark:text-neutral-300 mt-1">
                  {{ mode.description }}
                </span>
              </button>
            </div>
          </section>
  
          <!-- Text Scaling -->
          <section>
            <h3 class="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
              Text Size Adjustment
            </h3>
            <div class="flex items-center gap-4">
              <input
                type="range"
                v-model="textSize"
                min="0.8"
                max="1.5"
                step="0.1"
                class="w-full range-slider"
                aria-label="Adjust text size scaling"
              />
              <span class="text-sm text-neutral-600 dark:text-neutral-300">
                {{ textSize }}x
              </span>
            </div>
          </section>
  
          <!-- Motion Preferences -->
          <section>
            <h3 class="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
              Motion Settings
            </h3>
            <label class="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/50">
              <input
                type="checkbox"
                v-model="reduceMotion"
                class="w-4 h-4 text-secondary-600 dark:text-secondary-500 focus:ring-secondary-500"
              />
              <span class="text-neutral-700 dark:text-neutral-300">
                Reduce motion and animations
              </span>
            </label>
          </section>
  
          <!-- Keyboard Navigation -->
          <section>
            <h3 class="text-lg font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
              Keyboard Shortcuts
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div 
                v-for="shortcut in keyboardShortcuts"
                :key="shortcut.keys"
                class="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900/50"
              >
                <div class="flex items-center gap-2">
                  <kbd 
                    v-for="key in shortcut.keys.split('+')"
                    :key="key"
                    class="px-2 py-1 bg-white dark:bg-neutral-800 rounded-md text-sm font-medium text-neutral-900 dark:text-neutral-200 shadow-sm"
                  >
                    {{ key }}
                  </kbd>
                </div>
                <span class="block mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                  {{ shortcut.action }}
                </span>
              </div>
            </div>
          </section>
        </div>
  
        <!-- Footer -->
        <div 
          class="p-6 border-t border-neutral-200 dark:border-neutral-700"
          :class="{
            'dark:border-neutral-600': activeContrast === 'dark-mode'
          }"
        >
          <button
            @click="resetSettings"
            class="w-full py-2.5 px-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
          >
            Reset to Default Settings
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { XMarkIcon } from '@heroicons/vue/24/outline'
  
  const props = defineProps({
    isOpen: Boolean
  })
  
  const emit = defineEmits(['close'])
  
  // State
  const textSize = ref(1)
  const reduceMotion = ref(false)
  const activeContrast = ref('default')
  
  const contrastModes = [
    {
      id: 'default',
      label: 'System Theme',
      description: 'Follows your OS/browser settings',
      classes: 'bg-white dark:bg-neutral-800'
    },
    {
      id: 'high-contrast',
      label: 'High Contrast',
      description: 'Enhanced visibility mode',
      classes: 'bg-neutral-900 text-neutral-100'
    },
    {
      id: 'dark-mode',
      label: 'Dark Mode',
      description: 'Low-light experience',
      classes: 'bg-neutral-950 text-neutral-100'
    }
  ]
  
  const keyboardShortcuts = [
    { keys: 'Tab', action: 'Navigate between elements' },
    { keys: 'Shift+Tab', action: 'Navigate backwards' },
    { keys: 'Enter', action: 'Activate element' },
    { keys: 'Esc', action: 'Close modal' }
  ]
  
  // Methods
  const setContrastMode = (mode: string) => {
    activeContrast.value = mode
    document.documentElement.classList.toggle('force-dark', mode === 'dark-mode')
    document.documentElement.classList.toggle('force-high-contrast', mode === 'high-contrast')
  }
  
  const resetSettings = () => {
    textSize.value = 1
    reduceMotion.value = false
    activeContrast.value = 'default'
    document.documentElement.style.fontSize = ''
    document.documentElement.classList.remove('force-dark', 'force-high-contrast')
  }
  
  const closeModal = () => {
    resetSettings()
    emit('close')
  }
  
  // Watchers
  watch(textSize, (size) => {
    document.documentElement.style.fontSize = `${size}rem`
  })
  
  watch(reduceMotion, (reduce) => {
    document.documentElement.classList.toggle('reduce-motion', reduce)
  })
  </script>
  
  <style>
  /* Global overrides */
  .force-dark {
    color-scheme: dark;
    --bg-color: #0a0a0a;
    --text-color: #f5f5f5;
    --border-color: #404040;
  }
  
  .force-high-contrast {
    --bg-color: #000;
    --text-color: #fff;
    --border-color: #fff;
    --secondary: #ff0000;
  }
  
  .reduce-motion * {
    animation: none !important;
    transition: none !important;
  }
  
  /* Range slider */
  .range-slider {
    -webkit-appearance: none;
    height: 4px;
    background: #e5e7eb;
    border-radius: 2px;
  }
  
  .range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: #13775F;
    border-radius: 50%;
    cursor: pointer;
  }
  
  .dark .range-slider {
    background: #374151;
  }
  
  .dark .range-slider::-webkit-slider-thumb {
    background: #D70000;
  }
  
  .force-dark .range-slider,
  .force-high-contrast .range-slider {
    background: var(--border-color);
  }
  
  .force-dark .range-slider::-webkit-slider-thumb,
  .force-high-contrast .range-slider::-webkit-slider-thumb {
    background: var(--secondary);
  }
  </style>