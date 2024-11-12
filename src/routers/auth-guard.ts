// src/router/auth-guard.ts
import { useRouter } from 'vue-router'

export const authGuard = (to: any, from: any, next: any) => {
  const router = useRouter()

  // Kiểm tra token hoặc trạng thái đăng nhập từ localStorage/sessionStorage
  const token = localStorage.getItem('access_token') // Hoặc sử dụng sessionStorage

  if (token) {
    // Nếu có token, cho phép truy cập vào route
    next()
  } else {
    // Nếu không có token, chuyển hướng đến trang loginadmin
    next({ name: 'loginadmin' })
  }
}
