import rawContributions from '../generated/github-contributions.json'

/* ------------------------------------------------------------------ */
/* Types for the build-time generated contribution data.               */
/* The JSON is produced by scripts/fetch-github-contributions.mjs      */
/* during the GitHub Actions build; the checked-in fallback contains   */
/* null metadata and an empty days array.                              */
/* ------------------------------------------------------------------ */

export type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE'

export type ContributionDay = {
  date: string
  count: number
  level: ContributionLevel
}

export type ContributionData = {
  login: string
  generatedAt: string | null
  from: string | null
  to: string | null
  totalContributions: number | null
  days: ContributionDay[]
}

export const contributions = rawContributions as unknown as ContributionData

export const hasContributionData =
  contributions.days.length > 0 && contributions.totalContributions !== null

/* ------------------------------------------------------------------ */
/* Presentation helpers                                                */
/* ------------------------------------------------------------------ */

const LEVEL_CLASSES: Record<ContributionLevel, string> = {
  NONE: 'bg-muted',
  FIRST_QUARTILE: 'bg-accent/25',
  SECOND_QUARTILE: 'bg-accent/50',
  THIRD_QUARTILE: 'bg-accent/75',
  FOURTH_QUARTILE: 'bg-accent ring-1 ring-inset ring-coral/60',
}

const LEGEND_ORDER: ContributionLevel[] = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
]

const longDate = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

const shortDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

function parseUtc(date: string) {
  return new Date(`${date}T00:00:00Z`)
}

export function formatRange(from: string, to: string) {
  return `${shortDate.format(parseUtc(from))} – ${shortDate.format(parseUtc(to))}`
}

function cellLabel(day: ContributionDay) {
  const formatted = longDate.format(parseUtc(day.date))
  if (day.count === 0) return `No contributions on ${formatted}`
  return `${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatted}`
}

/* ------------------------------------------------------------------ */
/* Calendar grid: 7 weekday rows, weekly columns, oldest → newest.     */
/* ------------------------------------------------------------------ */

export function GitHubActivityGraph() {
  if (!hasContributionData) {
    return (
      <p className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
        GitHub activity is temporarily unavailable.
      </p>
    )
  }

  // Pad the first column so each date lands on its weekday row
  // (row 0 = Sunday … row 6 = Saturday).
  const leadingBlanks = parseUtc(contributions.days[0].date).getUTCDay()

  return (
    <div className="flex flex-col gap-2.5">
      <div
        role="img"
        aria-label={`GitHub contribution calendar: ${contributions.totalContributions} contributions between ${longDate.format(parseUtc(contributions.from!))} and ${longDate.format(parseUtc(contributions.to!))}`}
        className="grid w-full auto-cols-fr grid-flow-col grid-rows-7 gap-1 sm:gap-1.5"
      >
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <span key={`blank-${i}`} aria-hidden="true" className="aspect-square" />
        ))}
        {contributions.days.map((day) => (
          <span
            key={day.date}
            title={cellLabel(day)}
            aria-label={cellLabel(day)}
            className={`aspect-square rounded-[3px] ${LEVEL_CLASSES[day.level]}`}
          />
        ))}
      </div>

      {/* Intensity legend */}
      <div
        aria-hidden="true"
        className="flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted-foreground"
      >
        <span>Less</span>
        {LEGEND_ORDER.map((level) => (
          <span key={level} className={`size-2.5 rounded-[2px] ${LEVEL_CLASSES[level]}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
