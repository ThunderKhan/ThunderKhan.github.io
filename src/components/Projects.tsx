import { ArrowUpRight, BookOpen, ExternalLink, Github } from 'lucide-react'
import { links, projects } from '../data/portfolio'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" eyebrow="Featured projects" title="Things I&#39;ve been building.">
      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-5"
          >
            <div className="border-b border-border md:col-span-2 md:border-r md:border-b-0">
              <img
                src={project.screenshot}
                alt={project.screenshotAlt}
                loading="lazy"
                width={640}
                height={400}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 p-6 md:col-span-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-xl text-foreground">{project.title}</h3>
                <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                  {project.status}
                </span>
              </div>

              <div>
                <h4 className="font-mono text-xs tracking-widest text-accent uppercase">Problem</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {project.problem}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                {project.description}
              </p>

              <div>
                <h4 className="font-mono text-xs tracking-widest text-accent uppercase">Highlights</h4>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                      <span aria-hidden="true" className="mt-2 inline-block size-1 shrink-0 rounded-full bg-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-accent"
                >
                  <Github size={15} aria-hidden="true" />
                  Source code
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-accent"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    Live demo
                  </a>
                )}
                {project.caseStudyUrl && (
                  <a
                    href={project.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-accent"
                  >
                    <BookOpen size={15} aria-hidden="true" />
                    Case study
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <a
        href={links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-1.5 text-sm text-accent underline-offset-4 transition-colors hover:underline"
      >
        View all projects on GitHub
        <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </Section>
  )
}
