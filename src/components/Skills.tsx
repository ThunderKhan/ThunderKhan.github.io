import { skillGroups } from '../data/portfolio'
import { Section } from './Section'

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with.">
      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className={`rounded-lg border p-6 ${
              group.learning ? 'border-dashed border-accent/50' : 'border-border bg-card'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-medium text-foreground">{group.title}</h3>
              {group.learning && (
                <span className="font-mono text-xs text-accent">in progress</span>
              )}
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className={`rounded-full px-3 py-1 text-xs ${
                    group.learning
                      ? 'border border-dashed border-accent/50 text-muted-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Dashed items are technologies I&apos;m actively learning — not yet claiming as strengths.
      </p>
    </Section>
  )
}
