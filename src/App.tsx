import { Navigation } from './components/Navigation'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { OpenSource } from './components/OpenSource'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AmbientBackground } from './components/AmbientBackground'
import { FloatingDock } from './components/FloatingDock'
import { BlogIndex } from './components/BlogIndex'
import { BlogPostPage } from './components/BlogPostPage'
import { NotFoundPage } from './components/NotFoundPage'
import { getBlogPost } from './data/blog-posts'
import { useBackgroundMode } from './hooks/useBackgroundMode'
import { useRouterPath } from './hooks/useRouterPath'

function decodeBlogSlug(path: string) {
  if (!path.startsWith('/blog/')) return null

  try {
    return decodeURIComponent(path.slice('/blog/'.length))
  } catch {
    return null
  }
}

export default function App() {
  const { mode, selectMode } = useBackgroundMode()
  const path = useRouterPath()
  const isBlog = path === '/blog' || path.startsWith('/blog/')
  const blogSlug = decodeBlogSlug(path)
  const post = blogSlug ? getBlogPost(blogSlug) : undefined
  const isNotFound = (path.startsWith('/blog/') && !post) || (!isBlog && path !== '/')

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to main content
      </a>
      <AmbientBackground mode={mode} />
      <Navigation backgroundMode={mode} onSelectBackground={selectMode} isBlog={isBlog} />
      <main id="main">
        {isNotFound ? (
          <NotFoundPage />
        ) : path === '/blog' ? (
          <BlogIndex />
        ) : post ? (
          <BlogPostPage post={post} />
        ) : (
          <>
            <Hero />
            <About />
            <Projects />
            <OpenSource />
            <Skills />
            <Education />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      {!isBlog && !isNotFound && <FloatingDock />}
    </>
  )
}
