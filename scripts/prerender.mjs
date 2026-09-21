// Renders the page to HTML at build time and writes it into dist/index.html, so that what a crawler
// — or a reader with JavaScript off — receives already contains the text, instead of an empty
// <div id="root">. The browser then hydrates that markup rather than building it from scratch.
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const target = path.join(root, 'dist', 'index.html')

// A Vite server in middleware mode compiles the same sources the client build uses — same aliases,
// same plugins — so there is no second bundle to keep in step with the first.
const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' })

try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
    let body = await render('/')

    // React 19 emits a <link rel="preload"> for every eagerly loaded image it renders. In the
    // browser those live in <head>; renderToString has no <head> to hoist them into, so they come
    // out at the top of the body markup and hydration then reports a mismatch. Take them out, and
    // keep only the one the author marked as high priority — the hero screenshot, the largest
    // element above the fold. React re-declares the others itself once it hydrates, exactly as it
    // does today; preloading a below-the-fold screenshot would only compete with the stylesheet.
    const preloads = body.match(/<link rel="preload"[^>]*\/>/g) ?? []
    body = body.replace(/<link rel="preload"[^>]*\/>/g, '')
    const hero = preloads
        .filter((tag) => tag.includes('fetchPriority="high"'))
        .map((tag) => tag.replace(' fetchPriority="high"', ' fetchpriority="high"'))

    const shell = await readFile(target, 'utf8')
    if (!shell.includes('<div id="root"></div>')) {
        throw new Error('dist/index.html no longer holds an empty <div id="root"></div> to fill.')
    }

    const filled = shell
        .replace('</head>', `${hero.map((tag) => `  ${tag}\n`).join('')}</head>`)
        .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

    await writeFile(target, filled)

    // GitHub Pages serves 404.html for any unknown path, which is how the client-side router gets a
    // chance to resolve the URL. That page keeps the plain shell — the prerendered markup belongs to
    // "/" and hydrating it under a different URL would only make React throw it away — and says
    // noindex, because a page that answers 404 has no business in an index.
    const notFound = shell.replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex" />')
    if (!notFound.includes('content="noindex"')) {
        throw new Error('index.html no longer carries the robots meta tag the 404 page overrides.')
    }
    await writeFile(path.join(root, 'dist', '404.html'), notFound)

    console.log(`prerender: ${(body.length / 1024).toFixed(1)} kB of markup, ${hero.length} preload(s) hoisted into <head>, 404.html written`)
} finally {
    await vite.close()
}
