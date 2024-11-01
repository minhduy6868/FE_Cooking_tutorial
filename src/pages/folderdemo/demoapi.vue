<template>
  <div class="user-list">
    <h1>Danh Sách Người Dùng</h1>
    <form @submit.prevent="addUserHandler">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="newUser.username" required />
      </div>
      <div>
        <label for="avatar">Avatar URL:</label>
        <input type="text" v-model="newUser.avatar" required />
      </div>
      <button type="submit">Thêm Người Dùng</button>
    </form>

    <div v-if="loading">Đang tải...</div>
    <div v-if="error">{{ error }}</div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="user in users" :key="user.id" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
        <img class="rounded-t-lg" :src="user.avatar" :alt="user.username" />
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold">{{ user.username }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getListUserDemo, addUser } from '@/services/userdemo'; // Đảm bảo đường dẫn đúng
import type { UserDemo } from '@/types/userdemo';

const users = ref<UserDemo[]>([]);
const newUser = ref<UserDemo>({ username: '', avatar: '' });
const loading = ref(true);
const error = ref<string | null>(null);

const fetchUsers = async () => {
  try {
    users.value = await getListUserDemo(); // Gọi API để lấy danh sách người dùng
  } catch (err) {
    console.error('Lỗi khi gọi API:', err);
    error.value = 'Lỗi khi tải dữ liệu: ' + err.message;
  } finally {
    loading.value = false;
  }
};

const addUserHandler = async () => {
  try {
    const addedUser = await addUser(newUser.value); // Gọi API để thêm người dùng
    users.value.push(addedUser); // Thêm người dùng mới vào danh sách
    newUser.value = { username: '', avatar: '' }; // Reset form
  } catch (err) {
    console.error('Lỗi khi thêm người dùng:', err);
    error.value = 'Lỗi khi thêm người dùng: ' + err.message;
  }
};

onMounted(fetchUsers); // Gọi fetchUsers khi component được mount
</script>

<style scoped>
.user-list {
  padding: 20px;
}
.user-list h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
