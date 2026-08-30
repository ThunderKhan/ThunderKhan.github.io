import fs from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'
import siteConfig from '../src/config/site.json' with { type: 'json' }

const ROOT = process.cwd()
const DIST_DIR = path.join(ROOT, 'dist')
const BLOG_SOURCE = path.join(ROOT, 'src', 'data', 'blogs.ts')
const SITE_URL = siteConfig.origin
const BLOG_URL = `${SITE_URL}${siteConfig.blog.path}`

function absoluteUrl(value) {
  return new URL(value, SITE_URL).href
}

const DEFAULT_IMAGE = absoluteUrl(siteConfig.defaultOgImage)

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
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

function addBlogPostingJsonLd(html, post, canonicalUrl, image) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: siteConfig.authorName,
      url: SITE_URL,
    },
    image,
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    inLanguage: 'en',
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
  }
  const json = JSON.stringify(schema).replaceAll('<', '\\u003c')
  const tag = `<script type="application/ld+json" id="blog-posting-jsonld">${json}</script>`
  const matcher = /<script(?=[^>]*\bid=["']blog-posting-jsonld["'])[^>]*>[\s\S]*?<\/script>/i

  if (matcher.test(html)) return html.replace(matcher, tag)
  return html.replace('</head>', `    ${tag}\n  </head>`)
}

function replaceRoot(html, content) {
  return html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root" data-prerendered="true">${content}</div>`,
  )
}

function propertyName(node) {
  return ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : null
}

function evaluateNode(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null
  if (ts.isNumericLiteral(node)) return Number(node.text)

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((element) => evaluateNode(element))
  }

  if (ts.isObjectLiteralExpression(node)) {
    const value = {}
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue
      const name = propertyName(property.name)
      if (!name) continue
      value[name] = evaluateNode(property.initializer)
    }
    return value
  }

  return undefined
}

