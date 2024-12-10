<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserInfo, updateUser, deleteAccount, updateAvatar } from '@/services/user'
import type { User } from '@/types/user'
import router from '@/routers/router'
import { showToast } from '@/utils/toast'
import CardCooking from '@/components/ui/card/CardCooking.vue'
import Swal from 'sweetalert2'

// Dữ liệu người dùng và bài đăng
const userInfo = ref<User | null>(null)
const likedPosts = ref<any[]>([]) // Biến lưu danh sách bài đã thích
const posts = ref<any[]>([]) // Danh sách bài đăng (post)
const isEditing = ref(false) // Biến theo dõi trạng thái chỉnh sửa
const updatedInfo = ref({
  fullName: '',
  description: '',
  phoneNumber: '',
  address: '',
})

onMounted(async () => {
  try {
    const userData = await getUserInfo()
    userInfo.value = userData.data
    posts.value = userData.data.post || [] // Danh sách bài đăng
    likedPosts.value = userData.data.likePosts || [] // Gán danh sách bài đã thích
    console.log('in ra likepost là: ' + userData.data.likePosts)
    console.log('in ra post là: ' + userData.data.post)
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error)
  }
})

const handleAvatarChange = async (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  if (fileInput.files?.length) {
    const avatarFile = fileInput.files[0]
    try {
      const response = await updateAvatar(avatarFile)
      if (userInfo.value) {
        userInfo.value.avatar = response.data // Update the avatar in userInfo
      }
      showToast({
        title: 'Cập nhật avatar thành công!',
        description: 'Avatar của bạn đã được cập nhật.',
        variant: 'default',
        duration: 3000,
      })
    } catch (error) {
      console.error('Lỗi khi cập nhật avatar:', error)
      showToast({
        title: 'Cập nhật avatar thất bại!',
        description: 'Vui lòng thử lại sau.',
        variant: 'error',
        duration: 3000,
      })
    }
  }
}
// Hàm xóa tài khoản người dùng
const deleteUser = async () => {
  const result = await Swal.fire({
    title: 'Bạn có chắc không?',
    text: 'Bạn xóa tài khoản thì không thể hoàn tác được đâu.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Có, Xóa',
    cancelButtonText: 'Hủy',
    reverseButtons: true,
    customClass: {
      popup: 'bg-white shadow-lg rounded-xl',
      title: 'text-xl font-semibold text-gray-800',
      content: 'text-gray-600 text-sm',
      confirmButton: 'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
      cancelButton: 'bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400',
    },
  })

  if (!result.isConfirmed) return

  try {
    await deleteAccount()
    showToast({
      title: 'Xóa tài khoản thành công',
      description: 'Bạn đã xóa tài khoản, vui lòng đăng nhập lại để tiếp tục',
      variant: 'default',
      duration: 5000,
    })
    router.push('/login')
  } catch (error) {
    console.error('Lỗi khi xóa tài khoản:', error)
    Swal.fire({
      icon: 'error',
      title: 'Có lỗi xảy ra!',
      text: 'Vui lòng thử lại sau.',
    })
  }
}

