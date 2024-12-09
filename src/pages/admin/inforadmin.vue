<template>
  <div class="">
    <div class="bg-orange-500">
      <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex flex-col items-center justify-between lg:flex-row lg:justify-center">
          <div class="flex flex-1 items-center lg:mr-3 lg:flex-none">
            <p class="ml-3 text-center font-medium text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                class="mr-2 hidden h-6 w-6 lg:inline"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                ></path>
              </svg>
             Công ty OJK Global là tập đoàn phát triển trang web này! Liên hệ để phát triển website 
            </p>
          </div>
          <div class="mt-2 w-full flex-shrink-0 lg:mt-0 lg:w-auto">
            <a
              class="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-orange-500 shadow-sm hover:bg-teal-50"
              href="#pricing"
              >Bắt đầu ngay!
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen font-roboto">
    <div class="container mx-auto px-4 py-10">

      <!-- Giới thiệu về Website -->
      <section class="mb-10">
        <h1 class="text-4xl font-extrabold text-orange-800 mb-6 border-b-2 border-orange-800 pb-2">Giới thiệu về Website</h1>
        <h2 class="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-4">Mô tả</h2>
        <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Trang web của chúng tôi là một nền tảng chia sẻ và học tập về nấu ăn, nơi người dùng có thể tìm kiếm các công thức nấu ăn đa dạng, học hỏi từ các chuyên gia ẩm thực và cộng đồng người yêu ẩm thực. Mục tiêu của website là trở thành nơi để mọi người khám phá những món ăn mới và chia sẻ kiến thức ẩm thực một cách sáng tạo, phong phú.
        </p>
      </section>

      <!-- Điều khoản sử dụng -->
      <section class="mb-10">
        <h1 class="text-4xl font-extrabold text-orange-800 mb-6 border-b-2 border-orange-800 pb-2">Điều khoản sử dụng</h1>

        <!-- Quyền và trách nhiệm của người dùng -->
        <h2 class="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-4">Quyền và trách nhiệm của người dùng</h2>
        <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
          Người dùng khi truy cập và sử dụng website cần tuân thủ các quy định về đạo đức, văn hóa và pháp luật. Người dùng có quyền tìm kiếm, học hỏi và chia sẻ thông tin, nhưng cũng cần chịu trách nhiệm về nội dung mà mình đóng góp trên website.
        </p>

        <!-- Các hành vi bị cấm -->
        <h2 class="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-4">Các hành vi bị cấm</h2>
        <ul class="list-disc pl-6 text-lg text-gray-700 dark:text-gray-300 space-y-2">
          <li class="hover:text-red-600 transition-colors">Spam hoặc đăng tải nội dung quảng cáo không phù hợp.</li>
          <li class="hover:text-red-600 transition-colors">Chia sẻ, phát tán nội dung vi phạm bản quyền hoặc không đúng pháp luật.</li>
          <li class="hover:text-red-600 transition-colors">Xúc phạm, đe dọa hoặc làm tổn thương các thành viên khác.</li>
        </ul>
      </section>

      <!-- Bảo mật và Quyền riêng tư -->
      <section class="mb-10">
        <h1 class="text-4xl font-extrabold text-orange-800 mb-6 border-b-2 border-orange-800 pb-2">Bảo mật và Quyền riêng tư</h1>

        <!-- Chính sách thu thập, sử dụng và bảo vệ thông tin cá nhân -->
        <h2 class="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-4">Chính sách thu thập, sử dụng và bảo vệ thông tin cá nhân</h2>
        <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
          Chúng tôi cam kết bảo mật thông tin cá nhân của người dùng. Các thông tin mà người dùng cung cấp sẽ được sử dụng nhằm mục đích cải thiện trải nghiệm của người dùng và không vì bất kỳ mục đích thương mại nào khác.
        </p>

        <!-- Cam kết về việc không chia sẻ thông tin người dùng với bên thứ ba -->
        <h2 class="text-2xl font-bold text-orange-700 dark:text-orange-300 mb-4">Cam kết về việc không chia sẻ thông tin người dùng với bên thứ ba</h2>
        <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Chúng tôi cam kết sẽ không bán, chia sẻ hoặc tiết lộ thông tin cá nhân của người dùng cho bất kỳ bên thứ ba nào, ngoại trừ khi có sự cho phép của người dùng hoặc khi yêu cầu bởi pháp luật.
        </p>
      </section>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.font-roboto {
  font-family: 'Roboto', sans-serif;
}

.container {

}

section {
  padding-bottom: 1rem;
}

</style>
