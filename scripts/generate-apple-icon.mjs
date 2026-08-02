import sharp from "sharp"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, "..", "public", "apple-icon.png")

const S = 180

// Deep violet tile with a centered geometric AK monogram (violet A, coral K)
// matching the site + favicon + OG palette. Drawn at 4x then downscaled for
// crisp anti-aliasing at 180px.
const scale = 4
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}" viewBox="0 0 180 180">
  <defs>
    <radialGradient id="tile" cx="50%" cy="34%" r="72%">
      <stop offset="0%" stop-color="#1b0f31"/>
      <stop offset="100%" stop-color="#0f0820"/>
    </radialGradient>
  </defs>
  <rect width="180" height="180" rx="40" fill="url(#tile)"/>
  <rect x="1" y="1" width="178" height="178" rx="39" fill="none" stroke="#2a1a44" stroke-width="2"/>
  <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="15">
    <path d="M40 138 L69 56 L98 138" stroke="#a78bfa"/>
    <path d="M52 109 H86" stroke="#a78bfa"/>
    <path d="M120 56 V138" stroke="#fb7185"/>
    <path d="M160 56 L120 97 L160 138" stroke="#fb7185"/>
  </g>
</svg>`

await sharp(Buffer.from(svg), { density: 72 * scale })
  .resize(S, S)
  .png()
  .toFile(out)

console.log("Wrote", out)
