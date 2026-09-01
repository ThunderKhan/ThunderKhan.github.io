import { ArrowRight, Code2, Download, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { m, useReducedMotion } from 'motion/react'
import { links, site } from '../data/portfolio'
import { CinematicHero } from './CinematicHero'
import { EASE } from './Reveal'
import { SocialKey } from './SocialKey'
import { HeroCodeTree } from './HeroCodeTree'

const heroItem = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE },
  },
}

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

/**
 * Nearly full-viewport hero with a staggered entrance sequence:
 * availability pill → heading lines → intro → CTAs → social keys.
 *
 * The cinematic scroll experiment is opt-in via `?hero=cinematic`,
 * so the existing homepage remains unchanged by default.
 */
export function Hero() {
  const cinematic =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('hero') === 'cinematic'

  if (cinematic) return <CinematicHero />

  const reduced = useReducedMotion()

  const Wrapper = reduced ? 'div' : m.div
  const Item = reduced ? 'div' : m.div
  const motionProps = reduced
    ? {}
    : { initial: 'hidden' as const, animate: 'visible' as const, variants: heroContainer }
  const itemProps = reduced ? {} : { variants: heroItem }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="flex min-h-[92svh] items-center"
    >
      <Wrapper
        className="mx-auto flex w-full max-w-6xl items-center gap-10 px-4 pt-24 pb-16 sm:px-6 md:pb-20 lg:gap-14"
        {...motionProps}
      >
        <div className="min-w-0 flex-1">
        {/* Availability pill */}
        <Item {...itemProps}>
          <p className="inline-flex max-w-2xl items-center gap-2.5 rounded-full border border-border bg-card/60 py-1.5 pr-4 pl-3 font-mono text-xs leading-relaxed text-muted-foreground">
            <span className="relative flex size-2 shrink-0" aria-hidden="true">
              <span className="status-pulse absolute inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span>{site.availability}</span>
          </p>
        </Item>

        {/* Heading line one */}
        <Item {...itemProps}>
          <h1 className="mt-7 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-7xl text-balance">
            Hi, I&apos;m {site.name}.
          </h1>
        </Item>

        {/* Heading line two */}
        <Item {...itemProps}>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-accent sm:text-3xl md:text-5xl text-balance">
            {site.headline}
          </p>
        </Item>

        {/* Intro */}
        <Item {...itemProps}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg text-pretty">
            {site.intro}
          </p>
        </Item>

        {/* CTAs */}
        <Item {...itemProps}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              View my work
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={site.resume}
              download
              className="flex min-h-11 items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <Download size={15} aria-hidden="true" />
              Résumé
            </a>
            <a
              href="#contact"
              className="min-h-11 px-2 py-2.5 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              Let&apos;s connect
            </a>
          </div>
        </Item>

        {/* Social keys */}
        <Item {...itemProps}>
          <ul className="mt-12 flex flex-wrap gap-3" aria-label="Profiles and documents">
            <li>
              <SocialKey href={links.github} label="GitHub" Icon={Github} />
            </li>
            <li>
              <SocialKey href={links.linkedin} label="LinkedIn" Icon={Linkedin} />
            </li>
            <li>
              <SocialKey href={links.leetcode} label="LeetCode" Icon={Code2} />
            </li>
            <li>
              <SocialKey href={`mailto:${links.email}`} label="Email" Icon={Mail} external={false} />
            </li>
            <li>
              <SocialKey href={site.resume} label="Résumé" Icon={FileText} />
            </li>
          </ul>
        </Item>
        </div>

        {/* Decorative living code tree — desktop only */}
        <div className="hidden w-[38%] shrink-0 lg:block" aria-hidden="true">
          <HeroCodeTree />
        </div>
      </Wrapper>
    </section>
  )
}
