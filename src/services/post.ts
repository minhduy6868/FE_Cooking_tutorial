import api from '@/api/api_client'
import type { BaseResponse } from '@/types/baseapi'
import type { Post } from '@/types/post'

export const getAllPost = async (): Promise<BaseResponse<Post[]>> => {
  try {
    const response = await api.get<BaseResponse<Post[]>>('/post/getAllPost', {
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

export const getPostById = async (id: string): Promise<BaseResponse<Post>> => {
  try {
    const response = await api.get<BaseResponse<Post>>(`/post/${id}`, {
      timeout: 5000, // Timeout 5 giây
    })

    if (response.status === 200) {
      return response.data // Trả về dữ liệu đúng cấu trúc { status, message, data }
    } else {
      throw new Error('Không thể lấy thông tin chi tiết bài viết.')
    }
  } catch (error: any) {
    // Xử lý lỗi tương tự như trong getAllPost
    console.error('Error fetching post details:', error)

    let errorMessage = 'Có lỗi xảy ra khi lấy thông tin chi tiết bài viết.'
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
      data: null, // Trả về dữ liệu rỗng nếu có lỗi
    }
  }
}

export const searchPosts = async (title: string): Promise<BaseResponse<Post[]>> => {
  try {
    const response = await api.get<BaseResponse<Post[]>>('/post/search', {
      params: { title }, // Truyền tham số title vào trong query string
      timeout: 5000, // Timeout 5 giây
    })

    if (response.status === 200) {
      return response.data // Trả về dữ liệu đúng cấu trúc { status, message, data }
    } else {
      throw new Error('Không thể tìm thấy bài viết.')
    }
  } catch (error: any) {
    // Xử lý lỗi tương tự như trong các hàm trước
    console.error('Error searching posts:', error)

    let errorMessage = 'Có lỗi xảy ra khi tìm kiếm bài viết.'
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
      data: [], // Trả về mảng rỗng nếu có lỗi
    }
  }
}

export const createPost = async (
  title: string,
  description: string,
  tutorial: string,
  typePost: string,
  images: File[], // Array of image files
  fileVideo: File | null, // Single video file
): Promise<BaseResponse<Post>> => {
  try {
    if (!Array.isArray(images)) {
      throw new Error('Images should be an array')
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('tutorial', tutorial)
    formData.append('typePost', typePost)

    if (images.length > 0) {
      images.forEach((image) => formData.append('images', image))
    }

    // Only append the video if it exists
    if (fileVideo && fileVideo instanceof File) {
      formData.append('fileVideo', fileVideo)
    }

    // Log the formData entries to inspect the content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value instanceof File ? 'File' : value}`);
    }

    // Sending the request to the backend
    const response = await api.post<BaseResponse<Post>>('/post/createPost', formData, {
      headers: {
        'Content-Type': 'form-data',
      },
      timeout: 20000, // Increased timeout
    })
    console.log(response); 

    if (response.status === 200) {
      return response
    } else {
      throw new Error('Unable to create post.')
    }
  } catch (error: any) {
    console.error('Error creating post:', error)

    let errorMessage = 'An error occurred while creating the post.'
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage
      console.error('API Error:', error.response.data)
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out due to long wait time.'
    } else if (error.request) {
      console.error('No response from server:', error.request)
      errorMessage = 'No response from server. Please try again later.'
    } else {
      console.error('Request error:', error.message)
    }

    return {
      status: 500,
      message: errorMessage,
      data: null,
    }
  }
}

