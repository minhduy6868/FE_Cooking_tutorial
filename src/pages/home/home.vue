<template>
  <div class="home-container">
    <!-- Carousel: Có thể hiển thị danh sách các hình ảnh hoặc nội dung động -->
    <Carousel />

    <div class="wrapper ml-5 mr-5 mt-5">
      <!-- Tiêu đề của phần nội dung -->
      <h2
        class="ml-4 mr-4 mx-auto bg-gradient-to-r from-orange-400 to-yellow-300 text-white text-xl font-bold text-center p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
      >
        Danh sách món ăn
      </h2>

      <!-- ListCard: Liệt kê các món ăn hoặc nội dung liên quan -->
      <ListCard />
    </div>
  </div>
</template>

<script lang="ts">
import ListCard from '@/components/layout/ListCard.vue'
import Carousel from '@/components/layout/Carousel.vue'

export default {
  name: 'Home',
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Căn giữa nội dung */
}

.wrapper {
  width: 100%;
  max-width: 1200px; /* Điều chỉnh độ rộng tối đa của wrapper */
  margin-top: 20px;
}

h2 {
  text-transform: uppercase;
}
</style>
