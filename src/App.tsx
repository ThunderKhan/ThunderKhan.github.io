import { lazy, Suspense } from 'react'
import { Moon, Sun } from 'lucide-react'
import { PortfolioHome } from './components/PortfolioHome'
import { links, site } from './data/portfolio'
import { useTheme } from './hooks/useTheme'
import { useRouterPath } from './hooks/useRouterPath'

const BlogIndex = lazy(() =>
  import('./components/BlogIndex').then(({ BlogIndex }) => ({ default: BlogIndex })),
)
const BlogRoute = lazy(() =>
  import('./components/BlogRoute').then(({ BlogRoute }) => ({ default: BlogRoute })),
)
const NotFoundPage = lazy(() =>
  import('./components/NotFoundPage').then(({ NotFoundPage }) => ({ default: NotFoundPage })),
)
function decodeBlogSlug(path: string) {
  if (!path.startsWith('/blog/')) return null

  try {
    return decodeURIComponent(path.slice('/blog/'.length))
  } catch {
    return null
  }
}

function RouteLoadingSkeleton() {
  return (
    <section
      className="mx-auto min-h-[70vh] w-full max-w-6xl animate-pulse px-4 pb-24 pt-28 sm:px-6 sm:pt-32"
      aria-busy="true"
      aria-label="Loading page content"
    >
      <div className="max-w-3xl">
        <div className="h-3 w-24 rounded-full bg-muted" />
        <div className="mt-5 h-10 w-full max-w-2xl rounded-xl bg-muted" />
        <div className="mt-3 h-10 w-4/5 max-w-xl rounded-xl bg-muted" />
        <div className="mt-6 h-4 w-full max-w-2xl rounded-full bg-muted" />
        <div className="mt-3 h-4 w-2/3 max-w-lg rounded-full bg-muted" />
      </div>
      <div className="mt-12 h-72 rounded-3xl border border-border bg-card/60" />
    </section>
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const path = useRouterPath()
  const isBlogPostPath = path.startsWith('/blog/')
  const isBlog = path === '/blog' || isBlogPostPath
  const blogSlug = decodeBlogSlug(path)
  const isNotFound = (isBlogPostPath && !blogSlug) || (!isBlog && path !== '/')
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to main content
      </a>
      <header className="folio-nav">
        <a href="/" className="monogram" aria-label="Ayan Khan home">ak<span>.</span></a>
        <nav aria-label="Main navigation">
          <a href="/#projects">Work</a><a href="/#experience">Experience</a><a href="/blog">Writing</a><a href="/#about">About</a>
        </nav>
        <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>
      <main id="main">
        <Suspense fallback={<RouteLoadingSkeleton />}>
          {isNotFound ? (
            <NotFoundPage path={path} />
          ) : path === '/blog' ? (
            <BlogIndex />
          ) : blogSlug ? (
            <BlogRoute slug={blogSlug} path={path} />
          ) : (
            <PortfolioHome />
          )}
        </Suspense>
      </main>
      <footer className="folio-footer" id="contact">
        <span>{site.name} · India</span>
        <div><a href={`mailto:${links.email}`}>Email</a><a href={links.github}>GitHub</a><a href={links.linkedin}>LinkedIn</a></div>
      </footer>
    </>
  )
}
