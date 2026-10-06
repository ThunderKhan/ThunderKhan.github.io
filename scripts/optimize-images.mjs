import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const targetDir = path.resolve(process.argv[2] ?? 'dist')
const extensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif'])

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(fullPath)))
    else if (extensions.has(path.extname(entry.name).toLowerCase())) files.push(fullPath)
  }

  return files
}

async function encode(filePath, input) {
  const extension = path.extname(filePath).toLowerCase()
  const image = sharp(input, { failOn: 'none' }).rotate()

  if (extension === '.png') {
    return image.png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 }).toBuffer()
  }
  if (extension === '.jpg' || extension === '.jpeg') {
    return image.jpeg({ quality: 88, mozjpeg: true }).toBuffer()
  }
  if (extension === '.webp') {
    return image.webp({ lossless: true, effort: 6 }).toBuffer()
  }
  if (extension === '.avif') {
    return image.avif({ lossless: true, effort: 6 }).toBuffer()
  }

  return input
}

async function main() {
  const files = await walk(targetDir)
  let originalBytes = 0
  let optimizedBytes = 0
  let replaced = 0

  for (const filePath of files) {
    const input = await fs.readFile(filePath)
    const output = await encode(filePath, input)

    originalBytes += input.length
    if (output.length < input.length) {
      await fs.writeFile(filePath, output)
      optimizedBytes += output.length
      replaced += 1
    } else {
      optimizedBytes += input.length
    }
  }

  const saved = originalBytes - optimizedBytes
  const percent = originalBytes === 0 ? 0 : (saved / originalBytes) * 100

  console.log(
    `Optimized ${files.length} raster image(s); replaced ${replaced}; saved ${saved.toLocaleString()} bytes (${percent.toFixed(1)}%).`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
