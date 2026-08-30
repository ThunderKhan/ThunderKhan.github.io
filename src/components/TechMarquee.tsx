import { useState } from 'react'

export type TechChip = {
  name: string
  /** Styled as "currently learning" — dashed, muted, no expertise implied. */
  learning?: boolean
}

function ChipList({ chips, hidden }: { chips: TechChip[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-3 pr-3 ${
        hidden ? 'marquee-dupe' : 'marquee-list'
      }`}
    >
      {chips.map((chip) => (
        <li
          key={chip.name}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm whitespace-nowrap ${
            chip.learning
              ? 'border border-dashed border-accent/50 text-muted-foreground'
              : 'border border-border bg-card text-foreground'
          }`}
        >
          {chip.learning && (
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
          )}
          {chip.name}
          {chip.learning && <span className="sr-only">(currently learning)</span>}
        </li>
      ))}
    </ul>
  )
}

/**
 * Horizontal technology marquee.
 * - Content is duplicated once (aria-hidden) purely for a seamless loop.
 * - Pauses on hover and provides a keyboard-accessible pause/resume control.
 * - Under prefers-reduced-motion — and on small screens — it degrades
 *   into a static wrapped chip list (see marquee styles in index.css).
 */
export function TechMarquee({ chips, label }: { chips: TechChip[]; label: string }) {
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="marquee-container marquee-mask relative overflow-hidden rounded-3xl border border-border bg-card/60 px-2 py-4"
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
        className="sr-only z-10 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:not-sr-only focus:absolute focus:top-2 focus:right-2"
      >
        {paused ? 'Resume technology marquee' : 'Pause technology marquee'}
      </button>

      <div
        className="marquee-track flex w-max"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        <ChipList chips={chips} />
        <ChipList chips={chips} hidden />
      </div>
    </div>
  )
}
