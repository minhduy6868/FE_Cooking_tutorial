
import type { Login } from '@/types/login' // Đảm bảo đường dẫn đúng
import type { User } from '@/types/user' // Đảm bảo đường dẫn đúng
import type { BaseResponse } from '@/types/baseapi' // Đảm bảo đường dẫn đúng
import api from '@/api/api_client'

// API đăng nhập
export const loginApi = async (email: string, password: string): Promise<Login> => {
  try {
    const response = await api.post<BaseResponse<Login>>(
      '/login',
      { email, password },
      {
        timeout: 5000, // 5 giây timeout
      },
    )

    if (response.status === 200 && response.data.data.authenticated) {
      return response.data.data // Trả về dữ liệu Login từ API
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

// Hàm service getAllUser
export const getAllUser = async (): Promise<BaseResponse<User[]>> => {
  try {
    const response = await api.get<BaseResponse<User[]>>(
      '/user/getAllUser',
      {
        timeout: 5000, // 5 giây timeout
      },
    )

    if (response.status === 200) {
      return response.data // Trả về dữ liệu đúng cấu trúc { status, message, data }
    } else {
      throw new Error('Không thể lấy danh sách người dùng.')
    }
  } catch (error: any) {
    // Xử lý lỗi tương tự như trong loginApi
    console.error('Error fetching users:', error)

    let errorMessage = 'Có lỗi xảy ra khi lấy danh sách người dùng.'
    if (error.response) {
      const status = error.response.status
      errorMessage = error.response.data.message || errorMessage
      console.error('Lỗi từ API:', error.response.data)
      console.error('Mã lỗi HTTP:', status)
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Yêu cầu đã bị hủy do thời gian chờ lâu.'
    } else if (error.request) {
      console.error('Không nhận được phản hồi từ server:', error.request)
      errorMessage = 'Không nhận được phản hồi từ server. Vui lòng thử lại sau.'
    } else {
      console.error('Lỗi trong quá trình gửi yêu cầu:', error.message)
    }

    return {
      status: 500,
      message: errorMessage,
      data: [],
    }
  }
}

export const getUserPostCount = async (): Promise<BaseResponse<{ post: number; user: number }>> => {
  try {
    const response = await api.get<BaseResponse<{ post: number; user: number }>>(
      '/user/admin/count',
      {
        timeout: 5000, // 5 giây timeout
      },
    )

    if (response.status === 200) {
      return response.data // Trả về dữ liệu đúng cấu trúc { status, message, data }
    } else {
      throw new Error('Không thể lấy dữ liệu đếm người dùng và bài viết.')
    }
  } catch (error: any) {
    // Xử lý lỗi như trong loginApi
    console.error('Error fetching user and post count:', error)

    let errorMessage = 'Có lỗi xảy ra khi lấy dữ liệu đếm người dùng và bài viết.'
    if (error.response) {
      const status = error.response.status
      errorMessage = error.response.data.message || errorMessage
      console.error('Lỗi từ API:', error.response.data)
      console.error('Mã lỗi HTTP:', status)
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Yêu cầu đã bị hủy do thời gian chờ lâu.'
    } else if (error.request) {
      console.error('Không nhận được phản hồi từ server:', error.request)
      errorMessage = 'Không nhận được phản hồi từ server. Vui lòng thử lại sau.'
    } else {
      console.error('Lỗi trong quá trình gửi yêu cầu:', error.message)
    }

    return {
      status: 500,
      message: errorMessage,
      data: { post: 0, user: 0 }, // Default values for failed request
    }
  }
}

export const deleteUser = async (userId: string): Promise<BaseResponse<any>> => {
  try {
    const response = await api.delete<BaseResponse<any>>(
      `/user/admin/delete/${userId}`,
      {
        timeout: 5000, // 5 giây timeout
      },
    )

    if (response.status === 200) {
      return response.data // Trả về dữ liệu thành công từ API
    } else {
      throw new Error('Không thể xóa người dùng.')
    }
  } catch (error: any) {
    // Xử lý lỗi như trong các hàm API trước
    console.error('Error deleting user:', error)

    let errorMessage = 'Có lỗi xảy ra khi xóa người dùng.'
    if (error.response) {
      const status = error.response.status
      errorMessage = error.response.data.message || errorMessage
      console.error('Lỗi từ API:', error.response.data)
      console.error('Mã lỗi HTTP:', status)
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Yêu cầu đã bị hủy do thời gian chờ lâu.'
    } else if (error.request) {
      console.error('Không nhận được phản hồi từ server:', error.request)
      errorMessage = 'Không nhận được phản hồi từ server. Vui lòng thử lại sau.'
    } else {
      console.error('Lỗi trong quá trình gửi yêu cầu:', error.message)
    }

    return {
      status: 500,
      message: errorMessage,
      data: null,
    }
  }
}
