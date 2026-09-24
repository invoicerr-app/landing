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
// `alternates` is optional too, and only the waiting list uses it: the same page written six times
// over needs every version to name the other five, plus an x-default. `referrerPolicy` is optional
// as well and only the five guides set it; the comment where they do says why.
function injectHead(shell, { title, description, canonical, jsonLd, lang, alternates, referrerPolicy }) {
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
    if (alternates?.length) {
        const tags = alternates.map(({ hreflang, href }) => `    <link rel="alternate" hreflang="${hreflang}" href="${href}" />\n`).join('')
        out = out.replace('</head>', `${tags}  </head>`)
    }
    if (referrerPolicy) {
        out = out.replace('</head>', `    <meta name="referrer" content="${referrerPolicy}" />\n  </head>`)
    }
    return out
}

const vite = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' })

try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

    // The waiting list's six pages describe themselves: their titles and descriptions are the ones
    // the copy already carries, in the language they are written in, rather than a second set kept
    // in step by hand down here.
    const { WAITLIST_COPY } = await vite.ssrLoadModule('/src/waitlist/copy.ts')
    const { LANGUAGES, DEFAULT_LANGUAGE, pagePath, pageUrl } = await vite.ssrLoadModule('/src/waitlist/languages.ts')

    const waitlistAlternates = [
        ...LANGUAGES.map((language) => ({ hreflang: language, href: pageUrl(language) })),
        { hreflang: 'x-default', href: pageUrl(DEFAULT_LANGUAGE) },
    ]

    const waitlistPages = LANGUAGES.map((language) => {
        const copy = WAITLIST_COPY[language]
        const url = pagePath(language).replace(/\/$/, '')
        const canonical = pageUrl(language)
        return {
            url,
            outDir: path.join(root, 'dist', ...pagePath(language).split('/').filter(Boolean)),
            // One entry in llms-full.txt rather than six near-identical ones. The English version
            // carries the four warnings an answer engine would quote; the other five say the same.
            llms: language === DEFAULT_LANGUAGE,
            head: {
                title: copy.meta.title,
                description: copy.meta.description,
                canonical,
                // English is the shell's own language, and passing it would turn og:locale into the
                // nonexistent "en_EN".
                lang: language === DEFAULT_LANGUAGE ? undefined : language,
                alternates: waitlistAlternates,
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@graph': [
                        organization,
                        website,
                        {
                            '@type': 'WebPage',
                            '@id': `${canonical}#webpage`,
                            url: canonical,
                            name: copy.heading,
                            description: copy.meta.description,
                            inLanguage: language,
                            isPartOf: { '@id': `${SITE}/#website` },
                            breadcrumb: { '@id': `${canonical}#breadcrumb` },
                        },
                        {
                            '@type': 'BreadcrumbList',
                            '@id': `${canonical}#breadcrumb`,
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                                { '@type': 'ListItem', position: 2, name: copy.eyebrow, item: canonical },
                            ],
                        },
                    ],
                },
            },
        }
    })

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
        {
            url: '/e-rechnung',
            outDir: path.join(root, 'dist', 'e-rechnung'),
            head: {
                title: 'E-Rechnung in Deutschland: vollständiger Leitfaden · Invoicerr',
                description:
                    'Wer betroffen ist, ab wann nach der Übergangsregelung bis 2028, was sich mit XRechnung und ZUGFeRD ändert. Offizielle Quellen zitiert und verlinkt, ohne Produktvergleich.',
                canonical: `${SITE}/e-rechnung/`,
                lang: 'de',
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@graph': [
                        organization,
                        website,
                        {
                            '@type': 'WebPage',
                            '@id': `${SITE}/e-rechnung/#webpage`,
                            url: `${SITE}/e-rechnung/`,
                            name: 'E-Rechnung in Deutschland: vollständiger Leitfaden',
                            description:
                                'Wer betroffen ist, ab wann nach der Übergangsregelung bis 2028, was sich mit XRechnung und ZUGFeRD ändert. Offizielle Quellen zitiert und verlinkt, ohne Produktvergleich.',
                            inLanguage: 'de',
                            isPartOf: { '@id': `${SITE}/#website` },
                            breadcrumb: { '@id': `${SITE}/e-rechnung/#breadcrumb` },
                        },
                        {
                            '@type': 'BreadcrumbList',
                            '@id': `${SITE}/e-rechnung/#breadcrumb`,
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                                { '@type': 'ListItem', position: 2, name: 'E-Rechnung', item: `${SITE}/e-rechnung/` },
                            ],
                        },
                    ],
                },
            },
        },
        {
            url: '/fatturazione-elettronica',
            outDir: path.join(root, 'dist', 'fatturazione-elettronica'),
            head: {
                title: 'Fatturazione elettronica in Italia: guida completa · Invoicerr',
                description:
                    'Chi è interessato, da quando secondo il regime, cosa cambia con il Sistema di Interscambio e il formato FatturaPA. Fonti ufficiali citate e collegate, senza confronto tra prodotti.',
                canonical: `${SITE}/fatturazione-elettronica/`,
                lang: 'it',
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@graph': [
                        organization,
                        website,
                        {
                            '@type': 'WebPage',
                            '@id': `${SITE}/fatturazione-elettronica/#webpage`,
                            url: `${SITE}/fatturazione-elettronica/`,
                            name: 'Fatturazione elettronica in Italia: guida completa',
                            description:
                                'Chi è interessato, da quando secondo il regime, cosa cambia con il Sistema di Interscambio e il formato FatturaPA. Fonti ufficiali citate e collegate, senza confronto tra prodotti.',
                            inLanguage: 'it',
                            isPartOf: { '@id': `${SITE}/#website` },
                            breadcrumb: { '@id': `${SITE}/fatturazione-elettronica/#breadcrumb` },
                        },
                        {
                            '@type': 'BreadcrumbList',
                            '@id': `${SITE}/fatturazione-elettronica/#breadcrumb`,
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                                { '@type': 'ListItem', position: 2, name: 'Fatturazione elettronica', item: `${SITE}/fatturazione-elettronica/` },
                            ],
                        },
                    ],
                },
            },
        },
        {
            url: '/ksef',
            outDir: path.join(root, 'dist', 'ksef'),
            head: {
                title: 'KSeF w Polsce: obowiązkowe fakturowanie elektroniczne · Invoicerr',
                description:
                    'Kogo dotyczy obowiązek, od kiedy według progu obrotu, co zmienia format FA(3) i Krajowy System e-Faktur. Źródła urzędowe cytowane i linkowane, bez porównania narzędzi.',
                canonical: `${SITE}/ksef/`,
                lang: 'pl',
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@graph': [
                        organization,
                        website,
                        {
                            '@type': 'WebPage',
                            '@id': `${SITE}/ksef/#webpage`,
                            url: `${SITE}/ksef/`,
                            name: 'KSeF w Polsce: obowiązkowe fakturowanie elektroniczne',
                            description:
                                'Kogo dotyczy obowiązek, od kiedy według progu obrotu, co zmienia format FA(3) i Krajowy System e-Faktur. Źródła urzędowe cytowane i linkowane, bez porównania narzędzi.',
                            inLanguage: 'pl',
                            isPartOf: { '@id': `${SITE}/#website` },
                            breadcrumb: { '@id': `${SITE}/ksef/#breadcrumb` },
                        },
                        {
                            '@type': 'BreadcrumbList',
                            '@id': `${SITE}/ksef/#breadcrumb`,
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                                { '@type': 'ListItem', position: 2, name: 'KSeF', item: `${SITE}/ksef/` },
                            ],
                        },
                    ],
                },
            },
        },
        {
            url: '/faturacao-eletronica',
            outDir: path.join(root, 'dist', 'faturacao-eletronica'),
            head: {
                title: 'Faturação eletrónica em Portugal: ATCUD e SAF-T (PT) · Invoicerr',
                description:
                    'Quem é abrangido, desde quando, o que muda com o ATCUD, o software certificado e o SAF-T (PT). Fontes oficiais citadas e ligadas, sem comparação de produtos.',
                canonical: `${SITE}/faturacao-eletronica/`,
                lang: 'pt',
                jsonLd: {
                    '@context': 'https://schema.org',
                    '@graph': [
                        organization,
                        website,
                        {
                            '@type': 'WebPage',
                            '@id': `${SITE}/faturacao-eletronica/#webpage`,
                            url: `${SITE}/faturacao-eletronica/`,
                            name: 'Faturação eletrónica em Portugal: ATCUD e SAF-T (PT)',
                            description:
                                'Quem é abrangido, desde quando, o que muda com o ATCUD, o software certificado e o SAF-T (PT). Fontes oficiais citadas e ligadas, sem comparação de produtos.',
                            inLanguage: 'pt',
                            isPartOf: { '@id': `${SITE}/#website` },
                            breadcrumb: { '@id': `${SITE}/faturacao-eletronica/#breadcrumb` },
                        },
                        {
                            '@type': 'BreadcrumbList',
                            '@id': `${SITE}/faturacao-eletronica/#breadcrumb`,
                            itemListElement: [
                                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                                { '@type': 'ListItem', position: 2, name: 'Faturação eletrónica', item: `${SITE}/faturacao-eletronica/` },
                            ],
                        },
                    ],
                },
            },
        },
        ...waitlistPages,
    ]

    // Measured in a browser on 2026-09-23, not assumed: with the modern default referrer policy
    // (strict-origin-when-cross-origin) a click from invoicerr.app to my.invoicerr.app arrives with
    // `Referer: https://invoicerr.app/` and no path at all, because the two are different origins.
    // The Worker's first rule reads that path to tell which guide sent the reader, so without this
    // the rule can never fire and every reader falls through to Accept-Language.
    //
    // The policy below is the pre-2020 default: the full URL travels to any https destination, and
    // nothing at all travels to an http one. It is set on the five guides alone, which are the only
    // pages whose own URL the Worker needs to read; the rest of the site keeps the browser default.
    // Take it away and the language falls back to Accept-Language, silently.
    const GUIDE_PATHS = new Set(['/facturation-electronique', '/e-rechnung', '/fatturazione-elettronica', '/ksef', '/faturacao-eletronica'])
    for (const page of pages) {
        if (GUIDE_PATHS.has(page.url)) page.head.referrerPolicy = 'no-referrer-when-downgrade'
    }

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

        // `llms` defaults to true: every page written before the waiting list belongs in there.
        if (page.llms === false) continue

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
