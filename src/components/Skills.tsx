import {
  Bot,
  Braces,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { skillGroups } from '../data/portfolio'
import { Section } from './Section'
import { Reveal, StaggerGroup, StaggerItem } from './Reveal'

const DOMAIN_META: Record<
  string,
  {
    label: string
    description: string
    Icon: LucideIcon
    accent: 'accent' | 'coral'
    detail: string
    practice: string[]
  }
> = {
  'Programming languages': {
    label: 'Languages',
    description: 'The languages I reach for across systems, backend, browser, and data work.',
    Icon: Braces,
    accent: 'accent',
    detail:
      'I treat languages as problem-solving tools rather than identity labels. The choice usually follows the constraints: control and predictability for systems work, iteration speed for experiments and backend services, and strong product ergonomics for browser-facing interfaces.',
    practice: [
      'C++ for systems-oriented tooling, explicit resource control, and performance-sensitive work.',
      'Python for experimentation, APIs, graph/data workflows, evaluation, and automation.',
      'TypeScript for browser products where strong contracts help keep UI and domain behavior aligned.',
    ],
  },
  'Systems & developer tooling': {
    label: 'Systems & DevTools',
    description: 'Build graphs, CLIs, reproducibility, debugging, and lower-level engineering workflows.',
    Icon: Wrench,
    accent: 'coral',
    detail:
      'This is where I care most about deterministic behavior, evidence, and failure modes. I like tools that can explain why they made a decision, degrade conservatively when metadata is incomplete, and remain reproducible across runs.',
    practice: [
      'Model build and dependency relationships explicitly instead of relying on opaque heuristics.',
      'Design command-line interfaces around inspectable state, useful diagnostics, and safe fallbacks.',
      'Use tests, sanitizers, reproducible builds, and failure handling as part of the product rather than cleanup work.',
    ],
  },
  'Web & application engineering': {
    label: 'Application Engineering',
    description: 'Frontend, backend, APIs, persistence, and product surfaces that make the systems usable.',
    Icon: Layers3,
    accent: 'accent',
    detail:
      'I use application engineering to turn underlying systems into something a person can actually operate. That means the UI, API, validation, persistence, and domain rules need to agree rather than behaving like separate demos stitched together.',
    practice: [
      'Build typed interfaces between frontend and backend boundaries.',
      'Keep validation and domain rules close to the source of truth instead of duplicating them loosely in the UI.',
      'Prefer product surfaces that expose state, provenance, and important constraints clearly to the user.',
    ],
  },
  'AI, agents & data systems': {
    label: 'Agents & Data',
    description: 'Agent interfaces, structured model workflows, graph analysis, evaluation, and applied ML.',
    Icon: Bot,
    accent: 'coral',
    detail:
      'I am most interested in AI when the surrounding system is measurable and inspectable. Models can propose, classify, narrate, or coordinate, but the workflow still needs structured inputs, explicit boundaries, provenance, and evaluation that can reveal when the system is wrong.',
    practice: [
      'Use structured outputs and semantic tools to reduce ambiguity in agent workflows.',
      'Separate model judgment from deterministic policy when consequences matter.',
      'Treat evaluation, diagnostics, experiment provenance, and reproducibility as first-class engineering concerns.',
    ],
  },
  'Engineering practice': {
    label: 'Engineering Practice',
    description: 'The habits around the code: tests, CI, failure handling, validation, and collaboration.',
    Icon: GitBranch,
    accent: 'accent',
    detail:
      'The surrounding engineering practice is what makes a project trustworthy after the interesting prototype is finished. I want changes to be reviewable, failures to be diagnosable, and assumptions to be visible in tests, docs, issues, and public evidence.',
    practice: [
      'Use tests and CI to protect behavior rather than only checking that code compiles.',
      'Design failure states and validation paths intentionally instead of treating them as edge-case polish.',
      'Work in public when possible through issues, pull requests, design notes, benchmarks, and reproducible examples.',
    ],
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

type SkillGroup = (typeof skillGroups)[number]

function getMeta(group: SkillGroup) {
  return (
    DOMAIN_META[group.title] ?? {
      label: group.title,
      description: 'Tools and concepts I use across current engineering work.',
      Icon: Code2,
      accent: 'accent' as const,
      detail: 'A working set of tools and concepts I use when the problem calls for them.',
      practice: ['Choose tools around constraints.', 'Keep behavior inspectable.', 'Prefer repeatable engineering workflows.'],
    }
  )
}

function DomainCard({ group, onOpen }: { group: SkillGroup; onOpen: (group: SkillGroup) => void }) {
  const meta = getMeta(group)
  const { Icon } = meta
  const coral = meta.accent === 'coral'

  return (
    <m.article
      layoutId={`skill-card-${group.title}`}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${meta.label}`}
      onClick={() => onOpen(group)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(group)
        }
      }}
      className={`bento-glow group relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card p-6 outline-none transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-accent/70 motion-reduce:hover:translate-y-0 ${
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
          <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{meta.label}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{meta.description}</p>
        </div>
        <div className="text-right">
          <span className="block font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            {group.skills.length} signals
          </span>
          <span className="mt-2 block font-mono text-[9px] tracking-[0.14em] text-muted-foreground/60 uppercase transition-colors group-hover:text-foreground">
            click to inspect
          </span>
        </div>
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
    </m.article>
  )
}

function SkillDetail({ group, onClose }: { group: SkillGroup; onClose: () => void }) {
  const reducedMotion = useReducedMotion()
  const meta = getMeta(group)
  const { Icon } = meta
  const coral = meta.accent === 'coral'
  const activeSkills = group.skills.filter((skill) => NOW.includes(skill))
  const supportingSkills = group.skills.filter((skill) => !NOW.includes(skill))

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <m.div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/55 p-4 backdrop-blur-md sm:p-6"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.22 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <m.article
        layoutId={`skill-card-${group.title}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${meta.label} details`}
        className="relative max-h-[84svh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-border bg-card p-6 shadow-[0_30px_120px_rgba(0,0,0,0.48)] sm:p-8"
        transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close skill details"
          className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:border-accent/45 hover:text-foreground"
        >
          <X size={17} aria-hidden="true" />
        </button>

        <div className="pr-12">
          <div
            className={`inline-flex size-12 items-center justify-center rounded-2xl border ${
              coral
                ? 'border-coral/30 bg-coral/10 text-coral'
                : 'border-accent/30 bg-accent/10 text-accent'
            }`}
          >
            <Icon size={21} aria-hidden="true" />
          </div>
          <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            Engineering domain · {group.skills.length} signals
          </p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{meta.label}</h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{meta.detail}</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-border bg-background/45 p-5">
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              What this means in practice
            </p>
            <ul className="mt-4 space-y-3">
              {meta.practice.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className={`mt-2 size-1.5 shrink-0 rounded-full ${coral ? 'bg-coral' : 'bg-accent'}`}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-background/45 p-5">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                Current working set
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeSkills.length > 0 ? (
                  activeSkills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-full border px-3 py-1.5 text-xs ${
                        coral
                          ? 'border-coral/35 bg-coral/10 text-foreground'
                          : 'border-accent/35 bg-accent/10 text-foreground'
                      }`}
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">No highlighted current signals in this group.</span>
                )}
              </div>
            </div>

            {supportingSkills.length > 0 && (
              <div className="rounded-2xl border border-border bg-background/45 p-5">
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Supporting toolkit
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {supportingSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="mt-6 text-center font-mono text-[9px] tracking-[0.16em] text-muted-foreground/70 uppercase">
          Esc or click outside to close
        </p>
      </m.article>
    </m.div>
  )
}

export function Skills() {
  const activeGroups = skillGroups.filter((group) => !group.learning)
  const learning = skillGroups.find((group) => group.learning)
  const [selectedGroup, setSelectedGroup] = useState<SkillGroup | null>(null)

  return (
    <>
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
              <DomainCard group={group} onOpen={setSelectedGroup} />
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

      <AnimatePresence>
        {selectedGroup && <SkillDetail group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
      </AnimatePresence>
    </>
  )
}
