<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router' // Import useRoute để lấy thông tin route
import { getInfoUser } from '@/services/user'
import type { User } from '@/types/user'
import { showToast } from '@/utils/toast'
import CardCooking from '@/components/ui/card/CardCooking.vue'
// Dữ liệu người dùng và bài đăng
const userInfo = ref<User | null>(null)
const posts = ref<any[]>([]) // Danh sách bài đăng (post)

// Sử dụng useRoute để lấy tham số từ route
const route = useRoute()
const userId = route.params.id // Lấy id từ URL (ví dụ: /profile/:id)

// Lấy thông tin người dùng khi component được mount
onMounted(async () => {
  try {
    if (userId) {
      const userData = await getInfoUser(userId) // Sử dụng userId trong API
      userInfo.value = userData.data
      posts.value = userData.data.post || [] // Lưu danh sách bài đăng
    } else {
      showToast({
        title: 'Lỗi',
        description: 'Không có ID người dùng.',
        variant: 'error',
        duration: 3000,
      })
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
    showToast({
      title: 'Lỗi khi lấy thông tin',
      description: 'Vui lòng thử lại sau.',
      variant: 'error',
      duration: 3000,
    })
  }
})
</script>

<template>
  <section class="w-full overflow-hidden dark:bg-gray-900">
    <div class="flex flex-col">
      <!-- Cover Image -->
      <div class="relative w-full">
        <img
          :src="
            userInfo?.profile ||
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080'
          "
          alt="User Cover"
          class="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem] object-cover"
        />

        <!-- Profile Image and Name -->
        <div
          class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <div
            class="w-[141px] h-[141px] rounded-full bg-cover bg-center bg-no-repeat flex justify-center items-end relative"
            :style="{
              backgroundImage: `url(${userInfo?.avatar || 'https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205251_wh1200.png'})`,
            }"
          ></div>
          <h1
            class="mx-5 my-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif text-center"
          >
            {{ userInfo?.fullName || 'Chưa xác định' }}
          </h1>
        </div>
      </div>

      <!-- Description and Details -->
      <div
        class="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-6 items-center my-6 mt-24"
      >
        <p class="text-center w-fit text-gray-700 dark:text-gray-400 text-md">
          {{ userInfo?.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }}
        </p>

        <!-- User Details -->
        <div class="w-full flex sm:flex-row xs:flex-col gap-4">
          <div class="w-full">
            <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div class="flex flex-col pb-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Họ và tên</dt>
                <dd class="text-lg font-semibold">{{ userInfo?.fullName || 'Unknown' }}</dd>
              </div>
              <div class="flex flex-col py-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Số điện thoại</dt>
                <dd class="text-lg font-semibold">
                  {{ userInfo?.phoneNumber || 'Not Provided' }}
                </dd>
              </div>
            </dl>
          </div>
          <div class="w-full">
            <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div class="flex flex-col pb-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                <dd class="text-lg font-semibold">{{ userInfo?.email || 'Not Provided' }}</dd>
              </div>

              <div class="flex flex-col py-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Địa chỉ</dt>
                <dd class="text-lg font-semibold">{{ userInfo?.address || 'Not Provided' }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Recipe Cards Section -->
    <h2
      class="ml-4 mr-4 mx-auto bg-gradient-to-r from-orange-400 to-yellow-300 text-white text-xl font-bold text-center p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
    >
      Danh sách món ăn
    </h2>
    <div class="container px-6 py-6 mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Loop through posts and display each one -->
        <div
          v-for="post in posts"
          :key="post.id"
          class="post-card"
        >
          <!-- Sử dụng CardCooking để hiển thị từng món ăn -->
          <router-link :to="`/post/detail/${post.id}`">
            <CardCooking
                :title="post.title"
                :description="post.description"
                :image="post?.pictures?.[0]?.link || 'https://via.placeholder.com/130'"
                :link="post.linkVideo"
                :category="post.typePost || 'Chưa có thể loại'"
                :time="post.commentPosts || 'Chưa rõ thời gian'"
                :likeCount="post.likeCount"
              />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
