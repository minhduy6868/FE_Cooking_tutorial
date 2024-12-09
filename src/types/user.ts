import type { Post } from './post'

export interface User {
  id: string // UUID
  email: string
  fullName: string
  avatar: string | null
  description: string | null
  phoneNumber: string | null
  address: string | null
  roles: string[] | null // Hoặc Set<string> nếu đảm bảo không null
  likePosts: Post[]
  post: Post[]
}
