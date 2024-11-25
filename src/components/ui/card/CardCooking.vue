<template>
  <div class="rounded overflow-hidden shadow-lg flex flex-col">
    <!-- Link to post -->
    <a :href="link"></a>

    <div class="relative">
      <!-- Thumbnail image and hover effect -->
      <a :href="link">
        <img class="w-full" :src="image ? image : 'https://via.placeholder.com/130'" :alt="title" />
        <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
      </a>
      <a href="#!">
        <div class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
          {{ category }}
        </div>
      </a>
    </div>

    <div class="px-6 py-4 mb-auto">
      <!-- Title -->
      <a :href="link" class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
        {{ title }}
      </a>
      <!-- Description -->
      <p class="text-gray-500 text-sm">
        {{ description }}
      </p>
    </div>

    <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
      <!-- Like Count -->
      <span class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
        <svg height="13px" width="13px" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
          <g>
            <g>
              <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
            </g>
          </g>
        </svg>
        <span class="ml-1">{{ likeCount }} Likes</span> <!-- Hiển thị số lượt thích -->
      </span>

      <!-- Time posted -->
      <span class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
        <svg height="13px" width="13px" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve">
          <g>
            <g>
              <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
            </g>
          </g>
        </svg>
        <span class="ml-1">{{ time }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    image: String,  // Đảm bảo nhận giá trị URL cho ảnh
    link: String,
    category: String,
    time: String,
    likeCount: Number, // Thêm prop likeCount để nhận số lượt thích
  }
}
</script>

<style scoped>
/* You can add custom styles here */
</style>
