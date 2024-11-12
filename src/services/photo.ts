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
