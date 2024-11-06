<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import Carousel from '@/components/layout/Carousel.vue'
import Footer from '@/components/layout/Footer.vue'
import ChatBox from '@/components/layout/ChatBox.vue'
import ListCard from '@/components/layout/ListCard.vue'
</script>
<template>
  <SideBar />

  <Carousel></Carousel>
  <div class="wrapper ml-5 mr-5 mt-5">
    <h2
      class="ml-4 mr-4 mx-auto bg-gradient-to-r from-orange-400 to-yellow-300 text-white text-xl font-bold text-center p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
    >
      Danh sách món ăn
    </h2>

    <ListCard></ListCard>
  </div>

  <Footer></Footer>
  <ChatBox></ChatBox>
</template>
<style lang="scss" scoped>
.container-div {
  display: flex;
  height: 200vh;
  min-height: 300vh;
  width: 900%;

  .wrapper {
    height: 100%;
    overflow-y: auto;
    width: 100%;
  }
}
</style>
