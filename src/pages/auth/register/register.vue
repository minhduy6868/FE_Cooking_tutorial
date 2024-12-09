<script setup lang="ts">
import { Input } from '@/components/ui/input'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { registerApi } from '@/services/authen'
import { apiExceptionHandler } from '@/utils/exceptionHandler'
import { useRouter } from 'vue-router'

const { errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    fullName: yup.string().required('Tên là bắt buộc'),
    email: yup.string().email().required('Email là bắt buộc'),
    password: yup.string().required('Mật khẩu là bắt buộc'),
  }),
})

const [fullName, fullNameAttrs] = defineField('fullName')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const router = useRouter()

const onSubmit = handleSubmit(async (values) => {
  try {
    const data = await registerApi({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    })
    console.log(data)
    router.push({ name: 'login' })
    notify.success('Đăng ký thành công')
  } catch (error) {
    notify.error(apiExceptionHandler(error).message)
  }
})
</script>

<template>
  <div class="h-full flex p-8">
    <div class="flex-1 flex justify-center items-center">
      <form class="form-shadow p-6 rounded-xl" @submit="onSubmit">
        <div class="flex items-center gap-0.5 mb-4">
          <h1 class="text-[344054] text-lg font-semibold">Đăng ký tài khoản</h1>
        </div>
        <div>
          <h2 class="mt-1 text-[#667085]">Hôm nay là một ngày mới. Đây là ngày của bạn. Bạn là người tạo nên điều đó.</h2>
          <h2 class="mt-1 text-[#667085]">Đăng nhập để bắt đầu quản lý dự án của bạn</h2>
        </div>
        <div class="mt-6">
          <!-- Tên -->
          <div class="form-data">
            <Label for="fullName">Tên</Label>
            <Input
              v-model="fullName"
              placeholder="Nhập tên..."
              v-bind="fullNameAttrs"
              :invalid="errors.fullName"
              type="text"
              class="h-10 mt-1"
            />
            <ErrorMessage :error="errors.fullName" />
          </div>

          <!-- Email -->
          <div class="form-data">
            <Label for="email">Email</Label>
            <Input
              v-model="email"
              placeholder="Nhập email..."
              v-bind="emailAttrs"
              :invalid="errors.email"
              type="email"
              class="h-10 mt-1"
            />
            <ErrorMessage :error="errors.email" />
          </div>

          <!-- Password -->
          <div class="form-data">
            <Label for="password">Mật khẩu</Label>
            <Input
              v-model="password"
              placeholder="Nhập mật khẩu..."
              v-bind="passwordAttrs"
              :invalid="errors.password"
              type="password"
              class="h-10 mt-1"
            />
            <ErrorMessage :error="errors.password" />
          </div>
        </div>

        <!-- Đăng ký -->
        <Button class="mt-6 w-full h-10 bg-orange-600">Đăng Ký</Button>

        <!-- Hoặc Đăng nhập bằng Google -->
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
            alt=""
          />
          Đăng nhập với Google
        </Button>

        <!-- Chuyển hướng đăng nhập -->
        <div class="flex justify-center mt-6">
          <p>Bạn đã có tài khoản?</p>
          <RouterLink
            class="ml-[6px] text-[#0921D9] font-semibold"
            to="/login"
          >
            Đăng nhập
          </RouterLink>
        </div>
      </form>
    </div>

    <!-- Hình nền -->
    <div class="flex-1 relative max-md:hidden">
      <img
        class="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
        src="/src/assets/img/robot-bg.png"
        alt=""
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
