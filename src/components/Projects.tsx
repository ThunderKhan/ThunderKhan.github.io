import { ArrowUpRight, BookOpen, ExternalLink, Github } from 'lucide-react'
import { links, projects } from '../data/portfolio'
import { ProjectVisual } from './ProjectVisual'
import { Section } from './Section'
import { Reveal, StaggerGroup, StaggerItem } from './Reveal'

function isValidUrl(url: string | undefined): url is string {
  return typeof url === 'string' && /^https?:\/\//.test(url)
}

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

function FeaturedProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const flipped = index % 2 === 1

  return (
    <article className="project-card group relative grid overflow-hidden rounded-3xl border border-border bg-card transition-[border-color,box-shadow] duration-300 md:grid-cols-2">
      <div
        aria-hidden="true"
        className={`relative self-stretch overflow-hidden border-b border-border bg-muted md:min-h-80 md:border-b-0 ${
          flipped ? 'md:order-2 md:border-l' : 'md:border-r'
        }`}
      >
        <ProjectVisual visual={project.visual} />
        <span
          aria-hidden="true"
          className="absolute top-4 left-4 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[11px] tracking-widest text-muted-foreground backdrop-blur-sm"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

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

function CompactProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_60px_-30px_color-mix(in_oklab,var(--color-accent)_55%,transparent)] motion-reduce:hover:translate-y-0">
      <div className="relative h-48 overflow-hidden border-b border-border bg-muted sm:h-52">
        <ProjectVisual visual={project.visual} />
        <span className="absolute top-4 left-4 rounded-full border border-border bg-background/75 px-2.5 py-1 font-mono text-[11px] tracking-widest text-muted-foreground backdrop-blur-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight text-foreground">{project.title}</h3>
          <span className="rounded-full border border-border bg-muted px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
            {project.status}
          </span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.slice(0, 5).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] text-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 border-t border-border pt-4">
          {isValidUrl(project.githubUrl) && (
            <ProjectLink href={project.githubUrl} label="Source" Icon={Github} />
          )}
          {isValidUrl(project.liveUrl) && (
            <ProjectLink href={project.liveUrl} label="Demo" Icon={ExternalLink} />
          )}
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const featuredProjects = projects.slice(0, 4)
  const additionalProjects = projects.slice(4)

  return (
    <Section
      id="projects"
      eyebrow="Selected engineering work"
      title="Systems worth opening up."
      intro="A smaller set of projects that best represent how I currently build: define the boundary, make the behavior inspectable, test the uncomfortable cases, and document what the system can and cannot claim."
      wide
    >
      <Reveal>
        <div className="mb-8 grid gap-3 rounded-3xl border border-border bg-card/60 p-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project, index) => (
            <a
              key={project.title}
              href={`#project-${index + 1}`}
              className="group flex min-h-20 items-center justify-between gap-4 rounded-2xl px-4 py-3 transition-colors hover:bg-muted"
            >
              <span>
                <span className="block font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  0{index + 1}
                </span>
                <span className="mt-1 block text-sm font-semibold text-foreground">{project.title}</span>
              </span>
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </a>
          ))}
        </div>
      </Reveal>

      <StaggerGroup className="flex flex-col gap-8 md:gap-10" stagger={0.12}>
        {featuredProjects.map((project, index) => (
          <StaggerItem key={project.title}>
            <div id={`project-${index + 1}`} className="scroll-mt-24">
              <FeaturedProjectCard project={project} index={index} />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {additionalProjects.length > 0 && (
        <div className="mt-14 border-t border-border pt-10">
          <Reveal>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  More experiments
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  Active research and applied prototypes.
                </h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Useful context, but intentionally secondary to the four projects above.
              </p>
            </div>
          </Reveal>

          <StaggerGroup className="grid gap-6 lg:grid-cols-2" stagger={0.1}>
            {additionalProjects.map((project, offset) => (
              <StaggerItem key={project.title}>
                <CompactProjectCard project={project} index={featuredProjects.length + offset} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      )}

      <Reveal className="mt-10" delay={0.1}>
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/all inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 transition-colors hover:underline"
        >
          View the full project archive on GitHub
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
