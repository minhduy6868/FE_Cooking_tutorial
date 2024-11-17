import api from '@/api/api_client'
import type { BaseResponse } from '@/types/baseapi'
import type { Post } from '@/types/post'
import axios from 'axios'

export const getLinkImage = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('image', file) // Append file with key 'image'

  try {
    // Gửi yêu cầu POST để upload ảnh lên server
    const response = await axios.post('http://localhost:8080/cloudinary/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    // In ra response để xem kết quả
    console.log('API Response:', response.data)

    // Giả sử API trả về một chuỗi URL, trả URL trực tiếp
    return response.data // Vì API trả về URL trực tiếp, không cần kiểm tra thêm
  } catch (error) {
    // In chi tiết lỗi để dễ dàng debug
    console.error('Lỗi khi tải ảnh lên:', error)

    // Xử lý lỗi khi upload không thành công
    throw new Error(
      'Lỗi khi tải ảnh lên: ' + (error instanceof Error ? error.message : 'Không xác định'),
    )
  }
}


export const getAllPost = async (): Promise<BaseResponse<Post[]>> => {
  try {
    const response = await api.get<BaseResponse<Post[]>>('/user/getAllPost', {
      timeout: 5000, // 5 giây timeout
    })

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

