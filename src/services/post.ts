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
      timeout: 10000, // Timeout 5 giây
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

export const createPost = async (formData: FormData): Promise<BaseResponse<Post>> => {
  try {
    const response = await api.post('/post/createPost', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// API like bài viết
export const likePost = async (id: string): Promise<BaseResponse<Post>> => {
  try {
    const response = await api.post<BaseResponse<Post>>(`/post/like/${id}`, null, {
      timeout: 5000, // Timeout 5 giây
    })

    if (response.status === 200) {
      return response.data // Trả về dữ liệu bài viết sau khi like
    } else {
      throw new Error('Không thể like bài viết.')
    }
  } catch (error: any) {
    console.error('Error liking post:', error)

    let errorMessage = 'Có lỗi xảy ra khi like bài viết.'
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage
      console.error('Lỗi từ API:', error.response.data)
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Yêu cầu đã bị hủy do thời gian chờ lâu.'
    } else if (error.request) {
      errorMessage = 'Không nhận được phản hồi từ server. Vui lòng thử lại sau.'
    } else {
      errorMessage = error.message
    }

    return {
      status: 500,
      message: errorMessage,
      data: null,
    }
  }
}

// API dislike bài viết
export const dislikePost = async (id: string): Promise<BaseResponse<Post>> => {
  try {
    const response = await api.post<BaseResponse<Post>>(`/post/dislike/${id}`, null, {
      timeout: 5000, // Timeout 5 giây
    })

    if (response.status === 200) {
      return response.data // Trả về dữ liệu bài viết sau khi dislike
    } else {
      throw new Error('Không thể dislike bài viết.')
    }
  } catch (error: any) {
    console.error('Error disliking post:', error)

    let errorMessage = 'Có lỗi xảy ra khi dislike bài viết.'
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage
      console.error('Lỗi từ API:', error.response.data)
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Yêu cầu đã bị hủy do thời gian chờ lâu.'
    } else if (error.request) {
      errorMessage = 'Không nhận được phản hồi từ server. Vui lòng thử lại sau.'
    } else {
      errorMessage = error.message
    }

    return {
      status: 500,
      message: errorMessage,
      data: null,
    }
  }
}

export const addComment = async (idpost: string, text: string): Promise<BaseResponse<Comment>> => {
  try {
    const response = await api.post<BaseResponse<Comment>>(
      '/post/comment/${idpost}',
      { text },
      {
        timeout: 5000, // Timeout 5 giây
      },
    )

    if (response.status === 200) {
      return response.data // Trả về dữ liệu bài viết sau khi thêm bình luận
    } else {
      throw new Error('Không thể thêm bình luận vào bài viết.')
    }
  } catch (error: any) {
    console.error('Error adding comment:', error)

    let errorMessage = 'Có lỗi xảy ra khi thêm bình luận vào bài viết.'
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage
      console.error('Lỗi từ API:', error.response.data)
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Yêu cầu đã bị hủy do thời gian chờ lâu.'
    } else if (error.request) {
      errorMessage = 'Không nhận được phản hồi từ server. Vui lòng thử lại sau.'
    } else {
      errorMessage = error.message
    }

    return {
      status: 500,
      message: errorMessage,
      data: null,
    }
  }
}
