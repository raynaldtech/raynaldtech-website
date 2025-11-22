<template>
    <div>
      <!-- Floating Chat Button -->
      <button 
        class="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
        @click="toggleChat"
      >
        <!-- Chat Icon -->
        <ChatBubbleLeftRightIcon class="w-8 h-8" />
      </button>
  
      <!-- Chat Window -->
      <div v-if="isOpen" class="fixed bottom-24 right-8 w-96 bg-white shadow-xl rounded-lg flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center px-4 py-2 border-b">
          <h3 class="text-lg font-bold">WhatsApp Support</h3>
          <button @click="toggleChat" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        
        <!-- Message List -->
        <div class="flex-1 p-4 overflow-y-auto">
          <div v-for="(msg, index) in messages" :key="index" class="mb-2">
            <div :class="msg.sender === 'client' ? 'text-left' : 'text-right'">
              <span :class="['inline-block rounded px-3 py-1', msg.sender === 'client' ? 'bg-gray-200' : 'bg-green-200']">
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
  import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
  
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
    // Emit the message to the backend
    socket.emit('send-message', messageData)
    // Display the message locally
    messages.value.push(messageData)
    newMessage.value = ''
  }
  
  onMounted(() => {
    // Connect to your backend that bridges WhatsApp
    //socket = io('https://your-backend-server.com') // Replace with your backend URL
  
    // Listen for messages coming from WhatsApp (via backend)
    //socket.on('receive-message', (msg) => {
      //messages.value.push(msg)
    //})
  })
  </script>
  
  <style scoped>
  /* Additional custom styling if needed */
  </style>
  