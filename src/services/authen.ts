import axios from 'axios'
import type { Login } from '@/types/login' // Đảm bảo đường dẫn đúng
import type { User } from '@/types/user' // Đảm bảo đường dẫn đúng
import type { BaseResponse } from '@/types/baseapi' // Đảm bảo đường dẫn đúng
// Đảm bảo đường dẫn đúng

// Gửi yêu cầu đăng nhập đến API
export const loginApi = async (email: string, password: string): Promise<Login> => {
  try {
    // Gửi yêu cầu POST đến API để đăng nhập
    const response = await axios.post<BaseResponse<Login>>('http://localhost:8080/login', {
      email,
      password,
    })

    // Kiểm tra nếu status code là 200 (thành công)
    if (response.status === 200 && response.data) {
      return response.data.data // Trả về dữ liệu Login từ API
    } else {
      throw new Error('Đăng nhập không thành công.')
    }
  } catch (error: any) {
    // Kiểm tra lỗi từ API (khi server trả về mã trạng thái không phải 2xx)
    if (error.response) {
      // Nếu lỗi trả về từ server
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
    }
    // Nếu lỗi không phải từ API, kiểm tra lỗi yêu cầu
    else if (error.request) {
      console.error('Không nhận được phản hồi từ server:', error.request)
      alert('Không nhận được phản hồi từ server. Vui lòng thử lại sau.')
    }
    // Nếu có lỗi trong quá trình thiết lập yêu cầu
    else {
      console.error('Lỗi trong quá trình gửi yêu cầu:', error.message)
      alert('Lỗi trong quá trình gửi yêu cầu. Vui lòng thử lại.')
    }

    throw error // Đảm bảo lỗi được ném ra ngoài để xử lý ở nơi gọi
  }
}


// Hàm service getAllUser
export const getAllUser = async (): Promise<BaseResponse<User[]>> => {
  try {
    // Gọi API để lấy dữ liệu người dùng
    const response = await fetch('http://localhost:8080/user/getAllUser')

    // Kiểm tra nếu status code không phải 200
    if (!response.ok) {
      throw new Error(`Failed to fetch users. Status: ${response.status}`)
    }

    // Parse dữ liệu JSON từ response
    const data: BaseResponse<User[]> = await response.json()

    // Trả về response theo đúng cấu trúc
    return {
      status: data.status,
      message: data.message,
      data: data.data,
    }
  } catch (error) {
    // Nếu có lỗi xảy ra trong quá trình gọi API, trả về thông báo lỗi
    console.error('Error fetching users:', error)
    return {
      status: 500,
      message: 'Internal Server Error',
      data: [],
    }
  }
}


export const registerApi = async (user: { fullName: string, email: string, password: string }): Promise<BaseResponse<User>> => {
  try {
    // Gửi yêu cầu POST đến API đăng ký người dùng
    const response = await axios.post<BaseResponse<User>>('http://localhost:8080/user/DKUser', user)

    // Kiểm tra nếu status code là 200 (thành công)
    if (response.status === 200 && response.data) {
      return response.data // Trả về dữ liệu người dùng từ API
    } else {
      throw new Error('Đăng ký không thành công.')
    }
  } catch (error: any) {
    // Xử lý lỗi từ API
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
