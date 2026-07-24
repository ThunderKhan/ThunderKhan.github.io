import { useState } from 'react'
import { FileText, Menu, Moon, Sun, X } from 'lucide-react'
import { navigation, site } from '../data/portfolio'
import { useTheme } from '../hooks/useTheme'
import { useActiveSection } from '../hooks/useActiveSection'

const sectionIds = navigation.map((item) => item.href.slice(1))

export function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <nav aria-label="Main navigation" className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-serif text-lg font-medium text-foreground transition-colors hover:text-accent"
        >
          {site.name}
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-5">
            {navigation.map((item) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-sm transition-colors hover:text-foreground ${
                      isActive ? 'text-accent' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <FileText size={14} aria-hidden="true" />
            Résumé
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.resume}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1.5 py-2.5 text-sm text-accent"
              >
                <FileText size={14} aria-hidden="true" />
                Résumé
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
