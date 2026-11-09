import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
const base = 'http://127.0.0.1:4176'
const server = spawn(
  process.execPath,
  [
    'node_modules/vite/bin/vite.js',
    'preview',
    '--host',
    '127.0.0.1',
    '--port',
    '4176',
    '--strictPort',
  ],
  { stdio: 'ignore' },
)
let browser
try {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      await fetch(base)
      break
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 150))
    }
  }
  browser = await chromium.launch({
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
    args: ['--no-sandbox', '--disable-webgl'],
  })
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: 'light',
    permissions: ['clipboard-read', 'clipboard-write'],
  })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`)
  })
  await page.goto(base, { waitUntil: 'networkidle' })
  assert.match(await page.locator('h1').innerText(), /Curious mind/)
  await page.getByRole('tab', { name: /webclerk/ }).click()
  assert.match(
    await page.getByRole('tabpanel').innerText(),
    /reconcile\(evidence\)/,
  )
  await page.keyboard.press('ArrowRight')
  assert.equal(
    await page
      .getByRole('tab', { name: /FRAME/ })
      .getAttribute('aria-selected'),
    'true',
  )
  assert.match(
    await page.getByRole('tabpanel').innerText(),
    /graph.temporal_features/,
  )
  const detail = page.locator('#project-1 details')
  await detail.locator('summary').click()
  assert.equal(await detail.getAttribute('open'), '')
  assert.match(await detail.innerText(), /Large C\+\+ repositories/)
  await page.keyboard.press('Control+k')
  await page.getByRole('dialog', { name: 'Command palette' }).waitFor()
  await page.getByRole('textbox', { name: 'Search commands' }).fill('github')
  assert.ok((await page.locator('[aria-label="Commands"] li').count()) > 0)
  await page.keyboard.press('Escape')
  await page.getByRole('dialog').waitFor({ state: 'hidden' })
  await page.getByRole('button', { name: 'Copy email', exact: true }).click()
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    'AyanKhanOffiiciall@gmail.com',
  )
  assert.equal(
    (await context.request.get(base + '/Ayan_Khan_Resume.pdf')).status(),
    200,
  )
  assert.equal(
    (
      await context.request.get(base + '/writing/diff2test-cover.webp')
    ).status(),
    200,
  )
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(base, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open menu', exact: true }).click()
  assert.ok(
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .isVisible(),
  )
  await page.keyboard.press('Escape')
  assert.equal(
    await page
      .getByRole('button', { name: 'Open menu', exact: true })
      .getAttribute('aria-expanded'),
    'false',
  )
  await page.getByRole('button', { name: 'Open menu', exact: true }).click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Work', exact: true })
    .click()
  assert.equal(new URL(page.url()).hash, '#projects')
  assert.equal(
    await page.getByRole('navigation', { name: 'Mobile navigation' }).count(),
    0,
  )
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  assert.equal(await page.evaluate(() => localStorage.getItem('theme')), 'dark')
  await page.reload({ waitUntil: 'networkidle' })
  assert.ok(
    await page
      .locator('html')
      .evaluate((element) => element.classList.contains('dark')),
  )
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  const routes = [
    '/',
    '/blog',
    '/blog/cpp-test-impact-analysis-zero-runtime-dependencies',
  ]
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const route of routes) {
      await page.goto(base + route, { waitUntil: 'networkidle' })
      assert.ok(
        await page.locator('h1').isVisible(),
        `${route} heading at ${width}`,
      )
      assert.ok(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `${route} overflow at ${width}`,
      )
    }
  }
  assert.deepEqual(errors, [])
  console.log(
    'Browser checks passed: workbench pointer/keyboard, project disclosures, command search, clipboard, mobile navigation, theme persistence, résumé and cover, 15 responsive route renders, no runtime errors or failed resources.',
  )
} finally {
  await browser?.close()
  server.kill()
}
