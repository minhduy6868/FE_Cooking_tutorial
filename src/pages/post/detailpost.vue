<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <article class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- Post Image and Title -->
      <div class="relative h-96">
        <img
          :src="post?.pictures?.[0]?.link || 'https://via.placeholder.com/500'"
          alt="Post Image"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div class="p-8">
            <h1 class="text-4xl font-bold text-white mb-4">{{ post?.title || 'No Title' }}</h1>
            <p class="text-gray-200 text-lg">{{ post?.description || 'No description available' }}</p>
          </div>
        </div>
      </div>

      <div class="p-8">
        <!-- Post Video Section -->
        <div class="aspect-w-16 aspect-h-9 mb-8 rounded-xl overflow-hidden">
          <video
            v-if="post?.linkVideo"
            controls
            class="w-full h-full object-cover"
            poster="https://via.placeholder.com/500"
          >
            <source
              :src="post.linkVideo"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <p v-else class="text-center text-gray-500">No video available</p>
        </div>

        <!-- Post Metadata Section -->
        <div class="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 class="text-2xl font-bold mb-4">Thông tin</h2>
            <ul class="space-y-3">
              <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span><strong>Thời gian:</strong> {{ post?.date || 'Chưa có thời gian' }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span><strong>Danh mục:</strong> {{ post?.typePost || 'Chưa có thể loại' }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span><strong>Số lượt thích:</strong> {{ post?.likeCount || 0 }}</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span><strong>Người đăng:</strong> {{ post?.user.fullName || 'Chưa rõ' }}</span>
                <span><strong>ID người đăng:</strong> {{ post?.user.id || 'Chưa rõ' }}</span>
              </li>
            </ul>
          </div>

          <!-- Instructions Section -->
          <div>
            <h2 class="text-2xl font-bold mb-4">Hướng dẫn</h2>
            <ol class="space-y-4">
              <li class="flex space-x-4">
                <span
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center"
                  >1</span
                >
                <p>{{ post?.tutorial || 'Chưa có hướng dẫn' }}</p>
              </li>
            </ol>
          </div>
        </div>

        <!-- Process Gallery -->
        <div class="mt-12">
          <h2 class="text-2xl font-bold mb-6">Hình ảnh quá trình</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              v-for="(image, index) in post?.pictures || []"
              :key="index"
              :src="image.link || 'https://via.placeholder.com/500'"
              alt="Process Image"
              class="rounded-lg hover:opacity-75 transition duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </article>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPostById } from '@/services/post'
import type { Post } from '@/types/post'

export default defineComponent({
  name: 'PostDetail',
  setup() {
    const route = useRoute()
    const post = ref<Post | null>(null)
    const error = ref<string | null>(null)

    // Fetch post details by ID
    const fetchPost = async () => {
      const postId = route.params.id as string // Get post ID from route params
      try {
        const response = await getPostById(postId)
        console.log('API response:', response) // Log the API response for debugging

        if (response.status === 200) {
          post.value = response.data // Assign post data
        } else {
          error.value = 'Không thể lấy thông tin bài viết.'
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        error.value = 'Có lỗi xảy ra khi lấy thông tin bài viết.'
      }
    }

    onMounted(() => {
      fetchPost() // Fetch post data when component is mounted
    })

    return {
      post,
      error,
    }
  },
})
</script>

<style scoped>
/* Custom styles for post detail container */
.post-detail-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1,
h2 {
  font-family: 'Arial', sans-serif;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.aspect-w-16 {
  aspect-ratio: 16 / 9;
}
</style>
