import axios from 'axios';
import type { UserDemo } from '@/types/userdemo';

export const getListUserDemo = async () => {
  const response = await axios.get<UserDemo[]>('http://localhost:8080/api/users'); // Đường dẫn API
  return response.data; // Trả về dữ liệu
};

export const addUser = async (user: UserDemo) => {
  const response = await axios.post<UserDemo>('http://localhost:8080/api/users', user);
  return response.data; // Trả về người dùng đã tạo
};
