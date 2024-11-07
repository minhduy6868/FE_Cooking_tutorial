<template>
  <div
    id="chat-container"
    class="fixed bottom-6 right-6 z-50"
  >
    <!-- Chat Icon Button -->
        <button
          v-if="!isChatVisible"
              class="group text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center w-14 h-14 relative"
               @click="toggleChat"
        >
          <img src="@/assets/img/6.png" alt="Chat Icon" class="chat" />
  
          <!-- Tooltip -->
        <span class="tooltip absolute right-full mr-3 px-4 py-2 text-sm text-white bg-black bg-opacity-80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
             AI hỗ trợ
         </span>
        </button>



    <!-- Chat Window -->
    <div
      v-if="isChatVisible"
      id="chat-window"
      class="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl transition-all duration-300"
      role="dialog"
      aria-labelledby="chat-title"
    >
      <!-- Chat Header -->
      <div
        class="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg"
      >
        <h2
          id="chat-title"
          class="font-semibold flex items-center"
        >
          <i class="fas fa-robot mr-2"></i> Chat with AI Assistant
        </h2>
        <button
          class="text-white hover:text-gray-200 transition-colors"
          aria-label="Close chat"
          @click="closeChat"
        >
          <h2>Tắt</h2>
        </button>
      </div>

      <!-- Chat Messages -->
      <div
        id="messages"
        ref="messagesContainer"
        class="p-4 h-96 overflow-y-auto space-y-4"
      >
        <div class="flex items-start">
          <div class="bg-blue-100 rounded-lg p-3 max-w-[80%]">
            <p class="text-gray-800">Hello! How can I help you today?</p>
          </div>
        </div>
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.sender === 'user' ? 'justify-end' : ''"
          class="flex items-start"
        >
        <div :class="msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-gray-800'"
     class="rounded-lg p-3 max-w-[80%]">

            <p>{{ msg.text }}</p>
          </div>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div
        v-if="isTyping"
        class="px-4 py-2"
      >
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style="animation-delay: 0.2s"
          ></div>
          <div
            class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style="animation-delay: 0.4s"
          ></div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="p-4 border-t">
        <form
          class="flex items-center space-x-2"
          @submit.prevent="sendMessage"
        >
          <input
            v-model="userMessage"
            type="text"
            class="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            aria-label="Type your message"
          />
          <button
            type="submit"
            class="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
            aria-label="Send message"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      isChatVisible: false,
      userMessage: '',
      messages: [
        {
          text: 'Hello! How can I help you today?',
          sender: 'ai',
        },
      ],
      isTyping: false,
    }
  },
  methods: {
    toggleChat() {
      this.isChatVisible = !this.isChatVisible
      if (this.isChatVisible) {
        this.$nextTick(() => {
          this.$refs.messageInput.focus()
        })
      }
    },
    closeChat() {
      this.isChatVisible = false
    },
    async sendMessage() {
      const message = this.userMessage.trim()
      if (message) {
        this.addMessage(message, 'user')
        this.userMessage = ''
        this.simulateResponse() // Show typing indicator

        try {
          const response = await this.getBotResponse(message)
          this.addMessage(response, 'ai')
        } catch (error) {
          this.addMessage('Sorry, I could not get a response at the moment.', 'ai')
          console.error('Error fetching from Gemini API:', error)
        }
      }
    },
    addMessage(text, sender) {
      this.messages.push({ text, sender })
      this.$nextTick(() => {
        const messagesContainer = this.$refs.messagesContainer
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      })
    },
    simulateResponse() {
      this.isTyping = true
      setTimeout(() => {
        this.isTyping = false
      }, 2000)
    },
    async getBotResponse(userMessage) {
      const apiUrl =
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
      const apiKey = 'AIzaSyDlUcwhu795awo9PB49kFbhznnMHDea9oI' // Thay bằng API key của bạn

      try {
        // Gửi yêu cầu đến API của Gemini
        const response = await axios.post(
          `${apiUrl}?key=${apiKey}`,
          {
            contents: [
              {
                parts: [{ text: userMessage }],
              },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        // Kiểm tra và lấy nội dung phản hồi từ API Gemini
        const responseText =
          response.data.candidates &&
          response.data.candidates[0] &&
          response.data.candidates[0].content
            ? response.data.candidates[0].content.parts[0].text
            : 'Xin lỗi, tôi không thể trả lời ngay lúc này.'

        // Trả về phản hồi của bot
        return responseText
      } catch (error) {
        console.error('Error fetching response:', error)
        return 'Có lỗi xảy ra khi kết nối với máy chủ. Vui lòng thử lại sau.'
      }
    },
  },
}
</script>

<style scoped>
#chat-window {
  width: 24rem;
}
.tooltip {
  font-size: 1rem; /* Kích thước chữ lớn hơn */
  filter: blur(0px); /* Đảm bảo chữ rõ ràng */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); /* Đổ bóng cho tooltip */
  transform: translateY(10px); /* Hiệu ứng vị trí */
  transition: all 0.3s ease; /* Hiệu ứng mượt khi hover */
}

/* Hiệu ứng cho tooltip khi hover vào button */
.group:hover .tooltip {
  opacity: 1;
  transform: translateY(0); /* Tooltip di chuyển về vị trí bình thường */
}

@media (max-width: 640px) {
  #chat-window {
    width: calc(100vw - 2rem);
    right: 1rem;
  }
}

#chat-container {
  position: fixed;
  bottom: 6rem;
  right: 1.5rem;
  z-index: 50;
}
</style>
