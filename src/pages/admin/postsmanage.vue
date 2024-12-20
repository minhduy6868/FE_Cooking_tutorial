<template>
  <div>
    <!-- Danh sách bài viết hiện có -->
    <h2 class="text-3xl font-bold mt-3">Danh sách tất cả bài viết:</h2>
    <div v-if="loading">
      <p>Đang tải...</p>
    </div>
    <div v-else-if="error">
      <p>Đã xảy ra lỗi khi tải bài viết.</p>
    </div>
    <div v-else>
      <p><strong>Tổng số bài viết:</strong> {{ allPosts.length }}</p>

      <!-- Tìm kiếm bài viết theo tiêu đề -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm bài viết theo tiêu đề"
        class="border p-2 pr-10"
      />
      <button
        class="bg-blue-500 text-white p-2"
        @click="searchPostsByTitle"
      >
        Tìm kiếm
      </button>

      <!-- Tìm kiếm bài viết với dislike nhiều nhất -->
      <input
        v-model="topDislikeCount"
        type="number"
        placeholder="Nhập số lượng bài viết có lượt không thích cao nhất"
        class="border p-2 mt-3 ml-4"
        min="1"
      />
      <button
        class="bg-blue-500 text-white p-2 mt-3"
        @click="fetchTopDislikePosts"
      >
        Tìm kiếm
      </button>

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
            <th
              class="px-6 py-3 ml-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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

export default {
  name: 'PostList',
  setup() {
    const allPosts = ref<any[]>([]) // Danh sách tất cả bài viết
    const loading = ref<boolean>(false)
    const error = ref<boolean>(false)
    const searchQuery = ref<string>('') // Query tìm kiếm bài viết theo tiêu đề
    const topDislikeCount = ref<number>() // Số lượng bài viết có lượt không thích cao nhất

    // Lấy tất cả bài viết
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

    // Tìm kiếm bài viết theo tiêu đề
    const searchPostsByTitle = async () => {
      loading.value = true
      try {
        const response = await searchPosts(searchQuery.value)
        if (response.status === 200) {
          if (response.data.length === 0) {
            // Nếu không tìm thấy bài viết, lấy lại tất cả bài viết
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

    // Hàm lấy bài viết có lượt không thích cao nhất
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
            console.log('No posts found with high dislikes.')
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

    // Hàm duyệt bài
    const handleAcceptPost = async (postId: string) => {
      try {
        const response = await acceptPost(postId)
        if (response.status === 200) {
          fetchAllPosts()
          //const post = allPosts.value.find((p) => p.id === postId)
          if (post) {
            post.isApproved = true
          }
        } else {
          console.error('Failed to accept post:', response.message)
        }
      } catch (err) {
        console.error('Error accepting post:', err)
      }
    }

    // Hàm xóa bài viết
    const handleDelete = async (postId: string) => {
      try {
        // Call the deletePost service to delete the post
        const response = await deletePostByAdmin(postId)

        if (response.status === 200) {
          // If delete was successful, remove the post from the allPosts array
          allPosts.value = allPosts.value.filter((post) => post.id !== postId)
          console.log('Post deleted successfully')
        } else {
          console.error('Failed to delete post:', response.message)
        }
      } catch (err) {
        console.error('Error deleting post:', err)
      }
    }

    // Fetch dữ liệu khi component được mount
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

<style scoped>
/* Style tùy chỉnh */
</style>
