import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import siteConfig from '../src/config/site.json' with { type: 'json' }

const DIST_DIR = path.resolve('dist')
const SITE_URL = siteConfig.origin
const BLOG_URL = `${SITE_URL}${siteConfig.blog.path}`

async function read(filePath) {
  return fs.readFile(path.join(DIST_DIR, filePath), 'utf8')
}

function sitemapLocations(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1])
}

test('build emits a sitemap containing home, blog index, and article routes', async () => {
  const sitemap = await read('sitemap.xml')
  const locations = sitemapLocations(sitemap)

  assert.ok(locations.includes(`${SITE_URL}/`))
  assert.ok(locations.includes(BLOG_URL))
  assert.ok(locations.some((location) => location.startsWith(`${BLOG_URL}/`)))
})

test('blog index is emitted as a real static route with correct canonical metadata', async () => {
  const html = await read(path.join('blog', 'index.html'))

  assert.match(html, new RegExp(`<link rel="canonical" href="${BLOG_URL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`))
  assert.match(html, /<meta property="og:type" content="website" \/>/)
  assert.doesNotMatch(html, /\?path=/)
})

test('every sitemap article route contains full prerendered article and SEO output', async () => {
  const sitemap = await read('sitemap.xml')
  const articleUrls = sitemapLocations(sitemap).filter((location) => location.startsWith(`${BLOG_URL}/`))

  assert.ok(articleUrls.length > 0, 'expected at least one generated article route')

  for (const articleUrl of articleUrls) {
    const slug = decodeURIComponent(new URL(articleUrl).pathname.slice(`${siteConfig.blog.path}/`.length))
    const cleanRoute = path.join('blog', slug, 'index.html')
    const htmlRoute = path.join('blog', `${slug}.html`)
    const [html, alternateHtml] = await Promise.all([read(cleanRoute), read(htmlRoute)])

    for (const output of [html, alternateHtml]) {
      assert.match(output, /data-static-blog-article="true"/)
      assert.match(output, /<script type="application\/ld\+json" id="blog-posting-jsonld">/)
      assert.match(output, /"@type":"BlogPosting"/)
      assert.match(output, /<meta property="og:type" content="article" \/>/)
      assert.match(output, /<meta property="article:published_time"/)
      assert.match(output, /<meta property="og:image:alt"/)
      assert.match(output, /<meta name="twitter:image:alt"/)
      assert.match(output, /<h1\b[^>]*>[^<]+<\/h1>/)
      assert.match(output, /\b\d+ min read\b/)
      assert.doesNotMatch(output, /<div id="root"><\/div>/)
    }
  }
})

test('prerender enhancements add stable heading ids and language metadata when configured', async () => {
  const sitemap = await read('sitemap.xml')
  const articleUrls = sitemapLocations(sitemap).filter((location) => location.startsWith(`${BLOG_URL}/`))
  const articleHtml = await Promise.all(
    articleUrls.map(async (articleUrl) => {
      const slug = decodeURIComponent(new URL(articleUrl).pathname.slice(`${siteConfig.blog.path}/`.length))
      return read(path.join('blog', slug, 'index.html'))
    }),
  )
  const combined = articleHtml.join('\n')

  assert.match(combined, /<h2\b[^>]*\bid="[^"]+"/)
  assert.match(combined, /aria-label="Table of contents"/)
  assert.match(combined, /<pre\b[^>]*data-language="[^"]+"/)
  assert.match(combined, /<code class="language-[^"]+">/)
})
