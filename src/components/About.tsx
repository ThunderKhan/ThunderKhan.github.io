import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight, Code2, Github, GraduationCap, MapPin } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { about, education, interests, links, site } from '../data/portfolio'
import { Section } from './Section'
import { StaggerGroup } from './Reveal'
import { BentoCard } from './BentoCard'
import {
  GitHubActivityGraph,
  contributions,
  formatRange,
  hasContributionData,
} from './GitHubActivityGraph'

/* ------------------------------------------------------------------ */
/* Count-up: animates only when the value parses to a safe number.    */
/* Preserves "+" suffix; falls back to the raw string otherwise.      */
/* ------------------------------------------------------------------ */
function useCountUp(raw: string) {
  const match = raw.match(/^(\d+)(\+?)$/)
  const target = match ? Number.parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced || target === null ? raw : '0')
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (target === null || reduced) {
      setDisplay(raw)
      return
    }
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return
        started.current = true
        const duration = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
          setDisplay(`${Math.round(eased * target)}${t === 1 ? suffix : ''}`)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, raw, reduced])

  return { ref, display }
}

function ProblemCountCard() {
  const entry = about.atAGlance.find(
    (item) => item.label === 'LeetCode problems solved',
  )
  const { ref, display } = useCountUp(entry?.value ?? '')
  if (!entry) return null

  return (
    <BentoCard className="flex-1">
      <div className="flex h-full flex-col gap-4">
        <div>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            {entry.label}
          </p>
          <p className="mt-3 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            <span ref={ref}>{display}</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
            Practising patterns and problem solving across C++, Python, and Java.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2" aria-label="Practice languages">
          {['C++', 'Python', 'Java'].map((lang) => (
            <li
              key={lang}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {lang}
            </li>
          ))}
        </ul>
        <a
          href={links.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground"
        >
          <Code2 size={16} aria-hidden="true" />
          View LeetCode profile
          <ArrowUpRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </BentoCard>
  )
}

function LocationCard() {
  return (
    <BentoCard className="flex-1">
      <div className="flex h-full flex-col justify-between gap-6">
        <div>
          <p className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <MapPin size={12} aria-hidden="true" />
            Based in
          </p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{site.location}</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">UTC+05:30 · IST</p>
        </div>
        {/* Abstract orbit motif — decorative only */}
        <div aria-hidden="true" className="relative mx-auto h-24 w-24">
          <span className="absolute inset-0 rounded-full border border-border" />
          <span className="absolute inset-3 rounded-full border border-dashed border-accent/30" />
          <span className="absolute inset-7 rounded-full border border-border" />
          <span className="absolute top-1/2 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
          <span className="absolute top-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-coral" />
          <span className="absolute right-1 bottom-4 size-1.5 rounded-full bg-amber" />
        </div>
      </div>
    </BentoCard>
  )
}

/**
 * Real public GitHub activity for the trailing 60 days.
 * Data is generated at build time by scripts/fetch-github-contributions.mjs;
 * when no generated data exists (local dev), an unavailable notice renders
 * instead of fabricated cells.
 */
function GithubCard() {
  return (
    <BentoCard className="md:col-span-5">
      <div className="flex h-full flex-col gap-4">
        <div>
          <p className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            <Github size={12} aria-hidden="true" />
            Public GitHub activity
          </p>
          <p className="mt-3 text-xl font-bold text-foreground">
            The last 60 days, in commits and contributions.
          </p>
          {hasContributionData && (
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {contributions.totalContributions} contribution
              {contributions.totalContributions === 1 ? '' : 's'} ·{' '}
              {formatRange(contributions.from!, contributions.to!)} ·{' '}
              <span className="font-mono text-xs">Updated daily</span>
            </p>
          )}
        </div>
        <GitHubActivityGraph />
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex min-h-11 items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-foreground"
        >
          View GitHub profile
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </BentoCard>
  )
}

function EducationCard() {
  const edu = education[0]
  if (!edu) return null
  return (
    <BentoCard className="md:col-span-4">
      <div className="flex h-full flex-col gap-3">
        <p className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <GraduationCap size={12} aria-hidden="true" />
          Education
        </p>
        <p className="text-lg leading-snug font-bold text-foreground">{edu.degree}</p>
        <p className="text-sm text-muted-foreground">{edu.institution}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <span className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
            {edu.period}
          </span>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent">
            {edu.status}
          </span>
        </div>
      </div>
    </BentoCard>
  )
}

function CurrentFocusCard() {
  const focus = interests.slice(0, 4)
  return (
    <BentoCard className="md:col-span-3">
      <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
        Current focus
      </p>
      <ul className="mt-4 flex flex-col gap-3">
        {focus.map((item, i) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
            <span
              aria-hidden="true"
              className={`mt-1.5 size-1.5 shrink-0 rounded-full ${
                i % 2 === 0 ? 'bg-accent' : 'bg-coral'
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </BentoCard>
  )
}

function ExploreCard() {
  return (
    <BentoCard className="sm:col-span-2 md:col-span-12">
      <a
        href="#projects"
        className="flex h-full flex-col justify-between gap-4 sm:flex-row sm:items-center"
      >
        <div>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Explore
          </p>
          <p className="mt-2 text-xl font-bold text-foreground transition-colors group-hover:text-accent">
            See what I&apos;m building
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Projects
          <ArrowRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </a>
    </BentoCard>
  )
}

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Building full-stack applications and C++ systems."
      wide
    >
      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:gap-5" stagger={0.07}>
        {/* Intro card — spans wide */}
        <BentoCard className="sm:col-span-2 md:col-span-8">
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Who I am
          </p>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-foreground md:text-xl text-pretty">
            {about.paragraphs[0]}
          </p>
          <div className="mt-4 flex max-w-prose flex-col gap-3 border-t border-border pt-4">
            {about.paragraphs.slice(1).map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-sm leading-relaxed text-muted-foreground text-pretty"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </BentoCard>

        {/* Right column beside the intro: two content-sized cards share the
            row height so neither stretches into a large empty band. */}
        <div className="flex flex-col gap-4 sm:col-span-1 md:col-span-4 md:gap-5">
          <ProblemCountCard />
          <LocationCard />
        </div>
        <GithubCard />
        <CurrentFocusCard />
        <EducationCard />
        <ExploreCard />
      </StaggerGroup>
    </Section>
  )
}
