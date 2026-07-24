import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}

/** Shared section wrapper: consistent spacing, eyebrow label, and heading. */
export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-border">
      <div className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>
        <h2
          id={`${id}-heading`}
          className="mt-2 font-serif text-3xl text-foreground md:text-4xl text-balance"
        >
          {title}
        </h2>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  )
}
