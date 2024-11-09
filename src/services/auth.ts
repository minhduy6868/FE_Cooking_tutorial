import type { BaseResponse } from '@/types/api'

export const loginApi = async (
  email: string,
  password: string,
): Promise<BaseResponse<{ token: string; authenticated: boolean }>> => {
  try {
    // Gửi yêu cầu đăng nhập đến API
    const response = await $api(
      '/login',
      {
        method: 'POST',
        body: {
          email,
          password,
        },
      },
      false,
    )

    // Kiểm tra dữ liệu trả về từ API
    if (response.status === 200 && response.data && response.data.token) {
      // Lưu token vào localStorage
      localStorage.setItem('access_token', response.data.token)

      // Trả về thông tin thành công
      return response
    } else {
      // Nếu không có token trong response, ném lỗi
      throw new Error('Invalid response data')
    }
  } catch (error) {
    console.error('Login API error:', error)
    throw error // Ném lỗi để caller có thể xử lý
  }
}

interface RegisterBody {
  email: string
  password: string
  name: string
}

export const registerApi = async (data: RegisterBody): Promise<any> => {
  return $api('/auth/register', { body: data, method: 'POST' }, false)
}

export const confirmEmailApi = async (token: string): Promise<any> => {
  return $api('/users/confirm', { query: { token: token } })
}

export const forgotPasswordApi = async (email: string): Promise<any> => {
  return $api('/users/forgot-password', {
    method: 'POST',
    body: { email },
  })
}

interface ChangePasswordPayload {
  old_password: string
  new_password: string
  confirm_new_password: string
}
export const changePasswordApi = async (payload: ChangePasswordPayload): Promise<any> => {
  return $api('/users/change-password', {
    method: 'POST',
    body: payload,
  })
}

interface ProfileBody {
  first_name: string
  last_name: string
}

export const updateProfileApi = async (payload: ProfileBody): Promise<any> => {
  return $api('/users/info', {
    method: 'POST',
    body: payload,
  })
}
