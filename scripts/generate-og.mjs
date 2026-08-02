import sharp from "sharp"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, "..", "public", "og-image.png")

const W = 1200
const H = 630

// Full-canvas SVG. Text is rendered natively via <text> so pango/harfbuzz
// (bundled with sharp) shapes the glyphs. The Manrope TTFs are provided to
// fontconfig via FONTCONFIG_FILE (see the fonts.conf in .v0/fonts). Rendering
// text this way avoids the librsvg vector-path artifacts we hit converting
// glyphs to <path> data by hand.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="violetGlow" cx="26%" cy="24%" r="55%">
      <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="coralGlow" cx="88%" cy="92%" r="55%">
      <stop offset="0%" stop-color="#fb7185" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#fb7185" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#a78bfa" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#08070d"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#violetGlow)"/>
  <rect width="${W}" height="${H}" fill="url(#coralGlow)"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#a78bfa" stroke-opacity="0.14" stroke-width="1"/>

  <g transform="translate(120 205)">
    <rect x="0" y="0" width="220" height="220" rx="44" fill="#130a24" stroke="#2a1a44" stroke-width="2"/>
    <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="17">
      <path d="M44 165 L79 66 L114 165" stroke="#a78bfa"/>
      <path d="M58 130 H100" stroke="#a78bfa"/>
      <path d="M143 66 V165" stroke="#fb7185"/>
      <path d="M192 66 L143 116 L192 165" stroke="#fb7185"/>
    </g>
  </g>

  <text x="392" y="300" font-family="Manrope" font-weight="800" font-size="96" fill="#f4f1ff">Ayan Khan</text>
  <text x="396" y="368" font-family="Manrope" font-weight="600" font-size="40" fill="#a9a3b8">Software Developer</text>

  <rect x="398" y="404" width="150" height="6" rx="3" fill="#6d28d9"/>
  <rect x="556" y="404" width="60" height="6" rx="3" fill="#c5344f"/>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)

console.log("Wrote", out)
