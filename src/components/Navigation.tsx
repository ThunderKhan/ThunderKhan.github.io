import { StudioSpark } from './StudioSpark'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { site } from '../data/portfolio'
import { useTheme } from '../hooks/useTheme'

type NavigationProps = { onOpenCommandPalette: () => void; isBlog?: boolean }
const items = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Open source', href: '#open-source' },
  { label: 'Writing', href: '/blog' },
]

export function Navigation({
  onOpenCommandPalette,
  isBlog = false,
}: NavigationProps) {
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!open) return
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 601px)')
    const resize = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }
    desktop.addEventListener('change', resize)
    document.addEventListener('keydown', key)
    document.addEventListener('pointerdown', outside)
    return () => {
      desktop.removeEventListener('change', resize)
      document.removeEventListener('keydown', key)
      document.removeEventListener('pointerdown', outside)
    }
  }, [open])
  return (
    <header className="studio-header" ref={headerRef}>
      <nav className="studio-nav" aria-label="Main navigation">
        <a href="/" className="studio-brand" aria-label="Ayan Khan — home">
          <StudioSpark className="brand-spark" />
          {site.name}
          <span className="brand-dot">.</span>
        </a>
        <div className="studio-nav-links">
          {items.map((item) => (
            <a
              key={item.href}
              href={
                isBlog && item.href.startsWith('#')
                  ? `/${item.href}`
                  : item.href
              }
              aria-current={
                isBlog && item.href === '/blog' ? 'page' : undefined
              }
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="studio-nav-actions">
          <button
            className="studio-icon-button search-trigger"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette"
          >
            <Search size={18} />
            <kbd>⌘ K</kbd>
          </button>
          <button
            className="studio-icon-button"
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            className="studio-button small nav-contact"
            href={isBlog ? '/#contact' : '#contact'}
          >
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <button
            ref={toggleRef}
            className="studio-icon-button mobile-menu-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="studio-mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <nav
          className="studio-mobile-menu"
          id="studio-mobile-menu"
          aria-label="Mobile navigation"
        >
          {items.map((item) => (
            <a
              key={item.href}
              href={
                isBlog && item.href.startsWith('#')
                  ? `/${item.href}`
                  : item.href
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={site.resume}>
            Download résumé <ArrowUpRight size={16} />
          </a>
          <a
            href={isBlog ? '/#contact' : '#contact'}
            onClick={() => setOpen(false)}
          >
            Let’s talk
          </a>
        </nav>
      )}
    </header>
  )
}
