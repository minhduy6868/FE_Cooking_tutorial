<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded shadow-md w-96 relative">
      <!-- Close button -->
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        @click="closePoll"
      >
        ✕
      </button>

      <!-- Title -->
      <h2 class="text-xl font-bold mb-4">Kiểu món ăn mà bạn yêu thích là gì?</h2>
      <form
        class="space-y-4"
        @submit.prevent="handleVote"
      >
        <h3 class="text-lg font-semibold">Chọn một trong các loại sau:</h3>

        <!-- Options -->
        <label
          v-for="option in options"
          :key="option"
          class="flex items-center"
        >
          <input
            v-model="selectedVote"
            type="radio"
            name="vote"
            :value="option"
            class="mr-2"
          />
          {{ option }}
        </label>

        <!-- Submit button -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          :disabled="isLoading || !isConnected"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Vote</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Client } from '@stomp/stompjs'

// Assign WebSocket to the window object if running in a browser environment
if (typeof window !== 'undefined') {
  Object.assign(window, { WebSocket });
}

// Declare emit function to emit events
const emit = defineEmits<{
  (event: 'close'): void
}>()

// List of options
const options = ['Món ăn chính', 'Ăn kèm', 'Tráng miệng', 'Ăn nhẹ', 'Đồ uống', 'Ăn vặt', 'Khác']

// State variables
const selectedVote = ref<string | null>(null)
const isLoading = ref(false)
const isConnected = ref(false) // Track WebSocket connection status
const stompClient = ref<Client | null>(null)

// Connect to WebSocket
const connectWebSocket = () => {
  console.log('Opening Web Socket...')
  if (stompClient.value && stompClient.value.connected) return

  const client = new Client({
    brokerURL: 'ws://localhost:8080/ws', // Địa chỉ WebSocket đúng
    webSocketFactory: () => new WebSocket('ws://localhost:8080/ws'), // Đảm bảo sử dụng ws://
    debug: (str) => console.log(str),
    onConnect: () => {
      console.log('WebSocket connected')
      stompClient.value = client
      isConnected.value = true
    },
    onWebSocketClose: () => {
      console.warn('WebSocket disconnected. Attempting to reconnect...')
      isConnected.value = false
      setTimeout(() => connectWebSocket(), 5000)
    },
    onStompError: (error) => {
      console.error('STOMP error:', error)
    },
  })

  client.activate()
}

// Handle component mount/unmount
onMounted(() => {
  connectWebSocket()
})

onUnmounted(() => {
  if (stompClient.value) {
    stompClient.value.deactivate()
    console.log('WebSocket disconnected')
  }
})

// Handle vote submission
const handleVote = async () => {
  if (!selectedVote.value) {
    console.error('Error: Please select an option to vote.')
    return
  }

  console.log('Checking stompClient and selected vote:', stompClient.value, selectedVote.value)

  // Ensure WebSocket client is initialized and connected
  if (!stompClient.value || !stompClient.value.connected) {
    console.error('Error: WebSocket connection not established. Please try again later.')
    return
  }

  isLoading.value = true

  try {
    stompClient.value.publish({
      destination: '/app/vote',
      body: JSON.stringify({ choice: selectedVote.value }),
    })

    console.log('Success: Thank you for your vote!')
    selectedVote.value = null
    closePoll()
  } catch (error) {
    console.error('Error: Failed to send your vote. Please try again.', error)
  } finally {
    isLoading.value = false
  }
}

// Close the poll
const closePoll = () => {
  emit('close') // Emit close event to parent component
}
</script>

<style scoped>
/* Style for the poll component */
</style>
