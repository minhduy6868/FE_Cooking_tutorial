<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { ref } from 'vue';

const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};
</script>

<template>
  <Menubar class="flex flex-col md:flex-row justify-center items-center bg-orange-500 text-white custom-menubar">
    <div class="flex items-center w-full justify-between"> 
      <img src="/public/assets/images/logo.png" alt="Logo" class="h-10 mx-4" />
      <div class="md:hidden"> <!-- Nút menu cho di động -->
        <button @click="toggleMenu" class="text-white">
          &#9776; <!-- Biểu tượng menu -->
        </button>
      </div>
    </div>

    <div :class="{'hidden': !menuVisible, 'flex': menuVisible}" class="flex-col md:flex-row w-full md:space-x-5 mt-2 md:mt-0">
      <MenubarMenu>
       <router-link to="/">
        <MenubarTrigger class="text-l px-4">Home</MenubarTrigger>
       </router-link>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger class="text-l px-4">Menu</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Bữa sáng</MenubarItem>
          <MenubarItem>Món trưa</MenubarItem>
          <MenubarItem>Món trưa</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger class="text-l px-4">Đăng bài</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <router-link to="/about">
          <MenubarTrigger class="text-l px-4">Giới thiệu</MenubarTrigger>
        </router-link>
      </MenubarMenu>
    </div>

    <!-- Remove the action button on larger screens -->
    <div class="hidden md:flex items-center mt-2 md:mt-0">
      <router-link to="/quiz">
        <button class="text-white px-10 py-2 rounded hover:bg-white font-bold whitespace-nowrap">
          Đăng nhập
        </button>
      </router-link>
    </div>
  </Menubar>
</template>

<style scoped>
.bg-orange-500 {
  background-color: orange; /* Màu cam */
}

.text-white {
  color: white; /* Màu trắng cho chữ */
}
button.text-white:hover{
  color: orange;
}

.custom-menubar {
  height: auto; /* Chiều cao tự động */
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column; /* Đặt chiều dọc cho các phần tử bên trong */
  }

  .space-x-5 {
    margin-bottom: 10px; /* Khoảng cách giữa các item khi ở chế độ di động */
  }

  .hidden {
    display: none; /* Ẩn menu khi không cần thiết */
  }
}

@media (min-width: 769px) {
  .flex-col {
    flex-direction: row; /* Sắp xếp ngang cho màn hình lớn */
  }

  .md\:hidden {
    display: block !important; /* Hiển thị menu trên màn hình lớn */
  }

  .md\:mt-0 {
    margin-top: 0 !important; /* Xóa khoảng cách trên cho màn hình lớn */
  }

  .md\:flex {
    display: flex !important; /* Hiển thị nút đăng nhập trên màn hình lớn */
  }
}
</style>
