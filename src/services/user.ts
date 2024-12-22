// src/services/userService.ts
import api from '@/api/api_client'
import type { BaseResponse } from '@/types/baseapi'
import type { User } from '@/types/user'

// Lấy thông tin người dùng
export const getUserInfo = async (): Promise<BaseResponse<User>> => {
  try {
    const response = await api.get<BaseResponse<User>>('/user/myInfo')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể lấy thông tin người dùng')
    }
  } catch (error: any) {
    handleApiError(error)
    throw error
  }
}

export const updateUser = async (userUpdateData: Partial<User>): Promise<BaseResponse<User>> => {
  try {
    const response = await api.put<BaseResponse<User>>('/user/updateUser', userUpdateData)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể cập nhật thông tin người dùng')
    }
  } catch (error: any) {
    handleApiError(error)
    throw error
  }
}

export const getAllUsers = async (): Promise<BaseResponse<User[]>> => {
  try {
    const response = await api.get<BaseResponse<User[]>>('/user/getAllUser')
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể lấy danh sách người dùng')
    }
  } catch (error: any) {
    handleApiError(error)
    throw error
  }
}

export const deleteAccount = async (): Promise<BaseResponse> => {
  try {
    const response = await api.delete<BaseResponse>('/user/deleteAccount')

    if (response.status === 200) {
      localStorage.removeItem('access_token')
      return response.data
    } else {
      throw new Error(response.data.message || 'Không thể xóa tài khoản')
    }
  } catch (error: any) {
    handleApiError(error)
    throw error
  }
}

const handleApiError = (error: any) => {
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
        alert(`Lỗi xác thực: ${errorMessage}`)
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
}

export const updateAvatar = async (avatarFile: File): Promise<BaseResponse> => {
  const formData = new FormData()
  formData.append('image', avatarFile)

  try {
    const response = await api.put<BaseResponse>('/user/updateAvatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể cập nhật avatar')
    }
  } catch (error: any) {
    handleApiError(error)
    throw error
  }
}

export const getInfoUser = async (userId: string): Promise<BaseResponse<User>> => {
  try {
    const response = await api.get<BaseResponse<User>>(`/user/info/${userId}`)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Failed to fetch user info')
    }
  } catch (error: any) {
    console.error('Error fetching user info:', error)
    handleApiError(error)
    throw error
  }
}
