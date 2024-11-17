<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <article class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="relative h-96">
        <img
          src="https://images.unsplash.com/photo-1556911220-bff31c812dba"
          alt="Cooking preparation"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div class="p-8">
            <h1 class="text-4xl font-bold text-white mb-4">Perfect Homemade Pizza Tutorial</h1>
            <p class="text-gray-200 text-lg">
              Master the art of creating restaurant-quality pizza from scratch with this
              comprehensive guide
            </p>
          </div>
        </div>
      </div>

      <div class="p-8">
        <div class="aspect-w-16 aspect-h-9 mb-8 rounded-xl overflow-hidden">
          <video
            controls
            class="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1513104890138-7c749659a591"
          >
            <source
              src="#"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 class="text-2xl font-bold mb-4">Ingredients</h2>
            <ul class="space-y-3">
              <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>3 cups all-purpose flour</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>2 1/4 tsp active dry yeast</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>1 tsp salt</span>
              </li>
              <li class="flex items-center space-x-3">
                <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>1 cup warm water</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-2xl font-bold mb-4">Instructions</h2>
            <ol class="space-y-4">
              <li class="flex space-x-4">
                <span
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center"
                  >1</span
                >
                <p>Mix flour, yeast, and salt in a large bowl</p>
              </li>
              <li class="flex space-x-4">
                <span
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center"
                  >2</span
                >
                <p>Add warm water and knead until smooth</p>
              </li>
              <li class="flex space-x-4">
                <span
                  class="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center"
                  >3</span
                >
                <p>Let rise for 1 hour in a warm place</p>
              </li>
            </ol>
          </div>
        </div>

        <div class="mt-12">
          <h2 class="text-2xl font-bold mb-6">Process Gallery</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://images.unsplash.com/photo-1604382354936-07c5d9983bd3"
              alt="Mixing ingredients"
              class="rounded-lg hover:opacity-75 transition duration-300 ease-in-out"
            />
            <img
              src="https://images.unsplash.com/photo-1595854341625-f33ee10dbf94"
              alt="Kneading dough"
              class="rounded-lg hover:opacity-75 transition duration-300 ease-in-out"
            />
            <img
              src="https://images.unsplash.com/photo-1588315029754-2dd089d39a1a"
              alt="Adding toppings"
              class="rounded-lg hover:opacity-75 transition duration-300 ease-in-out"
            />
            <img
              src="https://images.unsplash.com/photo-1593560708920-61dd98c46a4e"
              alt="Final pizza"
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
