<template>
  <nav class="bg-orange-400 border-gray-200 py-2.5 dark:bg-gray-900 sticky z-50">
    <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
      <a
        href="#"
        class="flex items-center"
      >
        <img
          src="/public/assets/images/logo.png"
          class="h-6 mr-3 sm:h-9"
          alt="Landwind Logo"
        />
      </a>

      <div class="flex items-center lg:order-2">
        <div class="hidden mt-2 mr-4 sm:inline-block">
          <span></span>
        </div>

        <button
          v-if="!isAuthenticated"
          @click="goToLogin"
          class="text-orange-700 bg-white hover:bg-gray-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
        >
          Đăng nhập
        </button>

        <button
          v-if="isAuthenticated"
          @click="logout"
          class="text-orange-700 bg-white hover:bg-gray-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
        >
          Đăng xuất
        </button>

        <button
          type="button"
          class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          :aria-expanded="isMenuOpen.toString()"
          @click="toggleMenu"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            v-if="!isMenuOpen"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>

          <svg
            v-if="isMenuOpen"
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div
        :class="{ block: isMenuOpen, hidden: !isMenuOpen }"
        class="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
      >
        <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          <li>
            <router-link to="/">
              <a
                href="#"
                class="block py-2 pl-3 pr-4 px-5 text-white rounded lg:text-white dark:text-white text-lg hover:text-blue-800 transition duration-300"
                aria-current="page"
                >Trang chủ</a
              >
            </router-link>
          </li>
          <li>
            <router-link to="/postcooking">
              <a
                href="#"
                class="block py-2 pl-3 pr-4 px-5 text-white rounded lg:text-white dark:text-white text-lg hover:text-blue-800 transition duration-300"
                >Công thức món ăn</a
              >
            </router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/post">
              <a
                href="#"
                class="block py-2 pl-3 pr-4 px-5 text-white rounded lg:text-white dark:text-white text-lg hover:text-blue-800 transition duration-300"
                >Đăng bài</a
              >
            </router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/profile">
              <a
                href="#"
                class="block py-2 pl-3 pr-4 px-5 text-white rounded lg:text-white dark:text-white text-lg hover:text-blue-800 transition duration-300"
                >Trang cá nhân</a
              >
            </router-link>
          </li>
          <li>
            <router-link to="/about">
              <a
                href="#"
                class="block py-2 pl-3 pr-4 px-5 text-white rounded lg:text-white dark:text-white text-lg hover:text-blue-800 transition duration-300"
                >Giới thiệu</a
              >
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()

    const isMenuOpen = ref(false)

    const isAuthenticated = ref(false)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    onMounted(() => {
      const token = localStorage.getItem('access_token')
      isAuthenticated.value = !!token
    })

    const logout = () => {
      localStorage.removeItem('access_token')
      router.push('/login')
    }

    const goToLogin = () => {
      router.push('/login')
    }

    return {
      isMenuOpen,
      toggleMenu,
      isAuthenticated,
      logout,
      goToLogin,
    }
  },
}
</script>

<style scoped></style>
