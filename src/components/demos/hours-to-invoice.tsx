import { Check, FileText } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

// Sample data, shaped like the app's own "Generate invoice" dialog: description, hours, total.
const entries = [
    { description: 'Checkout redesign', hours: 12.5, rate: 80 },
    { description: 'API integration', hours: 8, rate: 80 },
    { description: 'Review and handover', hours: 3.5, rate: 80 },
]

const money = (value: number) => value.toLocaleString('en-US', { minimumFractionDigits: 2 })

export function HoursToInvoice() {
    const [invoiced, setInvoiced] = useState(false)
    const total = entries.reduce((sum, entry) => sum + entry.hours * entry.rate, 0)

    return (
        <div className="rounded-xl border border-border bg-background p-4 text-sm">
            <div className="flex items-center justify-between gap-3">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.p
                        key={invoiced ? 'invoice' : 'time'}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 font-medium"
                    >
                        {invoiced ? (
                            <>
                                <FileText className="size-4 text-primary" />
                                Draft invoice
                                <span className="rounded-full bg-info px-2 py-0.5 text-xs text-info-foreground">3 lines</span>
                            </>
                        ) : (
                            'Unbilled time, this month'
                        )}
                    </motion.p>
                </AnimatePresence>
                <Button size="sm" variant={invoiced ? 'outline' : 'default'} onClick={() => setInvoiced((current) => !current)} className="active:scale-[0.98]">
                    {invoiced ? 'Reset' : 'Generate invoice'}
                </Button>
            </div>

            <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-2.5">
                <span className="text-xs text-muted-foreground">Description</span>
                <span className="text-right text-xs text-muted-foreground">Hours</span>
                <span className="text-right text-xs text-muted-foreground">Total</span>
                {entries.map((entry, index) => (
                    <motion.div
                        key={entry.description}
                        layout
                        animate={{ x: invoiced ? [0, 6, 0] : 0 }}
                        transition={{ duration: 0.4, delay: index * 0.07 }}
                        className="col-span-3 grid grid-cols-subgrid items-center border-t border-border pt-2.5"
                    >
                        <span className="flex items-center">
                            <motion.span
                                initial={false}
                                animate={{ width: invoiced ? 24 : 0, opacity: invoiced ? 1 : 0 }}
                                transition={{ delay: index * 0.07 }}
                                className="inline-flex overflow-hidden text-success-foreground"
                            >
                                <Check className="size-4 shrink-0" />
                            </motion.span>
                            {entry.description}
                        </span>
                        <span className="text-right font-mono text-muted-foreground">{entry.hours.toFixed(1)}</span>
                        <span className="text-right font-mono">{money(entry.hours * entry.rate)}</span>
                    </motion.div>
                ))}
                <div className="col-span-3 grid grid-cols-subgrid border-t border-border pt-2.5 font-medium">
                    <span>{invoiced ? 'Invoice total, excl. VAT' : 'Billable'}</span>
                    <span className="text-right font-mono text-muted-foreground">24.0</span>
                    <span className="text-right font-mono">{money(total)} EUR</span>
                </div>
            </div>
        </div>
    )
}
