import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path is "/" because this deploys to a GitHub *user* site:
// https://GITHUB_USERNAME.github.io/
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
