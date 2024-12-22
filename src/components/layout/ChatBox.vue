<template>
  <div
    id="chat-container"
    class="fixed bottom-6 right-6 z-50"
  >
    <button
      v-if="!isChatVisible"
      class="group text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center w-14 h-14 relative"
      @click="toggleChat"
    >
      <img
        src="@/assets/img/6.png"
        alt="Chat Icon"
        class="chat"
      />

      <span
        class="tooltip absolute right-full mr-3 px-4 py-2 text-sm text-white bg-black bg-opacity-80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
      >
        AI hỗ trợ
      </span>
    </button>

    <div
      v-if="isChatVisible"
      id="chat-window"
      class="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl transition-all duration-300"
      role="dialog"
      aria-labelledby="chat-title"
    >
      <div
        class="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg"
      >
        <h2
          id="chat-title"
          class="font-semibold flex items-center"
        >
          <i class="fas fa-robot mr-2"></i> Hỏi AI
        </h2>
        <button
          class="text-white hover:text-gray-200 transition-colors"
          aria-label="Close chat"
          @click="closeChat"
        >
          <h2>Tắt</h2>
        </button>
      </div>

      <div
        id="messages"
        ref="messagesContainer"
        class="p-4 h-96 overflow-y-auto space-y-4"
      >
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="msg.sender === 'user' ? 'justify-end' : ''"
          class="flex items-start"
        >
          <div
            :class="msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-gray-800'"
            class="rounded-lg p-3 max-w-[80%]"
          >
            <p v-html="msg.text"></p>
          </div>
        </div>
      </div>

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
            >
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'

