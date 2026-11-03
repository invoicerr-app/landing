/**
 * GET /api/price: what the cloud's euro prices come to in the visitor's own currency, as an
 * indication. The page still bills in euros; this only lets a visitor in Shanghai read "≈ ¥118"
 * next to "€15".
 *
 * The country is the one Cloudflare already resolved for the request (`request.cf.country`), so
 * nothing is looked up and nothing is stored about the visitor. The rate comes from one of two
 * sources:
 *
 *   - Stripe, once a secret key is set (STRIPE_SECRET_KEY). The FX Quotes API returns Stripe's own
 *     rate for a currency pair, the rate including its conversion fee, which is what a customer
 *     paying in that currency would be charged. `lock_duration=none` asks for the current rate
 *     without locking it, which Stripe does not charge for. The API is in preview, hence the
 *     preview version header.
 *     https://docs.stripe.com/payments/currencies/localize-prices/fx-quotes-api
 *   - Otherwise the European Central Bank's reference rates, published once a working day.
 *     https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html
 *
 * Either way the rate is cached at the edge for six hours per currency, so a busy page costs one
 * call to the source per currency and per data centre, four times a day.
 */

export interface PriceEnv {
    STRIPE_SECRET_KEY?: string
}

/** Euro is the billing currency: everything is converted from it. */
const BASE = 'EUR'

const STRIPE_FX_QUOTES = 'https://api.stripe.com/v1/fx_quotes'
const STRIPE_PREVIEW_VERSION = '2025-07-30.preview'
const ECB_DAILY = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'
const CACHE_SECONDS = 6 * 3600

/**
 * The currency each country pays in, for the countries where it is not the euro and where at least
 * one of the two sources quotes it. Countries left out (and every euro country, Bulgaria included
 * since 1 January 2026) read the euro prices as they are.
 */
const CURRENCY_BY_COUNTRY: Record<string, string> = {
    AE: 'AED',
    AU: 'AUD',
    BR: 'BRL',
    CA: 'CAD',
    CH: 'CHF',
    CN: 'CNY',
    CZ: 'CZK',
    DK: 'DKK',
    GB: 'GBP',
    HK: 'HKD',
    HU: 'HUF',
    ID: 'IDR',
    IL: 'ILS',
    IN: 'INR',
    IS: 'ISK',
    JP: 'JPY',
    KR: 'KRW',
    LI: 'CHF',
    MX: 'MXN',
    MY: 'MYR',
    NO: 'NOK',
    NZ: 'NZD',
    PH: 'PHP',
    PL: 'PLN',
    RO: 'RON',
    SA: 'SAR',
    SE: 'SEK',
    SG: 'SGD',
    TH: 'THB',
    TR: 'TRY',
    US: 'USD',
    ZA: 'ZAR',
}

export interface PriceContext {
    country: string | null
    /** ISO 4217 code of the visitor's currency; EUR when there is nothing to convert. */
    currency: string
    /** Units of `currency` for one euro. 1 when `currency` is EUR. */
    rate: number
    source: 'stripe' | 'ecb' | null
    /** When the source published or quoted the rate, ISO 8601. */
    asOf: string | null
}

interface Rate {
    rate: number
    source: 'stripe' | 'ecb'
    asOf: string
}

export async function priceContext(request: Request, env: PriceEnv, ctx: ExecutionContext): Promise<PriceContext> {
    const country = (request as Request & { cf?: { country?: string } }).cf?.country ?? null
    const currency = (country && CURRENCY_BY_COUNTRY[country]) || BASE
    const none: PriceContext = { country, currency: BASE, rate: 1, source: null, asOf: null }
    if (currency === BASE) return none
    const found = await cachedRate(currency, env, ctx)
    return found ? { country, currency, ...found } : none
}

async function cachedRate(currency: string, env: PriceEnv, ctx: ExecutionContext): Promise<Rate | null> {
    const source = env.STRIPE_SECRET_KEY ? 'stripe' : 'ecb'
    // A synthetic URL: the key of this rate in the edge cache, never fetched.
    const key = new Request(`https://rates.invoicerr.internal/${source}/${BASE}/${currency}`)
    const cache = caches.default
    const hit = await cache.match(key)
    if (hit) return hit.json<Rate>()

    let found: Rate | null = null
    try {
        found = source === 'stripe' ? await stripeRate(currency, env.STRIPE_SECRET_KEY!) : await ecbRate(currency)
    } catch (error) {
        console.error('price: rate lookup failed', source, currency, error)
    }
    // A Stripe failure falls back to the bank's rate rather than to nothing.
    if (!found && source === 'stripe') found = await ecbRate(currency).catch(() => null)
    if (found) {
        ctx.waitUntil(cache.put(key, new Response(JSON.stringify(found), { headers: { 'cache-control': `max-age=${CACHE_SECONDS}` } })))
    }
    return found
}

/**
 * Stripe quotes how many euros (the settlement currency, `to_currency`) one unit of the visitor's
 * currency (`from_currencies`) brings: for CNY, about 0.12. One euro is therefore 1 / that rate.
 * `exchange_rate` includes Stripe's conversion fee, so the figure shown is the one a customer paying
 * in that currency would see.
 */
async function stripeRate(currency: string, key: string): Promise<Rate | null> {
    const body = new URLSearchParams({ to_currency: BASE.toLowerCase(), 'from_currencies[]': currency.toLowerCase(), lock_duration: 'none' })
    const response = await fetch(STRIPE_FX_QUOTES, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${key}`,
            'content-type': 'application/x-www-form-urlencoded',
            'stripe-version': STRIPE_PREVIEW_VERSION,
        },
        body,
    })
    if (!response.ok) {
        console.error('price: Stripe answered', response.status, await response.text())
        return null
    }
    const quote = await response.json<{ created: number; rates: Record<string, { exchange_rate: number }> }>()
    const perUnit = quote.rates?.[currency.toLowerCase()]?.exchange_rate
    if (!perUnit || !Number.isFinite(perUnit)) return null
    return { rate: 1 / perUnit, source: 'stripe', asOf: new Date(quote.created * 1000).toISOString() }
}

/** The bank publishes, for one euro, how many units of each currency: `<Cube currency='CNY' rate='8.2'/>`. */
async function ecbRate(currency: string): Promise<Rate | null> {
    const response = await fetch(ECB_DAILY, { cf: { cacheTtl: CACHE_SECONDS, cacheEverything: true } })
    if (!response.ok) return null
    return parseEcb(await response.text(), currency)
}

export function parseEcb(xml: string, currency: string): Rate | null {
    const day = /time=['"](\d{4}-\d{2}-\d{2})['"]/.exec(xml)?.[1]
    const match = new RegExp(`currency=['"]${currency}['"]\\s+rate=['"]([\\d.]+)['"]`).exec(xml)
    const rate = match ? Number(match[1]) : NaN
    if (!day || !Number.isFinite(rate) || rate <= 0) return null
    return { rate, source: 'ecb', asOf: `${day}T16:00:00+01:00` }
}
