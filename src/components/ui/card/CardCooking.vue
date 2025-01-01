<template>
  <div class="rounded overflow-hidden shadow-lg flex flex-col relative">
    <div class="absolute top-2 right-2 flex flex-col gap-2 z-30">
      <span
        v-if="isApproved === false"
        class="bg-gray-500 text-white text-xs font-semibold py-1 px-2 rounded z-20"
      >
        Đang chờ duyệt
      </span>

      <span
        v-if="typePost && typePost.trim() !== ''"
        class="bg-orange-500 text-white text-xs font-semibold py-1 px-2 rounded z-30"
      >
        {{ typePost }}
      </span>
    </div>

    <a
      :href="link"
      class="w-full block"
    >
      <div class="relative h-[250px]">
        <img
          class="w-full h-full object-cover"
          :src="image ? image : 'https://via.placeholder.com/130'"
          :alt="title"
          width="130"
          height="130"
        />
        <div
          class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
        ></div>

        <!-- Edit and Delete buttons in the top-left corner with background -->
        <div v-if="forMe" class="absolute top-2 left-2 flex flex-col space-y-2 z-40 bg-gray-900 bg-opacity-50 p-1 rounded-lg">
          <button
            @click="editPost"
            class="text-blue-500 hover:text-blue-700 p-1 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.864 3.232a2.25 2.25 0 0 1 3.182 3.182l-9.795 9.796-2.107.35a1 1 0 0 0-1.133-1.132l-.35-2.107 9.795-9.795z"
              />
            </svg>
          </button>
          <button
            @click="deletePost"
            class="text-red-500 hover:text-red-700 p-1 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 6l12 12M6 18L18 6"
              />
            </svg>
          </button>
        </div>
      </div>
    </a>

    <div class="px-6 py-4 mb-auto">
      <a
        :href="link"
        class="font-extrabold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
      >
        {{ title }}
      </a>
      <p class="text-gray-500 text-sm line-clamp-4">
        {{ description }}
      </p>
    </div>

    <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
      <span class="py-1 text-xs font-regular text-gray-900 mr-4 flex flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          />
        </svg>
        <span class="ml-1">{{ likeCount }} Likes</span>
      </span>

      <span class="py-1 text-xs font-regular text-gray-900 mr-4 flex flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
          />
        </svg>
        <span class="ml-1">{{ dislikeCount }} Dislikes</span>
      </span>
    </div>
  </div>
</template>

<script>
import { deletePostMe } from '@/services/post'

export default {
  props: {
    title: String,
    description: String,
    image: String,
    link: String,
    category: String,
    time: String,
    likeCount: Number,
    dislikeCount: Number,
    isApproved: {
      type: Boolean,
      default: false,
    },
    typePost: String,
    forMe: {
      type: Boolean,
      default: false,
    },
    postId: String, // ID bài viết
  },
  methods: {
    async deletePost() {
      try {
        if (this.postId) {
          const response = await deletePostMe(this.postId);
          if (response.success) {
            alert('Bài viết đã được xóa');
          } else {
            alert('Không thể xóa bài viết');
          }
        }
      } catch (error) {
        console.error('Lỗi khi xóa bài viết:', error);
        alert('Có lỗi xảy ra');
      }
    },
    editPost() {
      // Redirect or open the edit page
      alert("Sửa bài");
    },
  },
}
</script>
