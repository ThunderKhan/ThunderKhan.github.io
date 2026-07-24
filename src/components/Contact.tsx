import { useState } from 'react'
import { Check, Copy, Github, Linkedin, Mail } from 'lucide-react'
import { links, site } from '../data/portfolio'
import { Section } from './Section'

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
    <Section id="contact" eyebrow="Contact" title="Let&#39;s build something worth talking about.">
      <p className="max-w-xl leading-relaxed text-muted-foreground text-pretty">
        {site.availability}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${links.email}`}
          className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <Mail size={16} aria-hidden="true" />
          {links.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {copied ? (
            <>
              <Check size={16} aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy size={16} aria-hidden="true" />
              Copy email
            </>
          )}
          <span aria-live="polite" className="sr-only">
            {copied ? 'Email address copied to clipboard' : ''}
          </span>
        </button>
      </div>

      <ul className="mt-8 flex flex-col gap-3" aria-label="Other ways to reach me">
        <li>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <Linkedin size={16} aria-hidden="true" />
            linkedin.com/in/the-ayan-khan
          </a>
        </li>
        <li>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <Github size={16} aria-hidden="true" />
            GitHub
          </a>
        </li>
      </ul>
    </Section>
  )
}
