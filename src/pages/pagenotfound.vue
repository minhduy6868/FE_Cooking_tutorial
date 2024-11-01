<template>
  <div class="bg-white h-screen flex justify-center items-center">
    <div class="text-center">
      <img
        src="../assets/img/notfound404.gif" 
        alt="404 Not Found"
        class="mx-auto"
      />
      <div class="tracking-widest mt-4">
        <span class="text-gray-500 text-6xl block"><span>4  0  4</span></span>
        <span class="text-gray-500 text-xl">Sorry, we couldn't find what you are looking for!</span>
      </div>
      <div class="mt-6">
        <a
          href="#"
          class="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
        >Go back</a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.emoji-404 {
  position: relative;
  animation: mymove 2.5s infinite;
}

@keyframes mymove {
  33% {
    top: 0px;
  }
  66% {
    top: 20px;
  }
  100% {
    top: 0px;
  }
}

/* Ensure the image scales properly */
img {
  max-width: 100%; /* Prevents overflow */
  height: auto; /* Maintains aspect ratio */
}
</style>
