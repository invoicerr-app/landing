import { useEffect, useState } from 'react'

import { WORKER_ORIGIN } from '@/waitlist/endpoint'

/**
 * The visitor's currency and today's rate from the euro, for the indicative conversion under the
 * cloud's prices. The Worker (worker/price.ts) reads the country Cloudflare resolved for the
 * request and returns Stripe's rate when a key is set, the European Central Bank's otherwise.
 *
 * Fetched once per browser session, after hydration, so the prerendered page and a reader without
 * JavaScript get the euro prices alone. Any failure means no conversion, never a wrong one.
 */
export interface LocalPrice {
    currency: string
    /** Units of `currency` for one euro. */
    rate: number
    source: 'stripe' | 'ecb'
    asOf: string
}

const KEY = 'invoicerr:local-price'

function read(): LocalPrice | null | undefined {
    try {
        const stored = sessionStorage.getItem(KEY)
        return stored === null ? undefined : (JSON.parse(stored) as LocalPrice | null)
    } catch {
        return undefined
    }
}

function valid(payload: unknown): payload is LocalPrice {
    const value = payload as Partial<LocalPrice> | null
    return (
        typeof value?.currency === 'string' &&
        value.currency !== 'EUR' &&
        typeof value.rate === 'number' &&
        Number.isFinite(value.rate) &&
        value.rate > 0 &&
        (value.source === 'stripe' || value.source === 'ecb')
    )
}

export function useLocalPrice(): LocalPrice | null {
    const [price, setPrice] = useState<LocalPrice | null>(null)
    useEffect(() => {
        const cached = read()
        if (cached !== undefined) {
            setPrice(cached)
            return
        }
        const controller = new AbortController()
        fetch(`${WORKER_ORIGIN}/api/price`, { signal: controller.signal })
            .then((response) => (response.ok ? response.json() : null))
            .then((payload: unknown) => {
                const found = valid(payload) ? payload : null
                setPrice(found)
                try {
                    sessionStorage.setItem(KEY, JSON.stringify(found))
                } catch {
                    /* private mode: fetched again next time */
                }
            })
            .catch(() => undefined)
        return () => controller.abort()
    }, [])
    return price
}

/** An indicative amount, rounded to whole units: "≈ ¥118" reads as an estimate, "¥117.94" would not. */
export function formatLocal(euros: number, price: LocalPrice, locale: string) {
    const value = euros * price.rate
    try {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: price.currency, maximumFractionDigits: 0, minimumFractionDigits: 0 }).format(value)
    } catch {
        return `${Math.round(value)} ${price.currency}`
    }
}
