import type { Post } from './types'
import post202605 from './2026-05-proximamente'

const posts: Post[] = [post202605]

export default posts

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
