import { ArrowLeft, ArrowUpRight, Clock3, Github } from 'lucide-react'
import { useEffect } from 'react'
import siteConfig from '../config/site.json'
import type { BlogBlock, BlogPost } from '../data/blogs'
import { applySeo } from '../lib/seo'

function renderBlock(block: BlogBlock, index: number) {
  switch (block.type) {
    case 'heading':
      return (
        <h2
          key={index}
          className="mt-14 scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {block.text}
        </h2>
      )
    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-8 border-l-2 border-accent pl-5 text-lg font-medium leading-8 text-foreground sm:text-xl"
        >
          {block.text}
        </blockquote>
      )
    case 'code':
      return (
        <pre
          key={index}
          className="my-7 overflow-x-auto rounded-xl border border-border bg-background/80 p-4 font-mono text-[13px] leading-6 text-foreground shadow-sm"
        >
          <code>{block.text}</code>
        </pre>
      )
    case 'list':
      return (
        <ul key={index} className="my-6 space-y-2 pl-5 text-[15px] leading-7 text-muted-foreground sm:text-base">
          {block.items.map((item) => (
            <li key={item} className="list-disc pl-1 marker:text-accent">
              {item}
            </li>
          ))}
        </ul>
      )
    default:
      return (
        <p key={index} className="mt-5 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
          {block.text}
        </p>
      )
  }
}

export function BlogPostPage({ post }: { post: BlogPost }) {
  useEffect(() => {
    const articleUrl = `${siteConfig.origin}${siteConfig.blog.path}/${encodeURIComponent(post.slug)}`
    const canonicalUrl = post.canonicalUrl ?? articleUrl
    const coverUrl = post.cover ?? `${siteConfig.origin}${siteConfig.defaultOgImage}`

    return applySeo({
      title: `${post.title} — ${siteConfig.authorName}`,
      description: post.description,
      canonicalUrl,
      ogType: 'article',
      ogTitle: post.title,
      ogUrl: articleUrl,
      ogImage: coverUrl,
      twitterTitle: post.title,
    })
  }, [post])

  const hasRelatedLinks = Boolean(post.repositoryUrl || post.crossPosts?.length)

  return (
    <article className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          All writing
        </a>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
            <time dateTime={post.date}>
              {new Date(`${post.date}T00:00:00`).toLocaleDateString('en', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={13} aria-hidden="true" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.08]">
            {post.title}
          </h1>
          <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>
      </div>

      {post.cover ? (
        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/60 shadow-2xl shadow-accent/5">
          <img src={post.cover} alt={`${post.title} cover`} className="w-full object-cover" />
        </div>
      ) : null}

      <div className="mx-auto mt-12 max-w-3xl">{post.content.map(renderBlock)}</div>

      {hasRelatedLinks ? (
        <footer className="mx-auto mt-16 max-w-3xl border-t border-border pt-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-medium text-foreground">Links & publication</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Source code and other places where this article is published.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 sm:justify-end">
              {post.repositoryUrl ? (
                <a
                  href={post.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <Github size={15} aria-hidden="true" /> Repository
                </a>
              ) : null}
              {post.crossPosts?.map((crossPost) => (
                <a
                  key={crossPost.url}
                  href={crossPost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {crossPost.label} <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      ) : null}
    </article>
  )
}
