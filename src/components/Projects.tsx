import { ArrowUpRight, BookOpen, ExternalLink, Github } from 'lucide-react'
import { links, projects } from '../data/portfolio'
import { ProjectVisual } from './ProjectVisual'
import { Section } from './Section'
import { Reveal, StaggerGroup, StaggerItem } from './Reveal'

/** True only for absolute http(s) URLs, so empty or partial values never render as links. */
function isValidUrl(url: string | undefined): url is string {
  return typeof url === 'string' && /^https?:\/\//.test(url)
}

/** Small mono link with a diagonal arrow that drifts up-right on hover. */
function ProjectLink({
  href,
  label,
  Icon,
}: {
  href: string
  label: string
  Icon: typeof Github
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-accent"
    >
      <Icon size={15} aria-hidden="true" />
      {label}
      <span className="sr-only">(opens in a new tab)</span>
      <ArrowUpRight
        size={14}
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
      />
    </a>
  )
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const flipped = index % 2 === 1

  return (
    <article className="project-card group relative grid overflow-hidden rounded-3xl border border-border bg-card transition-[border-color,box-shadow] duration-300 md:grid-cols-2">
      {/* Code-native visual — stacks above content on mobile, alternates sides on desktop.
          aria-hidden: the adjacent project copy already communicates everything shown. */}
      <div
        aria-hidden="true"
        className={`relative self-stretch overflow-hidden border-b border-border bg-muted md:min-h-80 md:border-b-0 ${
          flipped ? 'md:order-2 md:border-l' : 'md:border-r'
        }`}
      >
        <ProjectVisual visual={project.visual} />
        {/* Editorial index marker */}
        <span
          aria-hidden="true"
          className="absolute top-4 left-4 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[11px] tracking-widest text-muted-foreground backdrop-blur-sm"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className={`flex min-w-0 flex-col gap-5 p-6 md:p-8 ${flipped ? 'md:order-1' : ''}`}>
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground text-balance md:text-3xl">
            {project.title}
          </h3>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] text-accent">
            {project.status}
          </span>
        </div>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-coral uppercase">Problem</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
            {project.problem}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          {project.description}
        </p>

        <div>
          <h4 className="font-mono text-xs tracking-widest text-coral uppercase">Highlights</h4>
          <ul className="mt-2 flex flex-col gap-1.5">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block size-1 shrink-0 rounded-full bg-accent"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-border pt-4">
          {isValidUrl(project.githubUrl) && (
            <ProjectLink href={project.githubUrl} label="Source code" Icon={Github} />
          )}
          {isValidUrl(project.liveUrl) && (
            <ProjectLink href={project.liveUrl} label="Live demo" Icon={ExternalLink} />
          )}
          {isValidUrl(project.caseStudyUrl) && (
            <ProjectLink href={project.caseStudyUrl} label="Case study" Icon={BookOpen} />
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <Section id="projects" eyebrow="Featured projects" title="Things I’ve been building." wide>
      <StaggerGroup className="flex flex-col gap-8 md:gap-10" stagger={0.12}>
        {projects.map((project, index) => (
          <StaggerItem key={project.title}>
            <ProjectCard project={project} index={index} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-10" delay={0.1}>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/all inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 transition-colors hover:underline"
        >
          View all projects on GitHub
          <ArrowUpRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5"
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  )
}
