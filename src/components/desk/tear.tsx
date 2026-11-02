import { Scissors } from 'lucide-react'

// The dashed "cut here" line between two sections of the home page.
export function Tear() {
    return (
        <div aria-hidden="true" className="mx-auto max-w-6xl px-5">
            <div className="relative border-t-2 border-dashed border-border">
                <Scissors className="absolute -top-3 left-6 size-6 bg-background px-1.5 text-muted-foreground" strokeWidth={1.8} />
            </div>
        </div>
    )
}

/** The numbered label over each section heading: "01 Countries". */
export function Eyebrow({ number, children, onDesk = false }: { number: string; children: React.ReactNode; onDesk?: boolean }) {
    return (
        <p className={onDesk ? 'flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.08em] text-azure-pale' : 'flex items-center gap-2.5 font-mono text-[13px] uppercase tracking-[0.08em] text-[oklch(0.45_0.11_230)] dark:text-primary'}>
            <span className={onDesk ? 'rounded-md bg-white/15 px-[7px] py-[5px] font-bold text-white' : 'rounded-md bg-accent px-[7px] py-[5px] font-bold text-accent-foreground'}>
                {number}
            </span>
            {children}
        </p>
    )
}
