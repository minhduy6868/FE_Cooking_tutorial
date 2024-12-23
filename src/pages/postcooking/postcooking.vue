<script>
import { defineComponent, ref, onMounted } from 'vue'
import { searchPosts, getAllAcceptPost } from '@/services/post'
import CardCooking from '@/components/ui/card/CardCooking.vue'

export default defineComponent({
  name: 'SearchPosts',
  components: {
    CardCooking,
  },
  setup() {
    const searchQuery = ref('')
    const posts = ref([])
    const loading = ref(false)
    const error = ref(null)

    const searchPostsFunc = async () => {
      if (searchQuery.value.trim() === '') {
        posts.value = []
        return
      }

      loading.value = true
      error.value = null
      try {
        const response = await searchPosts(searchQuery.value)
        if (response.status === 200) {
          posts.value = response.data
        } else {
          error.value = 'Không tìm thấy bài viết.'
        }
      } catch (err) {
        error.value = 'Có lỗi xảy ra khi tìm kiếm bài viết.'
      } finally {
        loading.value = false
      }
    }

    const fetchAllPosts = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await getAllAcceptPost()
        if (response.status === 200) {
          posts.value = response.data
        } else {
          error.value = 'Không thể tải tất cả bài viết.'
        }
      } catch (err) {
        error.value = 'Có lỗi xảy ra khi tải bài viết.'
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      fetchAllPosts()
    })

    return {
      searchQuery,
      posts,
      loading,
      error,
      searchPostsFunc,
    }
  },
})
</script>
<template>
  <div>
    <div class="fixed w-full z-40 mt-10 bg-white shadow-md p-3">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm bài viết theo tiêu đề..."
        class="w-full p-2 border rounded-lg shadow-sm"
        @keyup.enter="searchPostsFunc"
      />
    </div>

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

      <div
        v-if="posts.length > 0"
        class="card-grid mt-20"
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

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
