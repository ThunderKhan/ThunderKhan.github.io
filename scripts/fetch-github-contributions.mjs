/**
 * Build-time generator for the About section's GitHub activity card.
 *
 * Fetches the trailing 60 calendar days of PUBLIC contribution data for
 * the configured GitHub user via the GraphQL API and writes it to
 * src/generated/github-contributions.json, which the React app imports
 * statically.
 *
 * Runs in GitHub Actions before `npm run build`, authenticated with the
 * workflow's built-in GITHUB_TOKEN. The token exists only during the
 * build — it is never written to the generated JSON, never bundled into
 * the site, and never logged.
 *
 * Without a token (local development) the checked-in fallback JSON is
 * used and the card renders an "activity unavailable" message.
 */

import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const LOGIN = 'ThunderKhan'
const WINDOW_DAYS = 60
const OUTPUT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'generated',
  'github-contributions.json',
)

const QUERY = `
query Contributions($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}
`

/** YYYY-MM-DD in UTC for a Date. */
function toDateKey(date) {
  return date.toISOString().slice(0, 10)
}

async function main() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    console.error(
      'fetch-github-contributions: GITHUB_TOKEN is not set. ' +
        'This script is intended to run in CI; the local fallback JSON will be used instead.',
    )
    process.exit(1)
  }

  const to = new Date()
  const from = new Date(to.getTime() - WINDOW_DAYS * 24 * 60 * 60 * 1000)

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': `${LOGIN}-portfolio-build`,
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        login: LOGIN,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }),
  })

  if (!response.ok) {
    // Never print headers or the token — status text only.
    console.error(
      `fetch-github-contributions: GraphQL request failed with HTTP ${response.status}.`,
    )
    process.exit(1)
  }

  const payload = await response.json()
  if (payload.errors?.length) {
    console.error(
      'fetch-github-contributions: GraphQL returned errors:',
      payload.errors.map((e) => e.message).join('; '),
    )
    process.exit(1)
  }

  const calendar =
    payload.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) {
    console.error(
      'fetch-github-contributions: unexpected response shape — no contribution calendar found.',
    )
    process.exit(1)
  }

  const fromKey = toDateKey(from)
  const toKey = toDateKey(to)

  const days = calendar.weeks
    .flatMap((week) => week.contributionDays)
    .filter((day) => day.date >= fromKey && day.date <= toKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: day.contributionLevel,
    }))

  if (days.length === 0) {
    console.error(
      'fetch-github-contributions: no contribution days returned for the requested range.',
    )
    process.exit(1)
  }

  const totalContributions = days.reduce((sum, day) => sum + day.count, 0)

  const output = {
    login: LOGIN,
    generatedAt: new Date().toISOString(),
    from: fromKey,
    to: toKey,
    totalContributions,
    days,
  }

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true })
  await writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, 'utf8')

  console.log(
    `fetch-github-contributions: wrote ${days.length} days ` +
      `(${fromKey} → ${toKey}, ${totalContributions} contributions) to ${path.relative(process.cwd(), OUTPUT_PATH)}.`,
  )
}

main().catch((error) => {
  console.error('fetch-github-contributions: failed:', error.message)
  process.exit(1)
})
