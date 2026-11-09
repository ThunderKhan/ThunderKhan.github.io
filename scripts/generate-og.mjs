import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
const root = fileURLToPath(new URL('../', import.meta.url))
const font = await fs.readFile(
  root +
    'node_modules/@fontsource/fraunces/files/fraunces-latin-400-normal.woff2',
)
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
  args: ['--no-sandbox'],
})
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  await page.setContent(
    `<style>@font-face{font-family:Fraunces;src:url(data:font/woff2;base64,${font.toString('base64')})}*{box-sizing:border-box}body{margin:0;background:#fffcf7;color:#102039;padding:55px 66px;font-family:Arial,sans-serif}.brand{display:flex;align-items:center;gap:13px;font:28px Fraunces,Georgia}.brand svg{width:36px;height:36px;color:#377cec}h1{font:82px/1.07 Fraunces,Georgia;letter-spacing:-4px;margin:57px 0 24px}p{color:#5e646d;font-size:22px;line-height:1.5;margin:0}.footer{position:absolute;bottom:42px;left:66px;right:66px;border-top:1px solid #10203925;padding-top:20px;display:flex;justify-content:space-between;font:14px monospace;color:#5e646d}.note{position:absolute;right:70px;top:197px;width:320px;height:260px;border-radius:20px;background:#e9f0ff;transform:rotate(5deg);padding:32px}.note small{font:12px monospace;letter-spacing:2px;color:#225bd6}.note pre{font:15px/2 monospace;color:#102039;margin-top:30px}.yellow{position:absolute;right:55px;top:166px;width:72px;height:72px;background:#f7dc78;border-radius:50%;display:grid;place-items:center;color:#102039;font:26px monospace;transform:rotate(-9deg)}</style><div class="brand"><svg viewBox="0 0 48 48" fill="none"><path d="M24 4v40M4 24h40M10 10l28 28M10 38l28-28" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/></svg>Ayan Khan.</div><h1>Curious mind.<br>Careful code.</h1><p>Systems, developer tools &amp; applied AI.<br>Built in the open. Built with care.</p><div class="note"><small>FROM THE WORKBENCH</small><pre>curiosity → idea<br>idea → working code<br>working code → evidence</pre></div><span class="yellow">{ }</span><div class="footer"><span>ayankhan.me</span><span>C++ · Python · TypeScript</span></div>`,
  )
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: root + 'public/og-image.png' })
  console.log('Generated workbench social image: public/og-image.png')
} finally {
  await browser.close()
}