async function readBlogPosts() {
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

  if (!postsArray) throw new Error('Could not find the blogPosts array in src/data/blogs.ts')

  return postsArray.elements.map((node, index) => {
    const post = evaluateNode(node)
    if (!post?.slug || !post.title || !post.description || !post.date || !Array.isArray(post.content)) {
      throw new Error(`Blog post ${index + 1} is missing required prerender data`)
    }
    return post
  })
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

function renderBlock(block) {
  switch (block.type) {
    case 'heading':
      return `<h2 class="mt-14 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">${escapeHtml(block.text)}</h2>`
    case 'quote':
      return `<blockquote class="my-8 border-l-2 border-accent pl-5 text-lg font-medium leading-8 text-foreground sm:text-xl">${escapeHtml(block.text)}</blockquote>`
    case 'code':
      return `<pre class="my-7 overflow-x-auto rounded-xl border border-border bg-background/80 p-4 font-mono text-[13px] leading-6 text-foreground shadow-sm"><code>${escapeHtml(block.text)}</code></pre>`
    case 'list':
      return `<ul class="my-6 space-y-2 pl-5 text-[15px] leading-7 text-muted-foreground sm:text-base">${(block.items ?? [])
        .map((item) => `<li class="list-disc pl-1 marker:text-accent">${escapeHtml(item)}</li>`)
        .join('')}</ul>`
    default:
      return `<p class="mt-5 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">${escapeHtml(block.text ?? '')}</p>`
  }
}

function renderStaticArticle(post) {
  const tags = (post.tags ?? [])
    .map(
      (tag) =>
        `<span class="rounded-full border border-border bg-card/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">${escapeHtml(tag)}</span>`,
    )
    .join('')
  const cover = post.cover
    ? `<div class="mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-border bg-card/60"><img src="${escapeHtml(post.cover)}" alt="${escapeHtml(`${post.title} cover`)}" class="w-full object-cover" /></div>`
    : ''
  const body = post.content.map(renderBlock).join('')

  const relatedLinks = [
    post.repositoryUrl
      ? `<a href="${escapeHtml(post.repositoryUrl)}" rel="noopener noreferrer">Repository</a>`
      : '',
    ...(post.crossPosts ?? []).map(
      (crossPost) =>
        `<a href="${escapeHtml(crossPost.url)}" rel="noopener noreferrer">${escapeHtml(crossPost.label)}</a>`,
    ),
  ].filter(Boolean)

  const footer = relatedLinks.length
    ? `<footer class="mx-auto mt-16 max-w-3xl border-t border-border pt-8"><p class="text-sm font-medium text-foreground">Links &amp; publication</p><div class="mt-3 flex flex-wrap gap-4 text-sm text-accent">${relatedLinks.join('')}</div></footer>`
    : ''

  return `<article data-static-blog-article="true" class="mx-auto min-h-screen w-full max-w-6xl px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
    <div class="mx-auto max-w-3xl">
      <a href="${siteConfig.blog.path}" class="text-sm font-medium text-muted-foreground">← All writing</a>
      <header class="mt-8">
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
          <time datetime="${escapeHtml(post.date)}">${escapeHtml(formatDate(post.date))}</time>
          ${post.readingTime ? `<span>${escapeHtml(post.readingTime)}</span>` : ''}
        </div>
        <h1 class="mt-5 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">${escapeHtml(post.title)}</h1>
        <p class="mt-5 text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">${escapeHtml(post.description)}</p>
        <div class="mt-6 flex flex-wrap gap-2">${tags}</div>
      </header>
    </div>
    ${cover}
    <div class="mx-auto mt-12 max-w-3xl">${body}</div>
    ${footer}
  </article>`
}

function renderBlogIndex(template) {
  const title = siteConfig.blog.title
  const description = siteConfig.blog.description

  let html = replaceTitle(template, title)
  html = replaceMeta(html, 'name', 'description', description)
  html = replaceMeta(html, 'property', 'og:type', 'website')
  html = replaceMeta(html, 'property', 'og:title', title)
  html = replaceMeta(html, 'property', 'og:description', description)
  html = replaceMeta(html, 'property', 'og:url', BLOG_URL)
  html = replaceMeta(html, 'property', 'og:image', DEFAULT_IMAGE)
  html = replaceMeta(html, 'name', 'twitter:title', title)
  html = replaceMeta(html, 'name', 'twitter:description', description)
  html = replaceMeta(html, 'name', 'twitter:image', DEFAULT_IMAGE)
  html = replaceCanonical(html, BLOG_URL)

  return html
}

function renderBlogPost(template, post) {
  const articleUrl = `${BLOG_URL}/${encodeURIComponent(post.slug)}`
  const canonicalUrl = post.canonicalUrl ?? articleUrl
  const image = absoluteUrl(post.cover ?? siteConfig.defaultOgImage)
  const title = `${post.title} — ${siteConfig.authorName}`

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
  html = addBlogPostingJsonLd(html, post, canonicalUrl, image)
  html = replaceRoot(html, renderStaticArticle(post))

  return html
}

function renderSitemap(posts) {
  const latestPostDate = posts.reduce((latest, post) => (post.date > latest ? post.date : latest), '')
  const entries = [
    { loc: `${SITE_URL}/` },
    { loc: BLOG_URL, lastmod: latestPostDate || undefined },
    ...posts.map((post) => ({
      loc: `${BLOG_URL}/${encodeURIComponent(post.slug)}`,
      lastmod: post.date,
    })),
  ]

  const urls = entries
    .map(({ loc, lastmod }) => {
      const lines = [`    <loc>${escapeXml(loc)}</loc>`]
      if (lastmod) lines.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`)
      return `  <url>\n${lines.join('\n')}\n  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

async function writeRoute(route, html) {
  const relativePath = route.replace(/^\//, '')
  const directory = path.join(DIST_DIR, relativePath)
  await fs.mkdir(directory, { recursive: true })
  await fs.writeFile(path.join(directory, 'index.html'), html)
  await fs.writeFile(path.join(DIST_DIR, `${relativePath}.html`), html)
}

async function main() {
  const template = await fs.readFile(path.join(DIST_DIR, 'index.html'), 'utf8')
  const posts = await readBlogPosts()

  await writeRoute(siteConfig.blog.path, renderBlogIndex(template))

  for (const post of posts) {
    await writeRoute(`${siteConfig.blog.path}/${post.slug}`, renderBlogPost(template, post))
  }

  await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), renderSitemap(posts))

  console.log(
    `Prerendered ${siteConfig.blog.path} and ${posts.length} full blog article route${posts.length === 1 ? '' : 's'} with BlogPosting JSON-LD; generated sitemap.xml.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
