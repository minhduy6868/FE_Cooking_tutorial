<script>
import { defineComponent, ref, onMounted } from 'vue'
import { searchPosts, getAllAcceptPost, searchByType } from '@/services/post'
import CardCooking from '@/components/ui/card/CardCooking.vue'
import { showToast } from '@/utils/toast'

export default defineComponent({
  name: 'SearchPosts',
  components: {
    CardCooking,
  },
  setup() {
    const searchQuery = ref('')
    const searchByTypeValue = ref('') // This will hold the selected type
    const posts = ref([])
    const loading = ref(false)
    const error = ref(null)

    // Function to perform search with title and type filtering
    const searchPostsFunc = async () => {
      loading.value = true
      error.value = null
      try {
        let response;
        
        if (searchByTypeValue.value) {
          // If a type is selected, use the searchByType function
          response = await searchByType(searchByTypeValue.value)
          if (response.status === 200) {
            posts.value = response.data
            if (posts.value.length === 0) {
              showToast({
                title: 'Chưa tìm thấy món ăn',
                description: 'Không có bài viết nào phù hợp với loại bạn chọn. Đang lấy tất cả bài viết.',
                variant: 'default',
                duration: 5000,
              })
              // If no posts are found, fetch all posts
              fetchAllPosts()
            }
          } else {
            error.value = 'Không tìm thấy bài viết theo loại.'
            showToast({
              title: 'Không tìm thấy bài viết theo loại',
              description: 'Không có bài viết nào với tiêu chí tìm kiếm này.',
              variant: 'default',
              duration: 5000,
            })
          }
        } else {
          // If no type is selected, search by title only
          response = await searchPosts(searchQuery.value) // Pass the search query directly as the title
          if (response.status === 200) {
            posts.value = response.data
            if (posts.value.length === 0) {
              showToast({
                title: 'Chưa tìm thấy món ăn',
                description: 'Không có bài viết nào phù hợp với tiêu đề bạn tìm. Đang lấy tất cả bài viết.',
                variant: 'default',
                duration: 5000,
              })
              // If no posts are found, fetch all posts
              fetchAllPosts()
            }
          } else {
            showToast({
              title: 'Đã có lỗi xảy ra khi lấy bài viết',
              description: 'Vui lòng thao tác lại hoặc đợi...',
              variant: 'default',
              duration: 5000,
            })
          }
        }
      } catch (err) {
        error.value = 'Có lỗi xảy ra khi tìm kiếm bài viết.'
        showToast({
          title: 'Không tìm thấy công thức nào',
          description: 'Vui lòng thử lại sau.',
          variant: 'default',
          duration: 5000,
        })
      } finally {
        loading.value = false
      }
    }

    // Function to fetch all posts (without filtering)
    const fetchAllPosts = async () => {
      loading.value = true
      error.value = null
      try {
        const response = await getAllAcceptPost()
        if (response.status === 200) {
          posts.value = response.data
        } else {
          error.value = 'Không thể tải tất cả bài viết.'
          showToast({
            title: 'Lỗi tải bài viết',
            description: 'Không thể tải bài viết từ hệ thống.',
            variant: 'default',
            duration: 5000,
          })
        }
      } catch (err) {
        error.value = 'Có lỗi xảy ra khi tải bài viết.'
        showToast({
          title: 'Lỗi tải bài viết',
          description: 'Vui lòng thử lại sau.',
          variant: 'default',
          duration: 5000,
        })
      } finally {
        loading.value = false
      }
    }

    // Fetch all posts on component mount
    onMounted(() => {
      fetchAllPosts()
    })

    return {
      searchQuery,
      searchByTypeValue,
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
    <!-- Search bar and Search By Type dropdown, aligned horizontally -->
    <div class="fixed w-full z-40 mt-20 bg-white shadow-md p-3 flex items-center space-x-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Tìm kiếm bài viết theo tiêu đề..."
        class="w-full md:w-2/3 p-2 border rounded-lg shadow-sm"
        @keyup.enter="searchPostsFunc"
      />
      <select
        v-model="searchByTypeValue"
        class="w-full md:w-1/3 p-2 border rounded-lg shadow-sm"
        @change="searchPostsFunc"
      >
        <option value="">Chọn loại món ăn</option>
        <option value="Món ăn chính">Món ăn chính</option>
        <option value="Ăn kèm">Ăn kèm</option>
        <option value="Tráng miệng">Tráng miệng</option>
        <option value="Ăn nhẹ">Ăn nhẹ</option>
        <option value="Đồ uống">Đồ uống</option>
        <option value="Ăn vặt">Ăn vặt</option>
        <option value="Khác">Khác</option>
      </select>
    </div>

    <!-- Posts Display Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Posts List -->
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
              :is-approved="post.approved"
              :type-post="post.typePost || 'Chưa có thể loại'"
              :time="post.time || 'Chưa rõ thời gian'"
              :like-count="post.likeCount"
              :dislike-count="post.dislikeCount"
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
