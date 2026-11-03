import { Scissors } from 'lucide-react'

// The dashed "cut here" line between two sections of the home page.
export function Tear() {
    return (
        <div aria-hidden="true" className="mx-auto max-w-6xl px-5">
            <div className="relative border-t-2 border-dashed border-border">
                <Scissors className="absolute -top-3 start-6 size-6 bg-background px-1.5 text-muted-foreground" strokeWidth={1.8} />
            </div>
        </div>
    )
}

/** The numbered label over each section heading: "01 Countries". */
export function Eyebrow({ number, children, onDesk = false }: { number: string; children: React.ReactNode; onDesk?: boolean }) {
    return (
        <p className={onDesk ? 'flex items-center gap-2.5 font-mono text-[13px] text-azure-pale' : 'flex items-center gap-2.5 font-mono text-[13px] text-[oklch(0.45_0.11_230)] dark:text-primary'}>
            <span className={onDesk ? 'rounded-md bg-white/15 px-2 py-1 text-white' : 'rounded-md bg-accent px-2 py-1 text-accent-foreground'}>
                {number}
            </span>
            {children}
        </p>
    )
}
