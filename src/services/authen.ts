import axios from 'axios'
import type { Login } from '@/types/login'
import type { User } from '@/types/user'
import type { BaseResponse } from '@/types/baseapi'
import type { OtpResponseData } from '@/types/otp'
import type { UpdatePasswordRequest } from '@/types/updatepass'
import api from '@/api/api_client'

export const loginApi = async (email: string, password: string): Promise<Login> => {
  try {
    const response = await axios.post<BaseResponse<Login>>(
      'http://localhost:8080/login',
      { email, password },
      {
        timeout: 5000,
      },
    )

    if (response.status === 200 && response.data.data.authenticated) {
      return response.data.data
    } else {
      throw new Error('Đăng nhập không thành công.')
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status
      const errorMessage = error.response.data.message || 'Có lỗi xảy ra từ API'

      console.error('Lỗi từ API:', error.response.data)
      console.error('Mã lỗi HTTP:', status)

      switch (status) {
        case 400:
          alert(`Yêu cầu không hợp lệ: ${errorMessage}`)
          break
        case 401:
          alert(`Lỗi xác thực: ${errorMessage}. Vui lòng kiểm tra thông tin đăng nhập.`)
          break
        case 404:
          alert(`API không tìm thấy: ${errorMessage}`)
          break
        case 500:
          alert(`Lỗi máy chủ: ${errorMessage}. Vui lòng thử lại sau.`)
          break
        default:
          alert(`Đã xảy ra lỗi: ${errorMessage}`)
      }
    } else if (error.code === 'ECONNABORTED') {
      alert('Yêu cầu đã bị hủy do thời gian chờ lâu.')
    } else if (error.request) {
      console.error('Không nhận được phản hồi từ server:', error.request)
      alert('Không nhận được phản hồi từ server. Vui lòng thử lại sau.')
    } else {
      console.error('Lỗi trong quá trình gửi yêu cầu:', error.message)
      alert('Lỗi trong quá trình gửi yêu cầu. Vui lòng thử lại.')
    }

    throw error
  }
}

export const getAllUser = async (): Promise<BaseResponse<User[]>> => {
  try {
    const response = await fetch('http://localhost:8080/user/getAllUser')

    if (!response.ok) {
      throw new Error(`Failed to fetch users. Status: ${response.status}`)
    }

    const data: BaseResponse<User[]> = await response.json()

    return {
      status: data.status,
      message: data.message,
      data: data.data,
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return {
      status: 500,
      message: 'Internal Server Error',
      data: [],
    }
  }
}

export const registerApi = async (user: {
  fullName: string
  email: string
  password: string
}): Promise<BaseResponse<User>> => {
  try {
    const response = await axios.post<BaseResponse<User>>('http://localhost:8080/user/DKUser', user)

    if (response.status === 200 && response.data) {
      return response.data
    } else {
      throw new Error('Đăng ký không thành công.')
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status
      const errorMessage = error.response.data.message || 'Có lỗi xảy ra từ API'

      console.error('Lỗi từ API:', error.response.data)
      console.error('Mã lỗi HTTP:', status)

      switch (status) {
        case 400:
          alert(`Yêu cầu không hợp lệ: ${errorMessage}`)
          break
        case 500:
          alert(`Lỗi máy chủ: ${errorMessage}. Vui lòng thử lại sau.`)
          break
        default:
          alert(`Đã xảy ra lỗi: ${errorMessage}`)
      }
    } else if (error.request) {
      console.error('Không nhận được phản hồi từ server:', error.request)
      alert('Không nhận được phản hồi từ server. Vui lòng thử lại sau.')
    } else {
      console.error('Lỗi trong quá trình gửi yêu cầu:', error.message)
      alert('Lỗi trong quá trình gửi yêu cầu. Vui lòng thử lại.')
    }

    throw error
  }
}

export const sendOtp = async (email: string): Promise<BaseResponse<OtpResponseData>> => {
  try {
    const response = await axios.post<BaseResponse<OtpResponseData>>(
      'http://localhost:8080/user/forgotPassword',
      { email },
      { timeout: 5000 },
    )

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể gửi OTP. Vui lòng thử lại sau.')
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status
      const errorMessage = error.response.data.message || 'Có lỗi xảy ra từ API'

      console.error('Lỗi từ API:', error.response.data)
      console.error('Mã lỗi HTTP:', status)

      switch (status) {
        case 400:
          alert(`Yêu cầu không hợp lệ: ${errorMessage}`)
          break
        case 404:
          alert(`API không tìm thấy: ${errorMessage}`)
          break
        case 500:
          alert(`Lỗi máy chủ: ${errorMessage}. Vui lòng thử lại sau.`)
          break
        default:
          alert(`Đã xảy ra lỗi: ${errorMessage}`)
      }
    } else if (error.code === 'ECONNABORTED') {
      alert('Yêu cầu đã bị hủy do thời gian chờ lâu.')
    } else if (error.request) {
      console.error('Không nhận được phản hồi từ server:', error.request)
      alert('Không nhận được phản hồi từ server. Vui lòng thử lại sau.')
    } else {
      console.error('Lỗi trong quá trình gửi yêu cầu:', error.message)
      alert('Lỗi trong quá trình gửi yêu cầu. Vui lòng thử lại.')
    }

    throw error
  }
}

export const updatePasswordApi = async (
  data: UpdatePasswordRequest,
): Promise<BaseResponse<any>> => {
  try {
    const response = await api.put<BaseResponse<any>>('/user/updatePass', data, {
      timeout: 5000,
    })

    if (response.status === 200 && response.data.status === 200) {
      return response.data
    } else {
      throw new Error('Cập nhật mật khẩu không thành công.')
    }
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status
      const errorMessage = error.response.data.message || 'Có lỗi xảy ra từ API'

      console.error('Lỗi từ API:', error.response.data)
      console.error('Mã lỗi HTTP:', status)

      switch (status) {
        case 400:
          alert(`Yêu cầu không hợp lệ: ${errorMessage}`)
          break
        case 404:
          alert(`Không tìm thấy API: ${errorMessage}`)
          break
        case 500:
          alert(`Lỗi máy chủ: ${errorMessage}. Vui lòng thử lại sau.`)
          break
        default:
          alert(`Đã xảy ra lỗi: ${errorMessage}`)
      }
    } else if (error.code === 'ECONNABORTED') {
      alert('Yêu cầu đã bị hủy do thời gian chờ lâu.')
    } else if (error.request) {
      console.error('Không nhận được phản hồi từ server:', error.request)
      alert('Không nhận được phản hồi từ server. Vui lòng thử lại sau.')
    } else {
      console.error('Lỗi trong quá trình gửi yêu cầu:', error.message)
      alert('Lỗi trong quá trình gửi yêu cầu. Vui lòng thử lại.')
    }

    throw error
  }
}
