import { useState } from 'react'
import { ArrowUpRight, Check, Code2, Copy, FileText, Github, Linkedin, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { links, site } from '../data/portfolio'
import { Section } from './Section'
import { Reveal } from './Reveal'

/** Human-readable form of a profile URL — derived, never hardcoded. */
function prettyUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
}

type Channel = {
  label: string
  value: string
  href: string
  Icon: LucideIcon
  external: boolean
}

const CHANNELS: Channel[] = [
  { label: 'GitHub', value: prettyUrl(links.github), href: links.github, Icon: Github, external: true },
  {
    label: 'LinkedIn',
    value: prettyUrl(links.linkedin),
    href: links.linkedin,
    Icon: Linkedin,
    external: true,
  },
  {
    label: 'LeetCode',
    value: prettyUrl(links.leetcode),
    href: links.leetcode,
    Icon: Code2,
    external: true,
  },
  {
    label: 'Résumé',
    value: site.resume.replace(/^\//, ''),
    href: site.resume,
    Icon: FileText,
    external: true,
  },
]

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — the mailto link still works.
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Let’s build something worth talking about.">
      <Reveal>
        <div className="bento-glow relative overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-8 md:p-10">
          {/* Restrained violet/coral closing glow — decorative only. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-20 size-64 rounded-full bg-accent opacity-[0.12] blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -bottom-28 size-64 rounded-full bg-coral opacity-[0.09] blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-accent/70 via-accent/25 to-coral/60"
          />

          <div className="relative">
            {/* Availability — preserved verbatim from site data. */}
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              <span
                aria-hidden="true"
                className="status-pulse inline-flex size-1.5 shrink-0 rounded-full bg-coral"
              />
              Availability
            </p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed font-medium text-foreground text-pretty md:text-xl">
              {site.availability}
            </p>

            {/* Direct email — mailto link plus clipboard copy. */}
            <div className="mt-8 border-t border-border pt-8">
              <h3 className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                Email me directly
              </h3>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={`mailto:${links.email}`}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-xs font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:w-auto sm:px-6 sm:text-sm"
                >
                  <Mail size={16} aria-hidden="true" className="shrink-0" />
                  <span className="break-all">{links.email}</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent sm:w-auto"
                >
                  {copied ? (
                    <>
                      <Check size={16} aria-hidden="true" className="text-accent" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} aria-hidden="true" />
                      Copy email
                    </>
                  )}
                </button>
              </div>
              {/* Success announcement lives outside the button so it never
                  becomes part of the button's accessible name. */}
              <p aria-live="polite" className="sr-only">
                {copied ? 'Email address copied to clipboard' : ''}
              </p>
            </div>

            {/* Profiles and documents */}
            <div className="mt-8 border-t border-border pt-8">
              <h3
                id="contact-channels"
                className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase"
              >
                Find me elsewhere
              </h3>
              <ul
                aria-labelledby="contact-channels"
                className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {CHANNELS.map(({ label, value, href, Icon, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex min-h-14 items-center gap-3 rounded-2xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-accent/50 hover:bg-background/70"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent"
                      >
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-foreground">{label}</span>
                        <span className="block truncate font-mono text-[11px] text-muted-foreground">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
                      />
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
