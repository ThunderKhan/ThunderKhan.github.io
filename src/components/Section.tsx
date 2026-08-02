import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  /** Optional supporting sentence rendered directly under the heading. */
  intro?: string
  /** Widen the inner container for grid-heavy sections. */
  wide?: boolean
  children: ReactNode
}

/** Shared section wrapper: consistent spacing, mono eyebrow, revealed heading. */
export function Section({ id, eyebrow, title, intro, wide = false, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-20">
      <div
        className={`mx-auto w-full px-4 py-16 sm:px-6 md:py-24 ${
          wide ? 'max-w-6xl' : 'max-w-4xl'
        }`}
      >
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>
          <h2
            id={`${id}-heading`}
            className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty md:text-base">
              {intro}
            </p>
          )}
        </Reveal>
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  )
}
