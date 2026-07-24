import { Download, FileText, GraduationCap } from 'lucide-react'
import { education, site } from '../data/portfolio'
import { Section } from './Section'

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where I&#39;m studying.">
      <ol className="flex flex-col gap-6">
        {education.map((entry) => (
          <li key={entry.degree} className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 rounded-md bg-muted p-2 text-accent" aria-hidden="true">
                <GraduationCap size={20} />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-xl text-foreground">{entry.degree}</h3>
                <p className="text-sm text-muted-foreground">
                  Specialization in {entry.specialization}
                </p>
                <p className="text-sm text-foreground">{entry.institution}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {entry.period} · {entry.status}
                </p>
              </div>
            </div>

            {/* Coursework, certifications, activities, and achievements render
                automatically once entries are added in src/data/portfolio.ts */}
            {(
              [
                ['Relevant coursework', entry.coursework],
                ['Certifications', entry.certifications],
                ['Activities', entry.activities],
                ['Achievements', entry.achievements],
              ] as const
            ).map(
              ([label, items]) =>
                items.length > 0 && (
                  <div key={label} className="mt-5 border-t border-border pt-4">
                    <h4 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                      {label}
                    </h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-muted px-3 py-1 text-xs text-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
            )}
          </li>
        ))}
      </ol>

      {/* Résumé — place the PDF file at public/Ayan_Khan_Resume.pdf so it is
          served from /Ayan_Khan_Resume.pdf on the deployed site. */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <FileText size={16} aria-hidden="true" />
          View Résumé
        </a>
        <a
          href={site.resume}
          download
          className="flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <Download size={16} aria-hidden="true" />
          Download PDF
        </a>
      </div>
    </Section>
  )
}
