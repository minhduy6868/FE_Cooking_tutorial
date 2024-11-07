<script setup lang="ts">
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { loginApi } from '@/services/auth'
import { apiExceptionHandler } from '@/utils/exceptionHandler'

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email là bắt buộc'),
    password: yup.string().required('Mật khẩu là bắt buộc'),
  }),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    const data = await loginApi(values.email, values.password)
    console.log(data)
    localStorage.setItem('access_token', data.data.token)
    //localStorage.setItem('refresh_token', data.tokens.refresh.token)
    location.reload()
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <div class="h-full flex p-8">
    <div class="flex-1 flex justify-center items-center">
      <form
        class="form-shadow p-6 rounded-xl"
        @submit="onSubmit"
      >
        <div class="flex items-center gap-0.5 mb-4">
          <h1 class="text-[344054] text-lg font-semibold mt-3">Chào Mừng Quay Trở Lại</h1>
        </div>
        <div>
          <h2 class="mt-1 text-[#667085]">Hôm nay là một ngày mới. Đây là ngày của bạn. Bạn là người tạo nên điều đó.</h2>
          <h2 class="mt-1 text-[#667085]">Đăng nhập để bắt đầu quản lý dự án của bạn</h2>
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
          <div class="form-data">
            <Label for="password">Mật khẩu</Label>
            <Input
              id="password"
              v-model="password"
              placeholder="Nhập mật khẩu..."
              v-bind="passwordAttrs"
              :invalid="errors.password"
              type="password"
              class="h-10 mt-1"
            />

            <ErrorMessage
              class="text-xs mt-0.5"
              :error="errors.password"
            />
          </div>
        </div>
        <div class="text-end">
          <RouterLink
            class="text-[#0921D9] text-xs font-semibold"
            to="/password/forgot"
          >
            Quên mật khẩu?
          </RouterLink>
        </div>
        <Button class="mt-6 w-full h-10 bg-orange-600"> Đăng Nhập </Button>
        <div class="flex items-center gap-2 w-full mt-8">
          <span class="h-px bg-slate-200 w-full"></span>
          <p class="text-base">Hoặc</p>
          <span class="h-px bg-slate-200 w-full"></span>
        </div>
        <Button
          class="h-10 mt-8 w-full flex items-center gap-4 bg-zinc-200"
          variant="secondary"
        >
          <img
            class="w-5"
            src="@/assets/img/google-logo.png"
            alt="Google Logo"
          />
          Đăng nhập với Google
        </Button>
        <div class="flex justify-center mt-6">
          <p>Bạn chưa có tài khoản?</p>
          <RouterLink
            class="ml-[6px] text-[#0921D9] font-semibold"
            to="/register"
          >
            Đăng ký
          </RouterLink>
        </div>
      </form>
    </div>
    <div class="flex-1 relative max-md:hidden">
      <img
        class="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
        src="@/assets/img/robot-bg.png"
        alt="Background"
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
