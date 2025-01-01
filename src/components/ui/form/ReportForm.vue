<template>
  <div class="hero from-amber-100 via-rose-300 to-red-500 bg-gradient-to-br py-10 z-99999999">
    <div class="heading mx-auto text-center">
      <h1 class="mx-auto my-5 text-center sm:text-4xl text-3xl font-bold">Báo cáo</h1>
    </div>
    <div
      class="mb-10 form-portion bg-stone-100 sm:w-[80%] w-[90%] mx-auto p-8 rounded-lg shadow-xl"
    >
      <form ref="form" @submit.prevent="handleSubmit">
        <!-- User Info Section -->
        <div class="flex flex-col md:flex-row justify-between gap-6">
          <div class="flex flex-col w-full">
            <label for="full-name" class="text-lg mb-1 font-medium">Họ và Tên:</label>
            <input
              v-model="fullName"
              type="text"
              placeholder="Nhập họ và tên của bạn"
              class="px-4 py-2 rounded-xl w-full"
              required
            />
          </div>
          <div class="flex flex-col w-full">
            <label for="email-id" class="text-lg mb-1 font-medium">Email:</label>
            <input
              v-model="email"
              type="email"
              placeholder="Nhập địa chỉ email"
              class="px-4 py-2 rounded-xl w-full"
              required
            />
          </div>
        </div>

        <!-- Subject Section -->
        <div class="mt-6">
          <label for="subject" class="text-lg font-medium mb-1">Chủ đề:</label>
          <input
            v-model="subject"
            type="text"
            placeholder="Mô tả lỗi"
            class="px-4 py-2 rounded-xl w-full"
            required
          />
        </div>

        <!-- Message Section -->
        <div class="mt-6">
          <label for="message" class="text-lg font-medium mb-1">Nội dung:</label>
          <textarea
            v-model="message"
            rows="6"
            placeholder="Ghi chi tiết về lỗi bạn gặp phải"
            class="px-4 py-2 rounded-xl w-full"
            required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="mt-6 flex justify-center">
          <button
            type="submit"
            :disabled="isLoading"
            class="px-6 py-2 rounded-xl text-lg bg-black text-white hover:text-black hover:bg-white hover:font-bold hover:shadow-xl transition-all"
          >
            <span v-if="isLoading">Đang gửi...</span>
            <span v-else>Gửi Báo Cáo</span>
          </button>
        </div>

        <!-- Response Message -->
        <div v-if="responseMessage" class="mt-5 text-center text-lg text-green-600">
          {{ responseMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import emailjs from '@emailjs/browser'

export default defineComponent({
  data() {
    return {
      fullName: '',
      email: '',
      subject: '',
      message: '',
      responseMessage: '',
      isLoading: false,
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true

      const templateParams = {
        email: this.email,
        message: this.message,
        name: this.fullName,
      }

      try {
        // Send email via EmailJS
        const result = await emailjs.send(
          'service_izzk84f',
          'template_90rxsze',
          templateParams,
          'Di6oFpWW5T8TPr_Et',
        )
        this.responseMessage = 'Cảm ơn bạn! Báo cáo của bạn đã được gửi thành công.'
        this.resetForm()
      } catch (error) {
        console.error('Error sending email:', error)
        this.responseMessage = 'Có lỗi xảy ra khi gửi báo cáo: ' + error.message
      } finally {
        this.isLoading = false
      }
    },
    resetForm() {
      this.fullName = ''
      this.email = ''
      this.subject = ''
      this.message = ''
    },
  },
})
</script>

<style scoped>
.form-portion {
  max-width: 700px; /* Increase form width for better aesthetics */
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

input, textarea {
  border: 1px solid #d1d5db;
  transition: border-color 0.3s ease;
}

input:focus, textarea:focus {
  border-color: #fbbf24; /* Focus color */
}

@media (max-width: 640px) {
  .form-portion {
    padding: 6px; /* Adjust padding on smaller screens */
  }
}
</style>
