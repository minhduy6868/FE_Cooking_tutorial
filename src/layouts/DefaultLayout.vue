<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import Carousel from '@/components/layout/Carousel.vue'
import Footer from '@/components/layout/Footer.vue'
import ChatBox from '@/components/layout/ChatBox.vue'
import ListCard from '@/components/layout/ListCard.vue'
</script>
<template>
  <div class="fixed w-full z-50 top-0">
    <SideBar />
  </div>

  <div class="main-content">
    <router-view></router-view>
  </div>

  <Footer></Footer>
  <ChatBox></ChatBox>
</template>
<style lang="scss" scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.SideBar {
  position: sticky;
  top: 0;
  width: 250px;
  height: 100vh;
  overflow-y: auto;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
}
</style>
