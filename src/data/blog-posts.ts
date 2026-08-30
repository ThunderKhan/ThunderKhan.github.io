import { blogPosts as sourceBlogPosts, type BlogPost } from './blogs'

const LOCAL_COVERS: Record<string, string> = {
  'cpp-test-impact-analysis-zero-runtime-dependencies': '/blog/diff2test-cover.webp',
}

function withLocalCover(post: BlogPost): BlogPost {
  const cover = LOCAL_COVERS[post.slug]
  return cover ? { ...post, cover } : post
}

export const blogPosts = sourceBlogPosts.map(withLocalCover)

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
