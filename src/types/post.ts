import type { Ingredient } from './ingredient'
import type { Picture } from './picture'
import type { User } from './user'
import type { CommentPost } from './comment'

export interface Post {
  id: string // UUID
  linkVideo: string // URL to the video
  title: string // Title of the post
  description: string // Description of the post
  tutorial: string // Tutorial content or steps
  typePost: string // Type of the post (e.g., tutorial, recipe)
  likeCount: number // Number of likes
  dislikeCount: number // Number of dislikes
  listUserLike: User[] // List of users who liked the post
  listUserDislike: User[] // List of users who disliked the post
  ingredients: Ingredient[] // List of ingredients in the post
  commentPosts: CommentPost[] // List of comments on the post
  pictures: Picture[] // List of pictures associated with the post
  user: User // User who created the post
}
