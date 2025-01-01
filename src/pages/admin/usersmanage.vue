<template>
  <div class="ml-3">
    <h2 class="text-3xl font-bold">Danh sách người dùng</h2>

    <div v-if="!loading && !error" class="mb-10">
      <p><strong>Tổng số người dùng:</strong> {{ totalUsers }}</p>
    </div>

    <div v-if="loading" class="mb-4">Loading...</div>
    <div v-if="error" class="mb-4 text-red-500 font-bold">{{ error }}</div>

    <table v-if="!loading && !error" class="min-w-full divide-y divide-gray-200 overflow-x-auto">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình đại diện</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng số công thức</th>
          <th class="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Hành động</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in users" :key="user.id">
          <td class="px-6 py-4 whitespace-nowrap">
            <img
              :src="user.avatar || 'https://img.lovepik.com/free-png/20211130/lovepik-cartoon-avatar-png-image_401205251_wh1200.png'"
              alt="User Avatar"
              class="h-10 w-10 rounded-full"
            />
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.fullName }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.phoneNumber }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.post.length }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center gap-4">
            <!-- Show only delete icon if user is not admin@gmail.com -->
            <button
              v-if="!deletingUserId && user.email !== 'admin@gmail.com'"
              class="w-10 h-10 flex items-center justify-center rounded bg-gray-200 hover:bg-red-700 focus:outline-none"
              @click="handleDelete(user.id)"
            >
              <i class="fas fa-trash-alt text-red-500 text-xl"></i>
            </button>

            <span v-else-if="deletingUserId === user.id" class="text-sm text-gray-500">Deleting...</span>

            <!-- Show update icon for all users or only for admin@gmail.com -->
            <button
              v-if="!deletingUserId"
              class="w-10 h-10 flex items-center justify-center rounded bg-gray-200 hover:bg-yellow-600 focus:outline-none"
              @click="handleUpdate(user.id)"
            >
              <i class="fas fa-pencil-alt text-yellow-500 text-xl"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getAllUser, deleteUser } from '@/services/admin'
import type { User } from '@/types/user'
import { showToast } from '@/utils/toast'
import Swal from 'sweetalert2'

export default defineComponent({
  name: 'UsersList',
  setup() {
    const users = ref<User[]>([])
    const loading = ref<boolean>(true)
    const error = ref<string | null>(null)
    const totalUsers = ref<number>(0)
    const deletingUserId = ref<string | null>(null)

    const fetchUsers = async () => {
      try {
        const response = await getAllUser()
        if (response.data) {
          users.value = response.data
          totalUsers.value = users.value.length
        } else {
          error.value = response.message
        }
      } catch (err) {
        error.value = 'Đã có lỗi xảy ra, vui lòng thử lại.'
      } finally {
        loading.value = false
      }
    }

    const handleDelete = async (userId: string) => {
      const result = await Swal.fire({
        title: 'Bạn có chắc không?',
        text: 'Bạn có chắc là xóa người dùng này không.',
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

      if (result.isConfirmed) {
        deletingUserId.value = userId
        try {
          const response = await deleteUser(userId)
          if (!response.data) {
            users.value = users.value.filter((user) => user.id !== userId)
            totalUsers.value = users.value.length
            showToast({
              title: 'Xóa người dùng thành công!',
              description: 'Người dùng đã được xóa thành công.',
              variant: 'default',
              duration: 5000,
            })
          } else {
            showToast({
              title: 'Xóa người dùng thất bại!',
              description: response.message || 'Không thể xóa người dùng.',
              variant: 'default',
              duration: 5000,
            })
          }
        } catch (err) {
          showToast({
            title: 'Đã có lỗi xảy ra!',
            description: 'Có lỗi xảy ra khi xóa người dùng.',
            variant: 'default',
            duration: 5000,
          })
        } finally {
          deletingUserId.value = null
        }
      }
    }

    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      loading,
      error,
      totalUsers,
      handleDelete,
      deletingUserId,
    }
  },
})
</script>
<style scoped>
/* Add the base styles for both icons */
button {
  transition: background-color 0.3s ease;
}

/* Hover effect for the delete icon */
button:hover .fas.fa-trash-alt {
  color: white; /* Change the icon color to white when hovering */
}

button:hover {
  background-color: #e53e3e; /* Dark red background for delete icon on hover */
}

/* Hover effect for the update icon */
button:hover .fas.fa-pencil-alt {
  color: white; /* Change the icon color to white when hovering */
}

button:hover {
  background-color: #d69e2e; /* Dark yellow background for update icon on hover */
}
</style>