<template>
  <div class="min-h-screen p-6 bg-orange-50 flex items-center justify-center">
    <div class="container max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-5 md:p-8 mb-6 border-2 border-orange-200">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-orange-800 mb-2">Share Your Recipe</h2>
          <p class="text-orange-600">Share your culinary masterpiece with the world</p>
        </div>
        <form
          id="recipeForm"
          class="space-y-6"
          @submit.prevent="submitForm"
        >
          <div>
            <label
              for="title"
              class="text-sm font-medium text-orange-700 block mb-2"
              >Recipe Title</label
            >
            <input
              id="title"
              v-model="post.title"
              type="text"
              required
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter recipe title"
            />
          </div>

          <div>
            <label
              for="description"
              class="text-sm font-medium text-orange-700 block mb-2"
              >Description</label
            >
            <textarea
              id="description"
              v-model="post.description"
              required
              rows="4"
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Describe your recipe"
            ></textarea>
          </div>

          <div>
            <label
              for="tutorial"
              class="text-sm font-medium text-orange-700 block mb-2"
              >Tutorial Steps</label
            >
            <textarea
              id="tutorial"
              v-model="post.tutorial"
              required
              rows="4"
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Describe the tutorial or steps"
            ></textarea>
          </div>

          <div>
            <label
              for="typePost"
              class="text-sm font-medium text-orange-700 block mb-2"
              >Post Type</label
            >
            <select
              id="typePost"
              v-model="post.typePost"
              required
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="recipe">Recipe</option>
              <option value="blog">Blog</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div>
            <label class="text-sm font-medium text-orange-700 block mb-2">Recipe Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              class="w-full py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              @change="handleFileUpload"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-orange-700 block mb-2"
              >Recipe Video (Optional)</label
            >
            <input
              type="file"
              accept="video/*"
              class="w-full py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              @change="handleVideoUpload"
            />
          </div>

          <div class="flex gap-4 justify-end mt-8">
            <button
              id="previewBtn"
              type="button"
              class="px-6 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              @click="openPreviewModal"
            >
              Preview
            </button>
            <button
              type="submit"
              class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              :disabled="isLoading"
            >
              <span v-if="isLoading">
                <svg
                  class="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0116 0"
                  ></path>
                </svg>
              </span>
              <span v-else>Share Recipe</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Preview Modal -->
      <div
        v-if="previewModalOpen"
        class="fixed inset-0 bg-orange-600 bg-opacity-50 overflow-y-auto h-full w-full"
      >
        <div
          class="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-orange-800">Recipe Preview</h3>
            <button
              class="text-orange-400 hover:text-orange-500"
              @click="closePreviewModal"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-orange-700">{{ post.title }}</h3>
            <p>{{ post.description }}</p>
            <p>{{ post.tutorial }}</p>
            <p>Type: {{ post.typePost }}</p>
            <div v-if="post.images.length > 0">
              <h4 class="font-medium text-orange-600">Uploaded Images:</h4>
              <div
                v-for="(image, index) in post.images"
                :key="index"
                class="flex"
              >
                <img
                  :src="URL.createObjectURL(image)"
                  alt="Recipe Image"
                  class="w-24 h-24 object-cover rounded-md"
                />
              </div>
            </div>
            <div v-if="post.video">
              <h4 class="font-medium text-orange-600">Uploaded Video:</h4>
              <video
                :src="URL.createObjectURL(post.video)"
                controls
                class="w-full h-auto"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/services/post'

// Define a ref to hold the post data
const post = ref({
  title: '',
  description: '',
  tutorial: '',
  typePost: 'recipe',
  images: [] as File[], // List of images
  video: null as File | null,
})

// Loading state
const isLoading = ref(false)

// Router instance for navigation
const router = useRouter()

// Open preview modal
const previewModalOpen = ref(false)
const openPreviewModal = () => previewModalOpen.value = true
const closePreviewModal = () => previewModalOpen.value = false

// Handle file upload
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    post.value.images = Array.from(input.files)
  }
}

const handleVideoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    post.value.video = input.files[0]
  }
}

// Submit the form
const submitForm = async () => {
  try {
    // Set loading state to true
    isLoading.value = true

    // Call the API to create the post
    const response = await createPost(
      post.value.title,
      post.value.description,
      post.value.tutorial,
      post.value.typePost,
      post.value.images,
      post.value.video
    )

    if (response.status === 200) {
      alert('Post created successfully!')
      // Navigate to another route upon success
      router.push('/profile')  // Change this to the route you want to navigate to
    } else {
      alert('Failed to create post.')
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('An error occurred while submitting the form.')
  } finally {
    // Set loading state to false
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Custom styles here */
</style>
