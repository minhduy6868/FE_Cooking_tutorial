<template>
  <div class="min-h-screen p-6 mt-50 bg-orange-50 flex items-center justify-center">
    <div class="container max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-5 md:p-8 mb-6 border-2 border-orange-200">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-orange-800 mb-2 pt-7">Chia sẻ công thức của bạn</h2>
          <p class="text-orange-600">Chia sẻ tác phẩm ẩm thực của bạn với thế giới</p>
        </div>
        <form
          id="recipeForm"
          class="space-y-6"
          @submit.prevent="submitForm"
        >
          <div>
            <label for="title" class="text-sm font-medium text-orange-700 block mb-2">Tiêu đề công thức</label>
            <input
              id="title"
              v-model="post.title"
              type="text"
              required
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Nhập tiêu đề công thức"
            />
          </div>
          <div>
            <label for="description" class="text-sm font-medium text-orange-700 block mb-2">Mô tả</label>
            <textarea
              id="description"
              v-model="post.description"
              required
              rows="4"
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Mô tả công thức của bạn"
            ></textarea>
          </div>
          <div>
  <label for="ingredient" class="text-sm font-medium text-orange-700 block mb-2">Công thức</label>
  <textarea
    id="ingredient"
    v-model="post.ingredient"
    required
    rows="4"
    class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
    placeholder="Nhập các nguyên liệu cần thiết"
  ></textarea>
</div>

          <div>
            <label for="tutorial" class="text-sm font-medium text-orange-700 block mb-2">Các bước thực hiện</label>
            <textarea
              id="tutorial"
              v-model="post.tutorial"
              required
              rows="4"
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Mô tả các bước thực hiện"
            ></textarea>
          </div>
          <div>
            <label for="typePost" class="text-sm font-medium text-orange-700 block mb-2">Loại món ăn</label>
            <select
              id="typePost"
              v-model="post.typePost"
              required
              class="w-full px-4 py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="Món chính">Món chính</option>
              <option value="Tráng miệng">Món tráng miệng</option>
              <option value="Khai vị">Món khai vị</option>
              <option value="Món Nướng">Món nướng</option>
              <option value="Món lẩu">Món lẩu</option>
            </select>
          </div>

          <!-- File Upload for Images -->
          <div class="mb-6 pt-4">
            <label class="text-sm font-medium text-orange-700 block mb-2">Thêm ảnh chi tiết công thức</label>
            <div class="mb-8">
              <input
                id="file"
                type="file"
                name="file"
                class="sr-only"
                multiple
                @change="handleFileUpload"
              />
              <label
                for="file"
                class="relative flex min-h-[160px] items-center justify-center rounded-md border border-dashed border-orange-300 p-6 text-center"
              >
                <div>
                  <span class="mb-2 block text-lg font-semibold text-orange-700">Drop files here</span>
                  <span class="mb-2 block text-base font-medium text-gray-500">Or</span>
                  <span class="inline-flex rounded border border-orange-300 py-2 px-7 text-base font-medium text-orange-700">Browse</span>
                </div>
              </label>
            </div>
            <div class="flex gap-2">
              <img
                v-for="(image, index) in imagePreviews"
                :key="index"
                :src="image"
                alt="Preview"
                class="w-20 h-20 object-cover rounded-md border border-orange-300"
              />
            </div>
          </div>

          <!-- Video Upload -->
          <div>
            <label class="text-sm font-medium text-orange-700 block mb-2">Video công thức (Tùy chọn)</label>
            <input
              type="file"
              accept="video/*"
              class="w-full py-3 rounded-lg border border-orange-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              @change="handleVideoUpload"
            />
          </div>

          <!-- Submit Button -->
          <div class="flex gap-4 justify-end mt-8">
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
              <span v-else>Chia sẻ công thức</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createPost } from '@/services/post'
import { showToast } from '@/utils/toast';

// Define post data
const post = ref({
  title: '',
  description: '',
  tutorial: '',
  ingredient: '',
  typePost: 'recipe',
  images: [] as File[], // Images
  video: null as File | null, // Single video
})

// Store image preview URLs
const imagePreviews = ref<string[]>([])

// Loading state
const isLoading = ref(false)

// Router instance for navigation
const router = useRouter()

// Handle image file upload
const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files) {
    // Append new images to the existing images array
    post.value.images.push(...Array.from(input.files))

    // Generate preview URLs for the new images and append to imagePreviews
    imagePreviews.value.push(...Array.from(input.files).map((file) => URL.createObjectURL(file)))
  }
}

// Handle video file upload
const handleVideoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    post.value.video = input.files[0]
  }
}

const submitForm = async () => {
  try {
    isLoading.value = true

    // Kiểm tra xem có ít nhất một ảnh chưa
    if (post.value.images.length === 0) {
      showToast('Vui lòng thêm ít nhất một ảnh')
      return
    }

    const formData = new FormData()
    formData.append('title', post.value.title)
    formData.append('description', post.value.description)
    formData.append('tutorial', post.value.tutorial)
    formData.append('ingredient', post.value.ingredient)  
    formData.append('typePost', post.value.typePost)

    // Đảm bảo các hình ảnh được gửi dưới dạng mảng
    post.value.images.forEach((image) => {
      formData.append('images', image) // Append images as 'images[]'
    })

    // Thêm video nếu có
    if (post.value.video) {
      formData.append('fileVideo', post.value.video)
    }

    // Gửi form data lên backend
    const response = await createPost(formData)

    if (response.status === 200 || response.status === 201) {
      alert('Đăng bài thành công!')
      router.push('/profile')
    } else {
      alert('Đăng bài không thành công.')
    }
  } catch (error) {
    console.error('Lỗi khi gửi form:', error)
    alert('Có lỗi xảy ra khi gửi form.')
  } finally {
    isLoading.value = false
  }
}

</script>
