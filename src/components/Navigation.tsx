import { useEffect, useState } from 'react'
import { BookOpenText, FileText, Moon, Sun } from 'lucide-react'
import { site } from '../data/portfolio'
import { useTheme } from '../hooks/useTheme'
import type { BackgroundMode } from '../hooks/useBackgroundMode'
import { BackgroundSelector } from './BackgroundSelector'

type NavigationProps = {
  backgroundMode: BackgroundMode
  onSelectBackground: (mode: BackgroundMode) => void
  isBlog?: boolean
}

/**
 * Minimal transparent top utility bar: monogram, writing, résumé, theme toggle,
 * and ambient-background selector. Gains a blurred surface after scroll.
 * Section navigation lives in the FloatingDock on the portfolio home page.
 */
export function Navigation({ backgroundMode, onSelectBackground, isBlog = false }: NavigationProps) {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Utility"
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a
          href={isBlog ? '/' : '#hero'}
          className="font-mono text-sm font-medium tracking-widest text-foreground transition-colors hover:text-accent"
          aria-label={`${site.name} — ${isBlog ? 'portfolio home' : 'back to top'}`}
        >
          {site.initials}
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/blog"
            className={`flex h-9 items-center gap-1.5 rounded-full border bg-card/60 px-3 text-xs font-medium transition-colors ${
              isBlog
                ? 'border-accent/50 text-accent'
                : 'border-border text-foreground hover:border-accent hover:text-accent'
            }`}
          >
            <BookOpenText size={13} aria-hidden="true" />
            <span className="hidden sm:inline">Writing</span>
            <span className="sr-only sm:hidden">Writing</span>
          </a>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <FileText size={13} aria-hidden="true" />
            <span className="hidden sm:inline">Résumé</span>
            <span className="sr-only sm:hidden">Résumé</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === 'dark' ? (
              <Sun size={15} aria-hidden="true" />
            ) : (
              <Moon size={15} aria-hidden="true" />
            )}
          </button>

          <BackgroundSelector mode={backgroundMode} onSelect={onSelectBackground} />
        </div>
      </nav>
    </header>
  )
}
