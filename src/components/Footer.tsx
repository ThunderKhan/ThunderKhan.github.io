import { ArrowUp, Code2, FileText, Github, Linkedin, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { links, navigation, site } from '../data/portfolio'

type ConnectLink = {
  label: string
  href: string
  Icon: LucideIcon
  external: boolean
}

const CONNECT_LINKS: ConnectLink[] = [
  { label: 'GitHub', href: links.github, Icon: Github, external: true },
  { label: 'LinkedIn', href: links.linkedin, Icon: Linkedin, external: true },
  { label: 'LeetCode', href: links.leetcode, Icon: Code2, external: true },
  { label: 'Email', href: `mailto:${links.email}`, Icon: Mail, external: false },
  { label: 'Résumé', href: site.resume, Icon: FileText, external: true },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      {/* Extra bottom padding keeps the floating dock clear of footer content. */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-12 pb-[calc(7rem+env(safe-area-inset-bottom))] sm:px-6 sm:pt-14 sm:pb-[calc(7.5rem+env(safe-area-inset-bottom))]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 font-mono text-sm font-semibold text-accent"
              >
                {site.initials}
              </span>
              <div className="min-w-0">
                <p className="text-base font-semibold tracking-tight text-foreground">
                  {site.name}
                </p>
                <p className="font-mono text-xs text-muted-foreground">{site.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              {site.headline} — building in the open, one project at a time.
            </p>
          </div>

          {/* Internal navigation */}
          <div>
            <h2 className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              Navigate
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Profiles and documents */}
          <div>
            <h2 className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              Connect
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {CONNECT_LINKS.map(({ label, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    <Icon
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 transition-colors group-hover:text-accent"
                    />
                    {label}
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Designed and built by {site.name}.{' '}
            <span className="font-mono whitespace-nowrap">© {year}</span>
          </p>
          <a
            href="#hero"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp size={14} aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
