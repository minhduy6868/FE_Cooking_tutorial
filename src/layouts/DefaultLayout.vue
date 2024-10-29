<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import Carousel from '@/components/layout/Carousel.vue'
import Footer from '@/components/layout/Footer.vue'


</script>
<template>
   
      <SideBar />
  
  <Carousel></Carousel>
  <Footer></Footer>>
    <confirmDialog />
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
