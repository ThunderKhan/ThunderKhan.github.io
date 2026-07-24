import { ArrowRight, Download, FileText, Github, Linkedin, Mail } from 'lucide-react'
import { links, site } from '../data/portfolio'

export function Hero() {
  return (
    <section id="top" aria-label="Introduction">
      <div className="mx-auto w-full max-w-4xl px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <p className="font-mono text-xs tracking-widest text-accent uppercase">{site.tagline}</p>

        <h1 className="mt-4 font-serif text-4xl text-foreground md:text-6xl text-balance">
          Hi, I&apos;m {site.name}.
        </h1>
        <p className="mt-3 font-serif text-2xl text-muted-foreground italic md:text-3xl text-balance">
          {site.headline}
        </p>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg text-pretty">
          {site.intro}
        </p>

        <p className="mt-4 flex items-center gap-2 text-sm text-foreground">
          <span aria-hidden="true" className="inline-block size-2 rounded-full bg-accent" />
          Open to internships and collaboration
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            View My Work
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            href={site.resume}
            download
            className="flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Download size={16} aria-hidden="true" />
            Download Résumé
          </a>
          <a
            href="#contact"
            className="px-2 py-2.5 text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Let&apos;s Connect
          </a>
        </div>

        <ul className="mt-10 flex items-center gap-4" aria-label="Profiles and documents">
          <li>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="block rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github size={20} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="block rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={`mailto:${links.email}`}
              aria-label="Send email"
              className="block rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail size={20} aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View résumé PDF"
              className="block rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <FileText size={20} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}
