<template>
    <div class="fixed bottom-8 right-8 z-50">
      <!-- Floating Button -->
      <button 
        @click="toggleChat"
        class="p-4 bg-secondary rounded-full shadow-xl hover:bg-red-800 transition-all duration-300 group"
        :class="{ 'rotate-45': isOpen }"
        aria-label="Open chat"
      >
        <svg class="w-8 h-8 text-white transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>
  
      <!-- Chat Container -->
      <Transition name="chat-transition">
        <div v-if="isOpen" class="absolute bottom-20 right-0 w-80 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl flex flex-col">
          <!-- Chat Header -->
          <div class="bg-primary p-4 rounded-t-xl flex items-center gap-3">
            <picture>
                        <source srcset="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" type="image/webp">
                        <img src="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" alt="Chat support"
                            class="h-10 transition-transform group-hover:scale-105" loading="eager" height="10"
                            :modifiers="{ quality: 90 }">
                    </picture>
            <!-- <NuxtImg 
              src="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" 
              class="w-10 h-10" 
              alt="Chat support"
            /> -->
            <div>
              <h2 class="text-white font-heading font-semibold">Support Team</h2>
              <p class="text-primary-200 text-sm">We're here to help!</p>
            </div>
            <div class="ml-auto flex items-center gap-2">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-white text-sm">Online</span>
            </div>
          </div>
  
          <!-- Messages Container -->
          <div class="flex-1 p-4 space-y-4 max-h-[400px] overflow-y-auto">
            <!-- Support Message -->
            <div v-for="(message, index) in messages" :key="index" 
              :class="message.sender === 'support' ? 'items-start' : 'items-end'">
              <div 
                :class="message.sender === 'support' 
                  ? 'bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                  : 'bg-primary text-white'"
                class="p-3 rounded-2xl max-w-[80%] transition-all duration-200"
              >
                <p>{{ message.text }}</p>
                <span class="text-xs opacity-70 mt-1 block">{{ message.time }}</span>
              </div>
            </div>
  
            <!-- Typing Indicator -->
            <div v-if="isTyping" class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                <div class="w-2 h-2 bgCurrent rounded-full animate-bounce delay-200"></div>
              </div>
              <span class="text-sm">Typing...</span>
            </div>
          </div>
  
          <!-- Input Area -->
          <div class="p-4 border-t border-neutral-100 dark:border-neutral-700">
            <div class="flex gap-2">
              <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                placeholder="Type your message..."
                class="flex-1 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button 
                @click="sendMessage"
                class="p-2 bg-primary text-white rounded-lg hover:bg-primary-800 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              Typically replies in 2 minutes
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  const isOpen = ref(false)
  const newMessage = ref('')
  const messages = ref([
    {
      text: 'Welcome to Raynald Tech! How can we help you today?',
      sender: 'support',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const isTyping = ref(false)
  
  const toggleChat = () => {
    isOpen.value = !isOpen.value
  }
  
  const sendMessage = async () => {
    if (!newMessage.value.trim()) return
  
    // Add user message
    messages.value.push({
      text: newMessage.value,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
  
    // Simulate typing indicator
    isTyping.value = true
    const userMessage = newMessage.value
    newMessage.value = ''
  
    // Simulate API call
    setTimeout(async () => {
      isTyping.value = false
      // Add support response
      messages.value.push({
        text: `Thanks for your message! We'll get back to you shortly. (Mock response to: ${userMessage})`,
        sender: 'support',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      })
    }, 2000)
  }
  </script>
  
  <style>
  .chat-transition-enter-active,
  .chat-transition-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: bottom right;
  }
  
  .chat-transition-enter-from,
  .chat-transition-leave-to {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  
  .delay-100 {
    animation-delay: 0.1s;
  }
  
  .delay-200 {
    animation-delay: 0.2s;
  }
  </style>