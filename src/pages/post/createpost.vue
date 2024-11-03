<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6">Tạo Bài Viết Mới</h1>
      <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Tiêu đề</label>
          <input
            v-model="post.title"
            type="text"
            id="title"
            placeholder="Nhập tiêu đề bài viết"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="content">Nội dung</label>
          <textarea
            v-model="post.content"
            id="content"
            rows="10"
            placeholder="Nhập nội dung bài viết"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image">Tải lên hình ảnh</label>
          <input
            type="file"
            id="image"
            @change="handleFileUpload"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
            required
          />
        </div>
  
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="tags">Thẻ (tags)</label>
          <input
            v-model="post.tags"
            type="text"
            id="tags"
            placeholder="Nhập thẻ (cách nhau bởi dấu phẩy)"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
  
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Gửi
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const post = ref({
    title: '',
    content: '',
    image: null,
    tags: ''
  });
  
  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      post.value.image = target.files[0];
    }
  };
  
  const submitForm = () => {
    // Xử lý gửi form, ví dụ: gửi đến API hoặc lưu vào cơ sở dữ liệu
    console.log(post.value);
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  