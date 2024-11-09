<script setup lang="ts">
import SidebarMenu from '@/components/layout/sideBar/SidebarMenu.vue'
import Button from '../ui/button/Button.vue'
import { useRouter } from 'vue-router'  // Import useRouter để chuyển hướng sau khi logout
import Swal from 'sweetalert2'  // Import SweetAlert2

const router = useRouter()

// Hàm đăng xuất sử dụng SweetAlert2
const logout = async () => {
  // Hiển thị thông báo xác nhận trước khi đăng xuất
  const { isConfirmed } = await Swal.fire({
    title: 'Are you sure?',
    text: "You will be logged out from your admin account.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, log out',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
    customClass: {
      popup: 'bg-white shadow-lg rounded-xl',  // Tùy chỉnh giao diện popup
      title: 'text-xl font-semibold text-gray-800',  // Tùy chỉnh tiêu đề
      content: 'text-gray-600 text-sm',  // Tùy chỉnh nội dung
      confirmButton: 'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',  // Nút "Xác nhận"
      cancelButton: 'bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400',  // Nút "Hủy"
    },
  })

  if (isConfirmed) {
    // Nếu người dùng xác nhận, xóa token và chuyển hướng
    localStorage.removeItem('authToken')  // Xóa token
    router.push('/')  // Chuyển hướng về trang chủ
  }
}
</script>

<template>
  <div class="w-18 py-3 flex flex-col w-[250px] min-w-[250px] border-r p-4 gap-2">
    <p class="font-semibold text-lg mt-5">
      <span>ADMIN</span>
    </p>
    <SidebarMenu />
    <Button class="mt-auto" @click="logout">
      Log out Admin account
    </Button>
  </div>
</template>

<style>
.router-link-exact-active {
  background-color: #f7f7f7;
  color: #344054;
}
</style>
