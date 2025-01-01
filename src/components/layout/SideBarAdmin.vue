<script setup lang="ts">
import SidebarMenu from '@/components/layout/sideBar/SidebarMenu.vue'
import Button from '../ui/button/Button.vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const logout = async () => {
  const { isConfirmed } = await Swal.fire({
    title: 'Bạn có chắc không?',
    text: 'Bạn sẽ bị đăng xuất khỏi tài khoản quản trị của mình.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có, đăng xuất',
    cancelButtonText: 'Hủy',
    reverseButtons: true,
    customClass: {
      popup: 'bg-white shadow-lg rounded-xl',
      title: 'text-xl font-semibold text-gray-800',
      content: 'text-gray-600 text-sm',
      confirmButton: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-2 px-4 rounded hover:from-orange-500 hover:to-orange-700',
      cancelButton: 'bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400',
    },
  })

  if (isConfirmed) {
    localStorage.removeItem('access_token')
    router.push('/')
  }
}
</script>

<template>
  <div class="w-18 py-3 flex flex-col w-[250px] min-w-[250px] border-r p-4 gap-2">
    <p class="font-semibold text-lg mt-5">
      <span>ADMIN</span>
    </p>
    <SidebarMenu />
    <Button
      class="mt-auto"
      @click="logout"
    >
      Thoát khỏi tài khoản admin
    </Button>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  background-color: #f7f7f7;
  color: #344054;
}

.bg-gradient-orange {
  background: linear-gradient(to right, #ff7e5f, #dc5f00); /* Orange gradient */
}

.text-orange {
  color: #d74c29; /* Orange text */
}

button {
  background: linear-gradient(to right, #ff7e5f, #ed6700); /* Adding gradient to button */
  transition: background 0.3s ease;
}

button:hover {
  background: linear-gradient(to right, #ff6a3d, #ff751f); /* Darker gradient on hover */
}
</style>
