import type { Post } from "./post"

export interface Picture {
  id: string // UUID hoặc string nếu tự sinh
  alt: string
  link: string
  post: Post // Mối quan hệ ManyToOne với Post
}
