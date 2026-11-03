import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// The day of the build, for the sample documents dated relative to "today" (src/lib/today.ts). The
// BUILD_DAY variable can pin it: `vite build` and the prerender are two processes, and a build that
// runs across midnight would otherwise date the prerendered HTML and the bundle a day apart.
const buildDay = process.env.BUILD_DAY ?? new Date().toISOString().slice(0, 10)

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  define: {
    __BUILD_DAY__: JSON.stringify(buildDay),
  },
  plugins: [
    TanStackRouterVite(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
