import { Grid3x3, Moon, Sparkles } from 'lucide-react'
import type { BackgroundMode } from '../hooks/useBackgroundMode'

type BackgroundSelectorProps = {
  mode: BackgroundMode
  onSelect: (mode: BackgroundMode) => void
}

const OPTIONS: {
  value: BackgroundMode
  name: string
  description: string
  Icon: typeof Sparkles
}[] = [
  {
    value: 'aurora',
    name: 'Aurora',
    description: 'Soft drifting light',
    Icon: Sparkles,
  },
  {
    value: 'blueprint',
    name: 'Blueprint',
    description: 'Engineering grid',
    Icon: Grid3x3,
  },
  {
    value: 'quiet',
    name: 'Quiet',
    description: 'Minimal and calm',
    Icon: Moon,
  },
]

/** Compact three-way toggle for the ambient background mode. */
export function BackgroundSelector({ mode, onSelect }: BackgroundSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Ambient background style"
      className="flex items-center gap-0.5 rounded-full border border-border bg-card/60 p-0.5"
    >
      {OPTIONS.map(({ value, name, description, Icon }) => {
        const selected = mode === value
        const label = `${name} background: ${description.toLowerCase()}`

        return (
          <div key={value} className="group/ambient relative">
            <button
              type="button"
              aria-label={label}
              aria-pressed={selected}
              onClick={() => onSelect(value)}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                selected
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={14} aria-hidden="true" />
            </button>

            <div
              role="tooltip"
              className="pointer-events-none absolute top-full left-1/2 z-50 mt-2 w-max max-w-44 -translate-x-1/2 translate-y-1 rounded-xl border border-border bg-card/95 px-3 py-2 text-left opacity-0 shadow-lg backdrop-blur-md transition-all duration-150 group-hover/ambient:translate-y-0 group-hover/ambient:opacity-100 group-focus-within/ambient:translate-y-0 group-focus-within/ambient:opacity-100"
            >
              <p className="font-mono text-[10px] tracking-[0.14em] text-foreground uppercase">
                {name}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">
                {description}
              </p>
              {selected && (
                <p className="mt-1 font-mono text-[9px] tracking-[0.12em] text-accent uppercase">
                  Active
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
