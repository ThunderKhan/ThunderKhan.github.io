import { useEffect, useState } from 'react'
import { BookOpenText, Command, FileText, Moon, Sun } from 'lucide-react'
import { site } from '../data/portfolio'
import { useTheme } from '../hooks/useTheme'
import type { BackgroundMode } from '../hooks/useBackgroundMode'
import { BackgroundSelector } from './BackgroundSelector'

type NavigationProps = {
  backgroundMode: BackgroundMode
  onSelectBackground: (mode: BackgroundMode) => void
  onOpenCommandPalette: () => void
  isBlog?: boolean
}

/** Floating utility shell with a Linux-rice / desktop-panel feel. */
export function Navigation({
  backgroundMode,
  onSelectBackground,
  onOpenCommandPalette,
  isBlog = false,
}: NavigationProps) {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Utility"
        className={`pointer-events-auto relative mx-auto grid h-14 w-full max-w-6xl grid-cols-[auto_1fr_auto] items-center rounded-[1.75rem] border px-3 shadow-[0_14px_45px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.04)] transition-[background-color,border-color,box-shadow] duration-300 sm:px-4 ${
          scrolled
            ? 'border-white/12 bg-background/28 backdrop-blur-2xl'
            : 'border-white/10 bg-background/14 backdrop-blur-xl'
        }`}
      >
        <a
          href={isBlog ? '/' : '#hero'}
          className="z-10 flex h-9 min-w-9 items-center justify-center rounded-full px-2 font-mono text-sm font-semibold tracking-widest text-foreground transition-colors hover:bg-card/55 hover:text-accent"
          aria-label={`${site.name} — ${isBlog ? 'portfolio home' : 'back to top'}`}
        >
          {site.initials}
        </a>

        <div className="hidden items-center justify-center gap-1.5 md:flex">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette"
            title="Command palette (Ctrl/⌘ K)"
            className="group flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-black/14 px-3 text-xs font-medium text-foreground/85 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-black/24 hover:text-foreground"
          >
            <Command size={13} aria-hidden="true" />
            <span className="hidden lg:inline">Command</span>
            <kbd className="hidden rounded border border-white/10 bg-black/18 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-muted-foreground sm:inline">
              ⌘K
            </kbd>
          </button>

          <a
            href="/blog"
            className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-xs font-medium backdrop-blur-md transition-colors ${
              isBlog
                ? 'border-accent/45 bg-accent/10 text-accent'
                : 'border-white/10 bg-black/14 text-foreground hover:border-white/20 hover:bg-black/24 hover:text-accent'
            }`}
          >
            <BookOpenText size={13} aria-hidden="true" />
            <span>Writing</span>
          </a>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-black/14 px-3 text-xs font-medium text-foreground backdrop-blur-md transition-colors hover:border-white/20 hover:bg-black/24 hover:text-accent"
          >
            <FileText size={13} aria-hidden="true" />
            <span>Résumé</span>
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5">
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label="Open command palette"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/14 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground"
            >
              <Command size={14} aria-hidden="true" />
            </button>
            <a
              href="/blog"
              aria-label="Writing"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/14 text-foreground backdrop-blur-md transition-colors hover:text-accent"
            >
              <BookOpenText size={14} aria-hidden="true" />
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Résumé"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/14 text-foreground backdrop-blur-md transition-colors hover:text-accent"
            >
              <FileText size={14} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/14 text-muted-foreground backdrop-blur-md transition-colors hover:border-white/20 hover:bg-black/24 hover:text-foreground"
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
