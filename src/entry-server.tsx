import { RouterProvider, createMemoryHistory, createRouter } from '@tanstack/react-router'
import { renderToString } from 'react-dom/server'

import { routeTree } from './routeTree.gen'

// Rendered at build time by scripts/prerender.mjs so the served HTML already carries the page text.
// The same router the browser uses, driven by a memory history pinned to the one route that exists.
export async function render(url = '/') {
    const router = createRouter({ routeTree, history: createMemoryHistory({ initialEntries: [url] }) })
    // Without this the router has not matched anything yet and RouterProvider renders an empty string.
    await router.load()
    return renderToString(<RouterProvider router={router} />)
}
