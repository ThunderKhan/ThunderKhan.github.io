import {
  Award,
  BookOpen,
  CalendarDays,
  Download,
  FileText,
  GraduationCap,
  Landmark,
  Trophy,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { education, site } from '../data/portfolio'
import { Section } from './Section'
import { Reveal, StaggerGroup, StaggerItem } from './Reveal'

/** Statuses that describe in-flight study get a live pulse dot. */
const ACTIVE_STATUS = /current|ongoing|in progress|expected|year/i

/** Detail groups render in this order — each one only when it has real entries. */
const DETAIL_GROUPS: { label: string; icon: LucideIcon; key: DetailKey }[] = [
  { label: 'Relevant coursework', icon: BookOpen, key: 'coursework' },
  { label: 'Certifications', icon: Award, key: 'certifications' },
  { label: 'Activities', icon: Users, key: 'activities' },
  { label: 'Achievements', icon: Trophy, key: 'achievements' },
]

type DetailKey = 'coursework' | 'certifications' | 'activities' | 'achievements'

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where I’m studying.">
      <StaggerGroup as="ol" className="flex flex-col gap-6" stagger={0.1}>
        {education.map((entry) => {
          // Empty arrays stay invisible: no headings render without real entries.
          const details = DETAIL_GROUPS.map((group) => ({
            ...group,
            items: (entry[group.key] ?? []).filter((item) => item.trim().length > 0),
          })).filter((group) => group.items.length > 0)

          const active = ACTIVE_STATUS.test(entry.status)

          return (
            <StaggerItem
              as="li"
              key={entry.degree}
              className="bento-glow group relative overflow-hidden rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 sm:p-6 md:p-7"
            >
              {/* Restrained academic motif: violet→coral hairline + faint cap watermark */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/70 via-accent/25 to-coral/60"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -right-6 hidden text-accent opacity-[0.06] sm:block"
              >
                <GraduationCap size={132} strokeWidth={1} />
              </span>

              <div className="relative flex items-start gap-3 sm:gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent"
                >
                  <GraduationCap size={20} />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground text-balance sm:text-xl">
                    {entry.degree}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-accent text-pretty">
                    Specialization in {entry.specialization}
                  </p>
                </div>
              </div>

              {/* Institution, period and status — labelled for clarity */}
              <dl className="relative mt-5 grid gap-4 rounded-2xl border border-border/70 bg-background/40 p-4 sm:grid-cols-2">
                <div className="min-w-0 sm:col-span-2">
                  <dt className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    <Landmark size={12} aria-hidden="true" />
                    Institution
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-foreground break-words">
                    {entry.institution}
                  </dd>
                </div>

                <div className="min-w-0">
                  <dt className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    <CalendarDays size={12} aria-hidden="true" />
                    Period
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-foreground break-words">
                    {entry.period}
                  </dd>
                </div>

                <div className="min-w-0">
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    Status
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-sm text-foreground">
                    {active && (
                      <span
                        aria-hidden="true"
                        className="status-pulse inline-flex size-1.5 shrink-0 rounded-full bg-coral"
                      />
                    )}
                    <span className="break-words">{entry.status}</span>
                  </dd>
                </div>
              </dl>

              {details.length > 0 && (
                <div className="relative mt-5 flex flex-col gap-5 border-t border-border pt-5">
                  {details.map(({ label, icon: Icon, items }) => (
                    <div key={label}>
                      <h4 className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                        <Icon size={13} aria-hidden="true" />
                        {label}
                      </h4>
                      <ul className="mt-2.5 flex flex-wrap gap-2">
                        {items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </StaggerItem>
          )
        })}
      </StaggerGroup>

      {/* Résumé — place the PDF file at public/Ayan_Khan_Resume.pdf so it is
          served from /Ayan_Khan_Resume.pdf on the deployed site. */}
      <Reveal className="mt-8 flex flex-wrap items-center gap-3" delay={0.15}>
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent sm:w-auto"
        >
          <FileText size={16} aria-hidden="true" />
          View Résumé
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a
          href={site.resume}
          download
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto"
        >
          <Download size={16} aria-hidden="true" />
          Download PDF
        </a>
      </Reveal>
    </Section>
  )
}
