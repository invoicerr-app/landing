import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { Reveal } from '@/components/reveal'
import { links } from '@/lib/links'
import { cn } from '@/lib/utils'

const questions = [
    {
        question: 'Is the self-hosted version really free?',
        answer: (
            <>
                Yes. It is the same app with every feature and no seat limit, under the AGPL-3.0 license. Selling Invoicerr as a service
                to other people needs a{' '}
                <a href={links.commercialLicense} className="underline underline-offset-4">
                    commercial license
                </a>
                .
            </>
        ),
    },
    {
        question: 'What can I do during the cloud trial?',
        answer: 'Everything except sending documents. For 14 days you can set up your company, import clients, build quotes and invoices and invite your team. Sending unlocks when you subscribe.',
    },
    {
        question: 'How does seat pricing work?',
        answer: 'You pay per company. The first seat is $15 a month, seats 2 to 4 are $4 each, and every seat after that is $3. Paying yearly costs ten months instead of twelve.',
    },
    {
        question: 'What happens to my data if I stop paying?',
        answer: 'The company becomes read-only for 14 days. After that, the owner receives a zip with a PDF and a JSON export of every document before anything is deleted.',
    },
    {
        question: 'Which countries are supported?',
        answer: (
            <>
                Germany, France, Italy, Poland and Portugal ship with their rules filled in: identifiers, VAT rates, e-invoice formats,
                transmission channels and archive retention. The{' '}
                <a href={links.countries} className="underline underline-offset-4">
                    country support matrix
                </a>{' '}
                shows exactly what each one covers.
            </>
        ),
    },
    {
        question: 'What do I need to self-host it?',
        answer: 'Docker, PostgreSQL and Redis. The compose file in the install guide starts all three. For larger setups there is a Helm chart.',
    },
]

export function Faq() {
    const [open, setOpen] = useState<number | null>(0)

    return (
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 sm:pb-32 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <Reveal>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Questions, answered.</h2>
            </Reveal>
            <Reveal delay={0.1} className="divide-y divide-border border-y border-border">
                {questions.map((item, index) => {
                    const expanded = open === index
                    return (
                        <div key={item.question}>
                            <h3>
                                <button
                                    type="button"
                                    aria-expanded={expanded}
                                    aria-controls={`faq-${index}`}
                                    onClick={() => setOpen(expanded ? null : index)}
                                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-sans text-base font-medium"
                                >
                                    {item.question}
                                    <Plus className={cn('size-4 shrink-0 text-muted-foreground transition-transform duration-300', expanded && 'rotate-45')} />
                                </button>
                            </h3>
                            <AnimatePresence initial={false}>
                                {expanded && (
                                    <motion.div
                                        id={`faq-${index}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                                        className="overflow-hidden"
                                    >
                                        <p className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </Reveal>
        </section>
    )
}
