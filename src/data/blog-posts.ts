import { blogPosts as sourceBlogPosts, type BlogPost } from './blogs'
import { calculateReadingTime } from '../lib/reading-time.js'

export const blogPosts: BlogPost[] = sourceBlogPosts.map((post) => ({
  ...post,
  readingTime: calculateReadingTime(post.content),
}))

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