export default {
  data() {
    return {
      isChatVisible: false,
      userMessage: '',
      messages: [
        {
          text: 'Chào bạn, chúng tôi giúp gì được cho bạn?',
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
        this.simulateResponse()

        try {
          const response = await this.getBotResponse(message)
          this.addMessage(response, 'ai')
        } catch (error) {
          this.addMessage('Sorry, I could not get a response at the moment.', 'ai')
          console.error('Error fetching from Gemini API:', error)
        }
      }
    },
    addMessage(text: string, sender: string) {
      this.messages.push({ text, sender })
      this.$nextTick(() => {
        const messagesContainer = this.$refs.messagesContainer as HTMLElement
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      })
    },
    simulateResponse() {
      this.isTyping = true
      setTimeout(() => {
        this.isTyping = false
      }, 2000)
    },
    async getBotResponse(userMessage: string): Promise<string> {
      if (userMessage.toLowerCase() === 'trang web này làm gì') {
        return 'Web này dạy nấu ăn.'
      }

      if (userMessage.toLowerCase() === 'ai là chủ của trang web này') {
        return 'Minh Duy.'
      }

      if (userMessage.toLowerCase() === 'mục đích của trang web này là gì') {
        return 'Trang web này cung cấp các công thức nấu ăn và hướng dẫn chi tiết để bạn có thể học nấu những món ăn ngon.'
      }

      if (userMessage.toLowerCase() === 'trang web này có những gì') {
        return 'Trang web này có các công thức nấu ăn, video hướng dẫn, và các mẹo nấu ăn hữu ích.'
      }

      if (userMessage.toLowerCase() === 'trang web này dạy gì') {
        return 'Chúng tôi dạy bạn cách nấu các món ăn ngon từ đơn giản đến phức tạp.'
      }

      if (userMessage.toLowerCase() === 'làm sao để học nấu ăn trên trang web này') {
        return 'Bạn chỉ cần tìm công thức nấu ăn mà bạn yêu thích, theo dõi các bước hướng dẫn chi tiết và bắt tay vào nấu ngay.'
      }

      if (userMessage.toLowerCase() === 'có thể học nấu ăn từ đâu trên trang web này') {
        return 'Bạn có thể tìm công thức nấu ăn theo thể loại món ăn, nguyên liệu, hoặc mức độ khó.'
      }

      if (userMessage.toLowerCase() === 'trang web này có công thức nấu ăn miễn phí không') {
        return 'Vâng, tất cả các công thức nấu ăn trên trang web đều miễn phí cho bạn.'
      }

      if (userMessage.toLowerCase() === 'tôi có thể tìm công thức nấu ăn theo nguyên liệu không') {
        return 'Có, bạn có thể tìm công thức dựa trên nguyên liệu bạn có, và chúng tôi sẽ gợi ý những món ăn phù hợp.'
      }

      if (userMessage.toLowerCase() === 'có video hướng dẫn nấu ăn không') {
        return 'Có, chúng tôi cung cấp các video hướng dẫn chi tiết về từng công thức nấu ăn.'
      }

      if (
        userMessage.toLowerCase() === 'trang web có hướng dẫn các món ăn từ các quốc gia khác không'
      ) {
        return 'Đúng vậy, chúng tôi có các công thức nấu ăn từ nhiều quốc gia và nền văn hóa khác nhau.'
      }

      if (userMessage.toLowerCase() === 'làm thế nào để tìm công thức nấu ăn nhanh chóng') {
        return 'Bạn có thể sử dụng chức năng tìm kiếm trên trang chủ để tìm các công thức nấu ăn theo tên món ăn, nguyên liệu, hoặc thể loại.'
      }

      if (userMessage.toLowerCase() === 'ai là người sáng lập trang web này') {
        return 'Trang web này được sáng lập bởi Minh Duy, người đam mê nấu ăn và chia sẻ kiến thức về ẩm thực.'
      }

      if (
        userMessage.toLowerCase() ===
        'trang web này có hướng dẫn nấu ăn cho người mới bắt đầu không'
      ) {
        return 'Vâng, chúng tôi có rất nhiều công thức dễ dàng dành cho người mới bắt đầu. Bạn có thể bắt đầu với các món ăn đơn giản và dần nâng cao kỹ năng.'
      }

      if (userMessage.toLowerCase() === 'tôi có thể tìm công thức nấu ăn theo món ăn không') {
        return 'Đúng vậy, bạn có thể tìm công thức theo loại món ăn như món khai vị, món chính, món tráng miệng, v.v.'
      }

      if (userMessage.toLowerCase() === 'trang web này có giúp tôi nấu món ăn chay không') {
        return 'Chắc chắn! Chúng tôi có rất nhiều công thức nấu ăn chay phù hợp với nhu cầu của bạn.'
      }

      if (
        userMessage.toLowerCase() ===
        'trang web này có cung cấp công thức nấu ăn cho món ăn nhanh không'
      ) {
        return 'Vâng, chúng tôi có các công thức nấu ăn nhanh giúp bạn chuẩn bị bữa ăn trong thời gian ngắn.'
      }

      if (userMessage.toLowerCase() === 'thông tin liên hệ của bạn là gì') {
        return `Bạn có thể liên hệ với chúng tôi qua số điện thoại: 0916 267 402 hoặc qua email: duynm.23it@vku.udn.vn. Địa chỉ của chúng tôi là: 470, Trần Đại Nghĩa, Hòa Vang, Ngũ Hành Sơn, Đà Nẵng.`
      }

      if (userMessage.toLowerCase() === 'số điện thoại của bạn là gì') {
        return 'Số điện thoại của chúng tôi là 0916 267 402.'
      }

      if (userMessage.toLowerCase() === 'email của bạn là gì') {
        return 'Email của chúng tôi là duynm.23it@vku.udn.vn.'
      }

      if (userMessage.toLowerCase() === 'địa chỉ của bạn là đâu') {
        return 'Địa chỉ của chúng tôi là 470, Trần Đại Nghĩa, Hòa Vang, Ngũ Hành Sơn, Đà Nẵng.'
      }

      const apiUrl =
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
      const apiKey = 'AIzaSyDlUcwhu795awo9PB49kFbhznnMHDea9oI'

      try {
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

        const responseText =
          response.data.candidates &&
          response.data.candidates[0] &&
          response.data.candidates[0].content
            ? response.data.candidates[0].content.parts[0].text
            : 'Xin lỗi, tôi không thể trả lời ngay lúc này.'

        // Định dạng văn bản trả về
        return this.formatBotResponse(responseText)
      } catch (error) {
        console.error('Error fetching response:', error)
        return 'Có lỗi xảy ra khi kết nối với máy chủ. Vui lòng thử lại sau.'
      }
    },
    formatBotResponse(responseText: string): string {
      // Thêm HTML cho phản hồi
      const formattedText: string = responseText
        .replace(/\*([^*]+)\*/g, '<b>$1</b>')
        .replace(/\n/g, '<br>')
        .replace(/^\s*\*\s+/gm, '<ul><li>')
        .replace(/\*+$/, '</li></ul>')

      return formattedText
    },
  },
}
</script>

<style scoped>
#chat-window {
  width: 24rem;
}
.tooltip {
  font-size: 1rem;
  filter: blur(0px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.group:hover .tooltip {
  opacity: 1;
  transform: translateY(0);
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
