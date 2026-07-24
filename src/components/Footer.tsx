import { ArrowUp, FileText, Github, Linkedin } from 'lucide-react'
import { links, site } from '../data/portfolio'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          Designed and built by {site.name} · {year}
        </p>

        <div className="flex items-center gap-1">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github size={18} aria-hidden="true" />
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin size={18} aria-hidden="true" />
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View résumé PDF"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <FileText size={18} aria-hidden="true" />
          </a>
          <a
            href="#top"
            aria-label="Back to top"
            className="ml-2 flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp size={14} aria-hidden="true" />
            Top
          </a>
        </div>
      </div>
    </footer>
  )
}
