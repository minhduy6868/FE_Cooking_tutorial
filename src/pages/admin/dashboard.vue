<template>
  <div class="">
    <div class="bg-teal-600">
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
              Thông tin với tư cách admin tối cao, bạn có mọi quyền trong trang web! Nếu có lỗi
            </p>
          </div>
          <div class="mt-2 w-full flex-shrink-0 lg:mt-0 lg:w-auto">
            <a
              class="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow-sm hover:bg-teal-50"
              href="#pricing"
              >Liên hệ developer!
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 gap-8 p-10 lg:grid-cols-2 xl:grid-cols-4">
    <!-- Value card: Số người truy cập -->
    <div class="flex items-center shadow justify-between p-4 bg-white rounded-md">
      <div>
        <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
          Tông số bài viết
        </h6>
        <span class="text-xl font-semibold">{{ userPostCount?.post || '0' }}</span>
        <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
          +{{ userPostCount?.postChange || '0' }}%
        </span>
      </div>
      <div>
        <span>
          <svg
            class="w-12 h-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
        </span>
      </div>
    </div>

    <!-- Value card: Số người truy cập -->
    <div class="flex items-center shadow justify-between p-4 bg-white rounded-md">
      <div>
        <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
          Số người truy cập
        </h6>
        <span class="text-xl font-semibold">{{ userPostCount?.post || '1993' }}</span>
        <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
          +{{ userPostCount?.postChange || '0' }}%
        </span>
      </div>
      <div>
        <span>
          <svg
            class="w-12 h-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
        </span>
      </div>
    </div>

    <!-- Users card: Tổng số người dùng -->
    <div class="flex items-center shadow justify-between p-4 bg-white rounded-md">
      <div>
        <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
          Tổng số người dùng
        </h6>
        <span class="text-xl font-semibold">{{ userPostCount?.user || '0' }}</span>
        <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
          +{{ userPostCount?.userChange || '0' }}%
        </span>
      </div>
      <div>
        <span>
          <svg
            class="w-12 h-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
        </span>
      </div>
    </div>

    <!-- Value card: Số người truy cập -->
    <div class="flex items-center shadow justify-between p-4 bg-white rounded-md">
      <div>
        <h6 class="text-xs font-medium leading-none tracking-wider text-gray-500 uppercase">
          Tỉ lệ tăng trưởng
        </h6>
        <span class="text-xl font-semibold">20,516</span>
        <span class="inline-block px-2 py-px ml-2 text-xs text-green-500 bg-green-100 rounded-md">
          +3.1%
        </span>
      </div>
      <div>
        <span>
          <svg
            class="w-12 h-12 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  </div>

  <!-- Biểu đồ 1 -->
  <div class="ml-10 mt-10 mr-10">
    <!-- Thêm khoảng cách từ viền trái -->
    <h1 class="text-3xl font-bold mb-10">Tốc độ tăng trưởng của người dùng</h1>
    <!-- Tăng kích thước chữ và in đậm -->
    <canvas id="myChart"></canvas>
  </div>

  <!-- Biểu đồ 2 -->
  <div class="ml-10 mt-20 mr-10 mb-20">
    <!-- Thêm khoảng cách từ viền trái -->
    <h1 class="text-3xl font-bold mb-10">Tổng số công thức nấu ăn theo tháng</h1>
    <!-- Tăng kích thước chữ và in đậm -->
    <canvas id="myChart2"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getUserPostCount } from '@/services/admin'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const userPostCount = ref<{
      user: number
      post: number
      userChange: number
      postChange: number
    } | null>(null)

    onMounted(async () => {
      try {
        const response = await getUserPostCount()
        if (response.data) {
          userPostCount.value = {
            user: response.data.user,
            post: response.data.post,
            userChange: 2.6,
            postChange: 4.4,
          }
        } else {
          console.error('Không thể lấy dữ liệu')
        }

        // First chart
        const ctx = document.getElementById('myChart')?.getContext('2d')
        if (ctx) {
          new Chart(ctx, {
            type: 'line',
            data: {
              labels: [
                'Tháng 1',
                'Tháng 2',
                'Tháng 3',
                'Tháng 4',
                'Tháng 5',
                'Tháng 6',
                'Tháng 7',
                'Tháng 8',
                'Tháng 9',
              ],
              datasets: [
                {
                  label: 'Người dùng',
                  data: [12, 19, 3, 5, 2, 3, 14, 11, 122],
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: { beginAtZero: true },
              },
            },
          })
        }

        // Second chart
        const ctx2 = document.getElementById('myChart2')?.getContext('2d')
        if (ctx2) {
          new Chart(ctx2, {
            type: 'bar',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              datasets: [
                {
                  label: 'Công thức nấu ăn ',
                  data: [112, 10, 225, 134, 55, 100, 35, 60, 200],
                  backgroundColor: '#34D399',
                  borderColor: '#34D399',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                y: { beginAtZero: true },
              },
            },
          })
        }
      } catch (error) {
        console.error('Error fetching user post count:', error)
      }
    })

    return {
      userPostCount,
    }
  },
})
</script>
