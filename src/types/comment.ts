import type { Post } from './post'
import type { User } from './user'

export interface Comment {
  id: number
  content: string
  createdAt: string // ISO 8601 format (e.g., "2024-11-25T12:00:00Z")
  post: Post
  user: User
}
