import { createFileRoute } from '@tanstack/react-router'
import { MotionConfig } from 'motion/react'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { CONTENT_PAGES } from '@/content/pages'
import { HOME_LANGUAGES, LANGUAGE_INFO, homePath } from '@/i18n/home/languages'
import { WAITLIST_COPY } from '@/waitlist/copy'
import { LANGUAGES, pagePath } from '@/waitlist/languages'

// Every page of the site on one page, as a second way to find them next to the menus (RGAA 12.1):
// the home page in its fifteen languages, the guides, the waiting list in its six. Each link is in
// the language of the page it opens, and says so.
export const Route = createFileRoute('/sitemap')({
    component: SitemapRoute,
})

const heading = 'mt-12 text-2xl font-semibold tracking-tight'
const list = 'mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2'
const link = 'underline decoration-border underline-offset-4 transition-colors hover:decoration-primary'

function SitemapRoute() {
    return (
        <MotionConfig reducedMotion="user">
            <Header />
            <main id="main" tabIndex={-1} className="mx-auto max-w-4xl px-5 pb-24 pt-32">
                <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">Sitemap</h1>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Every page of invoicerr.app. The documentation has its own, on docs.invoicerr.app.</p>

                <h2 className={heading}>Home page</h2>
                <ul className={list}>
                    {HOME_LANGUAGES.map((code) => (
                        <li key={code}>
                            <a href={homePath(code)} lang={LANGUAGE_INFO[code].tag} hrefLang={LANGUAGE_INFO[code].tag} dir={LANGUAGE_INFO[code].dir} className={link}>
                                Invoicerr, {LANGUAGE_INFO[code].name}
                            </a>
                        </li>
                    ))}
                </ul>

                <h2 className={heading}>E-invoicing guides</h2>
                <ul className={list}>
                    {CONTENT_PAGES.map((page) => (
                        <li key={page.path}>
                            <a href={`${page.path}/`} lang={page.lang} hrefLang={page.lang} className={link}>
                                {page.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <h2 className={heading}>Waiting list</h2>
                <ul className={list}>
                    {LANGUAGES.map((code) => (
                        <li key={code}>
                            <a href={pagePath(code)} lang={code} hrefLang={code} className={link}>
                                {WAITLIST_COPY[code].eyebrow}, {LANGUAGE_INFO[code].name}
                            </a>
                        </li>
                    ))}
                </ul>
            </main>
            <Footer />
        </MotionConfig>
    )
}
