import { ArrowUpRight, Clock3 } from 'lucide-react'
import { useEffect } from 'react'
import { blogPosts } from '../data/blogs'

const BLOG_TITLE = 'Writing — Ayan Khan'
const BLOG_DESCRIPTION =
  'Engineering notes on systems, developer tooling, open source, and the decisions behind the software I build.'
const BLOG_URL = 'https://ayankhan.me/blog'
const BLOG_IMAGE = 'https://ayankhan.me/og-image.png?v=3'

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(selector)
  const created = !element
  const previousContent = element?.content

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content

  return () => {
    if (created) {
      element?.remove()
    } else if (element && previousContent !== undefined) {
      element.content = previousContent
    }
  }
}

function setCanonical(href: string) {
  let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  const created = !element
  const previousHref = element?.href

  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }

  element.href = href

  return () => {
    if (created) {
      element?.remove()
    } else if (element && previousHref !== undefined) {
      element.href = previousHref
    }
  }
}

export function BlogIndex() {
  useEffect(() => {
    const previousTitle = document.title
    const restore = [
      setMeta('meta[name="description"]', 'name', 'description', BLOG_DESCRIPTION),
      setMeta('meta[property="og:type"]', 'property', 'og:type', 'website'),
      setMeta('meta[property="og:title"]', 'property', 'og:title', BLOG_TITLE),
      setMeta('meta[property="og:description"]', 'property', 'og:description', BLOG_DESCRIPTION),
      setMeta('meta[property="og:url"]', 'property', 'og:url', BLOG_URL),
      setMeta('meta[property="og:image"]', 'property', 'og:image', BLOG_IMAGE),
      setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', BLOG_TITLE),
      setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', BLOG_DESCRIPTION),
      setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', BLOG_IMAGE),
      setCanonical(BLOG_URL),
    ]

    document.title = BLOG_TITLE

    return () => {
      document.title = previousTitle
      restore.reverse().forEach((restoreValue) => restoreValue())
    }
  }, [])

  return (
    <section className="mx-auto min-h-screen w-full max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">Writing</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Engineering notes, build logs, and things I learned the hard way.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          Long-form notes on systems, developer tooling, open source, and the decisions behind the things I build.
        </p>
      </div>

      <div className="mt-12 grid gap-6">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="group overflow-hidden rounded-2xl border border-border bg-card/65 backdrop-blur-sm transition-colors hover:border-accent/45"
          >
            <a
              href={`/blog/${post.slug}`}
              className="grid gap-0 lg:grid-cols-[1.15fr_1fr]"
              aria-label={`Read ${post.title}`}
            >
              {post.cover ? (
                <div className="relative min-h-56 overflow-hidden border-b border-border lg:min-h-full lg:border-b-0 lg:border-r">
                  <img
                    src={post.cover}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/25 to-transparent" />
                </div>
              ) : null}

              <div className="flex min-h-64 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(`${post.date}T00:00:00`).toLocaleDateString('en', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={13} aria-hidden="true" />
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {post.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-background/55 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Read article <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
