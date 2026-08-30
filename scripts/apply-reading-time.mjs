import fs from 'node:fs/promises'
import path from 'node:path'
import ts from 'typescript'
import { calculateReadingTime } from '../src/lib/reading-time.js'

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

function replaceReadingTime(html, readingTime) {
  const matcher = /(<time\b[^>]*>[\s\S]*?<\/time>\s*)<span>[^<]*min read<\/span>/i

  if (!matcher.test(html)) {
    throw new Error('Could not find prerendered article reading time')
  }

  return html.replace(matcher, `$1<span>${readingTime}</span>`)
}

async function updateFile(filePath, readingTime) {
  const html = await fs.readFile(filePath, 'utf8')
  await fs.writeFile(filePath, replaceReadingTime(html, readingTime))
}

async function main() {
  const posts = await readPosts()

  for (const post of posts) {
    const readingTime = calculateReadingTime(post.content)
    const route = path.join('blog', post.slug)

    await updateFile(path.join(DIST_DIR, route, 'index.html'), readingTime)
    await updateFile(path.join(DIST_DIR, `${route}.html`), readingTime)

    console.log(`Reading time: ${post.slug} → ${readingTime}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
