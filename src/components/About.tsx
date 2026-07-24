import { about, interests } from '../data/portfolio'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Learning in public, building on purpose.">
      <div className="grid gap-10 md:grid-cols-5 md:gap-12">
        <div className="flex flex-col gap-5 md:col-span-3">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="leading-relaxed text-muted-foreground text-pretty">
              {paragraph}
            </p>
          ))}

          <div>
            <h3 className="text-sm font-medium text-foreground">Interests</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {interests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="md:col-span-2" aria-label="At a glance">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              At a glance
            </h3>
            <dl className="mt-4 flex flex-col gap-4">
              {about.atAGlance.map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5 border-b border-border pb-3 last:border-b-0 last:pb-0">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="text-sm font-medium text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  )
}
