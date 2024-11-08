import type { Post } from './post'

export interface User {
  id: string // UUID hoặc string nếu tự sinh
  email: string
  password: string
  fullName: string
  avatar: string
  description: string
  phoneNumber: string
  address: string
  roles: Set<string> // Tập hợp các vai trò của người dùng
  post: Post[] // Một User có thể có nhiều Post
}
