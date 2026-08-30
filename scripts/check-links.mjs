import fs from 'node:fs/promises'
import path from 'node:path'
import siteConfig from '../src/config/site.json' with { type: 'json' }

const ROOT = path.resolve('dist')
const SITE_ORIGIN = new URL(siteConfig.origin).origin
const TIMEOUT_MS = 10_000
const CONCURRENCY = 6

const htmlFiles = []
const internalFailures = []
const externalFailures = []
const externalWarnings = []
const externalUrls = new Set()

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) await walk(fullPath)
    else if (entry.isFile() && entry.name.endsWith('.html')) htmlFiles.push(fullPath)
  }
}

function extractLinks(html) {
  const withoutResourceHints = html.replace(
    /<link\b(?=[^>]*\brel=["'](?:preconnect|dns-prefetch)["'])[^>]*>/gi,
    '',
  )
  const values = []
  for (const match of withoutResourceHints.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    values.push(match[1])
  }
  return values
}

function routeToCandidates(pathname) {
  const decoded = decodeURIComponent(pathname)
  const relative = decoded.replace(/^\/+/, '')

  if (!relative) return [path.join(ROOT, 'index.html')]

  if (path.extname(relative)) return [path.join(ROOT, relative)]

  const clean = relative.replace(/\/+$/, '')
  return [path.join(ROOT, clean, 'index.html'), path.join(ROOT, `${clean}.html`)]
}

async function firstExisting(candidates) {
  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate)
      if (stat.isFile()) return candidate
    } catch {
      // Try the next route representation.
    }
  }
  return null
}

async function verifyFragment(targetFile, fragment, source, rawUrl) {
  if (!fragment || !targetFile?.endsWith('.html')) return

  const html = await fs.readFile(targetFile, 'utf8')
  const id = decodeURIComponent(fragment)
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const matcher = new RegExp(`\\bid=["']${escaped}["']`)

  if (!matcher.test(html)) {
    internalFailures.push(`${source}: missing fragment #${id} in ${rawUrl}`)
  }
}

async function checkInternal(rawUrl, sourceFile) {
  if (rawUrl.startsWith('#')) {
    await verifyFragment(sourceFile, rawUrl.slice(1), path.relative(ROOT, sourceFile), rawUrl)
    return
  }

  let url
  try {
    url = new URL(rawUrl, `${SITE_ORIGIN}/`)
  } catch {
    internalFailures.push(`${path.relative(ROOT, sourceFile)}: invalid URL ${rawUrl}`)
    return
  }

  if (url.origin !== SITE_ORIGIN) {
    if (url.protocol === 'http:' || url.protocol === 'https:') externalUrls.add(url.href)
    return
  }

  const target = await firstExisting(routeToCandidates(url.pathname))
  if (!target) {
    internalFailures.push(`${path.relative(ROOT, sourceFile)}: missing internal target ${url.pathname}`)
    return
  }

  await verifyFragment(target, url.hash.slice(1), path.relative(ROOT, sourceFile), rawUrl)
}

async function checkExternal(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'ThunderKhan-portfolio-link-checker/1.0',
        accept: 'text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8',
      },
    })

    if (response.ok) return

    if ([401, 403, 429].includes(response.status) || response.status >= 500) {
      externalWarnings.push(`${url} → HTTP ${response.status}`)
      return
    }

    externalFailures.push(`${url} → HTTP ${response.status}`)
  } catch (error) {
    const reason = error?.name === 'AbortError' ? 'timeout' : error?.message ?? String(error)
    externalWarnings.push(`${url} → ${reason}`)
  } finally {
    clearTimeout(timer)
  }
}

async function runWithConcurrency(items, worker) {
  let cursor = 0
  const workers = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      await worker(items[index])
    }
  })
  await Promise.all(workers)
}

async function main() {
  await walk(ROOT)

  for (const file of htmlFiles) {
    const html = await fs.readFile(file, 'utf8')
    for (const rawUrl of extractLinks(html)) {
      if (/^(?:mailto:|tel:|javascript:|data:)/i.test(rawUrl)) continue
      await checkInternal(rawUrl, file)
    }
  }

  await runWithConcurrency([...externalUrls], checkExternal)

  console.log(`Link check: scanned ${htmlFiles.length} HTML files and ${externalUrls.size} unique external URLs.`)

  if (externalWarnings.length) {
    console.warn(`External link warnings (${externalWarnings.length}) — non-blocking because remote sites may rate-limit or be temporarily unavailable:`)
    for (const warning of externalWarnings) console.warn(`  - ${warning}`)
  }

  const failures = [...internalFailures, ...externalFailures]
  if (failures.length) {
    console.error(`Broken links (${failures.length}):`)
    for (const failure of failures) console.error(`  - ${failure}`)
    process.exitCode = 1
    return
  }

  console.log('Link check passed: no broken internal links or definitive external failures found.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
