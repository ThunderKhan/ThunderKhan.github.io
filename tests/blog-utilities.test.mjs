import assert from 'node:assert/strict'
import test from 'node:test'
import { getHeadingEntries, slugifyHeading } from '../src/lib/blog-headings.js'
import { calculateReadingTime } from '../src/lib/reading-time.js'
import { getCodeLanguage } from '../src/lib/code-language.js'

test('slugifyHeading creates stable readable fragments', () => {
  assert.equal(slugifyHeading('Stale evidence was worse than missing evidence'), 'stale-evidence-was-worse-than-missing-evidence')
  assert.equal(slugifyHeading('C++ & CMake: What changed?'), 'c-cmake-what-changed')
  assert.equal(slugifyHeading('Café déjà vu'), 'cafe-deja-vu')
  assert.equal(slugifyHeading('你好 世界'), '你好-世界')
  assert.equal(slugifyHeading('---'), 'section')
})

test('getHeadingEntries preserves order and disambiguates duplicate ids', () => {
  const blocks = [
    { type: 'paragraph', text: 'intro' },
    { type: 'heading', text: 'Results' },
    { type: 'heading', text: 'Results' },
    { type: 'heading', text: 'Results!' },
    { type: 'paragraph', text: 'outro' },
  ]

  assert.deepEqual(getHeadingEntries(blocks), [
    { index: 1, text: 'Results', id: 'results' },
    { index: 2, text: 'Results', id: 'results-2' },
    { index: 3, text: 'Results!', id: 'results-3' },
  ])
})

test('calculateReadingTime counts text and list items with a one-minute floor', () => {
  assert.equal(calculateReadingTime([]), '1 min read')
  assert.equal(
    calculateReadingTime([
      { type: 'paragraph', text: 'one two three four' },
      { type: 'list', items: ['five six', 'seven eight'] },
    ], 4),
    '2 min read',
  )

  const twoHundredAndOneWords = Array.from({ length: 201 }, (_, index) => `word${index}`).join(' ')
  assert.equal(calculateReadingTime([{ type: 'paragraph', text: twoHundredAndOneWords }]), '2 min read')
})

test('getCodeLanguage normalizes common aliases and preserves unknown labels safely', () => {
  assert.deepEqual(getCodeLanguage('c++'), { id: 'cpp', label: 'C++' })
  assert.deepEqual(getCodeLanguage(' SH '), { id: 'bash', label: 'Bash' })
  assert.deepEqual(getCodeLanguage('ts'), { id: 'typescript', label: 'TypeScript' })
  assert.deepEqual(getCodeLanguage('My Lang'), { id: 'my-lang', label: 'My Lang' })
  assert.equal(getCodeLanguage('   '), null)
  assert.equal(getCodeLanguage(undefined), null)
})
