import fs from 'node:fs/promises'
import path from 'node:path'
import { getHeadingEntries } from '../src/lib/blog-headings.js'

const DIST_BLOG_DIR = path.join(process.cwd(), 'dist', 'blog')
const BODY_MARKER = '<div class="mx-auto mt-12 max-w-3xl">'

function decodeEscapedHeading(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function addHeadingLinks(html) {
  const headingPattern = /<h2 class="([^"]*)">([^<]*)<\/h2>/g
  const matches = [...html.matchAll(headingPattern)]
  const blocks = matches.map((match) => ({ type: 'heading', text: decodeEscapedHeading(match[2]) }))
  const headings = getHeadingEntries(blocks)

  if (!headings.length) return html

  let headingIndex = 0
  let updated = html.replace(headingPattern, (_match, className, text) => {
    const heading = headings[headingIndex]
    headingIndex += 1

    return `<h2 id="${heading.id}" class="${className} scroll-mt-24"><a href="#${heading.id}" aria-label="Link to section: ${text}">${text}</a></h2>`
  })

  if (headings.length >= 4) {
    const items = headings
      .map(
        (heading) =>
          `<li><a href="#${heading.id}" class="text-sm leading-6 text-muted-foreground">${matches[heading.index][2]}</a></li>`,
      )
      .join('')
    const toc = `<nav aria-label="Table of contents" class="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card/45 p-5 sm:p-6"><p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">On this page</p><ol class="mt-4 grid gap-2 sm:grid-cols-2 sm:gap-x-8">${items}</ol></nav>`

    if (!updated.includes(BODY_MARKER)) {
      throw new Error('Could not find prerendered article body marker for table of contents')
    }

    updated = updated.replace(BODY_MARKER, `${toc}\n    ${BODY_MARKER}`)
  }

  return updated
}

async function articleFiles() {
  const entries = await fs.readdir(DIST_BLOG_DIR, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(path.join(DIST_BLOG_DIR, entry.name, 'index.html'))
    } else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== 'index.html') {
      files.push(path.join(DIST_BLOG_DIR, entry.name))
    }
  }

  return files
}

async function main() {
  let updatedCount = 0

  for (const filePath of await articleFiles()) {
    const html = await fs.readFile(filePath, 'utf8')
    if (!html.includes('data-static-blog-article="true"')) continue

    const updated = addHeadingLinks(html)
    await fs.writeFile(filePath, updated)
    updatedCount += 1
  }

  console.log(`Heading links: enhanced ${updatedCount} prerendered article files.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
