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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getAllUser } from '@/services/authen' // Đảm bảo import từ service đúng
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
        const response = await getAllUser() // Gọi từ service
        if (response.status === 200) {
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

    // Lấy dữ liệu khi component mount
    onMounted(() => {
      fetchUsers()
    })

    return {
      users,
      loading,
      error,
    }
  },
})
</script>

<style scoped>
.error {
  color: red;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>
