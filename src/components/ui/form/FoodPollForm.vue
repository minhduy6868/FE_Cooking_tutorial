<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded shadow-md w-96 relative">
      <button
        class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        @click="closePoll"
      >
        ✕
      </button>
      <h2 class="text-xl font-bold mb-4">What's your favorite type of food?</h2>
      <form
        class="space-y-4"
        @submit.prevent="handleVote"
      >
        <h3 class="text-lg font-semibold">Please select your favorite type of food:</h3>

        <label class="flex items-center">
          <input
            v-model="selectedVote"
            type="radio"
            name="vote"
            value="Món ăn chính"
            class="mr-2"
          />
          Món ăn chính
        </label>
        <label class="flex items-center">
          <input
            v-model="selectedVote"
            type="radio"
            name="vote"
            value="Ăn kèm"
            class="mr-2"
          />
          Ăn kèm
        </label>
        <label class="flex items-center">
          <input
            v-model="selectedVote"
            type="radio"
            name="vote"
            value="Tráng miệng"
            class="mr-2"
          />
          Tráng miệng
        </label>
        <label class="flex items-center">
          <input
            v-model="selectedVote"
            type="radio"
            name="vote"
            value="Ăn nhẹ"
            class="mr-2"
          />
          Ăn nhẹ
        </label>
        <label class="flex items-center">
          <input
            v-model="selectedVote"
            type="radio"
            name="vote"
            value="Đồ uống"
            class="mr-2"
          />
          Đồ uống
        </label>
        <label class="flex items-center">
          <input
            v-model="selectedVote"
            type="radio"
            name="vote"
            value="Ăn vặt"
            class="mr-2"
          />
          Ăn vặt
        </label>
        <label class="flex items-center">
          <input
            v-model="selectedVote"
            type="radio"
            name="vote"
            value="Khác"
            class="mr-2"
          />
          Khác
        </label>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          :disabled="isLoading"
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
import toast from 'tailwind-toast'

const selectedVote = ref<string | null>(null)
const isLoading = ref(false)
const stompClient = ref<Client | null>(null)

// Kết nối WebSocket trực tiếp với Stomp
const connectWebSocket = () => {
  if (stompClient.value && stompClient.value.connected) return

  const client = new Client({
    brokerURL: 'http://localhost:8080/ws', // Thay đổi URL nếu cần
    connectHeaders: {},
    onConnect: () => {
      console.log('WebSocket connected')
      stompClient.value = client
      // Subscribe to the results topic
      client.subscribe('/topic/results', (message) => {
        const data = JSON.parse(message.body)
        console.log('Vote results:', data)
      })
    },
    onWebSocketClose: () => {
      console.warn('WebSocket disconnected. Attempting to reconnect...')
      setTimeout(() => connectWebSocket(), 5000)
    },
    onStompError: (error) => {
      console.error('STOMP error: ', error)
    }
  })

  client.activate()  // Kích hoạt kết nối WebSocket
}

// Khởi tạo WebSocket khi ứng dụng được tải
onMounted(() => {
  connectWebSocket()
})
// Đóng WebSocket khi component bị hủy
onUnmounted(() => {
  if (stompClient.value) {
    stompClient.value.deactivate()  // Đóng kết nối Stomp khi component bị hủy
    console.log('WebSocket disconnected')
  }
})

// Xử lý bỏ phiếu
const handleVote = () => {
  if (!selectedVote.value) {
    showToast('Error', 'Please select an option to vote.', 'error')
    return
  }

  if (!stompClient.value || !stompClient.value.connected) {
    showToast('Error', 'Connection error. Please try again later.', 'error')
    return
  }

  isLoading.value = true

  try {
    stompClient.value.publish({
      destination: '/app/vote',
      body: JSON.stringify({ choice: selectedVote.value }), // Truyền vote đúng kiểu
      headers: {}
    })

    isLoading.value = false
    showToast('Success', 'Thank you for your vote!', 'success')
    selectedVote.value = null // Reset lựa chọn
    closePoll() // Đóng giao diện khảo sát
  } catch (error) {
    isLoading.value = false
    showToast('Error', 'Failed to send your vote. Please try again.', 'error')
  }
}

// Hàm hiển thị thông báo (toast)
const showToast = (title: string, message: string, type: 'success' | 'error' | 'default') => {
  const bgColor =
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-gray-500'

  toast()
    .success(title)
    .with({
      text: message,
      background: bgColor,
    })
    .show()
}

// Đóng Poll và gửi sự kiện cho component cha
const closePoll = () => {
  emit('close') // Đóng PollComponent từ App.vue
}
</script>

<style scoped>
/* Style cho PollComponent */
</style>
