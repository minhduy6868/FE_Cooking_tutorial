import type { Post } from "./post"

export interface Ingredient {
  id: string // UUID hoặc string nếu tự sinh
  ingredientName: string
  quantity: string
  post: Post // Mối quan hệ ManyToOne với Post
}
