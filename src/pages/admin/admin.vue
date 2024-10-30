<template>
    <div>
      <h1>User List</h1>
      <div v-if="error" class="error">{{ error }}</div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.address.street }}, {{ user.address.city }}</td>
            <td>{{ user.company.name }}</td>
          </tr>
        </tbody>
      </table>
      <p>{{ response }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getListUserDemo } from '@/services/userdemo';
  import type { UserDemo } from '@/types/userdemo';
  import type { BaseResponse } from '@/types/api';
  
  export default defineComponent({
    name: 'UserList',
    setup() {
      const users = ref<UserDemo[]>([]);
      const error = ref<string | null>(null);
        const response ref< BaseResponse<UserDemo[]>> = await getListUserDemo();
      const fetchUsers = async () => {
        try {
          const response: BaseResponse<UserDemo[]> = await getListUserDemo();
          console.log('Response:', response); // Kiểm tra phản hồi từ API
          if (response && Array.isArray(response.data)) {
            users.value = response.data; // Giả định response.data chứa mảng người dùng
          } else {
            error.value = 'Invalid data format';
          }
        } catch (err) {
          error.value = 'Failed to fetch users';
          console.error(err);
        }
      };
  
      onMounted(() => {
        fetchUsers();
      });
  
      return {
        users,
        error,
      };
    },
  });
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .error {
    color: red;
  }
  </style>
  