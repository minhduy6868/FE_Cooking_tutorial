<template>
  <SideBar></SideBar>
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
        >
          <div>
            <label
              for="title"
              class="text-sm font-medium text-orange-700 block mb-2"
              >Recipe Title</label
            >
            <input
              id="title"
              type="text"
              name="title"
              required
              aria-required="true"
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter recipe title"
            />
            <p
              id="titleError"
              class="mt-1 hidden text-red-500 text-sm"
            >
              Title is required
            </p>
          </div>

          <div>
            <label
              for="description"
              class="text-sm font-medium text-orange-700 block mb-2"
              >Description</label
            >
            <textarea
              id="description"
              name="description"
              required
              aria-required="true"
              rows="4"
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Describe your recipe"
            ></textarea>
            <p
              id="descriptionError"
              class="mt-1 hidden text-red-500 text-sm"
            >
              Description is required
            </p>
          </div>

          <div>
            <label class="text-sm font-medium text-orange-700 block mb-2">Main Image</label>
            <div
              class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-orange-300 border-dashed rounded-lg bg-orange-50"
            >
              <div class="space-y-1 text-center">
                <img
                  id="mainImagePreview"
                  class="mx-auto h-48 w-96 object-cover rounded-lg hidden"
                  src=""
                  alt="Recipe preview"
                />
                <div class="flex text-sm text-orange-600">
                  <label
                    for="mainImage"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="mainImage"
                      name="mainImage"
                      type="file"
                      class="sr-only"
                      accept="image/*"
                    />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-orange-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div class="recipe-steps">
            <label class="text-sm font-medium text-orange-700 block mb-2">Recipe Steps</label>
            <div
              id="stepsContainer"
              class="space-y-4"
            >
              <div class="step-item bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div class="flex items-center gap-4 mb-2">
                  <span class="text-lg font-semibold text-orange-700">Step 1</span>
                  <button
                    type="button"
                    class="text-orange-500 hover:text-orange-700"
                  >
                    Remove
                  </button>
                </div>
                <textarea
                  required
                  aria-required="true"
                  class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows="2"
                  placeholder="Describe this step"
                ></textarea>
                <div class="mt-2">
                  <label class="block text-sm font-medium text-orange-700"
                    >Step Image (optional)</label
                  >
                  <input
                    type="file"
                    accept="image/*"
                    class="mt-1 block w-full text-sm text-orange-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                </div>
              </div>
            </div>
            <button
              id="addStep"
              type="button"
              class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Add Another Step
            </button>
          </div>

          <div class="flex gap-4 justify-end mt-8">
            <button
              id="previewBtn"
              type="button"
              class="px-6 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Preview
            </button>
            <button
              type="submit"
              class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Share Recipe
            </button>
          </div>
        </form>
      </div>

      <!-- Preview Modal -->
      <div
        id="previewModal"
        class="hidden fixed inset-0 bg-orange-600 bg-opacity-50 overflow-y-auto h-full w-full"
      >
        <div
          class="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white"
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-orange-800">Recipe Preview</h3>
            <button
              id="closePreview"
              class="text-orange-400 hover:text-orange-500"
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
          <div
            id="previewContent"
            class="mt-4"
          >
            <!-- Preview content will be inserted here -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SideBar from '@/components/layout/SideBar.vue'
import Carousel from '@/components/layout/Carousel.vue'
import Footer from '@/components/layout/Footer.vue'
import ListCard from '@/components/layout/ListCard.vue'

const post = ref({
  title: '',
  content: '',
  image: null,
  tags: '',
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    post.value.image = target.files[0]
  }
}

const submitForm = () => {
  // Xử lý gửi form, ví dụ: gửi đến API hoặc lưu vào cơ sở dữ liệu
  console.log(post.value)
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
