<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { sendOtp } from '@/services/authen' // Đảm bảo import đúng service gửi OTP
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email là bắt buộc'),
  }),
})

const [email, emailAttrs] = defineField('email')
const errorEmail = ref<string | null>(null)

const handleForgot = async (event: Event) => {
  event.preventDefault()

  if (!email.value) {
    errorEmail.value = 'Email không được để trống'
    return
  }

  try {
    // Gọi API gửi OTP
    const response = await sendOtp(email.value)

    if (response.status === 200) {
      // Hiển thị thông báo thành công hoặc chuyển hướng đến trang tiếp theo
      alert('OTP đã được gửi vào email của bạn.')
      // Chuyển hướng đến trang đặt lại mật khẩu
      router.push('/resetpass')
    } else {
      alert('Có lỗi xảy ra khi gửi OTP. Vui lòng thử lại.')
    }
  } catch (error) {
    console.error('Lỗi khi gửi OTP:', error)
    alert('Đã xảy ra lỗi, vui lòng thử lại.')
  }
}
</script>

<template>
  <div class="h-full flex p-8">
    <div class="flex-1 flex justify-center items-center">
      <form
        class="form-shadow p-6 rounded-xl"
        @submit="handleForgot"
      >
        <div class="flex items-center gap-0.5 mb-4">
          <h1 class="text-[344054] text-lg font-semibold mt-3">Quên mật khẩu</h1>
        </div>
        <div>
          <h2 class="mt-1 text-[#667085]">Nhập Email để đặt lại mật khẩu</h2>
        </div>
        <div class="mt-6">
          <div class="form-data">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              placeholder="Nhập email..."
              v-bind="emailAttrs"
              :invalid="errors.email"
              type="email"
              class="h-10 mt-1"
            />
            <ErrorMessage
              class="text-xs mt-0.5"
              :error="errors.email"
            />
          </div>
        </div>
        <Button class="mt-4 w-full h-10"> Gửi OTP </Button>
        <div class="text-end mt-6">
          <RouterLink
            class="text-[#0921D9] text-xs font-semibold"
            to="/login"
          >
           Trở về
          </RouterLink>
        </div>
      </form>
    </div>
    <div class="flex-1 relative max-md:hidden">
      <img
        class="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
        src="@/assets/img/robot.png"
        alt="image"
      />
    </div>
  </div>
</template>

<style scoped>
.form-shadow {
  box-shadow:
    0px 1px 3px 0px rgba(16, 24, 40, 0.1),
    0px 1px 2px 0px rgba(16, 24, 40, 0.06);
}
</style>
