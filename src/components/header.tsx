import { Menu, X } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

import { useHome } from '@/i18n/home/context'
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
        { label: t.nav.product, href: '#product' },
        { label: t.nav.countries, href: '#countries' },
        { label: t.nav.hosting, href: '#hosting' },
        { label: t.nav.pricing, href: '#pricing' },
    ]
    const { scrollY } = useScroll()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const onDesk = overDesk && !scrolled && !open
    const quiet = onDesk ? 'text-white/85 hover:bg-white/10 hover:text-white' : 'text-muted-foreground hover:text-foreground'

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const next = latest > 16
        setScrolled((current) => (current === next ? current : next))
    })

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
                scrolled || open ? 'border-border bg-background/80 backdrop-blur-xl' : 'border-transparent',
                onDesk && 'text-white',
            )}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
                <a href={home} className="flex items-center gap-2.5 rounded-md" aria-label={t.home}>
                    <BrandMark className={cn('h-6', onDesk && '[&_path.fill-primary]:fill-azure-light')} />
                    <span className="font-heading text-lg font-semibold tracking-tight">Invoicerr</span>
                </a>

                <nav className="hidden items-center gap-1 md:flex" aria-label={t.main}>
                    {sections.map((section) => (
                        <a
                            key={section.href}
                            href={section.href}
                            className={cn('rounded-md px-3 py-2 text-sm transition-colors', quiet)}
                        >
                            {section.label}
                        </a>
                    ))}
                    <a
                        href={links.docs}
                        className={cn('rounded-md px-3 py-2 text-sm transition-colors', quiet)}
                    >
                        {t.nav.docs}
                    </a>
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
                        className={cn('md:hidden', onDesk && quiet)}
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
                    className="flex flex-col gap-1 border-t border-border px-5 py-4 md:hidden"
                >
                    {[
                        ...sections,
                        { label: t.nav.docs, href: links.docs },
                        { label: 'GitHub', href: links.github },
                        { label: 'LinkedIn', href: links.linkedin },
                        { label: 'Discord', href: links.discord },
                    ].map((item) => (
                        <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-base">
                            {item.label}
                        </a>
                    ))}
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
