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
import { getBlogPost } from './data/blogs'
import { useBackgroundMode } from './hooks/useBackgroundMode'

function currentPath() {
  const redirectedPath = new URLSearchParams(window.location.search).get('path')

  if (redirectedPath?.startsWith('/blog')) {
    window.history.replaceState({}, '', redirectedPath)
    return redirectedPath
  }

  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export default function App() {
  const { mode, selectMode } = useBackgroundMode()
  const path = currentPath()
  const isBlog = path === '/blog' || path.startsWith('/blog/')
  const blogSlug = path.startsWith('/blog/') ? decodeURIComponent(path.slice('/blog/'.length)) : null
  const post = blogSlug ? getBlogPost(blogSlug) : undefined

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
        {path === '/blog' ? (
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
      {!isBlog && <FloatingDock />}
    </>
  )
}
