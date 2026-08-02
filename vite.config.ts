import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static build for GitHub Pages. `base` stays "/" because the site is served
// from the domain root (a GitHub user site), not from a /repo-name subpath.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
