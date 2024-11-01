/*
// userdemo.ts
import type { BaseResponse } from '@/types/api';
import type { UserDemo } from '@/types/userdemo'; // Đảm bảo đường dẫn đúng

export const getListUserDemo = async (): Promise<BaseResponse<UserDemo[]>> => {
  return $api('/users', {
    method: 'GET',
  });
};

*/

import axios from 'axios';
import type { Photo } from '@/types/photo';

export const getListPhoto = async () => {
  const response = await axios.get<Photo[]>('https://jsonplaceholder.typicode.com/photos'); // Thay đổi URL nếu cần
  return response;
};