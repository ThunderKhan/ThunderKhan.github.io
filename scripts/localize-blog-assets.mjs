import fs from 'node:fs/promises'
import path from 'node:path'
import siteConfig from '../src/config/site.json' with { type: 'json' }

const DIST_DIR = path.join(process.cwd(), 'dist')

const replacements = new Map([
  [
    'https://raw.githubusercontent.com/ThunderKhan/diff2test/main/assets/diff2test-hero.png',
    new URL('/blog/diff2test-cover.webp', `${siteConfig.origin}/`).href,
  ],
])

async function htmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const target = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await htmlFiles(target)))
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(target)
  }

  return files
}

async function main() {
  let replaced = 0

  for (const file of await htmlFiles(DIST_DIR)) {
    let html = await fs.readFile(file, 'utf8')
    const original = html

    for (const [remoteUrl, localUrl] of replacements) {
      const matches = html.split(remoteUrl).length - 1
      if (matches > 0) {
        html = html.replaceAll(remoteUrl, localUrl)
        replaced += matches
      }
    }

    if (html !== original) await fs.writeFile(file, html)
  }

  const remaining = []
  for (const file of await htmlFiles(DIST_DIR)) {
    const html = await fs.readFile(file, 'utf8')
    for (const remoteUrl of replacements.keys()) {
      if (html.includes(remoteUrl)) remaining.push(`${file}: ${remoteUrl}`)
    }
  }

  if (remaining.length) {
    throw new Error(`Remote blog asset references remain:\n${remaining.join('\n')}`)
  }

  console.log(`Localized ${replaced} generated blog asset reference${replaced === 1 ? '' : 's'}.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
