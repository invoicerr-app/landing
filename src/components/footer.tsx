import { hostedLoginOpen, links } from '@/lib/links'

import { BrandMark } from './brand-mark'

const columns = [
    {
        title: 'Product',
        items: [
            // Restored by `hostedLoginOpen` in src/lib/links.ts on the day the hosted version opens.
            ...(hostedLoginOpen ? [{ label: 'Log in', href: links.app }] : []),
            { label: 'Pricing', href: '#pricing' },
            { label: 'Countries', href: '#countries' },
            { label: 'Changelog', href: links.changelog },
        ],
    },
    {
        title: 'Self-hosting',
        items: [
            { label: 'Docker install', href: links.selfHost },
            { label: 'Kubernetes', href: links.kubernetes },
            { label: 'Source code', href: links.github },
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

export default function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
                <div>
                    <a href="/" className="flex w-fit items-center gap-2.5" aria-label="Invoicerr home">
                        <BrandMark className="h-6" />
                        <span className="font-heading text-lg font-semibold tracking-tight">Invoicerr</span>
                    </a>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
                        Open-source invoicing, in the cloud or on your own server.
                    </p>
                </div>
                {columns.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                        <p className="text-sm font-medium">{column.title}</p>
                        <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                            {column.items.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="transition-colors hover:text-foreground">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
            <div className="mx-auto max-w-6xl px-5 pb-10 text-sm text-muted-foreground">
                © {new Date().getFullYear()} Invoicerr. Released under AGPL-3.0.
            </div>
        </footer>
    )
}
