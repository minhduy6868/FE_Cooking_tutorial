<template>
  <div>
    <h2>Danh sách người dùng</h2>

    <!-- Trạng thái Loading và Error -->
    <div v-if="loading">Loading...</div>
    <div
      v-if="error"
      class="error"
    >
      {{ error }}
    </div>

    <!-- Danh sách người dùng -->
    <table
      v-if="!loading && !error"
      class="min-w-full divide-y divide-gray-200 overflow-x-auto"
    >
      <thead class="bg-gray-50">
        <tr>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Avatar
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Full Name
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Email
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Phone Number
          </th>
          <th
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="user in users"
          :key="user.id"
        >
          <td class="px-6 py-4 whitespace-nowrap">
            <img
              :src="user.avatar"
              alt="User Avatar"
              class="h-10 w-10 rounded-full"
            />
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ user.fullName }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.phoneNumber }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <!-- Thêm nút xóa -->
            <button
              class="text-red-600 hover:text-red-800"
              @click="handleDelete(user.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getAllUser, deleteUser } from '@/services/admin' // Import các hàm API
import type { User } from '@/types/user'

export default defineComponent({
  name: 'UsersList',
  setup() {
    const users = ref<User[]>([])
    const loading = ref<boolean>(true)
    const error = ref<string | null>(null)

    // Hàm gọi API lấy danh sách người dùng
    const fetchUsers = async () => {
      try {
        const response = await getAllUser() // Gọi API để lấy danh sách người dùng
        if (response.data) {
          users.value = response.data
        } else {
          error.value = response.message
        }
      } catch (err) {
        error.value = 'Đã có lỗi xảy ra, vui lòng thử lại.'
      } finally {
        loading.value = false
      }
    }

    // Hàm gọi API xóa người dùng
    const handleDelete = async (userId: string) => {
      if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        try {
          const response = await deleteUser(userId) // Gọi API xóa người dùng
          if (response.data) {
            // Cập nhật lại danh sách người dùng sau khi xóa
            users.value = users.value.filter((user) => user.id !== userId)
            alert('Người dùng đã được xóa thành công.')
          } else {
            alert(response.message || 'Không thể xóa người dùng.')
          }
        } catch (err) {
          alert('Có lỗi xảy ra khi xóa người dùng.')
        }
      }
    }

    // Lấy dữ liệu khi component mount
    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      loading,
      error,
      handleDelete, // Trả về hàm xóa người dùng
    }
  },
})
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

button {
  background-color: transparent;
  border: none;
  color: #e53e3e;
  cursor: pointer;
}

button:hover {
  text-decoration: underline;
}
</style>
