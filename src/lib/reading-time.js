export function calculateReadingTime(blocks, wordsPerMinute = 200) {
  const wordCount = blocks.reduce((total, block) => {
    const parts = []

    if (typeof block.text === 'string') parts.push(block.text)
    if (Array.isArray(block.items)) parts.push(...block.items)

    const words = parts
      .join(' ')
      .trim()
      .split(/\s+/)
      .filter(Boolean).length

    return total + words
  }, 0)

  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  return `${minutes} min read`
}
