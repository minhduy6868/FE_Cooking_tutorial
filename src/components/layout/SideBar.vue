<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { ref } from 'vue'

// Đặt giá trị khởi tạo là true để menu luôn hiển thị
const menuVisible = ref(true)

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value
}
</script>

<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"
    rel="stylesheet"
  />

  <Menubar
    class="flex flex-col md:flex-row justify-center items-center bg-orange-500 text-white custom-menubar"
  >
    <div class="flex items-center w-full justify-between">
      <img
        src="/public/assets/images/logo.png"
        alt="Logo"
        class="h-10 px-5 logo"
      />

      <div class="md:hidden">
        <!-- Nút menu cho di động -->
        <button
          class="text-white"
          @click="toggleMenu"
        >
          &#9776;
          <!-- Biểu tượng menu -->
        </button>
      </div>
    </div>

    <div
      :class="{ hidden: !menuVisible, flex: menuVisible }"
      class="flex-col md:flex-row w-full md:space-x-5 mt-2 md:mt-0"
    >
      <MenubarMenu>
        <router-link to="/">
          <MenubarTrigger
            class="text px-4 py-2"
            style="font-weight: 600"
            >Home</MenubarTrigger
          >
        </router-link>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger
          class="text px-4 py-2"
          style="font-weight: 600"
          >Menu</MenubarTrigger
        >
        <MenubarContent>
          <MenubarItem>Bữa sáng</MenubarItem>
          <MenubarItem>Món trưa</MenubarItem>
          <MenubarItem>Món tối</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <router-link to="/post">
          <MenubarTrigger
            class="text px-4 py-2"
            style="font-weight: 600"
            >Đăng bài</MenubarTrigger
          >
        </router-link>
      </MenubarMenu>
      <MenubarMenu>
        <router-link to="/about">
          <MenubarTrigger
            class="text px-4 py-2"
            style="font-weight: 600"
            >Giới thiệu</MenubarTrigger
          >
        </router-link>
      </MenubarMenu>
    </div>

    <div class="hidden md:flex items-center mt-2 md:mt-0">
      <router-link to="/login">
        <button
          class="text-white px-20 text py-2 rounded hover:bg-white font-bold whitespace-nowrap"
          style="font-family: 'Roboto', sans-serif"
        >
          Đăng nhập
        </button>
      </router-link>
    </div>
  </Menubar>
</template>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
}
.text {
  font-size: 16px;
}
.bg-orange-500 {
  background-color: rgba(255, 115, 0, 0.952); /* Màu cam */
}

.text-white {
  color: white; /* Màu trắng cho chữ */
}
button.text-white:hover {
  color: rgb(255, 136, 0); /* Đổi màu chữ khi hover */
}

.custom-menubar {
  height: auto; /* Chiều cao tự động */
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column; /* Đặt chiều dọc cho các phần tử bên trong */
    align-items: center; /* Căn giữa các phần tử */
  }

  .space-x-5 {
    margin-bottom: 10px; /* Khoảng cách giữa các item khi ở chế độ di động */
  }

  .hidden {
    display: none; /* Ẩn menu khi không cần thiết */
  }

  .flex-col {
    flex-direction: column; /* Sắp xếp dọc cho menu di động */
    width: 100%; /* Chiều rộng 100% cho menu */
  }

  MenubarMenu {
    width: 100%; /* Đảm bảo menu chiếm toàn bộ chiều rộng */
    text-align: center; /* Căn giữa nội dung */
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

  .flex {
    justify-content: space-between; /* Căn giữa các item trong menu */
  }
  MenubarTrigger {
    align-items: center;
  }
  .logo {
    margin-left: 100px;
  }
}

@media (min-width: 769px) and (max-width: 1055px) {
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

  .flex {
    justify-content: space-evenly; /* Căn giữa các item trong menu với khoảng cách đều */
    align-items: center; /* Căn giữa dọc */
    width: 100%; /* Đảm bảo chiều rộng đầy đủ */
  }

  .text-xl {
    font-size: 0.875rem; /* Kích thước chữ cho menu */
  }

  .px-4 {
    padding-left: 1rem; /* Thêm khoảng cách bên trái */
    padding-right: 1rem; /* Thêm khoảng cách bên phải */
  }
}
</style>
