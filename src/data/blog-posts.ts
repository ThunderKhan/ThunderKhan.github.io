import { blogPosts as sourceBlogPosts, type BlogPost } from './blogs'

export const blogPosts: BlogPost[] = sourceBlogPosts

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
