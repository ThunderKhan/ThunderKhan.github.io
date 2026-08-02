import { skillGroups } from '../data/portfolio'
import { Section } from './Section'
import { Reveal, StaggerGroup } from './Reveal'
import { BentoCard } from './BentoCard'
import { TechMarquee, type TechChip } from './TechMarquee'

export function Skills() {
  // Flattening every group can surface the same skill twice (e.g. a tool that
  // belongs in two categories). The marquee keys on `name`, so it renders a
  // deduplicated list while the category cards keep their full skill sets.
  const chips: TechChip[] = Array.from(
    skillGroups
      .flatMap((group) =>
        group.skills.map((name) => ({ name, learning: group.learning ?? false })),
      )
      .reduce((map, chip) => {
        if (!map.has(chip.name)) map.set(chip.name, chip)
        return map
      }, new Map<string, TechChip>())
      .values(),
  )

  return (
    <Section id="skills" eyebrow="Skills" title="What I work with.">
      <Reveal>
        <TechMarquee chips={chips} label="Technologies I work with and am learning" />
      </Reveal>

      <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
        {skillGroups.map((group) => (
          <BentoCard key={group.title}>
            {group.learning && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl border border-dashed border-accent/40"
              />
            )}
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              {group.learning && (
                <span className="flex items-center gap-1.5 rounded-full border border-accent/40 px-2.5 py-0.5 font-mono text-xs text-accent">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                  in progress
                </span>
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
            {group.learning && (
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Actively learning — listed for transparency, not claimed as strengths.
              </p>
            )}
          </BentoCard>
        ))}
      </StaggerGroup>
    </Section>
  )
}
