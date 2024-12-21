<script>
import { defineComponent, ref, onMounted } from 'vue'
import { searchPosts, getAllAcceptPost } from '@/services/post' // Import API
import CardCooking from '@/components/ui/card/CardCooking.vue' // Đảm bảo đã import CardCooking

export default defineComponent({
  name: 'SearchPosts',
  components: {
    CardCooking,
  },
  setup() {
    const searchQuery = ref('') // Từ khóa tìm kiếm
    const posts = ref([]) // Danh sách các bài viết
    const loading = ref(false) // Trạng thái tải
    const error = ref(null) // Lỗi khi lấy dữ liệu

    // Hàm gọi API tìm kiếm bài viết
    const searchPostsFunc = async () => {
      if (searchQuery.value.trim() === '') {
        posts.value = [] // Nếu không có từ khóa tìm kiếm, reset danh sách bài viết
        return
      }

      loading.value = true
      error.value = null
      try {
        const response = await searchPosts(searchQuery.value)
        if (response.status === 200) {
          posts.value = response.data // Lưu kết quả tìm kiếm
        } else {
          error.value = 'Không tìm thấy bài viết.'
        }
      } catch (err) {
        error.value = 'Có lỗi xảy ra khi tìm kiếm bài viết.'
      } finally {
        loading.value = false
      }
    }

    // Hàm lấy tất cả bài viết khi không có tìm kiếm
    const fetchAllPosts = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await getAllAcceptPost()
        if (response.status === 200) {
          posts.value = response.data // Lưu tất cả bài viết
        } else {
          error.value = 'Không thể tải tất cả bài viết.'
        }
      } catch (err) {
        error.value = 'Có lỗi xảy ra khi tải bài viết.'
      } finally {
        loading.value = false
      }
    }

    // Lấy tất cả bài viết khi component được mount
    onMounted(() => {
      fetchAllPosts() // Lấy tất cả bài viết khi lần đầu tiên load trang
    })

    return {
      searchQuery,
      posts,
      loading,
      error,
      searchPostsFunc, // Expose searchPostsFunc instead of searchPosts
    }
  },
})
</script>
<template>
  <div>
    <!-- Thanh tìm kiếm -->
    <div class="fixed w-full z-40 mt-16 bg-white shadow-md p-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm bài viết theo tiêu đề..."
        class="w-full p-2 border rounded-lg shadow-sm"
        @keyup.enter="searchPostsFunc"
      />
    </div>

    <!-- Danh sách bài viết -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div
        v-if="loading"
        class="text-center text-lg"
      >
        Đang tải...
      </div>
      <div
        v-if="error"
        class="text-center text-red-500"
      >
        {{ error }}
      </div>
      <div
        v-if="posts.length === 0"
        class="text-center"
      >
        Không có bài viết nào.
      </div>

      <!-- Hiển thị bài viết dưới dạng các CardCooking -->
      <div
        v-if="posts.length > 0"
        class="card-grid"
      >
        <div
          v-for="post in posts"
          :key="post.id"
          class="post-card"
        >
          <router-link :to="`/post/detail/${post.id}`">
            <CardCooking
              :title="post.title"
              :description="post.description"
              :image="post?.pictures?.[0]?.link || 'https://via.placeholder.com/130'"
              :link="post.linkVideo"
              :isApproved="post.approved"
              :typePost="post.typePost || 'Chưa có thể loại'"
              :time="post.time || 'Chưa rõ thời gian'"
              :like-count="post.likeCount"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Custom styles */
.sticky {
  position: sticky;
  top: 0;
  z-index: 1000;
}

input {
  font-size: 16px;
}

.bg-white {
  background-color: #fff;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.shadow-xl {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.rounded-2xl {
  border-radius: 1.5rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  ); /* Responsive grid with minimum 300px per item */
  gap: 20px; /* Space between items */
  padding: 20px; /* Padding around the grid */
}

.card-grid .post-card {
  padding: 15px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card-grid .post-card:hover {
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Increased shadow on hover */
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(
      auto-fill,
      minmax(250px, 1fr)
    ); /* Smaller grid items on smaller screens */
    gap: 16px; /* Reduced gap */
  }
}

@media (max-width: 480px) {
  .card-grid {
    grid-template-columns: 1fr; /* Single column on very small screens */
    gap: 12px; /* Further reduced gap */
  }
}
</style>
