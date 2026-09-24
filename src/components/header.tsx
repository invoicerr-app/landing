import { Menu, X } from 'lucide-react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'

import { hostedLoginOpen, links } from '@/lib/links'
import { cn } from '@/lib/utils'

import { BrandMark } from './brand-mark'
import { Icons } from './icons'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'

const sections = [
    { label: 'Product', href: '#product' },
    { label: 'Countries', href: '#countries' },
    { label: 'Self-hosting', href: '#hosting' },
    { label: 'Pricing', href: '#pricing' },
]

export default function Header() {
    const { scrollY } = useScroll()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const next = latest > 16
        setScrolled((current) => (current === next ? current : next))
    })

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
                scrolled || open ? 'border-border bg-background/80 backdrop-blur-xl' : 'border-transparent',
            )}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
                <a href="/" className="flex items-center gap-2.5 rounded-md" aria-label="Invoicerr home">
                    <BrandMark className="h-6" />
                    <span className="font-heading text-lg font-semibold tracking-tight">Invoicerr</span>
                </a>

                <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
                    {sections.map((section) => (
                        <a
                            key={section.href}
                            href={section.href}
                            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {section.label}
                        </a>
                    ))}
                    <a
                        href={links.docs}
                        className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Docs
                    </a>
                </nav>

                <div className="flex items-center gap-1.5">
                    <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
                        <a href={links.github} aria-label="Invoicerr on GitHub">
                            <Icons.gitHub />
                        </a>
                    </Button>
                    <ThemeToggle />
                    {hostedLoginOpen && (
                        <Button variant="ghost" asChild className="hidden sm:inline-flex">
                            <a href={links.app}>Log in</a>
                        </Button>
                    )}
                    <Button asChild className="hidden sm:inline-flex">
                        <a href={links.app}>Join the waiting list</a>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setOpen((current) => !current)}
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                    >
                        {open ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {open && (
                <motion.nav
                    id="mobile-nav"
                    aria-label="Mobile"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1 border-t border-border px-5 py-4 md:hidden"
                >
                    {[...sections, { label: 'Docs', href: links.docs }, { label: 'GitHub', href: links.github }].map((item) => (
                        <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-md px-2 py-2.5 text-base">
                            {item.label}
                        </a>
                    ))}
                    <div className={cn('mt-3 grid gap-2', hostedLoginOpen && 'grid-cols-2')}>
                        {hostedLoginOpen && (
                            <Button variant="outline" asChild>
                                <a href={links.app}>Log in</a>
                            </Button>
                        )}
                        <Button asChild>
                            <a href={links.app}>Join the waiting list</a>
                        </Button>
                    </div>
                </motion.nav>
            )}
        </header>
    )
}
