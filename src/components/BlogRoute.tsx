import { getBlogPost } from '../data/blog-posts'
import { BlogPostPage } from './BlogPostPage'
import { NotFoundPage } from './NotFoundPage'

export function BlogRoute({ slug, path }: { slug: string; path: string }) {
  const post = getBlogPost(slug)

  return post ? <BlogPostPage post={post} /> : <NotFoundPage path={path} />
}
