import { CalendarClock, CreditCard, FileWarning, ReceiptText } from 'lucide-react'

import Footer from '@/components/footer'
import Header from '@/components/header'
import { Reveal } from '@/components/reveal'
import { links } from '@/lib/links'
import { WAITLIST_COPY } from '@/waitlist/copy'
import { LANGUAGES, pageUrl, type Language } from '@/waitlist/languages'

import { WaitlistForm } from './waitlist-form'

// One component, six sets of copy (src/waitlist/copy.ts). The country guides each got their own
// component because each one says different things; these six say the same four things in six
// languages, and six copies of the same JSX would drift the moment one of them is edited.

// Same order as the four warnings in the copy, which is fixed at four by its type.
const WARNING_ICONS = [CalendarClock, CreditCard, FileWarning, ReceiptText] as const

export function WaitlistPage({ language }: { language: Language }) {
    const copy = WAITLIST_COPY[language]
    const others = LANGUAGES.filter((code) => code !== language)

    return (
        <>
            <Header />
            <main lang={language}>
                <section className="mx-auto max-w-3xl px-5 pb-4 pt-28 sm:pt-36">
                    <p className="enter font-mono text-xs uppercase tracking-[0.2em] text-primary">{copy.eyebrow}</p>
                    <h1 className="enter mt-4 text-balance text-4xl font-semibold tracking-tight [animation-delay:90ms] sm:text-5xl">
                        {copy.heading}
                    </h1>
                    {copy.intro.map((paragraph, index) => (
                        <p
                            key={index}
                            className="enter mt-6 text-pretty text-lg leading-relaxed text-muted-foreground [animation-delay:180ms]"
                        >
                            {paragraph}
                        </p>
                    ))}

                    {/* Nobody is served a language they did not ask for without being told which one it is. */}
                    <p className="enter mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground [animation-delay:270ms]">
                        <span>{copy.inThisLanguage}</span>
                        <span>{copy.otherLanguages}</span>
                        {others.map((code, index) => (
                            <span key={code}>
                                <a
                                    href={pageUrl(code)}
                                    hrefLang={code}
                                    className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                                >
                                    {WAITLIST_COPY[code].nativeName}
                                </a>
                                {index < others.length - 1 ? ',' : ''}
                            </span>
                        ))}
                    </p>
                </section>

                <section className="mx-auto max-w-3xl px-5 py-12">
                    <Reveal>
                        <h2 className="text-2xl font-semibold tracking-tight">{copy.warningsHeading}</h2>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            {copy.warnings.map((warning, index) => {
                                const Icon = WARNING_ICONS[index]
                                return (
                                    <div key={warning.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                                        <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                                        <h3 className="mt-3 text-base font-semibold tracking-tight">{warning.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{warning.body}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </Reveal>
                </section>

                <section id="form" className="mx-auto max-w-3xl px-5 py-12">
                    <Reveal>
                        <WaitlistForm copy={copy} language={language} />
                        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                            {copy.privacy.before}
                            <a
                                href={links.privacyPolicy}
                                className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                            >
                                {copy.privacy.linkLabel}
                            </a>
                            {copy.privacy.after}
                        </p>
                        <p className="mt-6 text-sm">
                            <a
                                href="https://invoicerr.app/"
                                className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-primary"
                            >
                                {copy.backHome}
                            </a>
                        </p>
                    </Reveal>
                </section>
            </main>
            <Footer />
        </>
    )
}
