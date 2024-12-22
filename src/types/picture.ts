import type { Post } from './post'

export interface Picture {
  id: string
  alt: string
  link: string
  post: Post
}
