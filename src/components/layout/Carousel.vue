<template>
  <div class="relative w-full overflow-hidden">
    <div id="default-carousel" class="relative w-full" data-carousel="static">
      <div class="relative w-full" data-carousel-inner>
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="['duration-700 ease-in-out', { 'block': currentIndex === index, 'hidden': currentIndex !== index }]"
          data-carousel-item
        >
          <div class="relative w-full h-full">
            <img :src="item.img" class="object-cover w-full h-full" :alt="item.alt">
            <span v-if="item.text" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-white md:text-2xl dark:text-gray-800">
              {{ item.text }}
            </span>
          </div>
        </div>
      </div>

      <!-- Slider indicators -->
      <div class="flex absolute bottom-5 left-1/2 z-30 -translate-x-1/2 space-x-2" data-carousel-indicators>
        <button
          v-for="(item, index) in items"
          :key="index"
          type="button"
          class="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition"
          @click="currentIndex = index"
        ></button>
      </div>

      <!-- Slider controls -->
      <button type="button" class="flex absolute top-1/2 left-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition" @click="prevSlide">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button type="button" class="flex absolute top-1/2 right-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition" @click="nextSlide">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import slideImage1 from '@/assets/img/img1.png';
import slideImage2 from '@/assets/img/img2.jpg';
import slideImage3 from '@/assets/img/img3.png';

export default {
  name: 'CarouselComponent',
  data() {
    return {
      currentIndex: 0,
      items: [
        {
          img: slideImage1,
          alt: 'Slide 1',
          text: 'First Slide'
        },
        {
          img: slideImage2,
          alt: 'Slide 2'
        },
        {
          img: slideImage3,
          alt: 'Slide 3'
        }
      ]
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    }
  }
}
</script>

<style scoped>
#default-carousel {
  height: 40vh;
}

img {
  object-fit: cover;
  width: 100%;
  height: 40vh;
}
</style>
