<script setup lang="ts">
import SideBar from '@/components/layout/SideBar.vue'
import Footer from '@/components/layout/Footer.vue'
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

// Intersection Observer to trigger animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      isVisible.value = true // Set to true when the section is in view
      observer.unobserve(entry.target) // Stop observing after it becomes visible
    }
  })
})

onMounted(() => {
  const section = document.querySelector('.technology-section')
  if (section) {
    observer.observe(section) // Start observing the section
  }
})
</script>

<template>
  <section class="overflow-hidden pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark">
    <div class="container mx-auto">
      <div class="flex flex-wrap items-center justify-between -mx-4">
        <div class="w-full px-4 lg:w-6/12">
          <div class="flex items-center -mx-3 sm:-mx-4">
            <div class="w-full px-3 sm:px-4 xl:w-1/2">
              <div class="py-3 sm:py-4 animate-slide">
                <img
                  src="/src/assets/img/anh1.jpg"
                  alt="Món ăn 1"
                  class="w-full rounded-2xl"
                />
              </div>
              <div class="py-3 sm:py-4 animate-slide">
                <img
                  src="/src/assets/img/anh2.jpg"
                  alt="Món ăn 2"
                  class="w-full rounded-2xl"
                />
              </div>
            </div>
            <div class="w-full px-3 sm:px-4 xl:w-1/2">
              <div class="relative z-10 my-4 animate-slide">
                <img
                  src="/src/assets/img/anh3.jpg"
                  alt="Món ăn 3"
                  class="w-full rounded-2xl"
                />
                <span class="absolute -right-7 -bottom-7 z-[-1]">
                  <!-- SVG code here -->
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full px-4 lg:w-1/2 xl:w-5/12 animate-slide">
          <div class="mt-10 lg:mt-0">
            <span class="block mb-4 text-lg font-semibold text-primary">Đến với chúng tôi</span>
            <h2 class="mb-5 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
              Giúp bạn có bữa ăn giá trị.
            </h2>
            <p class="mb-5 text-base text-body-color dark:text-dark-6">
              Mỗi món ăn đều gắn liền với truyền thống, phản ánh sự sáng tạo và khéo léo của người
              đầu bếp. Hương vị món ăn có thể mang lại cảm xúc, kết nối con người và tạo ra những kỷ
              niệm đáng nhớ.
            </p>
            <p class="mb-8 text-base text-body-color dark:text-dark-6">
              Món ăn không chỉ cung cấp dinh dưỡng mà còn mang giá trị văn hóa và tinh thần. Thưởng
              thức món ăn giúp ta trải nghiệm sự phong phú của ẩm thực, nuôi dưỡng tâm hồn và thể
              chất.
            </p>
            <a
              href="javascript:void(0)"
              class="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
            >
              Bắt đầu ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-orange-500 text-white py-12 px-4">
    <h2 class="text-2xl font-bold text-center">Tầm Nhìn Của Chúng Tôi</h2>
    <p class="mt-4 text-center max-w-2xl mx-auto">
      Mang đến những công thức nấu ăn ngon miệng và bổ dưỡng cho mọi người. Chúng tôi hướng tới việc
      cách mạng hóa ẩm thực gia đình, giúp mọi người dễ dàng tiếp cận những món ăn chất lượng từ
      khắp nơi.
    </p>
  </section>

  <div class="bg-white">
    <section class="text-center py-12 px-4">
      <h2 class="text-2xl font-bold">Sứ Mệnh Và Giá Trị</h2>
      <p class="mt-4 text-gray-700 max-w-2xl mx-auto">
        Sứ mệnh của chúng tôi là cung cấp những công thức nấu ăn phong phú, dễ làm và bổ dưỡng, tập
        trung vào sự sáng tạo, chất lượng và sự hài lòng của người dùng.
      </p>
      <div class="flex justify-center space-x-8 mt-8 animate-fadeIn">
        <div class="transition transform hover:scale-110">
          <h3 class="text-xl font-bold">100+</h3>
          <p class="text-gray-700">Công thức nấu ăn</p>
        </div>
        <div class="transition transform hover:scale-110">
          <h3 class="text-xl font-bold">10+</h3>
          <p class="text-gray-700">Năm Kinh Nghiệm</p>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 py-12 px-4 technology-section">
      <h2 class="text-2xl font-bold text-center">Nghệ Thuật Nấu Ăn Hiện Đại</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
        <div
          class="section-fade-in"
          :class="{ visible: isVisible }"
        >
          <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 class="text-xl font-bold">Công Thức Đơn Giản</h3>
            <p class="text-gray-700 mt-2">
              Chúng tôi cung cấp các công thức dễ làm cho mọi đối tượng, từ người mới bắt đầu đến
              đầu bếp chuyên nghiệp.
            </p>
          </div>
        </div>
        <div
          class="section-fade-in"
          :class="{ visible: isVisible }"
        >
          <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 class="text-xl font-bold">Chia Sẻ Kinh Nghiệm</h3>
            <p class="text-gray-700 mt-2">
              Tham gia cộng đồng và chia sẻ những kinh nghiệm nấu ăn của bạn với những người đam mê
              ẩm thực khác.
            </p>
          </div>
        </div>
        <div
          class="section-fade-in"
          :class="{ visible: isVisible }"
        >
          <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 class="text-xl font-bold">Công Thức Độc Đáo</h3>
            <p class="text-gray-700 mt-2">
              Khám phá những công thức nấu ăn độc đáo và mới lạ từ khắp nơi trên thế giới.
            </p>
          </div>
        </div>
        <div
          class="section-fade-in"
          :class="{ visible: isVisible }"
        >
          <div class="p-4 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow">
            <h3 class="text-xl font-bold">Hỗ Trợ Tận Tình</h3>
            <p class="text-gray-700 mt-2">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn trong quá trình nấu ăn, từ lựa chọn nguyên liệu đến
              mẹo nấu ăn.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Đội Ngũ Của Chúng Tôi
          </h2>
          <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Khám phá toàn bộ bộ sưu tập công thức nấu ăn và hướng dẫn được xây dựng với các lớp tiện
            ích từ Tailwind.
          </p>
        </div>
        <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <div
            class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                alt="Bonnie Avatar"
              />
            </a>
            <div class="p-5">
              <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Nguyễn Minh Duy</a>
              </h3>
              <span class="text-gray-500 dark:text-gray-400">CEO & Software Engineer</span>
              <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Mặt trời có thể mọc hướng Tây, nhưng Minh Duy không thể thất bại được!
              </p>
              <ul class="flex space-x-4 sm:mt-0">
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                alt="Bonnie Avatar"
              />
            </a>
            <div class="p-5">
              <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Nguyễn Minh Duy</a>
              </h3>
              <span class="text-gray-500 dark:text-gray-400">CEO & Web Developer</span>
              <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Bonnie drives the technical strategy of the flowbite platform and brand.
              </p>
              <ul class="flex space-x-4 sm:mt-0">
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                alt="Bonnie Avatar"
              />
            </a>
            <div class="p-5">
              <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Nguyễn Minh Duy</a>
              </h3>
              <span class="text-gray-500 dark:text-gray-400">CEO & Web Developer</span>
              <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Bonnie drives the technical strategy of the flowbite platform and brand.
              </p>
              <ul class="flex space-x-4 sm:mt-0">
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div
            class="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <img
                class="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                alt="Jese Avatar"
              />
            </a>
            <div class="p-5">
              <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Bùi Thị Lệ Thắm</a>
              </h3>
              <span class="text-gray-500 dark:text-gray-400">CTO</span>
              <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Jese drives the technical strategy of the flowbite platform and brand.
              </p>
              <ul class="flex space-x-4 sm:mt-0">
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-200 text-white text-center py-12 px-4">
      <h2 class="text-2xl font-bold text-black">Ý Kiến Của Bạn Đọc</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 max-w-5xl mx-auto">
        <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-orange-500 transition-colors">
          <p>"Công thức rất dễ làm! Tôi đã thử và cả gia đình đều thích."</p>
          <h3 class="mt-4 font-bold">- Bạn Đọc A</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-orange-500 transition-colors">
          <p>"Rất nhiều công thức ngon và độc đáo. Tôi sẽ quay lại để tìm thêm."</p>
          <h3 class="mt-4 font-bold">- Bạn Đọc B</h3>
        </div>
        <div class="p-4 shadow-lg rounded-lg bg-green-600 hover:bg-orange-500 transition-colors">
          <p>"Các hướng dẫn rất chi tiết, giúp tôi nấu ăn dễ dàng hơn."</p>
          <h3 class="mt-4 font-bold">- Bạn Đọc C</h3>
        </div>
      </div>
    </section>

    <section class="text-center py-12 px-4 w-full">
      <h2 class="text-2xl font-bold">Câu Hỏi Thường Gặp Về Công Thức Nấu Ăn</h2>
      <div class="mt-8">
        <div class="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90">
          <h3 class="text-xl font-bold">Tôi có thể tìm công thức nấu ăn ở đâu?</h3>
          <p class="mt-2 text-gray-700">
            Bạn có thể tìm thấy rất nhiều công thức trên trang web của chúng tôi, được phân loại
            theo món ăn và nguyên liệu.
          </p>
        </div>
        <div
          class="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4"
        >
          <h3 class="text-xl font-bold">Có những loại món ăn nào có sẵn?</h3>
          <p class="mt-2 text-gray-700">
            Chúng tôi cung cấp công thức cho các món ăn chính, món phụ, đồ tráng miệng và nhiều hơn
            nữa.
          </p>
        </div>
        <div
          class="p-4 border rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4"
        >
          <h3 class="text-xl font-bold">Tôi có thể gửi công thức của mình không?</h3>
          <p class="mt-2 text-gray-700">
            Có, chúng tôi rất hoan nghênh bạn gửi công thức của mình để chia sẻ với cộng đồng!
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes slide {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide {
  animation: slide 3s ease forwards;
}

.section-fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.section-fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
