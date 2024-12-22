import type { Ingredient } from './ingredient'
import type { Picture } from './picture'
import type { User } from './user'
import type { Comment } from './comment'

export interface Post {
  id: string
  linkVideo: string
  title: string
  description: string
  tutorial: string
  typePost: string
  likeCount: number
  dislikeCount: number
  listUserLike: User[]
  listUserDislike: User[]
  ingredients: Ingredient[]
  commentPosts: Comment[]
  pictures: Picture[]
  user: User
  approved: boolean
}
