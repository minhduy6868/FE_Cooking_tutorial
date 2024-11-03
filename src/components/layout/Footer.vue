<template>
  <div class="infor">
    <div class="px-4 pb-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div class="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-2">
          <a href="/" aria-label="Trở về trang chủ" title="Công ty" class="inline-flex items-center">
            <svg class="w-8 text-deep-purple-accent-400" viewBox="0 0 24 24" stroke-linejoin="round" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" stroke="currentColor" fill="none">
              <rect x="3" y="1" width="7" height="12"></rect>
              <rect x="3" y="17" width="7" height="6"></rect>
              <rect x="14" y="1" width="7" height="6"></rect>
              <rect x="14" y="11" width="7" height="12"></rect>
            </svg>
            <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">Công Ty</span>
          </a>

          <div class="mt-1 lg:max-w-sm">
            <router-link to="/admin">
              <a href="#" class="inline-flex items-center justify-center p-2 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-white hover:bg-orange-500 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="w-4 h-4 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                </svg>
                <span class="w-full">Đăng nhập với quyền admin</span>
                <svg class="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </router-link>

            <p class="text-sm text-gray-800">
              Khám phá công thức món ăn đa dạng và dễ làm, cùng mẹo nấu nướng tại website của chúng tôi!
            </p>
          </div>
        </div>

        <div class="space-y-2 text-sm">
          <p class="text-base font-bold tracking-wide text-gray-900">Liên hệ</p>
          <div class="flex">
            <p class="mr-1 text-gray-800">Điện thoại:</p>
            <a href="tel:850-123-5021" aria-label="Số điện thoại của chúng tôi" title="Số điện thoại của chúng tôi" class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">850-123-5021</a>
          </div>
          <div class="flex">
            <p class="mr-1 text-gray-800">Email:</p>
            <a href="mailto:info@lorem.mail" aria-label="Email của chúng tôi" title="Email của chúng tôi" class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">info@lorem.mail</a>
          </div>
          <div class="flex">
            <p class="mr-1 text-gray-800">Địa chỉ:</p>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" aria-label="Địa chỉ của chúng tôi" title="Địa chỉ của chúng tôi" class="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800">
              312 Đường Lovely, NY
            </a>
          </div>
        </div>

        <div>
          <span class="text-base font-bold tracking-wide text-gray-900">Khác</span>
          <div class="flex items-center mt-1 space-x-3">
            <a href="/" class="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
              <!-- SVG cho mạng xã hội -->
            </a>
            <!-- Thêm các liên kết mạng xã hội khác -->
          </div>

          <p class="text-sm text-gray-500">
            Nếu bạn có bất kì thắc mắc, hoặc phát hiện lỗi của trang web chúng tôi, vui lòng nhấn vào <a href="#" @click.prevent="openReportForm" class="text-deep-purple-accent-400 hover:underline">đây</a>.
          </p>
        </div>
      </div>
    </div>

    <footer class="bg-orange-500 text-white text-center py-8">
      <p>&copy; Bản quyền OJK Global. Tất cả quyền được bảo lưu. Thiết kế bởi Binary Boats⛵</p>
    </footer>

    <!-- Form báo cáo -->
    <div v-if="isReportFormOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <ReportForm @close="closeReportForm" />
    </div>
  </div>
</template>

<script lang="ts">
import ReportForm from '@/components/ui/form/ReportForm.vue';

export default {
  name: 'Footer',
  components: {
    ReportForm,
  },
  data() {
    return {
      isReportFormOpen: false,
    };
  },
  methods: {
    openReportForm() {
      this.isReportFormOpen = true;
    },
    closeReportForm() {
      this.isReportFormOpen = false;
    },
  },
}
</script>

<style scoped>
.infor {
  background-color: rgb(214, 236, 255);
}
</style>
