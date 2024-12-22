import type { Post } from './post'

export interface User {
  id: string
  email: string
  fullName: string
  avatar: string | null
  description: string | null
  phoneNumber: string | null
  address: string | null
  roles: string[] | null
  likePosts: Post[]
  post: Post[]
}
