// Renders every route to HTML at build time and writes each one into its own dist/<path>/index.html,
// so that what a crawler — or a reader with JavaScript off — receives already contains the text,
// instead of an empty <div id="root">. The browser then hydrates that markup rather than building it
// from scratch. Also writes 404.html and llms-full.txt, the way it always has.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import TurndownService from 'turndown'
import { createServer } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const shellPath = path.join(root, 'dist', 'index.html')
const SITE = 'https://invoicerr.app'

// Same Organization and WebSite nodes as the <script type="application/ld+json"> in index.html. Every
// non-home page repeats them (each page's structured data is read independently, so there is no
// cross-document @id resolution to rely on) — keep the three in sync by hand if any changes; there is
// no single source shared between the hand-written index.html and this file.
const organization = {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: 'Invoicerr',
    url: `${SITE}/`,
    logo: `${SITE}/apple-touch-icon.png`,
    description: 'Invoicerr is an open-source invoicing application, released under AGPL-3.0, that can be self-hosted or used as a hosted service.',
    sameAs: ['https://github.com/invoicerr-app/invoicerr'],
}
const website = {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: `${SITE}/`,
    name: 'Invoicerr',
    description: 'Open-source invoicing, in the cloud or on your own server.',
    inLanguage: 'en',
    publisher: { '@id': `${SITE}/#organization` },
}

function escapeHtml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Swaps the per-page <title>, meta description, canonical, Open Graph/Twitter title+description and
// JSON-LD out of the shared shell. Everything else — favicons, theme-color, the inline theme script,
// og:image — stays the homepage's, since there is no separate image or icon for these pages yet.
// `lang` is optional and only needed for a page written in a language other than the shell's own
// English (today, only /facturation-electronique): it swaps the <html lang> attribute and og:locale,
// both of which a plain regex replace on title/description would otherwise leave stuck on English.
function injectHead(shell, { title, description, canonical, jsonLd, lang }) {
    const escapedTitle = escapeHtml(title)
    const escapedDescription = escapeHtml(description)
    let out = shell
        .replace(/<title>[^<]*<\/title>/, `<title>${escapedTitle}</title>`)
        .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapedDescription}" />`)
        .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
        .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
        .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapedTitle}" />`)
        .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapedDescription}" />`)
        .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapedTitle}" />`)
        .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapedDescription}" />`)
        .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`)
    if (lang) {
        out = out.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`).replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${lang}_${lang.toUpperCase()}" />`)
    }
    return out
}

const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' })

try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

    const shell = await readFile(shellPath, 'utf8')
    if (!shell.includes('<div id="root"></div>')) {
        throw new Error('dist/index.html no longer holds an empty <div id="root"></div> to fill.')
    }

    // The home page keeps its hand-written head as-is (no injectHead call): index.html already
    // carries the right <title>, description, canonical and JSON-LD for "/".
    const pages = [
        { url: '/', outDir: path.join(root, 'dist'), head: null },
        {
            url: '/facturation-electronique',
            outDir: path.join(root, 'dist', 'facturation-electronique'),
            head: {
                title: "Facturation électronique en France : guide complet · Invoicerr",
                description:
                    "Qui est concerné, à partir de quand selon la taille de l'entreprise, ce qui change avec le PDP et les formats acceptés. Sources officielles citées et liées, sans comparatif produit.",
                canonical: `${SITE}/facturation-electronique/`,
                lang: 'fr',
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@graph': [
                        organization,
                        website,
                        {
                            '@type': 'WebPage',
                            '@id': `${SITE}/facturation-electronique/#webpage`,
                            url: `${SITE}/facturation-electronique/`,
                            name: 'Facturation électronique en France : guide complet',
                            description:
                                "Qui est concerné, à partir de quand selon la taille de l'entreprise, ce qui change avec le PDP et les formats acceptés. Sources officielles citées et liées, sans comparatif produit.",
                            inLanguage: 'fr',
                            isPartOf: { '@id': `${SITE}/#website` },
                            breadcrumb: { '@id': `${SITE}/facturation-electronique/#breadcrumb` },
                        },
                        {
                            '@type': 'BreadcrumbList',
                            '@id': `${SITE}/facturation-electronique/#breadcrumb`,
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                                { '@type': 'ListItem', position: 2, name: 'Facturation électronique', item: `${SITE}/facturation-electronique/` },
                            ],
                        },
                    ],
                },
            },
        },
    ]

    const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' })
    turndown.remove(['svg', 'picture', 'script', 'style'])
    // `remove` skips void elements, so images need a rule of their own.
    turndown.addRule('no-images', { filter: 'img', replacement: () => '' })

    const llmsFullSections = []
    let totalBytes = 0

    for (const page of pages) {
        let body = await render(page.url)

        // React 19 emits a <link rel="preload"> for every eagerly loaded image it renders. In the
        // browser those live in <head>; renderToString has no <head> to hoist them into, so they come
        // out at the top of the body markup and hydration then reports a mismatch. Take them out, and
        // keep only the one the author marked as high priority — the hero screenshot on "/", the
        // largest element above its fold. /facturation-electronique renders no such image, so this is
        // a no-op for it.
        const preloads = body.match(/<link rel="preload"[^>]*\/>/g) ?? []
        body = body.replace(/<link rel="preload"[^>]*\/>/g, '')
        const hero = preloads
            .filter((tag) => tag.includes('fetchPriority="high"'))
            .map((tag) => tag.replace(' fetchPriority="high"', ' fetchpriority="high"'))

        const pageShell = page.head ? injectHead(shell, page.head) : shell
        const filled = pageShell
            .replace('</head>', `${hero.map((tag) => `  ${tag}\n`).join('')}</head>`)
            .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

        await mkdir(page.outDir, { recursive: true })
        await writeFile(path.join(page.outDir, 'index.html'), filled)
        totalBytes += body.length

        const canonical = page.head ? page.head.canonical : `${SITE}/`
        const title = page.head ? page.head.title : 'Invoicerr'
        const markdown = turndown
            .turndown(body)
            .replace(/\[\]\([^)]*\)/g, '')
            .replace(/\]\(\//g, `](${SITE}/`)
            .replace(/\]\(#/g, `](${SITE}/#`)
            .replace(/\n{3,}/g, '\n\n')
            .trim()
        llmsFullSections.push(`# ${title} — full text of ${canonical}\n\n${markdown}`)
    }

    // GitHub Pages serves 404.html for any unknown path, which is how the client-side router gets a
    // chance to resolve the URL — for every path except the two above, which now have a real static
    // file of their own and never reach this fallback. That page keeps the plain shell — the
    // prerendered markup belongs to specific URLs and hydrating it under a different one would only
    // make React throw it away — and says noindex, because a page that answers 404 has no business in
    // an index.
    const notFound = shell.replace(/<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex" />')
    if (!notFound.includes('content="noindex"')) {
        throw new Error('index.html no longer carries the robots meta tag the 404 page overrides.')
    }
    await writeFile(path.join(root, 'dist', '404.html'), notFound)

    // llms-full.txt (https://llmstxt.org): every page's own text as Markdown, converted from the
    // markup rendered just above rather than written by hand, so it can never say something the page
    // does not. Screenshots and icons carry nothing a reader of plain text could use, so they are
    // dropped instead of left as empty image links.
    await writeFile(path.join(root, 'dist', 'llms-full.txt'), `${llmsFullSections.join('\n\n---\n\n')}\n`)

    console.log(
        `prerender: ${pages.length} page(s), ${(totalBytes / 1024).toFixed(1)} kB of markup total, 404.html and llms-full.txt written`,
    )
} finally {
    await vite.close()
}
