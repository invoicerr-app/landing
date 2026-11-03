import { Menu, X } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

import { useHome } from '@/i18n/home/context'
import { LANGUAGE_INFO } from '@/i18n/home/languages'
import { hostedLoginOpen, links, waitlistHref } from '@/lib/links'
import { cn } from '@/lib/utils'

import { BrandMark } from './brand-mark'
import { Icons } from './icons'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'


interface HeaderProps {
    /** The home page opens on its dark desk: until the page scrolls, the bar is transparent over it and
        its text is light, whatever the theme. */
    overDesk?: boolean
}

export default function Header({ overDesk = false }: HeaderProps) {
    const { lang, copy } = useHome()
    const t = copy.header
    const home = lang === 'en' ? '/' : `/${lang}/`
    const sections = [
        // In-page anchors on the home page; from any other page they lead to the home page's section.
        { label: t.nav.product, href: `${overDesk ? '' : home}#product` },
        { label: t.nav.countries, href: `${overDesk ? '' : home}#countries` },
        { label: t.nav.hosting, href: `${overDesk ? '' : home}#hosting` },
        { label: t.nav.pricing, href: `${overDesk ? '' : home}#pricing` },
    ]
    const { scrollY } = useScroll()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const onDesk = overDesk && !scrolled && !open
    const quiet = onDesk ? 'text-white hover:bg-white/10' : 'text-muted-foreground hover:text-foreground'

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const next = latest > 16
        setScrolled((current) => (current === next ? current : next))
    })

    return (
        <header
            lang={LANGUAGE_INFO[lang].tag}
            dir={LANGUAGE_INFO[lang].dir}
            // The mobile menu closes on Escape and when focus leaves the header, so it never covers
            // the element the keyboard moves to.
            onKeyDown={(event) => {
                if (event.key === 'Escape') setOpen(false)
            }}
            onBlur={(event) => {
                if (open && !event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false)
            }}
            className={cn(
                'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
                scrolled || open ? 'border-border bg-background/80 backdrop-blur-xl' : 'border-transparent',
                onDesk && 'on-desk text-white',
            )}
        >
            {/* First stop of every page: straight to the content, past the header's links (RGAA 12.7). */}
            <a
                href="#main"
                className="sr-only rounded-md bg-background px-4 py-2 text-sm font-medium text-foreground shadow-md focus:not-sr-only focus:absolute focus:px-4 focus:py-2 focus:start-4 focus:top-3 focus:z-[60]"
            >
                {t.skipToContent}
            </a>
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
                <a href={home} className="flex items-center gap-2.5 rounded-md" aria-label={t.home}>
                    <BrandMark className={cn('h-6', onDesk && '[&_path.fill-primary]:fill-azure-light')} />
                    <span className="font-heading text-lg font-semibold tracking-tight">Invoicerr</span>
                </a>

                <nav className="hidden lg:block" aria-label={t.main}>
                    <ul className="flex items-center gap-1">
                        {[...sections, { label: t.nav.docs, href: links.docs }].map((section) => (
                            <li key={section.href}>
                                <a href={section.href} className={cn('block rounded-md px-3 py-2 text-sm transition-colors', quiet)}>
                                    {section.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-1.5">
                    <Button variant="ghost" size="icon" asChild className={cn('hidden sm:inline-flex', onDesk && quiet)}>
                        <a href={links.github} aria-label={t.onGitHub}>
                            <Icons.gitHub />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className={cn('hidden sm:inline-flex', onDesk && quiet)}>
                        <a href={links.linkedin} aria-label={t.onLinkedIn}>
                            <Icons.linkedIn />
                        </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className={cn('hidden sm:inline-flex', onDesk && quiet)}>
                        <a href={links.discord} aria-label={t.onDiscord}>
                            <Icons.discord />
                        </a>
                    </Button>
                    <ThemeToggle className={onDesk ? quiet : undefined} labels={t.theme} />
                    {hostedLoginOpen && (
                        <Button variant="ghost" asChild className={cn('hidden sm:inline-flex', onDesk && quiet)}>
                            <a href={links.app}>{t.logIn}</a>
                        </Button>
                    )}
                    <Button variant={onDesk ? 'desk' : 'default'} asChild className="hidden sm:inline-flex">
                        <a href={waitlistHref(lang)}>{t.joinWaitlist}</a>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn('lg:hidden', onDesk && quiet)}
                        onClick={() => setOpen((current) => !current)}
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        aria-label={open ? t.closeMenu : t.openMenu}
                    >
                        {open ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {open && (
                <motion.nav
                    id="mobile-nav"
                    aria-label={t.mobile}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1 border-t border-border px-5 py-4 lg:hidden"
                >
                    <ul className="flex flex-col gap-1">
                    {[
                        ...sections,
                        { label: t.nav.docs, href: links.docs },
                        { label: 'GitHub', href: links.github },
                        { label: 'LinkedIn', href: links.linkedin },
                        { label: 'Discord', href: links.discord },
                    ].map((item) => (
                        <li key={item.href}>
                            <a href={item.href} onClick={() => setOpen(false)} className="block rounded-md px-2 py-2.5 text-base">
                                {item.label}
                            </a>
                        </li>
                    ))}
                    </ul>
                    <div className={cn('mt-3 grid gap-2', hostedLoginOpen && 'grid-cols-2')}>
                        {hostedLoginOpen && (
                            <Button variant="outline" asChild>
                                <a href={links.app}>{t.logIn}</a>
                            </Button>
                        )}
                        <Button asChild>
                            <a href={waitlistHref(lang)}>{t.joinWaitlist}</a>
                        </Button>
                    </div>
                </motion.nav>
            )}
        </header>
    )
}
