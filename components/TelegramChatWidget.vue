<template>
    <div>
      <!-- Floating Chat Button -->
      <button 
        class="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg"
        @click="toggleChat"
      >
        <!-- Telegram Icon (SVG) -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="currentColor" viewBox="0 0 240 240">
          <path d="M120,0C53.73,0,0,53.73,0,120S53.73,240,120,240s120-53.73,120-120S186.27,0,120,0Zm55.68,80.88-21.64,102.68c-1.63,7.21-5.94,8.99-12.04,5.6L70.6,146.94c-6.18-3.48-6.27-6.86-1.28-10.93l91.68-70.7c3.9-3.02,7.48-1.35,4.68,2.77Z"/>
        </svg>
      </button>
  
      <!-- Chat Window -->
      <div 
        v-if="isOpen" 
        class="fixed bottom-24 right-8 w-96 bg-white shadow-xl rounded-lg flex flex-col"
      >
        <!-- Header -->
        <div class="flex justify-between items-center px-4 py-2 border-b">
          <h3 class="text-lg font-bold">Telegram Support</h3>
          <button @click="toggleChat" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        
        <!-- Message List -->
        <div class="flex-1 p-4 overflow-y-auto">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="mb-2"
          >
            <div :class="msg.sender === 'client' ? 'text-left' : 'text-right'">
              <span 
                :class="[
                  'inline-block rounded px-3 py-1',
                  msg.sender === 'client' ? 'bg-gray-200' : 'bg-blue-200'
                ]"
              >
                {{ msg.text }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Input -->
        <div class="p-4 border-t">
          <input
            v-model="newMessage"
            @keyup.enter="sendMessage"
            placeholder="Type your message..."
            class="w-full border rounded px-3 py-2 focus:outline-none"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  //import io from 'socket.io-client'
  
  const isOpen = ref(false)
  const messages = ref([])
  const newMessage = ref('')
  let socket
  
  const toggleChat = () => {
    isOpen.value = !isOpen.value
  }
  
  const sendMessage = () => {
    if (!newMessage.value.trim()) return
  
    const messageData = { sender: 'client', text: newMessage.value }
    // Send the message to the backend
    socket.emit('send-message', messageData)
    // Display it immediately
    messages.value.push(messageData)
    newMessage.value = ''
  }
  
  onMounted(() => {
    // Replace with your backend URL
    //socket = io('https://your-backend-server.com')
    // Listen for incoming messages from Telegram (via backend)
    // socket.on('receive-message', (msg) => {
    //   messages.value.push(msg)
    // })
  })
  </script>
  
  <style scoped>
  /* You can add additional styling here if needed */
  </style>
  