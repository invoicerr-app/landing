import { CONTENT_PAGES } from '@/content/pages'
import { DeskObject } from '@/components/desk/objects'
import type { HomeCopy } from '@/i18n/home/en'
import { useHome } from '@/i18n/home/context'
import { fmt } from '@/i18n/home/format'
import { HOME_LANGUAGES, LANGUAGE_INFO, homePath } from '@/i18n/home/languages'
import { hostedLoginOpen, links } from '@/lib/links'
import { cn } from '@/lib/utils'

import { BrandMark } from './brand-mark'

// The hub and the five country guides, each under its own name and in its own language: the footer is
// the one place every page on the site, the home page included, links to all of them.
const guides = CONTENT_PAGES.filter((page) => page.group === 'country' || page.path === '/europe/e-invoicing-mandates')

function footerColumns(t: HomeCopy['footer'], home: string): { title: string; items: { label: string; href: string; lang?: string }[] }[] {
    return [
        {
            title: t.columns.product,
            items: [
                // Restored by `hostedLoginOpen` in src/lib/links.ts on the day the hosted version opens.
                ...(hostedLoginOpen ? [{ label: t.items.logIn, href: links.app }] : []),
                { label: t.items.pricing, href: `${home}#pricing` },
                { label: t.items.countries, href: `${home}#countries` },
                { label: t.items.platforms, href: `${home}#platforms` },
                { label: t.items.changelog, href: links.changelog },
            ],
        },
        {
            title: t.columns.guides,
            items: guides.map((page) => ({ label: page.label, href: `${page.path}/`, lang: page.lang === 'en' ? undefined : page.lang })),
        },
        {
            title: t.columns.selfHosting,
            items: [
                { label: t.items.docker, href: links.selfHost },
                { label: t.items.kubernetes, href: links.kubernetes },
                { label: t.items.source, href: links.github },
                { label: 'LinkedIn', href: links.linkedin },
                { label: 'Discord', href: links.discord },
                { label: t.items.sponsor, href: links.sponsor },
                { label: t.items.license, href: links.license },
            ],
        },
        {
            title: t.columns.developers,
            items: [
                { label: t.items.docs, href: links.docs },
                { label: t.items.api, href: links.api },
                { label: t.items.weblate, href: links.weblate },
            ],
        },
        {
            title: t.columns.legal,
            items: [
                { label: t.items.terms, href: links.termsOfService },
                { label: t.items.privacy, href: links.privacyPolicy },
                { label: t.items.dpa, href: links.dataProcessingAgreement },
                { label: t.items.notice, href: links.legalNotice },
                { label: t.items.cookies, href: links.cookiesAcceptableUse },
            ],
        },
    ]
}

interface FooterProps {
    /** `desk` lays the footer on the home page's desk: light text on the dark surface. */
    variant?: 'default' | 'desk'
    /** Rendered above the link columns: the home page puts its last call to action there. */
    children?: React.ReactNode
}

export default function Footer({ variant = 'default', children }: FooterProps) {
    const { lang, copy } = useHome()
    const t = copy.footer
    const desk = variant === 'desk'
    // The home page's footer (the desk variant) links to its own sections; elsewhere, to the home page's.
    const columns = footerColumns(t, desk ? '' : homePath(lang))
    return (
        <footer className={cn('relative', desk ? 'desk -mt-[18px] overflow-hidden text-[#ebeff2]' : 'border-t border-border')}>
            {desk && (
                <>
                    <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-[10%] h-[300px] w-[520px] rounded-full bg-[rgb(151_216_248/0.18)] blur-[60px]" />
                    <DeskObject name="pen-footer" className="absolute -right-16 top-20 hidden xl:block" />
                </>
            )}
            {children}
            <div className={cn('relative mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr]', desk ? 'mt-24 border-t border-white/15 py-14' : 'py-14')}>
                <div>
                    <a href={homePath(lang)} className="flex w-fit items-center gap-2.5" aria-label={copy.header.home}>
                        <BrandMark className={cn('h-6', desk && '[&_path.fill-primary]:fill-azure-light')} />
                        <span className="font-heading text-lg font-semibold tracking-tight">Invoicerr</span>
                    </a>
                    <p className={cn('mt-4 max-w-xs text-sm leading-relaxed', desk ? 'text-white/80' : 'text-muted-foreground')}>
                        {t.tagline}
                    </p>
                </div>
                {columns.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                        <p className={cn('text-sm font-medium', desk && 'text-azure-pale')}>{column.title}</p>
                        <ul className={cn('mt-4 space-y-2.5 text-sm', desk ? 'text-white/80' : 'text-muted-foreground')}>
                            {column.items.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        lang={item.lang}
                                        hrefLang={item.lang}
                                        className={cn('transition-colors', desk ? 'hover:text-white' : 'hover:text-foreground')}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
            <div className={cn('relative mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-x-10 gap-y-6 px-5 pb-10 text-sm', desk ? 'text-white/70' : 'text-muted-foreground')}>
                <p>{fmt(t.copyright, { year: new Date().getFullYear() })}</p>
                {/* Every language of the home page, under its own name, linked: the visible half of
                    the hreflang set the prerender writes into each page's head. */}
                <nav aria-label={copy.language.label} className="max-w-3xl">
                    <ul className="flex flex-wrap gap-x-4 gap-y-2">
                        {HOME_LANGUAGES.map((code) => (
                            <li key={code}>
                                <a
                                    href={homePath(code)}
                                    lang={LANGUAGE_INFO[code].tag}
                                    hrefLang={LANGUAGE_INFO[code].tag}
                                    aria-current={code === lang ? 'page' : undefined}
                                    className={cn(
                                        'transition-colors',
                                        code === lang ? (desk ? 'text-white underline underline-offset-4' : 'text-foreground underline underline-offset-4') : desk ? 'hover:text-white' : 'hover:text-foreground',
                                    )}
                                >
                                    {LANGUAGE_INFO[code].name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </footer>
    )
}
