import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Static build for GitHub Pages. `base` stays "/" because the site is served
// from the domain root (a GitHub user site), not from a /repo-name subpath.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'esbuild',
    cssMinify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('/motion/')) return 'motion'
          if (id.includes('/lucide-react/')) return 'icons'
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/')
          ) {
            return 'react-vendor'
          }
          return 'vendor'
        },
      },
    },
  },
})
