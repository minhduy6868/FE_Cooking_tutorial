<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { updatePasswordApi } from '@/services/authen'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { useRouter } from 'vue-router'
import { showToast } from '@/utils/toast'

const router = useRouter()

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email là bắt buộc và đúng email đã gửi OTP trước đó'),
    otp: yup.string().length(6, 'OTP phải có 6 chữ số').required('OTP là bắt buộc'),
    newPassword: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu mới là bắt buộc'),
  }),
})

const [email, emailAttrs] = defineField('email')
const [otp, otpAttrs] = defineField('otp')
const [newPassword, newPasswordAttrs] = defineField('newPassword')

const errorEmail = ref<string | null>(null)
const errorOtp = ref<string | null>(null)
const errorNewPassword = ref<string | null>(null)

const handleResetPassword = handleSubmit(async (values) => {
  try {
    const response = await updatePasswordApi({
      email: values.email,
      otp: values.otp,
      newPassword: values.newPassword,
    })

    if (response.status === 200) {
      showToast({
        title: 'Cập nhật thành công!',
        description: 'Mật khẩu của bạn đã được cập nhật thành công.',
        variant: 'default',
        duration: 5000,
      })
      router.push('/login')
    } else {
      showToast({
        title: 'Cập nhật thất bại!',
        description: 'Cập nhật mật khẩu thất bại. Vui lòng thử lại.',
        variant: 'default',
        duration: 5000,
      })
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật mật khẩu:', error)
    showToast({
      title: 'Đã có lỗi xảy ra!',
      description: 'Có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng thử lại.',
      variant: 'default',
      duration: 5000,
    })
  }
})
</script>

<template>
  <div class="h-full flex p-8">
    <div class="flex-1 flex justify-center items-center">
      <form
        class="form-shadow p-6 rounded-xl"
        @submit="handleResetPassword"
      >
        <div class="flex items-center gap-0.5 mb-4">
          <h1 class="text-[344054] text-lg font-semibold mt-3">Đặt lại mật khẩu</h1>
        </div>
        <div>
          <h2 class="mt-1 text-[#667085]">Nhập thông tin để đặt lại mật khẩu</h2>
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
          <div class="form-data mt-4">
            <Label for="otp">OTP</Label>
            <Input
              id="otp"
              v-model="otp"
              placeholder="Nhập mã OTP..."
              v-bind="otpAttrs"
              :invalid="errors.otp"
              class="h-10 mt-1"
            />
            <ErrorMessage
              class="text-xs mt-0.5"
              :error="errors.otp"
            />
          </div>
          <div class="form-data mt-4">
            <Label for="newPassword">Mật khẩu mới</Label>
            <Input
              id="newPassword"
              v-model="newPassword"
              placeholder="Nhập mật khẩu mới..."
              v-bind="newPasswordAttrs"
              :invalid="errors.newPassword"
              type="password"
              class="h-10 mt-1"
            />
            <ErrorMessage
              class="text-xs mt-0.5"
              :error="errors.newPassword"
            />
          </div>
        </div>
        <Button class="mt-4 w-full h-10"> Đặt lại mật khẩu </Button>
        <div class="text-end mt-6">
          <RouterLink
            class="text-[#0921D9] text-xs font-semibold"
            to="/login"
          >
            Trở về đăng nhập
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
