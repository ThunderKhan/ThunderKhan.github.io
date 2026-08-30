import fs from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'
import { getCodeLanguage } from '../src/lib/code-language.js'

const ROOT = process.cwd()
const BLOG_SOURCE = path.join(ROOT, 'src', 'data', 'blogs.ts')
const DIST_DIR = path.join(ROOT, 'dist')

function propertyName(node) {
  return ts.isIdentifier(node) || ts.isStringLiteral(node) ? node.text : null
}

function evaluateNode(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text

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

async function readPosts() {
  const sourceText = await fs.readFile(BLOG_SOURCE, 'utf8')
  const sourceFile = ts.createSourceFile(
    BLOG_SOURCE,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )

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

    if (!post?.slug || !Array.isArray(post.content)) {
      throw new Error(`Blog post ${index + 1} is missing slug or content`)
    }

    return post
  })
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function enhanceCodeBlocks(html, content) {
  const blocks = content.filter((block) => block?.type === 'code')
  let blockIndex = 0

  return html.replace(
    /<pre class="my-7 overflow-x-auto rounded-xl border border-border bg-background\/80 p-4 font-mono text-\[13px\] leading-6 text-foreground shadow-sm"><code>([\s\S]*?)<\/code><\/pre>/g,
    (match, code) => {
      const block = blocks[blockIndex++]
      const language = getCodeLanguage(block?.language)
      if (!language) return match

      return `<div class="relative my-7"><span class="absolute right-3 top-2 z-10 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">${escapeHtml(language.label)}</span><pre data-language="${escapeHtml(language.id)}" class="overflow-x-auto rounded-xl border border-border bg-background/80 p-4 pt-8 font-mono text-[13px] leading-6 text-foreground shadow-sm"><code class="language-${escapeHtml(language.id)}">${code}</code></pre></div>`
    },
  )
}

async function updateFile(filePath, content) {
  const html = await fs.readFile(filePath, 'utf8')
  await fs.writeFile(filePath, enhanceCodeBlocks(html, content))
}

async function main() {
  const posts = await readPosts()
  let taggedBlocks = 0

  for (const post of posts) {
    taggedBlocks += post.content.filter(
      (block) => block?.type === 'code' && getCodeLanguage(block.language),
    ).length

    const route = path.join('blog', post.slug)
    await updateFile(path.join(DIST_DIR, route, 'index.html'), post.content)
    await updateFile(path.join(DIST_DIR, `${route}.html`), post.content)
  }

  console.log(`Code languages: tagged ${taggedBlocks} configured code block${taggedBlocks === 1 ? '' : 's'} across prerendered articles.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
