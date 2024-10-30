// userdemo.ts
import type { BaseResponse } from '@/types/api';
import type { UserDemo } from '@/types/userdemo'; // Đảm bảo đường dẫn đúng

export const getListUserDemo = async (): Promise<BaseResponse<UserDemo[]>> => {
  return $api('/users', {
    method: 'GET',
  });
};
