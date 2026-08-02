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
 * - Pauses on hover and keyboard focus (container is focusable).
 * - Under prefers-reduced-motion — and on small screens — it degrades
 *   into a static wrapped chip list (see marquee styles in index.css).
 */
export function TechMarquee({ chips, label }: { chips: TechChip[]; label: string }) {
  return (
    <div
      className="marquee-container marquee-mask overflow-hidden rounded-3xl border border-border bg-card/60 px-2 py-4"
      role="group"
      aria-label={label}
      tabIndex={0}
    >
      <div className="marquee-track flex w-max">
        <ChipList chips={chips} />
        <ChipList chips={chips} hidden />
      </div>
    </div>
  )
}
