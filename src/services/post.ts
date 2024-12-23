import api from '@/api/api_client'
import type { BaseResponse } from '@/types/baseapi'
import type { Post } from '@/types/post'
import type { Comment } from '@/types/comment'
import Swal from 'sweetalert2'

export const getAllPost = async (): Promise<BaseResponse<Post[]>> => {
  try {
    const response = await api.get<BaseResponse<Post[]>>('/post/getAllPost', {
      timeout: 5000,
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể lấy danh sách người dùng.')
    }
  } catch (error: any) {
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

export const getAllAcceptPost = async (): Promise<BaseResponse<Post[]>> => {
  try {
    const response = await api.get<BaseResponse<Post[]>>('/post/getAllPostWasApproved', {
      timeout: 5000,
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể lấy danh sách người dùng.')
    }
  } catch (error: any) {
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
      timeout: 10000,
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể lấy thông tin chi tiết bài viết.')
    }
  } catch (error: any) {
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
      data: null,
    }
  }
}

export const searchPosts = async (title: string): Promise<BaseResponse<Post[]>> => {
  try {
    const response = await api.get<BaseResponse<Post[]>>('/post/search', {
      params: { title },
      timeout: 5000,
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể tìm thấy bài viết.')
    }
  } catch (error: any) {
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
      data: [],
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

export const likePost = async (id: string): Promise<BaseResponse<Post>> => {
  try {
    const response = await api.post<BaseResponse<Post>>(`/post/like/${id}`, null, {
      timeout: 5000,
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể like bài viết.')
    }
  } catch (error: any) {
    console.error('Error liking post:', error)
    const result = await Swal.fire({
      title: 'Bạn cần phải đăng nhập!',
      text: 'Bạn cần phải đăng nhập trước khi thích bài viết.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Hủy',
      reverseButtons: true,
      customClass: {
        popup: 'bg-white shadow-lg rounded-xl',
        title: 'text-xl font-semibold text-gray-800',
        content: 'text-gray-600 text-sm',
        confirmButton: 'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
        cancelButton: 'bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400',
      },
    })
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

export const dislikePost = async (id: string): Promise<BaseResponse<Post>> => {
  try {
    const response = await api.post<BaseResponse<Post>>(`/post/dislike/${id}`, null, {
      timeout: 5000,
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể dislike bài viết.')
    }
  } catch (error: any) {
    console.error('Error disliking post:', error)

    const result = await Swal.fire({
      title: 'Bạn cần phải đăng nhập!',
      text: 'Bạn cần phải đăng nhập trước khi không thích bài viết.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Hủy',
      reverseButtons: true,
      customClass: {
        popup: 'bg-white shadow-lg rounded-xl',
        title: 'text-xl font-semibold text-gray-800',
        content: 'text-gray-600 text-sm',
        confirmButton: 'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
        cancelButton: 'bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400',
      },
    })

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
    const response = await api.post<BaseResponse<Comment>>(`/post/comment/${idpost}`, text, {
      timeout: 5000,
    })

    if (response.status === 200 || response.status === 201) {
      return response.data
    } else {
      throw new Error('Không thể thêm bình luận vào bài viết.')
    }
  } catch (error: any) {
    console.error('Error adding comment:', error)
    const result = await Swal.fire({
      title: 'Bạn cần phải đăng nhập!',
      text: 'Bạn cần phải đăng nhập trước khi bình luận bài viết.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Hủy',
      reverseButtons: true,
      customClass: {
        popup: 'bg-white shadow-lg rounded-xl',
        title: 'text-xl font-semibold text-gray-800',
        content: 'text-gray-600 text-sm',
        confirmButton: 'bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600',
        cancelButton: 'bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400',
      },
    })
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

export const getTopDislikePost = async (limit: number): Promise<BaseResponse<Post[]>> => {
  try {
    const response = await api.get<BaseResponse<Post[]>>('/post/topDislikePost', {
      params: { limit },
      timeout: 5000,
    })

    if (response.status === 200 || response.status === 201) {
      return response.data
    } else {
      throw new Error('Không thể lấy bài viết với lượt không thích cao nhất.')
    }
  } catch (error: any) {
    console.error('Error fetching top dislike posts:', error)

    let errorMessage = 'Có lỗi xảy ra khi lấy bài viết với lượt không thích cao nhất.'
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

export const acceptPost = async (id: string): Promise<BaseResponse<Post>> => {
  try {
    const response = await api.put<BaseResponse<Post>>(`/post/status/${id}`, {
      timeout: 5000,
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể cập nhật trạng thái bài viết.')
    }
  } catch (error: any) {
    console.error('Error accepting post:', error)

    let errorMessage = 'Có lỗi xảy ra khi cập nhật trạng thái bài viết.'
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
export const deletePostByAdmin = async (id: string): Promise<BaseResponse<Post>> => {
  try {
    const response = await api.delete<BaseResponse<Post>>(`/post/deletePost/${id}`, {
      timeout: 5000,
    })

    if (response.status === 200) {
      return response.data
    } else {
      throw new Error('Không thể xóa bài viết.')
    }
  } catch (error: any) {
    console.error('Error deleting post by admin:', error)

    let errorMessage = 'Có lỗi xảy ra khi xóa bài viết.'
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


export const getTopLikePost = async (limit: number = 6): Promise<BaseResponse<Post[]>> => {
  try {
    const response = await api.get<BaseResponse<Post[]>>('/post/topLikePost', {
      params: { limit },
      timeout: 5000,
    });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new Error('Không thể lấy bài viết với lượt thích cao nhất.');
    }
  } catch (error: any) {
    console.error('Error fetching top like posts:', error);

    let errorMessage = 'Có lỗi xảy ra khi lấy bài viết với lượt thích cao nhất.';
    if (error.response) {
      const status = error.response.status;
      errorMessage = error.response.data.message || errorMessage;
      console.error('Lỗi từ API:', error.response.data);
      console.error('Mã lỗi HTTP:', status);
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = 'Yêu cầu đã bị hủy do thời gian chờ lâu.';
    } else if (error.request) {
      console.error('Không nhận được phản hồi từ server:', error.request);
      errorMessage = 'Không nhận được phản hồi từ server. Vui lòng thử lại sau.';
    } else {
      errorMessage = error.message;
    }

    return {
      status: 500,
      message: errorMessage,
      data: [],
    };
  }
};