// Hàm cập nhật thông tin người dùng
const updateUserInfo = async () => {
  try {
    if (userInfo.value) {
      const response = await updateUser({
        fullName: updatedInfo.value.fullName,
        description: updatedInfo.value.description,
        phoneNumber: updatedInfo.value.phoneNumber,
        address: updatedInfo.value.address,
      })
      userInfo.value = { ...userInfo.value, ...response.data }
      isEditing.value = false
      console.log('Thông tin đã được cập nhật!')
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin:', error)
  }
}
</script>

<template>
  <section class="w-full overflow-hidden dark:bg-gray-900">
    <div class="flex flex-col">
      <!-- Cover Image -->
      <div class="relative w-full">
        <img
          :src="
            userInfo?.profile ||
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080'
          "
          alt="User Cover"
          class="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem] object-cover"
        />

        <!-- Profile Image and Name -->
        <div
          class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <div
            class="w-[141px] h-[141px] rounded-full bg-cover bg-center bg-no-repeat flex justify-center items-end relative"
            :style="{
              backgroundImage: `url(${userInfo?.avatar || 'https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205251_wh1200.png'})`,
            }"
          >
            <input
              id="upload_profile"
              type="file"
              name="profile"
              hidden
              required
              @change="handleAvatarChange"
            />
            <label
              for="upload_profile"
              class="bg-white rounded-full w-6 h-6 text-center absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 flex items-center justify-center cursor-pointer"
            >
              <svg
                class="w-5 h-5 text-blue-700"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                ></path>
              </svg>
            </label>
          </div>
          <h1
            class="mx-5 my-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif text-center"
          >
            {{ userInfo?.fullName || 'Chưa xác định' }}
          </h1>
        </div>
      </div>

      <!-- Description and Details -->
      <div
        class="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-6 items-center my-6 mt-24"
      >
        <p class="text-center w-fit text-gray-700 dark:text-gray-400 text-md">
          {{ userInfo?.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit.' }}
        </p>

        <!-- Button to trigger edit form -->
        <!-- Buttons for editing and deleting -->
        <div class="flex gap-4">
          <button
            class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            @click="isEditing = !isEditing"
          >
            {{ isEditing ? 'Cancel Edit' : 'Chỉnh sửa thông tin' }}
          </button>
          <button
            class="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-300"
            @click="deleteUser"
          >
            Xóa tài khoản
          </button>
        </div>
        <!-- Edit Form -->
        <div
          v-if="isEditing"
          class="w-full mt-4"
        >
          <form @submit.prevent="updateUserInfo">
            <div class="mb-4">
              <label
                for="fullName"
                class="block text-sm font-medium text-gray-700"
                >Họ và tên</label
              >
              <input
                id="fullName"
                v-model="updatedInfo.fullName"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Họ và tên"
              />
            </div>
            <div class="mb-4">
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Mô tả</label
              >
              <textarea
                id="description"
                v-model="updatedInfo.description"
                rows="4"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Mô tả về bạn"
              ></textarea>
            </div>
            <div class="mb-4">
              <label
                for="phoneNumber"
                class="block text-sm font-medium text-gray-700"
                >Số điện thoại</label
              >
              <input
                id="phoneNumber"
                v-model="updatedInfo.phoneNumber"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Số điện thoại"
              />
            </div>
            <div class="mb-4">
              <label
                for="address"
                class="block text-sm font-medium text-gray-700"
                >Địa chỉ</label
              >
              <input
                id="address"
                v-model="updatedInfo.address"
                type="text"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Địa chỉ"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Cập nhật thông tin
            </button>
          </form>
        </div>
        <div class="w-full my-auto py-6 flex flex-col gap-4">
          <div class="w-full flex sm:flex-row xs:flex-col gap-4">
            <div class="w-full">
              <dl
                class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
              >
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Họ và tên</dt>
                  <dd class="text-lg font-semibold">{{ userInfo?.fullName || 'Unknown' }}</dd>
                </div>
                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Số điện thoại</dt>
                  <dd class="text-lg font-semibold">
                    {{ userInfo?.phoneNumber || 'Not Provided' }}
                  </dd>
                </div>
              </dl>
            </div>
            <div class="w-full">
              <dl
                class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700"
              >
                <div class="flex flex-col pb-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                  <dd class="text-lg font-semibold">{{ userInfo?.email || 'Not Provided' }}</dd>
                </div>

                <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Địa chỉ</dt>
                  <dd class="text-lg font-semibold">{{ userInfo?.address || 'Not Provided' }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recipe Cards -->
    <h2
      class="ml-4 mr-4 mx-auto bg-gradient-to-r from-orange-400 to-yellow-300 text-white text-xl font-bold text-center p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
    >
      Danh sách món ăn
    </h2>
    <div class="container px-6 py-6 mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Loop through posts and display each one -->
        <div
          v-for="post in posts"
          :key="post.id"
          class="post-card"
        >
          <!-- Sử dụng CardCooking để hiển thị từng món ăn -->
          <router-link :to="`/post/detail/${post.id}`">
            <CardCooking
              :title="post.title"
              :description="post.description"
              :image="post?.pictures?.[0]?.link || 'https://via.placeholder.com/130'"
              :link="post.linkVideo"
              :category="post.typePost || 'Chưa có thể loại'"
              :time="post.commentPosts || 'Chưa rõ thời gian'"
              :like-count="post.likeCount"
            />
          </router-link>
        </div>
      </div>
    </div>

    <!-- Liked Recipe Cards -->
    <h2
      class="ml-4 mr-4 mx-auto bg-gradient-to-r from-green-400 to-blue-300 text-white text-xl font-bold text-center p-4 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
    >
      Danh sách món ăn đã thích
    </h2>
    <div class="container px-6 py-6 mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <!-- Loop through likedPosts and display each one -->
        <div
          v-for="post in likedPosts"
          :key="post.id"
          class="post-card"
        >
          <!-- Sử dụng CardCooking để hiển thị từng món ăn đã thích -->
          <router-link :to="`/post/detail/${post.id}`">
            <CardCooking
              :title="post.title"
              :description="post.description"
              :image="post?.pictures?.[0]?.link || 'https://via.placeholder.com/130'"
              :link="post.linkVideo"
              :category="post.typePost || 'Chưa có thể loại'"
              :time="post.commentPosts || 'Chưa rõ thời gian'"
              :like-count="post.likeCount"
            />
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>
