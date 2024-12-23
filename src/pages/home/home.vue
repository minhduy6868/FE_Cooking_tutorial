<template>
  <div class="home-container mb-5">
    <Carousel />

    <div class="wrapper ml-5 mr-5 mt-5">
      <!-- Danh mục Món ăn hot -->
      <h2
        class="ml-4 mr-4 mx-auto bg-gradient-to-r from-red-400 to-pink-300 text-white text-xl font-bold text-center p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
      >
        Món ăn hot
      </h2>

      <div v-if="hotPosts.length > 0">
        <div class="card-grid">
          <div
            v-for="(post, index) in hotPosts.slice(0, displayedHotPosts)"
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
                :time="post.commentPosts || 'Chưa rõ thời gian'"
                :likeCount="post.likeCount"
              />
            </router-link>
          </div>
        </div>

        <div
          v-if="displayedHotPosts < totalHotPosts"
          class="text-center mt-4"
        >
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            @click="loadMoreHotPosts"
          >
            Xem thêm
          </button>
        </div>
      </div>

      <div v-else>
        <p v-if="loading">Đang tải dữ liệu...</p>
        <p v-else>Không có món ăn nào.</p>
      </div>

      <!-- Danh mục Món ăn khác -->
      <h2
        class="ml-4 mr-4 mx-auto bg-gradient-to-r from-orange-400 to-yellow-300 text-white text-xl font-bold text-center p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
      >
        Danh sách món ăn
      </h2>

      <div v-if="posts.length > 0">
        <div class="card-grid">
          <div
            v-for="(post, index) in posts.slice(0, displayedPosts)"
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
                :time="post.commentPosts || 'Chưa rõ thời gian'"
                :likeCount="post.likeCount"
              />
            </router-link>
          </div>
        </div>

        <div
          v-if="displayedPosts < totalPosts"
          class="text-center mt-4"
        >
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            @click="loadMorePosts"
          >
            Xem thêm
          </button>
        </div>
      </div>

      <div v-else>
        <p v-if="loading">Đang tải dữ liệu...</p>
        <p v-else>Không có món ăn nào.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAllAcceptPost, getTopLikePost } from '@/services/post'
import Carousel from '@/components/layout/Carousel.vue'
import CardCooking from '@/components/ui/card/CardCooking.vue'
import type { Post } from '@/types/post'

export default {
  name: 'Home',
  components: {
    Carousel,
    CardCooking,
  },
  data() {
    return {
      posts: [] as Post[],
      hotPosts: [] as Post[], // Mảng chứa các món ăn hot
      loading: false,
      displayedPosts: 12,
      totalPosts: 0,
      displayedHotPosts: 6, // Ban đầu hiển thị 6 món ăn hot
      totalHotPosts: 0,
    }
  },
  mounted() {
    this.fetchPosts()
    this.fetchHotPosts()
  },
  methods: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await getAllAcceptPost()
        if (response.status === 200) {
          this.posts = response.data
          this.totalPosts = response.data.length
        } else {
          console.error('Lỗi: Dữ liệu không hợp lệ hoặc không có bài viết.')
          alert('Không thể tải danh sách bài viết.')
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        alert('Lỗi khi tải bài viết.')
      } finally {
        this.loading = false
      }
    },

    // Lấy các món ăn hot
    async fetchHotPosts() {
      this.loading = true
      try {
        const response = await getTopLikePost() // Gọi API lấy món ăn hot
        if (response.status === 200) {
          this.hotPosts = response.data
          this.totalHotPosts = response.data.length
        } else {
          console.error('Lỗi: Dữ liệu không hợp lệ hoặc không có món ăn hot.')
          alert('Không thể tải món ăn hot.')
        }
      } catch (error) {
        console.error('Error fetching hot posts:', error)
        alert('Lỗi khi tải món ăn hot.')
      } finally {
        this.loading = false
      }
    },

    loadMorePosts() {
      if (this.displayedPosts < this.totalPosts) {
        this.displayedPosts += 12
      }
    },

    loadMoreHotPosts() {
      if (this.displayedHotPosts < this.totalHotPosts) {
        this.displayedHotPosts += 6 // Tải thêm 6 món ăn hot
      }
    },
  },
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
}

h2 {
  text-transform: uppercase;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
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
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.loading-message {
  font-size: 1.2em;
  color: #f39c12;
}
</style>
