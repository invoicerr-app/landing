/** The Worker that owns the waiting list. It serves the page at its own root and takes the POST. */
export const WORKER_ORIGIN = 'https://my.invoicerr.app'

/**
 * Where the form posts.
 *
 * The same prerendered page is served from two places: from invoicerr.app by GitHub Pages, which
 * serves static files and cannot take a POST, and from my.invoicerr.app by the Worker, which can.
 * When the Worker is the one serving it the post stays same-origin, which also makes it same-origin
 * under `wrangler dev` on localhost. From GitHub Pages it goes cross-origin to the Worker, and the
 * Worker answers the preflight for it (see worker/index.ts, CORS_ORIGINS).
 *
 * Read at submit time rather than at render time, so nothing about it can differ between the markup
 * written at build and the markup React hydrates.
 */
export function waitlistEndpoint(): string {
    if (typeof window === 'undefined') return `${WORKER_ORIGIN}/api/waitlist`
    const host = window.location.hostname
    const servedByGitHubPages = host === 'invoicerr.app' || host === 'www.invoicerr.app'
    return servedByGitHubPages ? `${WORKER_ORIGIN}/api/waitlist` : '/api/waitlist'
}
