<template>
  <div>
    <h2 class="text-3xl font-bold mt-3">Danh sách tất cả bài viết:</h2>
    <div v-if="loading">
      <p>Đang tải...</p>
    </div>
    <div v-else-if="error">
      <p>Đã xảy ra lỗi khi tải bài viết.</p>
    </div>
    <div v-else>
      <p><strong>Tổng số bài viết:</strong> {{ allPosts.length }}</p>

      <!-- Label và Input cho tìm kiếm bài viết theo tiêu đề -->
      <div class="mt-3 flex items-center space-x-2">
        <label
          for="searchQuery"
          class="block text-sm font-medium text-gray-700 w-1/4"
        >
          Tìm kiếm bài viết theo tiêu đề:
        </label>
        <div class="flex w-3/4 space-x-2">
          <input
            id="searchQuery"
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm bài viết..."
            class="border p-2 pr-10 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            class="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white p-2 w-32 rounded-lg transform active:scale-95 transition-transform duration-150"
            @click="searchPostsByTitle"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <!-- Label và Input cho số lượng bài viết có lượt không thích cao -->
      <div class="mt-3 flex items-center space-x-2">
        <label
          for="topDislikeCount"
          class="block text-sm font-medium text-gray-700 w-1/4"
        >
          Tìm số bài viết có lượt không thích cao:
        </label>
        <div class="flex w-3/4 space-x-2">
          <input
            id="topDislikeCount"
            v-model="topDislikeCount"
            type="number"
            placeholder="Nhập số lượng bài viết"
            class="border p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            min="1"
          />
          <button
            class="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white p-2 w-32 rounded-lg transform active:scale-95 transition-transform duration-150"
            @click="fetchTopDislikePosts"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <div v-if="allPosts.length === 0 && !searchQuery">
        <p>Tiêu đề bài viết không tồn tại.</p>
      </div>

      <table
        v-else
        class="min-w-full divide-y divide-gray-200 overflow-x-auto mt-5"
      >
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
              Lượt thích
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Lượt không thích
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Trạng thái
            </th>
            <th class="px-6 py-3 ml-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hành động
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
              <span :class="!post.approved ? 'text-red-500' : 'text-green-500'">
                {{ post.approved ? 'Đã duyệt' : 'Chưa duyệt' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button
                v-if="!post.approved"
                class="text-green-600 hover:text-green-800 mr-4"
                @click="handleAcceptPost(post.id)"
              >
                Duyệt
              </button>
              <button
                class="text-red-600 hover:text-red-800"
                @click="handleDelete(post.id)"
              >
                Xóa bài
              </button>
              <button>
                <router-link
                  :to="`/post/detail/${post.id}`"
                  class="text-gray-600 hover:text-gray-900 ml-4"
                >
                  Chi tiết
                </router-link>
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
import { getAllPost } from '@/services/admin'
import { searchPosts, getTopDislikePost, acceptPost, deletePostByAdmin } from '@/services/post'
import { showToast } from '@/utils/toast'

export default {
  name: 'PostList',
  setup() {
    const allPosts = ref<any[]>([])
    const loading = ref<boolean>(false)
    const error = ref<boolean>(false)
    const searchQuery = ref<string>('')
    const topDislikeCount = ref<number>()

    const fetchAllPosts = async () => {
      loading.value = true
      try {
        const response = await getAllPost()
        if (response.status === 200) {
          allPosts.value = response.data
        } else {
          error.value = true
        }
      } catch (err) {
        console.error('Error fetching all posts:', err)
        error.value = true
      } finally {
        loading.value = false
      }
    }

    const searchPostsByTitle = async () => {
      loading.value = true
      try {
        const response = await searchPosts(searchQuery.value)
        if (response.status === 200) {
          if (response.data.length === 0) {
            await fetchAllPosts()
            error.value = false
          } else {
            allPosts.value = response.data
          }
        } else {
          error.value = true
        }
      } catch (err) {
        console.error('Error searching posts:', err)
        error.value = true
      } finally {
        loading.value = false
      }
    }

    const fetchTopDislikePosts = async () => {
      loading.value = true
      try {
        if (!topDislikeCount.value || topDislikeCount.value <= 0) {
          console.warn('Invalid topDislikeCount value:', topDislikeCount.value)
          throw new Error('Số lượng bài viết không hợp lệ.')
        }

        console.log('Fetching top posts with dislikes, limit:', topDislikeCount.value)
        const response = await getTopDislikePost(topDislikeCount.value)

        if (response?.status === 200) {
          if (response.data.length === 0) {
            showToast({
              title: 'Thông báo!',
              description: 'Không có bài viết nào có lượng không thích cao.',
              variant: 'default',
              duration: 5000,
            })
            allPosts.value = []
            error.value = false
          } else {
            allPosts.value = response.data
          }
        } else {
          console.error('Unexpected response:', response)
          error.value = true
        }
      } catch (err) {
        if (err.response) {
          console.error('Server error:', err.response.status, err.response.data)
        } else if (err.request) {
          console.error('No response received from server:', err.request)
        } else {
          console.error('Error occurred while fetching top dislike posts:', err.message)
        }
        error.value = true
      } finally {
        loading.value = false
      }
    }

    const handleAcceptPost = async (postId: string) => {
      try {
        const response = await acceptPost(postId)
        if (response.status === 200) {
          fetchAllPosts()
          const post = allPosts.value.find((p) => p.id === postId)
          if (post) {
            post.isApproved = true
            showToast({
              title: 'Duyệt bài thành công!',
              description: 'Bài đã được duyệt thành công.',
              variant: 'default',
              duration: 5000,
            })
          }
        } else {
          showToast({
            title: 'Duyệt bài thất bại!',
            description: 'Bài đã được duyệt thất bại.',
            variant: 'default',
            duration: 5000,
          })
        }
      } catch (err) {
        showToast({
          title: 'Đã xảy ra lỗi khi duyệt bài!',
          description: 'Đã xảy ra lỗi. Vui lòng kiểm tra lại.',
          variant: 'default',
          duration: 5000,
        })
        console.error('Error accepting post:', err)
      }
    }

    const handleDelete = async (postId: string) => {
      try {
        const response = await deletePostByAdmin(postId)

        if (response.status === 200) {
          allPosts.value = allPosts.value.filter((post) => post.id !== postId)
          showToast({
            title: 'Xóa bài thành công!',
            description: 'Bài đã được xóa thành công.',
            variant: 'default',
            duration: 5000,
          })
        } else {
          console.error('Failed to delete post:', response.message)
          showToast({
            title: 'Xóa bài thất bại!',
            description: 'Xóa bài thất bại. Vui lòng kiểm tra lại.',
            variant: 'default',
            duration: 5000,
          })
        }
      } catch (err) {
        showToast({
          title: 'Đã xảy ra lỗi khi xóa bài!',
          description: 'Đã xảy ra lỗi. Vui lòng kiểm tra lại.',
          variant: 'default',
          duration: 5000,
        })
        console.error('Error deleting post:', err)
      }
    }

    onMounted(() => {
      fetchAllPosts()
    })

    return {
      allPosts,
      loading,
      error,
      searchQuery,
      topDislikeCount,
      searchPostsByTitle,
      fetchTopDislikePosts,
      handleAcceptPost,
      handleDelete,
    }
  },
}
</script>

<style scoped></style>
