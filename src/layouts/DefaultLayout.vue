<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import Carousel from '@/components/layout/Carousel.vue'
import Footer from '@/components/layout/Footer.vue'
import ChatBox from '@/components/layout/ChatBox.vue'
import ListCard from '@/components/layout/ListCard.vue'
</script>
<template>
 <div >
  <SideBar />
 </div>

  <div class="main-content">
    <router-view></router-view>
    <!-- Nội dung của từng route con sẽ hiển thị tại đây -->
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
  position: sticky; /* Make sidebar sticky */
  top: 0; /* Stick to the top of the page */
  width: 250px; /* Set the width of your sidebar */
  height: 100vh; /* Full viewport height */
  overflow-y: auto; /* Allow scrolling inside the sidebar if necessary */
}

.main-content {
  flex-grow: 1; /* Let the main content take the remaining space */
  padding: 20px;
  overflow-y: auto; /* Optional: If you want the content area to scroll */
}
</style>
