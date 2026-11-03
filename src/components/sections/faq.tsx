import { Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'

import { Eyebrow } from '@/components/desk/tear'
import { useHome } from '@/i18n/home/context'
import { rich } from '@/i18n/home/format'
import { links } from '@/lib/links'
import { cn } from '@/lib/utils'

export function Faq() {
    const { copy } = useHome()
    const t = copy.faq
    const [open, setOpen] = useState<number | null>(0)
    const questions = t.items.map((item) => ({
        question: item.question,
        answer: rich(item.answer, {
            link: (text) => (
                <a href={links.countries} className="underline underline-offset-4">
                    {text}
                </a>
            ),
        }),
    }))

    return (
        <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-28 pt-24 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
                <Eyebrow number="05">{t.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
                {questions.map((item, index) => {
                    const expanded = open === index
                    return (
                        <div key={item.question}>
                            <h3>
                                <button
                                    type="button"
                                    id={`faq-question-${index}`}
                                    aria-expanded={expanded}
                                    aria-controls={`faq-${index}`}
                                    onClick={() => setOpen(expanded ? null : index)}
                                    className="flex w-full items-center justify-between gap-6 py-5 text-start font-sans text-base font-medium"
                                >
                                    {item.question}
                                    <Plus className={cn('size-4 shrink-0 text-muted-foreground transition-transform duration-300', expanded && 'rotate-45')} />
                                </button>
                            </h3>
                            {/*
                                Every answer stays mounted and collapses to zero height, instead of being
                                unmounted. An answer that is not in the markup is an answer no crawler reads
                                — and the FAQPage structured data in index.html quotes all six of them.
                            */}
                            <motion.div
                                id={`faq-${index}`}
                                role="region"
                                aria-labelledby={`faq-question-${index}`}
                                initial={false}
                                animate={{ height: expanded ? 'auto' : 0 }}
                                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="overflow-hidden"
                            >
                                <p className="max-w-2xl pb-6 leading-relaxed text-muted-foreground">{item.answer}</p>
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
