import type { Ingredient } from "./ingredient"
import type { Picture } from "./picture"
import type { User } from "./user"

export interface Post {
  id: string // UUID hoặc string nếu tự sinh
  linkVideo: string
  title: string
  description: string
  tutorial: string
  ingredients: Ingredient[] // Mảng các đối tượng Ingredient
  pictures: Picture[] // Mảng các đối tượng Picture
  user: User // Mối quan hệ ManyToOne với User
}
