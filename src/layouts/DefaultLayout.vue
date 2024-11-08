<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import Carousel from '@/components/layout/Carousel.vue'
import Footer from '@/components/layout/Footer.vue'
import ChatBox from '@/components/layout/ChatBox.vue'
import ListCard from '@/components/layout/ListCard.vue'
</script>
<template>
  <SideBar />
  
 <div class="main-content">
      <router-view></router-view> <!-- Nội dung của từng route con sẽ hiển thị tại đây -->
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
