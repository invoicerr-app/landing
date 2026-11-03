import { CONTENT_PAGES } from '@/content/pages'
import { DeskObject } from '@/components/desk/objects'
import { hostedLoginOpen, links } from '@/lib/links'
import { cn } from '@/lib/utils'

import { BrandMark } from './brand-mark'

// The hub and the five country guides, each under its own name and in its own language: the footer is
// the one place every page on the site, the home page included, links to all of them.
const guides = CONTENT_PAGES.filter((page) => page.group === 'country' || page.path === '/europe/e-invoicing-mandates')

const columns: { title: string; items: { label: string; href: string; lang?: string }[] }[] = [
    {
        title: 'Product',
        items: [
            // Restored by `hostedLoginOpen` in src/lib/links.ts on the day the hosted version opens.
            ...(hostedLoginOpen ? [{ label: 'Log in', href: links.app }] : []),
            { label: 'Pricing', href: '#pricing' },
            { label: 'Countries', href: '#countries' },
            { label: 'Platforms', href: '#platforms' },
            { label: 'Changelog', href: links.changelog },
        ],
    },
    {
        title: 'E-invoicing guides',
        items: guides.map((page) => ({ label: page.label, href: `${page.path}/`, lang: page.lang === 'en' ? undefined : page.lang })),
    },
    {
        title: 'Self-hosting',
        items: [
            { label: 'Docker install', href: links.selfHost },
            { label: 'Kubernetes', href: links.kubernetes },
            { label: 'Source code', href: links.github },
            { label: 'LinkedIn', href: links.linkedin },
            { label: 'Discord', href: links.discord },
            { label: 'Sponsor', href: links.sponsor },
            { label: 'License', href: links.license },
        ],
    },
    {
        title: 'Developers',
        items: [
            { label: 'Documentation', href: links.docs },
            { label: 'API reference', href: links.api },
            { label: 'Translate on Weblate', href: links.weblate },
        ],
    },
    {
        title: 'Legal',
        items: [
            { label: 'Terms of Service', href: links.termsOfService },
            { label: 'Privacy Policy', href: links.privacyPolicy },
            { label: 'Data Processing Agreement', href: links.dataProcessingAgreement },
            { label: 'Legal Notice', href: links.legalNotice },
            { label: 'Cookies & Acceptable Use', href: links.cookiesAcceptableUse },
        ],
    },
]

interface FooterProps {
    /** `desk` lays the footer on the home page's desk: light text on the dark surface. */
    variant?: 'default' | 'desk'
    /** Rendered above the link columns: the home page puts its last call to action there. */
    children?: React.ReactNode
}

export default function Footer({ variant = 'default', children }: FooterProps) {
    const desk = variant === 'desk'
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
                    <a href="/" className="flex w-fit items-center gap-2.5" aria-label="Invoicerr home">
                        <BrandMark className={cn('h-6', desk && '[&_path.fill-primary]:fill-azure-light')} />
                        <span className="font-heading text-lg font-semibold tracking-tight">Invoicerr</span>
                    </a>
                    <p className={cn('mt-4 max-w-xs text-sm leading-relaxed', desk ? 'text-white/80' : 'text-muted-foreground')}>
                        Open-source invoicing, in the cloud or on your own server.
                    </p>
                </div>
                {columns.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                        <p className={cn('text-sm font-medium', desk && 'font-mono text-xs uppercase tracking-[0.08em] text-azure-pale')}>{column.title}</p>
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
            <div className={cn('relative mx-auto max-w-6xl px-5 pb-10 text-sm', desk ? 'text-white/70' : 'text-muted-foreground')}>
                © {new Date().getFullYear()} Invoicerr. Released under AGPL-3.0.
            </div>
        </footer>
    )
}
