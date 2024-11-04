<template>
  <div class="hero from-amber-100 via-rose-300 to-red-500 bg-gradient-to-br">
    <div class="heading mx-auto text-center">
      <h1 class="mx-auto my-5 text-center sm:text-4xl text-3xl font-bold">Báo cáo?</h1>
    </div>
    <div class=" mb-10 form-portion bg-stone-100 sm:w-[80%] w-[90%] mx-auto p-5 rounded-lg shadow-lg">
      <form @submit.prevent="handleSubmit" ref="form" class="">
        <div class="initials flex md:flex-row flex-col justify-evenly">
          <label for="full-name" class="text-lg md:mb-0 mb-1">Họ và Tên:</label>
          <input v-model="fullName" type="text" placeholder="Nhập họ và tên của bạn" class="md:w-[35%] w-full px-4 py-2 rounded-xl" required />

          <label for="email-id" class="text-lg md:mb-0 mb-1">Email:</label>
          <input v-model="email" type="email" placeholder="Nhập địa chỉ email" class="md:w-[35%] w-full px-4 py-2 rounded-xl" required />
        </div>
        <div class="md:p-5 p-1 sm:mt-1 mt-1">
          <div class="md:mt-1 mt-2">
            <label for="subject" class="text-lg">Chủ đề:</label><br />
            <input v-model="subject" type="text" placeholder="Mô tả lỗi" class="w-full px-4 py-2 mt-1 rounded-xl" required />
          </div>
          <div class="mt-5">
            <label for="message" class="text-lg">Nội dung:</label><br />
            <textarea v-model="message" rows="5" placeholder="Ghi chi tiết về lỗi bạn gặp phải" class="w-full px-4 py-2 rounded-xl" required></textarea>
          </div>
        </div>
        <div class="btn mt-2 w-full flex items-center">
          <button type="submit" :disabled="isLoading" class="px-4 py-2 mx-auto rounded-xl text-lg bg-black text-white hover:text-black hover:bg-white hover:font-bold hover:shadow-xl">
            <span v-if="isLoading">Đang gửi...</span>
            <span v-else>Gửi Báo Cáo</span>
          </button>
        </div>
        <div v-if="responseMessage" class="mt-5 text-center text-lg text-green-600">{{ responseMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import emailjs from '@emailjs/browser';

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
      this.isLoading = true;

      const templateParams = {
        email: this.email,
        message: this.message,
        name: this.fullName,
      };

      try {
        // Gửi email qua EmailJS
        const result = await emailjs.send('service_izzk84f', 'template_90rxsze', templateParams, 'Di6oFpWW5T8TPr_Et');
        this.responseMessage = 'Cảm ơn bạn! Báo cáo của bạn đã được gửi thành công.';
        this.resetForm();
      } catch (error) {
        console.error('Error sending email:', error);
        this.responseMessage = 'Có lỗi xảy ra khi gửi báo cáo: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.fullName = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    },
  },
});
</script>

<style scoped>
.form-portion {
  max-width: 600px; /* Maximum width of the form */
}
</style>
