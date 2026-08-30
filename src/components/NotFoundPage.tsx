import { useEffect } from 'react'
import siteConfig from '../config/site.json'
import { applySeo } from '../lib/seo'

type NotFoundPageProps = {
  path: string
}

export function NotFoundPage({ path }: NotFoundPageProps) {
  useEffect(() => {
    const canonicalUrl = new URL(path, `${siteConfig.origin}/`).href

    return applySeo({
      title: `Page not found — ${siteConfig.authorName}`,
      description: 'The requested page does not exist on this portfolio, or it may have moved.',
      canonicalUrl,
      robots: 'noindex, follow',
      ogTitle: `Page not found — ${siteConfig.authorName}`,
      ogDescription: 'The requested page does not exist on this portfolio, or it may have moved.',
      ogUrl: canonicalUrl,
      twitterTitle: `Page not found — ${siteConfig.authorName}`,
      twitterDescription: 'The requested page does not exist on this portfolio, or it may have moved.',
    })
  }, [path])

  return (
    <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-sm font-medium text-accent">404 · route_not_found</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          This page wandered off.
        </h1>
        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
          The address does not exist on this portfolio, or it may have moved.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Back to portfolio
        </a>
      </div>
    </section>
  )
}
