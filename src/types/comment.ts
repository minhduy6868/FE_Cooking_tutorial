import type { Post } from './post'
import type { User } from './user'

export interface Comment {
  id: number
  content: string
  createdAt: string 
  post: Post
  user: User
}
