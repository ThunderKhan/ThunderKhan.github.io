import fs from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'

const ROOT = process.cwd()
const DIST_DIR = path.join(ROOT, 'dist')
const BLOG_SOURCE = path.join(ROOT, 'src', 'data', 'blogs.ts')
const SITE_URL = 'https://ayankhan.me'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png?v=3`

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
}

function replaceMeta(html, attribute, key, content) {
  const matcher = new RegExp(`<meta(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`, 'i')
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`

  if (matcher.test(html)) return html.replace(matcher, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function replaceCanonical(html, href) {
  const matcher = /<link(?=[^>]*\brel=["']canonical["'])[^>]*>/i
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`

  if (matcher.test(html)) return html.replace(matcher, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function addArticlePublishedTime(html, date) {
  const matcher = /<meta(?=[^>]*\bproperty=["']article:published_time["'])[^>]*>/i
  const tag = `<meta property="article:published_time" content="${escapeHtml(date)}" />`

  if (matcher.test(html)) return html.replace(matcher, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function getProperty(objectLiteral, name) {
  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) continue

    const propertyName = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
      ? property.name.text
      : null

    if (propertyName !== name) continue

    if (ts.isStringLiteral(property.initializer) || ts.isNoSubstitutionTemplateLiteral(property.initializer)) {
      return property.initializer.text
    }
  }

  return undefined
}

async function readBlogMetadata() {
  const sourceText = await fs.readFile(BLOG_SOURCE, 'utf8')
  const sourceFile = ts.createSourceFile(BLOG_SOURCE, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

  let postsArray

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'blogPosts') continue
      if (declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer)) {
        postsArray = declaration.initializer
      }
    }
  })

  if (!postsArray) {
    throw new Error('Could not find the blogPosts array in src/data/blogs.ts')
  }

  return postsArray.elements
    .filter(ts.isObjectLiteralExpression)
    .map((post) => ({
      slug: getProperty(post, 'slug'),
      title: getProperty(post, 'title'),
      description: getProperty(post, 'description'),
      date: getProperty(post, 'date'),
      cover: getProperty(post, 'cover'),
      canonicalUrl: getProperty(post, 'canonicalUrl'),
    }))
    .map((post, index) => {
      if (!post.slug || !post.title || !post.description || !post.date) {
        throw new Error(`Blog post ${index + 1} is missing slug, title, description, or date`)
      }
      return post
    })
}

function renderBlogIndex(template) {
  const url = `${SITE_URL}/blog`
  const title = 'Writing — Ayan Khan'
  const description = 'Engineering notes on systems, developer tooling, open source, and the decisions behind the things I build.'

  let html = replaceTitle(template, title)
  html = replaceMeta(html, 'name', 'description', description)
  html = replaceMeta(html, 'property', 'og:type', 'website')
  html = replaceMeta(html, 'property', 'og:title', title)
  html = replaceMeta(html, 'property', 'og:description', description)
  html = replaceMeta(html, 'property', 'og:url', url)
  html = replaceMeta(html, 'property', 'og:image', DEFAULT_IMAGE)
  html = replaceMeta(html, 'name', 'twitter:title', title)
  html = replaceMeta(html, 'name', 'twitter:description', description)
  html = replaceMeta(html, 'name', 'twitter:image', DEFAULT_IMAGE)
  html = replaceCanonical(html, url)

  return html
}

function renderBlogPost(template, post) {
  const articleUrl = `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`
  const canonicalUrl = post.canonicalUrl ?? articleUrl
  const image = post.cover ?? DEFAULT_IMAGE
  const title = `${post.title} — Ayan Khan`

  let html = replaceTitle(template, title)
  html = replaceMeta(html, 'name', 'description', post.description)
  html = replaceMeta(html, 'property', 'og:type', 'article')
  html = replaceMeta(html, 'property', 'og:title', post.title)
  html = replaceMeta(html, 'property', 'og:description', post.description)
  html = replaceMeta(html, 'property', 'og:url', articleUrl)
  html = replaceMeta(html, 'property', 'og:image', image)
  html = replaceMeta(html, 'name', 'twitter:title', post.title)
  html = replaceMeta(html, 'name', 'twitter:description', post.description)
  html = replaceMeta(html, 'name', 'twitter:image', image)
  html = replaceCanonical(html, canonicalUrl)
  html = addArticlePublishedTime(html, post.date)

  return html
}

async function writeRoute(route, html) {
  const relativePath = route.replace(/^\//, '')
  const directory = path.join(DIST_DIR, relativePath)
  await fs.mkdir(directory, { recursive: true })
  await fs.writeFile(path.join(directory, 'index.html'), html)

  // GitHub Pages also serves extensionless clean URLs from matching .html files.
  // Keeping both forms avoids an unnecessary redirect while still supporting
  // trailing-slash requests.
  await fs.writeFile(path.join(DIST_DIR, `${relativePath}.html`), html)
}

async function main() {
  const template = await fs.readFile(path.join(DIST_DIR, 'index.html'), 'utf8')
  const posts = await readBlogMetadata()

  await writeRoute('/blog', renderBlogIndex(template))

  for (const post of posts) {
    await writeRoute(`/blog/${post.slug}`, renderBlogPost(template, post))
  }

  console.log(`Prerendered /blog and ${posts.length} blog post route${posts.length === 1 ? '' : 's'}.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
