// src/router/auth-guard.ts
import { useRouter } from 'vue-router'

export const authGuard = (to: any, from: any, next: any) => {
  const router = useRouter()

  const token = localStorage.getItem('access_token')

  if (token) {
    next()
  } else {
    next({ name: 'loginadmin' })
  }
}
