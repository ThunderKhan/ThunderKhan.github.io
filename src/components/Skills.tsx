import {
  Bot,
  Braces,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Sparkles,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { skillGroups } from '../data/portfolio'
import { Section } from './Section'
import { Reveal, StaggerGroup, StaggerItem } from './Reveal'

const DOMAIN_META: Record<
  string,
  { label: string; description: string; Icon: LucideIcon; accent: 'accent' | 'coral' }
> = {
  'Programming languages': {
    label: 'Languages',
    description: 'The languages I reach for across systems, backend, browser, and data work.',
    Icon: Braces,
    accent: 'accent',
  },
  'Systems & developer tooling': {
    label: 'Systems & DevTools',
    description: 'Build graphs, CLIs, reproducibility, debugging, and lower-level engineering workflows.',
    Icon: Wrench,
    accent: 'coral',
  },
  'Web & application engineering': {
    label: 'Application Engineering',
    description: 'Frontend, backend, APIs, persistence, and product surfaces that make the systems usable.',
    Icon: Layers3,
    accent: 'accent',
  },
  'AI, agents & data systems': {
    label: 'Agents & Data',
    description: 'Agent interfaces, structured model workflows, graph analysis, evaluation, and applied ML.',
    Icon: Bot,
    accent: 'coral',
  },
  'Engineering practice': {
    label: 'Engineering Practice',
    description: 'The habits around the code: tests, CI, failure handling, validation, and collaboration.',
    Icon: GitBranch,
    accent: 'accent',
  },
}

const NOW = [
  'C++20/23',
  'CMake',
  'CTest',
  'Python',
  'TypeScript',
  'React',
  'FastAPI',
  'WebMCP',
  'Structured outputs',
  'NetworkX',
  'scikit-learn',
  'SQLite',
]

function DomainCard({ group }: { group: (typeof skillGroups)[number] }) {
  const meta = DOMAIN_META[group.title] ?? {
    label: group.title,
    description: 'Tools and concepts I use across current engineering work.',
    Icon: Code2,
    accent: 'accent' as const,
  }
  const { Icon } = meta
  const coral = meta.accent === 'coral'

  return (
    <article
      className={`bento-glow group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${
        coral ? 'hover:border-coral/40' : 'hover:border-accent/40'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className={`inline-flex size-10 items-center justify-center rounded-2xl border ${
              coral
                ? 'border-coral/30 bg-coral/10 text-coral'
                : 'border-accent/30 bg-accent/10 text-accent'
            }`}
          >
            <Icon size={18} aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
            {meta.label}
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            {meta.description}
          </p>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          {group.skills.length} signals
        </span>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${meta.label} skills`}>
        {group.skills.map((skill) => {
          const active = NOW.includes(skill)
          return (
            <li
              key={skill}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                active
                  ? coral
                    ? 'border-coral/35 bg-coral/10 text-foreground'
                    : 'border-accent/35 bg-accent/10 text-foreground'
                  : 'border-border bg-muted/70 text-muted-foreground'
              }`}
            >
              {skill}
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export function Skills() {
  const activeGroups = skillGroups.filter((group) => !group.learning)
  const learning = skillGroups.find((group) => group.learning)

  return (
    <Section
      id="skills"
      eyebrow="Engineering stack"
      title="What I’m actually using."
      intro="Grouped by the kind of work they support, not by résumé category. Highlighted items are part of my current working set; the rest are tools I still use when the problem calls for them."
      wide
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/8 via-transparent to-coral/8"
          />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                <Sparkles size={13} aria-hidden="true" />
                Current working set
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The tools showing up repeatedly across my recent systems, agent, graph, and application work.
              </p>
            </div>
            <ul className="flex max-w-3xl flex-wrap gap-2" aria-label="Current working set">
              {NOW.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[11px] text-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      <StaggerGroup className="mt-6 grid gap-5 lg:grid-cols-2" stagger={0.08}>
        {activeGroups.map((group) => (
          <StaggerItem key={group.title}>
            <DomainCard group={group} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {learning && (
        <Reveal className="mt-6" delay={0.08}>
          <div className="relative overflow-hidden rounded-3xl border border-dashed border-accent/35 bg-card/70 p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <Database size={16} className="text-accent" aria-hidden="true" />
                  <h3 className="text-base font-semibold text-foreground">Currently developing</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  These are active learning directions rather than technologies I’m presenting as established strengths.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Currently developing skills">
                {learning.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-dashed border-accent/45 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      )}
    </Section>
  )
}
