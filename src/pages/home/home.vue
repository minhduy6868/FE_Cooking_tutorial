<template>
  <div class="home-container">
    <!-- Carousel -->
    <Carousel />

    <div class="wrapper ml-5 mr-5 mt-5">
      <!-- Tiêu đề của phần nội dung -->
      <h2
        class="ml-4 mr-4 mx-auto bg-gradient-to-r from-orange-400 to-yellow-300 text-white text-xl font-bold text-center p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
      >
        Danh sách món ăn
      </h2>

      <div v-if="posts.length > 0">
        <div class="card-grid">
          <!-- Loop through posts and display each one -->
          <div
            v-for="post in posts"
            :key="post.id"
            class="post-card"
          >
            <!-- Sử dụng CardCooking để hiển thị từng món ăn -->
            <router-link :to="`/post/detail/${post.id}`">
              <CardCooking
                :title="post.title"
                :description="post.description"
                :image="post?.pictures?.[0]?.link || 'https://via.placeholder.com/130'"
                :link="post.linkVideo"
                :category="post.typePost || 'Chưa có thể loại'"
                :time="post.commentPosts || 'Chưa rõ thời gian'"
                :likeCount="post.likeCount"
              />
            </router-link>
          </div>
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
import { getAllAcceptPost } from '@/services/post'
import Carousel from '@/components/layout/Carousel.vue'
import CardCooking from '@/components/ui/card/CardCooking.vue'
import type { Post } from '@/types/post'
import { link } from 'fs';

export default {
  name: 'Home',
  components: {
    Carousel,
    CardCooking,
  },
  data() {
    return {
      posts: [] as Post[],
      loading: false,
    }
  },
  mounted() {
    this.fetchPosts()
  },
  methods: {
    async fetchPosts() {
      this.loading = true
      try {
        const response = await getAllAcceptPost()
        if (response.status === 200) {
          this.posts = response.data
        } else {
          console.error('Lỗi: Dữ liệu không hợp lệ hoặc không có bài viết.')
          alert('Không thể tải danh sách bài viết.')
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        if (error.response) {
          console.error('API Error:', error.response.data)
          alert(`API Error: ${error.response.data.message || 'Không xác định'}`)
        } else if (error.request) {
          console.error('No response received from API:', error.request)
          alert('Không nhận được phản hồi từ API.')
        } else {
          console.error('Error', error.message)
          alert(`Error: ${error.message}`)
        }
      } finally {
        this.loading = false
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
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
