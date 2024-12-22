<template>
  <div>
    <h2>Danh sách người dùng</h2>
    <div v-if="loading">Loading...</div>
    <div
      v-if="error"
      class="error"
    >
      {{ error }}
    </div>
    <ul v-if="!loading && !error">
      <li
        v-for="user in users"
        :key="user.id"
      >
        <img
          :src="user.avatar"
          alt="User Avatar"
          width="50"
        />
        <h3>{{ user.fullName }}</h3>
        <p>{{ user.email }}</p>
        <p>{{ user.phoneNumber }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { getAllUser } from '@/services/authen'
import type { User } from '@/types/user'

export default defineComponent({
  name: 'UsersList',
  setup() {
    const users = ref<User[]>([])
    const loading = ref<boolean>(true)
    const error = ref<string | null>(null)

    const fetchUsers = async () => {
      try {
        const response = await getAllUser()
        if (response.status === 200) {
          users.value = response.data
        } else {
          error.value = response.message
        }
      } catch (err) {
        error.value = 'Something went wrong!'
      } finally {
        loading.value = false
      }
    }

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
</style>
