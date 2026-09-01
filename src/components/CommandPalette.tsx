import {
  ArrowDownToLine,
  BookOpenText,
  BriefcaseBusiness,
  Contact,
  Github,
  Linkedin,
  Search,
  Sparkles,
  TerminalSquare,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { links, site } from '../data/portfolio'
import type { BackgroundMode } from '../hooks/useBackgroundMode'

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectBackground: (mode: BackgroundMode) => void
}

type Command = {
  id: string
  label: string
  hint: string
  keywords: string
  Icon: typeof Search
  run: () => void
}

function scrollToId(id: string) {
  const target = document.getElementById(id)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function CommandPalette({ open, onOpenChange, onSelectBackground }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const close = () => {
    onOpenChange(false)
    setQuery('')
    setActiveIndex(0)
  }

  const commands = useMemo<Command[]>(
    () => [
      {
        id: 'projects',
        label: 'Jump to selected engineering work',
        hint: 'Projects',
        keywords: 'projects work engineering builds',
        Icon: BriefcaseBusiness,
        run: () => scrollToId('projects'),
      },
      {
        id: 'proof',
        label: 'Open public proof of work',
        hint: 'Timeline',
        keywords: 'open source public contributions timeline pull requests',
        Icon: Wrench,
        run: () => scrollToId('open-source'),
      },
      {
        id: 'skills',
        label: 'Inspect engineering stack',
        hint: 'Skills',
        keywords: 'skills stack c++ python typescript webmcp systems',
        Icon: TerminalSquare,
        run: () => scrollToId('skills'),
      },
      {
        id: 'contact',
        label: 'Open contact channel',
        hint: 'Contact',
        keywords: 'contact email hire collaborate',
        Icon: Contact,
        run: () => scrollToId('contact'),
      },
      {
        id: 'writing',
        label: 'Read engineering notes',
        hint: 'Writing',
        keywords: 'blog writing notes article engineering',
        Icon: BookOpenText,
        run: () => window.location.assign('/blog'),
      },
      {
        id: 'github',
        label: 'Open GitHub',
        hint: 'External',
        keywords: 'github source repositories code',
        Icon: Github,
        run: () => window.open(links.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        hint: 'External',
        keywords: 'linkedin profile social',
        Icon: Linkedin,
        run: () => window.open(links.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'resume',
        label: 'Open résumé',
        hint: 'PDF',
        keywords: 'resume cv download pdf',
        Icon: ArrowDownToLine,
        run: () => window.open(site.resume, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'aurora',
        label: 'Background: Aurora',
        hint: 'Atmosphere',
        keywords: 'background aurora glow ambient theme',
        Icon: Sparkles,
        run: () => onSelectBackground('aurora'),
      },
      {
        id: 'blueprint',
        label: 'Background: Blueprint',
        hint: 'Atmosphere',
        keywords: 'background blueprint grid engineering ambient',
        Icon: Sparkles,
        run: () => onSelectBackground('blueprint'),
      },
      {
        id: 'quiet',
        label: 'Background: Quiet',
        hint: 'Atmosphere',
        keywords: 'background quiet minimal calm ambient',
        Icon: Sparkles,
        run: () => onSelectBackground('quiet'),
      },
    ],
    [onSelectBackground],
  )

  const normalized = query.trim().toLowerCase()
  const easterEgg = normalized === 'sudo hire ayan'
  const filtered = easterEgg
    ? [
        {
          id: 'sudo-hire',
          label: 'Access granted. Opening contact channel.',
          hint: 'sudo ✓',
          keywords: '',
          Icon: TerminalSquare,
          run: () => scrollToId('contact'),
        },
      ]
    : commands.filter((command) =>
        `${command.label} ${command.hint} ${command.keywords}`.toLowerCase().includes(normalized),
      )

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const shortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'
      if (shortcut) {
        event.preventDefault()
        onOpenChange(!open)
        return
      }
      if (!open) return
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onOpenChange])

  if (!open) return null

  const runCommand = (command: Command) => {
    command.run()
    close()
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-start justify-center bg-black/55 px-4 pt-[14vh] backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card/95 shadow-[0_30px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-5">
          <Search size={17} aria-hidden="true" className="shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActiveIndex((current) => Math.min(current + 1, Math.max(filtered.length - 1, 0)))
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActiveIndex((current) => Math.max(current - 1, 0))
              }
              if (event.key === 'Enter' && filtered[activeIndex]) {
                event.preventDefault()
                runCommand(filtered[activeIndex])
              }
            }}
            placeholder="Jump, open, switch…"
            aria-label="Search commands"
            className="min-w-0 flex-1 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close command palette"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2 sm:p-3">
          {filtered.length > 0 ? (
            <ul aria-label="Commands">
              {filtered.map((command, index) => {
                const active = index === activeIndex
                return (
                  <li key={command.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => runCommand(command)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition-colors sm:px-4 ${
                        active ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-xl border ${
                          active
                            ? 'border-white/20 bg-white/10 text-current'
                            : 'border-border bg-background/60 text-muted-foreground'
                        }`}
                      >
                        <command.Icon size={16} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{command.label}</span>
                        {easterEgg && (
                          <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
                            privileged route unlocked
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] opacity-65">
                        {command.hint}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              No command found. Try “projects”, “GitHub”, or something a little more terminal-like.
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:px-5">
          <span>↑↓ navigate · enter run · esc close</span>
          <span>Ctrl/⌘ K</span>
        </div>
      </section>
    </div>
  )
}
