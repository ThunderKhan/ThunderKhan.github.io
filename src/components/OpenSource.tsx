import { ArrowUpRight } from 'lucide-react'
import { openSource } from '../data/portfolio'
import { Section } from './Section'

export function OpenSource() {
  return (
    <Section id="open-source" eyebrow="Open source & learning" title="The path so far.">
      <ol className="relative flex flex-col gap-8 border-l border-border pl-6">
        {openSource.map((entry) => (
          <li key={entry.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[1.72rem] size-2.5 rounded-full border-2 border-accent bg-background"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-base font-medium text-foreground">{entry.title}</h3>
              <span className="font-mono text-xs text-muted-foreground">{entry.period}</span>
            </div>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
              {entry.description}
            </p>
            {entry.links && entry.links.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-3">
                {entry.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent underline-offset-4 transition-colors hover:underline"
                    >
                      {link.label}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  )
}
