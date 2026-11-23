import { useEffect } from 'react'
import siteConfig from '../config/site.json'
import { blogPosts } from '../data/blog-posts'
import { applySeo } from '../lib/seo'

const BLOG_URL = `${siteConfig.origin}${siteConfig.blog.path}`
const BLOG_IMAGE = `${siteConfig.origin}${siteConfig.defaultOgImage}`
const BLOG_IMAGE_ALT = `${siteConfig.authorName} — writing on systems, developer tooling, and open source`

export function BlogIndex() {
  useEffect(
    () =>
      applySeo({
        title: siteConfig.blog.title,
        description: siteConfig.blog.description,
        canonicalUrl: BLOG_URL,
        ogImage: BLOG_IMAGE,
        ogImageAlt: BLOG_IMAGE_ALT,
      }),
    [],
  )

  return (
    <div className="folio-page">
      <section aria-labelledby="writing-page-title" className="writing-index">
        <h1 id="writing-page-title">Writing</h1>
        <p className="folio-copy">Notes on the systems I build and the decisions behind them.</p>
        {blogPosts.map((post) => (
          <article key={post.slug}>
            <a href={`/blog/${post.slug}`} className="writing-row">
              <strong>{post.title}</strong><span>{post.readingTime} ↗</span>
            </a>
            <p className="folio-copy">{post.description}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
