import { createRoot, hydrateRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const container = document.getElementById('root')!
const app = <RouterProvider router={router} />

// The production build ships the page already rendered (scripts/prerender.mjs), so there is markup
// to take over rather than replace. `npm run dev` serves the plain shell from index.html, where
// there is nothing to hydrate yet.
if (container.firstChild) {
  // Two things have to be true before React looks at that markup, or it throws the hydration away
  // and rebuilds the tree from scratch — which costs the whole benefit of shipping the markup.
  //
  // `ssr` tells the router the first render came from a server: it then leaves out the Suspense
  // boundary it wraps the matches in, the way it did while rendering, and skips the load it
  // normally fires on mount. That statement is true here, and the load below is the one it skips.
  ;(router as unknown as { ssr?: boolean }).ssr = true
  router.load().then(() => hydrateRoot(container, app))
} else {
  createRoot(container).render(app)
}
