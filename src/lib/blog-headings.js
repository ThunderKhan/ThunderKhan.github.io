/**
 * Create a URL-safe, deterministic fragment id from a heading label.
 * Keeps unicode letters/numbers, strips punctuation, and collapses separators.
 */
export function slugifyHeading(value) {
  return String(value)
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'section'
}

/**
 * Return heading metadata with collision-safe ids, preserving article order.
 * Duplicate headings receive -2, -3, ... suffixes.
 */
export function getHeadingEntries(blocks) {
  const counts = new Map()
  const entries = []

  blocks.forEach((block, index) => {
    if (block?.type !== 'heading') return

    const base = slugifyHeading(block.text)
    const count = (counts.get(base) ?? 0) + 1
    counts.set(base, count)

    entries.push({
      index,
      text: block.text,
      id: count === 1 ? base : `${base}-${count}`,
    })
  })

  return entries
}
