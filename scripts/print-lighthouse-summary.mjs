import fs from 'node:fs/promises'

const reportPath = process.argv[2] ?? 'lighthouse-report.json'
const report = JSON.parse(await fs.readFile(reportPath, 'utf8'))

const categories = ['performance', 'accessibility', 'best-practices', 'seo']
for (const id of categories) {
  const category = report.categories?.[id]
  if (!category) continue
  console.log(`${category.title}: ${Math.round(category.score * 100)}`)
}

const metrics = [
  ['first-contentful-paint', 'FCP'],
  ['largest-contentful-paint', 'LCP'],
  ['total-blocking-time', 'TBT'],
  ['cumulative-layout-shift', 'CLS'],
  ['speed-index', 'Speed Index'],
]

for (const [id, label] of metrics) {
  const audit = report.audits?.[id]
  if (audit?.displayValue) console.log(`${label}: ${audit.displayValue}`)
}
