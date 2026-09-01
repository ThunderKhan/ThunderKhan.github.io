import { ArrowUpRight, BookOpen, Clock3 } from 'lucide-react'
import { blogPosts } from '../data/blog-posts'
import { Section } from './Section'
import { Reveal } from './Reveal'

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function LatestWriting() {
  const latest = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))[0]

  if (!latest) return null

  return (
    <Section
      id="writing"
      eyebrow="Latest writing"
      title="Notes from the build process."
      intro="Long-form engineering notes on the decisions, failures, trade-offs, and evidence behind the things I ship."
      wide
    >
      <Reveal>
        <article className="group overflow-hidden rounded-3xl border border-border bg-card/75 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_90px_-44px_rgba(109,40,217,0.35)] motion-reduce:hover:translate-y-0">
          <a
            href={`/blog/${latest.slug}`}
            className="grid min-h-[380px] lg:grid-cols-[1.08fr_0.92fr]"
            aria-label={`Read ${latest.title}`}
          >
            {latest.cover ? (
              <div className="relative min-h-64 overflow-hidden border-b border-border bg-muted lg:min-h-full lg:border-r lg:border-b-0">
                <img
                  src={latest.cover}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                <div className="absolute top-5 left-5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/80 uppercase backdrop-blur-md">
                  Engineering note
                </div>
              </div>
            ) : null}

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                  <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 size={13} aria-hidden="true" />
                    {latest.readingTime}
                  </span>
                </div>

                <h3 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-foreground text-balance transition-colors group-hover:text-accent sm:text-4xl">
                  {latest.title}
                </h3>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground text-pretty sm:text-base">
                  {latest.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2" aria-label="Article topics">
                  {latest.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  <BookOpen size={16} aria-hidden="true" />
                  Read engineering note
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>

                <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Build log · architecture · trade-offs
                </span>
              </div>
            </div>
          </a>
        </article>
      </Reveal>

      <Reveal className="mt-6" delay={0.08}>
        <a
          href="/blog"
          className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Browse all writing
          <ArrowUpRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </Reveal>
    </Section>
  )
}
