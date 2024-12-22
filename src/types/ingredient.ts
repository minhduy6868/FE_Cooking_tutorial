import type { Post } from './post'

export interface Ingredient {
  id: string
  ingredientName: string
  quantity: string
  post: Post
}
