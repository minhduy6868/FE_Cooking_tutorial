<template>
  <div>
    <!-- Bảng bài viết có nhiều dislike nhất -->
    <h2 class="text-3xl font-bold">Top bài viết có nhiều dislike nhất:</h2>
    <input
      v-model="limit"
      type="number"
      placeholder="Nhập số lượng bài viết"
      class="border p-2"
    />
    <button
      class="bg-blue-500 text-white p-2"
      @click="fetchTopDislikePosts"
    >
      Tìm kiếm
    </button>

    <!-- Bảng hiển thị bài viết có dislike cao nhất -->
    <table class="min-w-full divide-y divide-gray-200 overflow-x-auto mt-5">
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Tiêu đề
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Nhà chia sẻ
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Thể loại
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Số lượng thích
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Số lượng không thích
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="post in topDislikePosts"
          :key="post.id"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ post.title }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ post.user.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ post.typePost }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ post.likeCount }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ post.dislikeCount }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button
              class="text-red-600 hover:text-red-800"
              @click="handleDelete(post.id)"
            >
              Delete
            </button>
            <button
              class="text-gray-600 hover:text-gray-900"
              @click="handleDetails(post.id)"
            >
              Chi tiết
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Loading state -->
    <div
      v-if="loading"
      class="mb-10"
    >
      <p>Đang tải...</p>
    </div>

    <!-- Error state -->
    <div
      v-if="error"
      class="mb-10"
    >
      <p class="text-red-500">{{ errorMessage }}</p>
    </div>

    <!-- Danh sách bài viết hiện có -->
    <h2 class="text-3xl font-bold mt-10">Danh sách tất cả bài viết:</h2>
    <div v-if="!loading && !error">
      <p><strong>Tổng số bài viết:</strong> {{ allPosts.length }}</p>

      <input
      v-model="ff"
      type="number"
      placeholder="Tìm kiếm công thức nấu ăn theo tiêu đề"
      class="border p-2"
    />
    <button
      class="bg-blue-500 text-white p-2"
      @click="fetchTopDislikePosts"
    >
      Tìm kiếm
    </button>
      <table class="min-w-full divide-y divide-gray-200 overflow-x-auto mt-5">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tiêu đề
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nhà chia sẻ
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Thể loại
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Số lượng thích
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Số lượng không thích
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="post in allPosts"
            :key="post.id"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ post.title }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ post.user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ post.typePost }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ post.likeCount }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ post.dislikeCount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button
                class="text-red-600 hover:text-red-800"
                @click="handleDelete(post.id)"
              >
                Delete
              </button>
              <button
                class="text-gray-600 hover:text-gray-900 ml-10 "
                @click="handleDetails(post.id)"
              >
                Chi tiết
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import { getTopDislikePost, getAllPost } from '@/services/admin'

export default {
  name: 'PostList',
  setup() {
    const topDislikePosts = ref<any[]>([]) // Danh sách bài viết dislike cao nhất
    const allPosts = ref<any[]>([]) // Danh sách tất cả bài viết
    const loading = ref<boolean>(false)
    const error = ref<boolean>(false)
    const errorMessage = ref<string>('')
    const limit = ref<number>(0)

    // Lấy bài viết dislike cao nhất
    const fetchTopDislikePosts = async () => {
      loading.value = true
      try {
        const response = await getTopDislikePost(limit.value)
        if (response.status === 200) {
          topDislikePosts.value = response.data
        } else {
          error.value = true
          errorMessage.value = 'Không thể lấy dữ liệu bài viết.'
        }
      } catch (err) {
        error.value = true
        errorMessage.value = 'Có lỗi xảy ra khi lấy dữ liệu bài viết.'
      } finally {
        loading.value = false
      }
    }

    // Lấy tất cả bài viết
    const fetchAllPosts = async () => {
      loading.value = true
      try {
        const response = await getAllPost()
        if (response.status === 200) {
          allPosts.value = response.data
        } else {
          error.value = true
          errorMessage.value = 'Không thể lấy dữ liệu bài viết.'
        }
      } catch (err) {
        error.value = true
        errorMessage.value = 'Có lỗi xảy ra khi lấy dữ liệu bài viết.'
      } finally {
        loading.value = false
      }
    }

    // Hàm xóa bài viết
    const handleDelete = (postId: string) => {
      console.log('Xóa bài viết với ID:', postId)
      // Thực hiện gọi API xóa bài viết ở đây
    }

    // Hàm chi tiết bài viết
    const handleDetails = (postId: string) => {
      console.log('Chi tiết bài viết với ID:', postId)
    }

    // Fetch dữ liệu khi component được mount
    onMounted(() => {
      fetchAllPosts()
    })

    return {
      topDislikePosts,
      allPosts,
      loading,
      error,
      errorMessage,
      limit,
      fetchTopDislikePosts,
      handleDelete,
      handleDetails,
    }
  },
}
</script>

<style scoped>
/* Style tùy chỉnh */
</style>
