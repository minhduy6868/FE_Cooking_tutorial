<template>
  <div class="grid grid-cols-1 gap-8 p-10 mt-14 lg:grid-cols-2 xl:grid-cols-4">
    <!-- Value card: Số người truy cập -->
    <div class="flex items-center shadow justify-between p-4 bg-white rounded-md">
      <div>
        <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
          Tông số bài viết 
        </h6>
        <span class="text-xl font-semibold">{{ userPostCount?.post || '0' }}</span>
        <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
          +{{ userPostCount?.postChange || '0' }}%
        </span>
      </div>
      <div>
        <span>
          <svg
            class="w-12 h-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
        </span>
      </div>
    </div>

    <!-- Value card: Số người truy cập -->
    <div class="flex items-center shadow justify-between p-4 bg-white rounded-md">
      <div>
        <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
          Số người truy cập
        </h6>
        <span class="text-xl font-semibold">{{ userPostCount?.post || '1993' }}</span>
        <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
          +{{ userPostCount?.postChange || '0' }}%
        </span>
      </div>
      <div>
        <span>
          <svg
            class="w-12 h-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
        </span>
      </div>
    </div>

    <!-- Users card: Tổng số người dùng -->
    <div class="flex items-center shadow justify-between p-4 bg-white rounded-md">
      <div>
        <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
          Tổng số người dùng
        </h6>
        <span class="text-xl font-semibold">{{ userPostCount?.user || '0' }}</span>
        <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
          +{{ userPostCount?.userChange || '0' }}%
        </span>
      </div>
      <div>
        <span>
          <svg
            class="w-12 h-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </span>
      </div>
    </div>

     <!-- Value card: Số người truy cập -->
     <div class="flex items-center shadow justify-between p-4 bg-white rounded-md">
      <div>
        <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
          Tỉ lệ tăng trưởng
        </h6>
        <span class="text-xl font-semibold">20,516</span>
        <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
          +3.1%
        </span>
      </div>
      <div>
        <span>
          <svg
            class="w-12 h-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getUserPostCount } from '@/services/admin' // Đảm bảo rằng hàm này được import đúng

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const userPostCount = ref<{
      user: number
      post: number
      userChange: number
      postChange: number
    } | null>(null)

    // Fetch dữ liệu khi component được mount
    onMounted(async () => {
      try {
        const response = await getUserPostCount() // Gọi API để lấy dữ liệu số người dùng và số bài viết
        if (response.data) {
          // Cập nhật chỉ các giá trị cần thiết
          userPostCount.value = {
            user: response.data.user, // Tổng số người dùng
            post: response.data.post, // Tổng số bài viết
            userChange: 2.6, // Thay đổi % của người dùng
            postChange: 4.4, // Thay đổi % của bài viết
          }
        } else {
          console.error('Không thể lấy dữ liệu')
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    })

    return {
      userPostCount,
    }
  },
})
</script>
