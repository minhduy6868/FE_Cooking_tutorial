<template>
  <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold">Đăng nhập với quyền quản trị</h1>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <!-- Email Input -->
              <div class="relative">
                <input
                  id="email"
                  v-model="email"
                  autocomplete="off"
                  type="text"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  placeholder="Email address"
                />
                <label
                  for="email"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >Email</label
                >
              </div>

              <div class="relative">
                <input
                  id="password"
                  v-model="password"
                  autocomplete="off"
                  type="password"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  placeholder="Password"
                />
                <label
                  for="password"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >Mật khẩu</label
                >
              </div>

              <div class="relative">
                <button
                  class="bg-orange-400 hover:bg-gray-200 hover:text-orange-600 hover:border-l-green-950 text-white rounded-md px-2 py-1"
                  @click="handleSubmit"
                >
                  Đăng nhập
                </button>
              </div>

              <div
                v-if="errorMessage"
                class="mt-4 text-red-500 text-sm"
              >
                {{ errorMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { loginApi } from '@/services/admin'
import { showToast } from '@/utils/toast'

const email = ref('')
const password = ref('')
const errorMessage = ref<string | null>(null)
const router = useRouter()

const handleSubmit = async () => {
  try {
    if (email.value === 'admin@gmail.com') {
      const response = await loginApi(email.value, password.value)

      if (response && response.authenticated) {
        localStorage.setItem('access_token', response.access_token)

        router.push('/admin')
        showToast({
          title: 'Đăng nhập trang admin thành công!',
          description: 'Chào mừng bạn đã quay trở lại.',
          variant: 'default',
          duration: 5000,
        })
      } else {
        errorMessage.value = 'Thông tin đăng nhập không đúng!'
      }
    } else {
      await Swal.fire({
        title: 'Lỗi',
        text: 'Email không hợp lệ.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  } catch (error) {
    errorMessage.value = 'Đăng nhập không thành công, vui lòng thử lại!'
    console.error(error)
  }
}
</script>

<style scoped></style>
