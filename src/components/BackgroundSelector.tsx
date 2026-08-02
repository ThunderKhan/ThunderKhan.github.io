import { Grid3x3, Moon, Sparkles } from 'lucide-react'
import type { BackgroundMode } from '../hooks/useBackgroundMode'

type BackgroundSelectorProps = {
  mode: BackgroundMode
  onSelect: (mode: BackgroundMode) => void
}

const OPTIONS: { value: BackgroundMode; label: string; Icon: typeof Sparkles }[] = [
  { value: 'aurora', label: 'Aurora background: soft drifting light', Icon: Sparkles },
  { value: 'blueprint', label: 'Blueprint background: engineering grid', Icon: Grid3x3 },
  { value: 'quiet', label: 'Quiet background: minimal and calm', Icon: Moon },
]

/** Compact three-way toggle for the ambient background mode. */
export function BackgroundSelector({ mode, onSelect }: BackgroundSelectorProps) {
  return (
    <div
      role="group"
      aria-label="Ambient background style"
      className="flex items-center gap-0.5 rounded-full border border-border bg-card/60 p-0.5"
    >
      {OPTIONS.map(({ value, label, Icon }) => {
        const selected = mode === value
        return (
          <button
            key={value}
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
        )
      })}
    </div>
  )
}
