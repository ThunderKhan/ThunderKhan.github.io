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

/**
 * Floating, centered utility shell inspired by desktop-panel / Linux-rice UI.
 * The control cluster is centered on desktop while the monogram remains anchored left.
 */
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
        className={`pointer-events-auto relative mx-auto flex h-14 w-full max-w-6xl items-center rounded-[1.75rem] border px-3 shadow-[0_16px_55px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.04)] transition-[background-color,border-color,box-shadow,transform] duration-300 sm:px-4 ${
          scrolled
            ? 'border-border bg-background/94 shadow-[0_18px_60px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl'
            : 'border-border/90 bg-background/88 backdrop-blur-2xl'
        }`}
      >
        <a
          href={isBlog ? '/' : '#hero'}
          className="z-10 flex h-9 min-w-9 items-center justify-center rounded-full px-2 font-mono text-sm font-semibold tracking-widest text-foreground transition-colors hover:bg-card/80 hover:text-accent"
          aria-label={`${site.name} — ${isBlog ? 'portfolio home' : 'back to top'}`}
        >
          {site.initials}
        </a>

        <div className="ml-auto flex items-center gap-1 sm:gap-1.5 lg:absolute lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette"
            title="Command palette (Ctrl/⌘ K)"
            className="group flex h-9 items-center gap-1.5 rounded-full border border-border bg-card/75 px-2.5 text-xs font-medium text-foreground/80 shadow-sm transition-colors hover:border-accent/65 hover:bg-card hover:text-foreground sm:px-3"
          >
            <Command size={13} aria-hidden="true" />
            <span className="hidden lg:inline">Command</span>
            <kbd className="hidden rounded border border-border bg-background/80 px-1.5 py-0.5 font-mono text-[9px] tracking-wide text-muted-foreground sm:inline">
              ⌘K
            </kbd>
          </button>

          <a
            href="/blog"
            className={`flex h-9 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium shadow-sm transition-colors sm:px-3 ${
              isBlog
                ? 'border-accent/60 bg-accent/12 text-accent'
                : 'border-border bg-card/75 text-foreground hover:border-accent/65 hover:bg-card hover:text-accent'
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
            className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-card/75 px-2.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:border-accent/65 hover:bg-card hover:text-accent sm:px-3"
          >
            <FileText size={13} aria-hidden="true" />
            <span className="hidden sm:inline">Résumé</span>
            <span className="sr-only sm:hidden">Résumé</span>
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/75 text-foreground/70 shadow-sm transition-colors hover:border-accent/65 hover:bg-card hover:text-foreground"
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
