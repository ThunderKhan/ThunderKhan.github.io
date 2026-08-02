import {
  ArrowUpRight,
  CircleDot,
  Code2,
  FileText,
  Github,
  GitBranch,
  GitPullRequest,
  Trophy,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { openSource } from '../data/portfolio'
import type { TimelineCategory, TimelineLink, TimelineStatus } from '../data/portfolio'
import { Section } from './Section'
import { EASE, StaggerGroup, StaggerItem } from './Reveal'

/** Badge icon per kind of work. Trophy marks the hackathon category only —
 *  it never implies the hackathon was won. */
const CATEGORY_ICON: Record<TimelineCategory, LucideIcon> = {
  'Project workflow': GitBranch,
  'Open-source contribution': Github,
  Hackathon: Trophy,
  'Problem solving': Code2,
}

/**
 * Status presentation. `tone` picks the existing violet (accent) or coral
 * token — no new colours. `pulse` marks work that is still moving, and the
 * `label` guarantees status is never communicated by colour alone.
 */
const STATUS: Record<
  TimelineStatus,
  { label: string; tone: 'accent' | 'coral'; pulse: boolean }
> = {
  completed: { label: 'Completed', tone: 'accent', pulse: false },
  ongoing: { label: 'Ongoing', tone: 'accent', pulse: true },
  'in-progress': { label: 'In progress', tone: 'coral', pulse: true },
}

/**
 * Some periods restate their status ("Ongoing", "In progress · 2026"). The
 * status badge already says that, so drop the duplicated words and keep only
 * the date information — returning '' when nothing else is left.
 */
function datePart(period: string, statusLabel: string): string {
  const trimmed = period.trim()
  if (trimmed.toLowerCase() === statusLabel.toLowerCase()) return ''
  return trimmed.replace(new RegExp(`^${statusLabel}\\s*[·—–-]\\s*`, 'i'), '')
}

/** Infers the evidence icon from the link target so data stays icon-agnostic. */
function evidenceIcon(link: TimelineLink, category: TimelineCategory): LucideIcon {
  if (link.url.includes('/pull/')) return GitPullRequest
  if (link.url.includes('/issues/')) return CircleDot
  if (link.url.endsWith('.md')) return FileText
  if (category === 'Problem solving') return Code2
  return Github
}

/**
 * The connecting line: a muted base track with a violet→coral overlay
 * that progressively draws itself in as the timeline scrolls into view.
 * Under reduced motion the full line is visible immediately.
 */
function TimelineLine() {
  const reduced = useReducedMotion()
  const gradient =
    'absolute inset-0 bg-gradient-to-b from-accent via-accent/70 to-coral'

  return (
    <div
      aria-hidden="true"
      className="absolute top-2 bottom-2 left-[11px] w-px -translate-x-1/2 md:left-1/2"
    >
      <div className="absolute inset-0 bg-border" />
      {reduced ? (
        <div className={gradient} />
      ) : (
        <m.div
          className={`${gradient} origin-top`}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        />
      )}
    </div>
  )
}

/**
 * Proof-of-work timeline: an ordered list of documented contributions.
 * Single left rail on mobile, cards alternating around a centre line on
 * desktop. Each card carries a category badge, a text status, its period,
 * and a labelled "Evidence" row of links to the work itself.
 */
export function OpenSource() {
  return (
    <Section
      id="open-source"
      eyebrow="Open source & proof of work"
      title="Work, documented in public."
      intro="A record of issues opened, pull requests merged, projects maintained, and experiments currently in development—with links to the work behind each one."
      wide
    >
      <div className="relative">
        <TimelineLine />

        <StaggerGroup as="ol" className="flex flex-col gap-8 md:gap-12" stagger={0.12}>
          {openSource.map((entry, index) => {
            const status = STATUS[entry.status]
            const coral = status.tone === 'coral'
            const CategoryIcon = CATEGORY_ICON[entry.category]
            const period = datePart(entry.period, status.label)
            const rightSide = index % 2 === 1

            return (
              <StaggerItem
                as="li"
                key={entry.title}
                className="relative md:grid md:grid-cols-2 md:gap-x-14"
              >
                {/* Timeline marker — pulses while the work is still moving */}
                <span
                  aria-hidden="true"
                  className="absolute top-7 left-[11px] z-10 flex -translate-x-1/2 items-center justify-center md:left-1/2"
                >
                  {status.pulse && (
                    <span
                      className={`status-pulse absolute inline-flex size-5 rounded-full ${
                        coral ? 'bg-coral/25' : 'bg-accent/25'
                      }`}
                    />
                  )}
                  <span
                    className={`relative size-3 rounded-full border-2 border-background ${
                      coral ? 'bg-coral' : 'bg-accent'
                    }`}
                  />
                </span>

                <div className={`ml-9 md:ml-0 ${rightSide ? 'md:col-start-2' : 'md:col-start-1'}`}>
                  <article
                    className={`bento-glow group relative overflow-hidden rounded-3xl border border-border bg-card p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:p-6 md:p-7 ${
                      coral ? 'hover:border-coral/40' : 'hover:border-accent/40'
                    }`}
                  >
                    {/* Category · status · period */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                        <CategoryIcon size={12} aria-hidden="true" />
                        {entry.category}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] tracking-wide uppercase ${
                          coral
                            ? 'border-coral/35 bg-coral/10 text-coral'
                            : 'border-accent/35 bg-accent/10 text-accent'
                        }`}
                      >
                        {status.pulse && (
                          <span
                            aria-hidden="true"
                            className={`status-pulse inline-flex size-1.5 rounded-full ${
                              coral ? 'bg-coral' : 'bg-accent'
                            }`}
                          />
                        )}
                        {status.label}
                      </span>

                      {period && (
                        <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                          {period}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-4 text-base font-semibold text-foreground text-balance md:text-lg">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                      {entry.description}
                    </p>

                    {entry.links.length > 0 && (
                      <div className="mt-5 border-t border-border pt-4">
                        <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                          Evidence
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {entry.links.map((link) => {
                            const LinkIcon = evidenceIcon(link, entry.category)

                            return (
                              <li key={link.url} className="min-w-0">
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className={`group/link inline-flex min-h-8 max-w-full items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground transition-colors ${
                                    coral
                                      ? 'hover:border-coral/45 hover:text-coral'
                                      : 'hover:border-accent/45 hover:text-accent'
                                  }`}
                                >
                                  <LinkIcon
                                    size={13}
                                    aria-hidden="true"
                                    className="shrink-0 text-muted-foreground transition-colors group-hover/link:text-current"
                                  />
                                  <span className="truncate">{link.label}</span>
                                  <ArrowUpRight
                                    size={12}
                                    aria-hidden="true"
                                    className="shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 motion-reduce:group-hover/link:translate-x-0 motion-reduce:group-hover/link:translate-y-0"
                                  />
                                  <span className="sr-only">(opens in a new tab)</span>
                                </a>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                  </article>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </Section>
  )
}
