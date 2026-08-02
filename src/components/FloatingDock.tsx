import { GraduationCap, Home, Layers, Mail, Route, User } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'

type DockItem = {
  id: string
  label: string
  Icon: LucideIcon
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'hero', label: 'Home', Icon: Home },
  { id: 'about', label: 'About', Icon: User },
  { id: 'projects', label: 'Projects', Icon: Layers },
  { id: 'open-source', label: 'Journey', Icon: Route },
  { id: 'skills', label: 'Skills', Icon: GraduationCap },
  { id: 'contact', label: 'Contact', Icon: Mail },
]

const SECTION_IDS = DOCK_ITEMS.map((item) => item.id)

/**
 * Floating bottom-center navigation dock. Active section gets a
 * smoothly-moving accent pill (CSS transitions on the button itself).
 * Labels are visually hidden on small screens but kept for SRs;
 * tooltips appear on desktop hover/focus.
 */
export function FloatingDock() {
  const active = useActiveSection(SECTION_IDS)

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="flex items-center gap-0.5 rounded-full border border-border bg-card/75 p-1.5 shadow-lg shadow-black/10 backdrop-blur-md sm:gap-1 dark:shadow-black/40">
        {DOCK_ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id || (id === 'hero' && active === '')
          return (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 sm:h-11 sm:w-11 ${
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon size={17} aria-hidden="true" />
                <span className="sr-only">{label}</span>
                {/* Desktop tooltip */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 rounded-md border border-border bg-card px-2 py-1 font-mono text-[10px] whitespace-nowrap text-foreground opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
                >
                  {label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
