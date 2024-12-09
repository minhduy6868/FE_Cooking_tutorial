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
            <p class="text-gray-200 text-lg">
              {{ post?.description || 'No description available' }}
            </p>
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
            poster="/public/assets/videobgr.png"
          >
            <source
              :src="post.linkVideo"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <p
            v-else
            class="text-center text-gray-500"
          >
            No video available
          </p>
        </div>

        <!-- Post Metadata Section -->
        <div class="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 class="text-2xl font-bold mb-4">Thông tin</h2>
            <ul class="space-y-3">
              <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span><strong>Món ăn:</strong> {{ post?.title || 'Chưa rõ' }}</span>
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
                <span><strong>Số lượt không thích:</strong> {{ post?.dislikeCount || 0 }}</span>
              </li>
              <router-link :to="`/profile/${post?.user.id}`">
                <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span><strong>Người đăng:</strong> {{ post?.user.fullName || 'Chưa rõ' }}</span>
              </li>
              </router-link>
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

        <!-- Like and Dislike Buttons -->
        <div class="flex items-center space-x-4 mt-8">
          <button
            class="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            @click="handleLike"
          >
            👍 Like 
          </button>
          <button
            class="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            @click="handleDislike"
          >
            👎 Dislike 
          </button>
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
      <hr class="mx-10" />

      <!-- Comments Section -->
      <section class="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
        <div class="max-w-2xl mx-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Cuộc thảo luận
            </h2>
          </div>
          <form
            class="mb-6"
            @submit.prevent="addComment"
          >
            <div
              class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            >
              <label
                for="comment"
                class="sr-only"
                >Nhập ý kiến của bạn....</label
              >
              <textarea
                id="comment"
                v-model="newComment"
                rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <div class="relative inline-block">
              <div
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[140%] overflow-hidden blur-[35px] opacity-60"
              >
                <div
                  class="absolute flex items-center justify-center animate-spin [animation:spin_20s_linear_infinite]"
                >
                  <div
                    class="h-48 w-60 bg-gradient-to-tr from-orange-500 via-red-500 to-yellow-600"
                  ></div>
                </div>
              </div>
              <button
                class="relative px-5 py-3 rounded-2xl text-zinc-300 bg-zinc-900 border border-1 border-zinc-500 flex items-center group"
              >
                <div
                  class="relative z-10 flex items-center font-semibold group-hover:text-white transition"
                >
                  Thêm bình luận
                </div>
              </button>
            </div>
          </form>

          <div v-if="post?.commentPosts?.length">
            <div
              v-for="(comment, index) in post?.commentPosts"
              :key="index"
              class="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
            >
              <footer class="flex justify-between items-center mb-2">
                <div class="flex items-center">
                  <router-link :to="`/profile/${comment.user.id}`">
                  <p
                    class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
                  >
                    <img
                      class="mr-2 w-6 h-6 rounded-full"
                      :src="comment.user.avatar || 'https://via.placeholder.com/150'"
                      alt="User"
                    />{{ comment.user.fullName }}
                  </p>
                 </router-link>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    <time :datetime="comment.createdAt">{{ comment.createdAt || 'No date' }}</time>
                  </p>
                </div>
              </footer>
              <p class="text-gray-500 dark:text-gray-400">{{ comment.content }}</p>
            </div>
          </div>

          <p
            v-else
            class="text-gray-500 dark:text-gray-400"
          >
            No comments yet.
          </p>
        </div>
      </section>
    </article>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getPostById, addComment, likePost, dislikePost } from '@/services/post'
import { Post } from '@/types/post'
import { Comment } from '@/types/comment'

export default defineComponent({
  setup() {
    const route = useRoute()
    const post = ref<Post | null>(null)
    const newComment = ref('')
    const error = ref<string | null>(null)

    const fetchPost = async () => {
      const postId = route.params.id as string
      try {
        const response = await getPostById(postId)
        if (response.status === 200) {
          post.value = response.data
        } else {
          error.value = 'Unable to load post.'
        }
      } catch (err) {
        console.error('Error fetching post:', err)
        error.value = 'Error fetching post details.'
      }
    }

    const addComment = async () => {
      if (!post.value || !newComment.value.trim()) return
      try {
        const response = await addComment(post.value.id, newComment.value.trim())
        if (response.status === 200) {
          post.value.commentPosts.push(response.data)
          newComment.value = ''
        }
      } catch (err) {
        console.error('Error adding comment:', err)
      }
    }

    const handleLike = async () => {
      if (!post.value) return
      try {
        const response = await likePost(post.value.id)
        if (response.status === 200) {
          post.value.likeCount = response.data.likeCount
        }
      } catch (err) {
        console.error('Error liking post:', err)
      }
    }

    const handleDislike = async () => {
      if (!post.value) return
      try {
        const response = await dislikePost(post.value.id)
        if (response.status === 200) {
          post.value.dislikeCount = response.data.dislikeCount
        }
      } catch (err) {
        console.error('Error disliking post:', err)
      }
    }

    onMounted(() => {
      fetchPost()
    })

    return {
      post,
      newComment,
      error,
      addComment,
      handleLike,
      handleDislike,
    }
  },
})
</script>
