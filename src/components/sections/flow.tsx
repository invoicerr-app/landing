import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { Reveal } from '@/components/reveal'
import { WindowFrame } from '@/components/window-frame'
import { cn } from '@/lib/utils'

const steps = [
    {
        title: 'Quote it',
        body: 'Send a quote your client signs online with a one-time code. Ask for a deposit or split it into instalments.',
        image: '/screens/quotes.webp',
        alt: 'The quotes list in Invoicerr, with status and amount for each quote.',
    },
    {
        title: 'Invoice it',
        body: 'Turn the signed quote into an invoice in one click. Lines come from your catalogue, VAT rates from your country.',
        image: '/screens/invoice-wizard.webp',
        alt: 'The invoice creation wizard, with lines filled from the article catalogue.',
    },
    {
        title: 'Get paid',
        body: 'Import a bank statement. Invoicerr matches each line by reference and amount, then records the payment for you.',
        image: '/screens/bank-reconciliation.webp',
        alt: 'Bank reconciliation: imported statement lines with a suggested invoice match.',
    },
    {
        title: 'Keep the record',
        body: 'Every sent invoice lands in a hashed legal archive, kept for exactly as long as your country asks.',
        image: '/screens/invoice-detail.webp',
        alt: 'An invoice detail page showing totals, settlement and its legal archive.',
    },
]

export function Flow() {
    const [active, setActive] = useState(0)

    return (
        <section id="product" className="border-y border-border bg-muted/30">
            <div className="mx-auto max-w-6xl px-5 py-24 sm:py-32">
                <Reveal className="max-w-2xl">
                    <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">From first quote to money in the bank.</h2>
                    <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                        One document engine runs quotes, invoices, credit notes, purchase orders and expenses. Nothing gets retyped
                        between them.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-10 lg:mt-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                    <ol>
                        {steps.map((step, index) => (
                            <motion.li
                                key={step.title}
                                onViewportEnter={() => setActive(index)}
                                viewport={{ margin: '-45% 0px -45% 0px' }}
                                className="flex flex-col justify-center py-6 lg:min-h-[62vh] lg:py-0"
                            >
                                <div className={cn('transition-opacity duration-300', active === index ? 'lg:opacity-100' : 'lg:opacity-35')}>
                                    <p className="font-mono text-sm text-primary">{index + 1} / {steps.length}</p>
                                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">{step.title}</h3>
                                    <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{step.body}</p>
                                </div>
                                <WindowFrame className="mt-6 lg:hidden">
                                    <img src={step.image} alt={step.alt} width={1440} height={900} loading="lazy" className="block w-full" />
                                </WindowFrame>
                            </motion.li>
                        ))}
                    </ol>

                    <div className="hidden lg:block">
                        <div className="sticky top-0 flex h-screen items-center">
                            <WindowFrame className="w-full">
                                <div className="relative aspect-[1440/900]">
                                    <AnimatePresence initial={false}>
                                        <motion.img
                                            key={steps[active].image}
                                            src={steps[active].image}
                                            alt={steps[active].alt}
                                            width={1440}
                                            height={900}
                                            initial={{ opacity: 0, scale: 1.02 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.45 }}
                                            className="absolute inset-0 size-full object-cover object-left-top"
                                        />
                                    </AnimatePresence>
                                </div>
                            </WindowFrame>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
