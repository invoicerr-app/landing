/**
 * my.invoicerr.app.
 *
 * Thirteen call to action buttons point at this hostname: eight on the landing page and one at the
 * foot of each of the five country guides. Until now it answered 301 to the landing root, so every
 * reader those buttons sent here landed back where they started and nothing recorded that they came.
 * The hosted version does not open before 1 November 2026, so what this serves instead is the
 * waiting list page, in the reader's own language, and it takes the form's POST. GitHub Pages
 * serves static files only, which is why the POST cannot live on invoicerr.app.
 *
 * The pages themselves are the ones the landing build prerenders into dist/waitlist/<lang>/. They
 * are uploaded with the Worker as static assets, so the Worker serves exactly the markup GitHub
 * Pages serves, out of the same build, and the hashed JS and CSS under /assets/ are there for it to
 * hydrate with.
 *
 * Nothing here ever returns the list, a count, or a stored address.
 */
import {
    COMPANY_SIZE_VALUES,
    COUNTRY_VALUES,
    DEFAULT_LANGUAGE,
    LANGUAGES,
    pagePath,
    resolveLanguage,
    type CompanySizeValue,
    type CountryValue,
    type Language,
} from '../src/waitlist/languages'

export interface Env {
    /** The landing's own dist/, uploaded alongside this Worker. */
    ASSETS: Fetcher
    /** One key per address: `entry:<lowercased e-mail>`, plus the rate counters: `rate:<window>:<ip>`. */
    WAITLIST: KVNamespace
    /** POSTs one address may spend per window. See takeRateLimitSlot() for how the number was picked. */
    WAITLIST_RATE_LIMIT: string | number
    WAITLIST_RATE_WINDOW_SECONDS: string | number
    /** A Worker secret, not a var. Absent means the mail is skipped and the miss is logged. */
    RESEND_API_KEY?: string
    WAITLIST_MAIL_TO: string
    WAITLIST_MAIL_FROM: string
    /** Overridable so a local run can point the mail at a stub instead of at Resend. */
    WAITLIST_MAIL_ENDPOINT: string
}

/**
 * Origins allowed to post the form.
 *
 * The page is served from two places out of one build: by this Worker at my.invoicerr.app, where
 * the post is same-origin, and by GitHub Pages at invoicerr.app, where it is not. The second case is
 * the reason this list exists. A request whose Origin is the Worker's own origin is allowed too,
 * which covers `wrangler dev` on localhost without naming a port here.
 */
const CORS_ORIGINS = new Set(['https://invoicerr.app', 'https://www.invoicerr.app', 'https://my.invoicerr.app'])

/** Anything larger than this is not a three field form. */
const MAX_BODY_BYTES = 4096

/** Same expression the page validates with, so a field that passes there passes here. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Extensions the build emits. Everything else on this host is a path that does not belong to it. */
const ASSET_EXTENSIONS = new Set([
    'js',
    'css',
    'map',
    'svg',
    'png',
    'jpg',
    'jpeg',
    'webp',
    'avif',
    'ico',
    'woff',
    'woff2',
    'ttf',
    'json',
    'txt',
    'xml',
])

/**
 * Everything that is kept about a person, and there is nothing else anywhere.
 *
 * Four fields, which is what the privacy policy declares. The page language and the page the reader
 * came from were stored until the policy was written against this file and the two did not match:
 * resolving a language to serve is one thing, keeping a record of what somebody read is another,
 * and the second was never asked for. They are not collected any more, by the Worker or by the page.
 *
 * `createdAt` is not bookkeeping. The declared legal basis is consent (GDPR Art. 6(1)(a)), and
 * Art. 7(1) requires being able to demonstrate that consent was given. This timestamp is that
 * evidence, and it is the only reason a date is kept at all.
 */
interface Entry {
    email: string
    country: CountryValue
    companySize: CompanySizeValue
    /** Proof of consent: when it was given. Never rewritten, see the submit handler. */
    createdAt: string
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url)

        if (url.pathname === '/api/waitlist') {
            if (request.method === 'OPTIONS') return preflight(request)
            if (request.method !== 'POST') {
                return json({ ok: false, error: 'method_not_allowed' }, 405, corsHeaders(request))
            }
            return submit(request, env)
        }

        if (request.method !== 'GET' && request.method !== 'HEAD') {
            return new Response('Method not allowed', { status: 405 })
        }

        if (url.pathname === '/robots.txt') {
            // This host serves one page. Its canonical is on invoicerr.app (the prerendered markup
            // says so), and the sitemap lives there too, so there is none to point at from here.
            return new Response('User-agent: *\nAllow: /\n', {
                headers: { 'content-type': 'text/plain; charset=utf-8' },
            })
        }

        if (url.pathname === '/') return resolveAndRedirect(request, url)

        if (WAITLIST_PATHS.has(withTrailingSlash(url.pathname))) return servePage(request, env, url)

        const extension = url.pathname.split('/').pop()?.split('.').slice(1).pop()
        if (extension && ASSET_EXTENSIONS.has(extension)) {
            return env.ASSETS.fetch(new Request(new URL(url.pathname, url.origin), { method: 'GET' }))
        }

        // Every other path on this host is a leftover deep link into the app that does not exist
        // yet. It goes where it went before this Worker existed.
        return Response.redirect('https://invoicerr.app/', 302)
    },
} satisfies ExportedHandler<Env>

/**
 * The root of this host: Referer, then Accept-Language, then English, with `?lang=` overriding both.
 *
 * It answers a redirect rather than the markup itself. The page is a route of a client-side router,
 * and that router resolves the URL in the address bar: markup for /waitlist/fr/ served under "/"
 * would hydrate, find that "/" is the landing home page, and replace the waiting list with it. The
 * redirect also leaves the reader on a URL that names the language they were given, which is the
 * part of "never serve a language silently" that no wording on the page can do.
 */
function resolveAndRedirect(request: Request, url: URL): Response {
    const { language, by } = resolveLanguage({
        lang: url.searchParams.get('lang'),
        referer: request.headers.get('referer'),
        acceptLanguage: request.headers.get('accept-language'),
    })

    return new Response(null, {
        status: 302,
        headers: {
            location: pagePath(language),
            // The answer depends on both headers, so no shared cache may hand one reader's version
            // to the next, and none may keep the `?lang=` override at all.
            vary: 'Accept-Language, Referer',
            'cache-control': 'no-store',
            // Readable from outside, which is how the rule is checked without following anything.
            'x-waitlist-language': language,
            'x-waitlist-resolved-by': by,
        },
    })
}

/** The six prerendered pages, served from the landing build this Worker was deployed with. */
async function servePage(request: Request, env: Env, url: URL): Promise<Response> {
    const language = pageLanguage(withTrailingSlash(url.pathname))
    const page = await env.ASSETS.fetch(new Request(new URL(pagePath(language), url.origin), { method: 'GET' }))
    const headers = new Headers(page.headers)
    headers.set('content-language', language)
    headers.set('x-waitlist-language', language)
    return new Response(request.method === 'HEAD' ? null : page.body, { status: page.status, headers })
}

function withTrailingSlash(pathname: string): string {
    return pathname.endsWith('/') ? pathname : `${pathname}/`
}

const WAITLIST_PATHS = new Map(LANGUAGES.map((language) => [pagePath(language), language]))

function pageLanguage(pathname: string): Language {
    return WAITLIST_PATHS.get(pathname) ?? DEFAULT_LANGUAGE
}

/**
 * Per IP rate limit on the POST, counted in KV.
 *
 * What an abusive POST really costs is one KV write and one mail through Resend, and the mail is
 * the expensive half: it lands in a human inbox and it eats a sending quota that the application
 * itself depends on. So the limit is checked before the body is read, and a refused request writes
 * nothing and sends nothing.
 *
 * Counted per fixed window rather than per rolling one: the window is part of the key, so the
 * counter releases by expiring rather than by being cleaned up, and its whole state can be read
 * back with `wrangler kv key get`, which is what makes it provable. The price of a fixed window is
 * that a caller straddling the boundary can spend two windows' worth inside one window's length.
 *
 * Every POST that gets this far spends one slot, including one that is about to be refused as
 * malformed: a bad body still costs a request, and counting only the valid ones would let a flood
 * of junk through for free.
 */
interface RateDecision {
    allowed: boolean
    client: string
    count: number
    retryAfter: number
}

async function takeRateLimitSlot(request: Request, env: Env): Promise<RateDecision> {
    const limit = Number(env.WAITLIST_RATE_LIMIT)
    const window = Number(env.WAITLIST_RATE_WINDOW_SECONDS)
    // A misconfigured var must not silently turn the limit off.
    if (!Number.isFinite(limit) || limit < 1 || !Number.isFinite(window) || window < 1) {
        throw new Error(`waitlist: WAITLIST_RATE_LIMIT / WAITLIST_RATE_WINDOW_SECONDS are not usable (${env.WAITLIST_RATE_LIMIT} / ${env.WAITLIST_RATE_WINDOW_SECONDS})`)
    }

    const client = clientAddress(request)
    const seconds = Math.floor(Date.now() / 1000)
    const windowStart = Math.floor(seconds / window) * window
    const key = `rate:${windowStart}:${client}`

    const stored = await env.WAITLIST.get(key)
    const count = stored ? Number.parseInt(stored, 10) || 0 : 0
    const retryAfter = windowStart + window - seconds

    // At the limit: refuse without writing. The counter is already where it needs to be, and a
    // write per refused request is exactly the cost this is here to avoid.
    if (count >= limit) return { allowed: false, client, count, retryAfter }

    // KV's shortest expiry is 60 seconds. The window is what decides correctness, not the expiry:
    // the next window has a different key, so an entry outliving its window is only tidying.
    await env.WAITLIST.put(key, String(count + 1), { expirationTtl: Math.max(60, window + 60) })
    return { allowed: true, client, count: count + 1, retryAfter }
}

/**
 * Cloudflare sets CF-Connecting-IP on every request it proxies and a client cannot forge it: it is
 * overwritten at the edge. The other two are only read so that a local run has something to key on,
 * and they are the reason this must never be the only thing between a bot and the mail.
 */
function clientAddress(request: Request): string {
    const direct = request.headers.get('cf-connecting-ip')
    if (direct) return direct
    const forwarded = request.headers.get('x-forwarded-for')
    if (forwarded) return forwarded.split(',')[0].trim()
    return 'unknown'
}

async function submit(request: Request, env: Env): Promise<Response> {
    const cors = corsHeaders(request)

    // A browser always sends Origin on a POST. One that is not on the list would have its answer
    // thrown away by the browser anyway; refusing it here means the entry is not written first.
    const origin = request.headers.get('origin')
    if (origin && !cors['access-control-allow-origin']) {
        return json({ ok: false, error: 'origin_not_allowed' }, 403, {})
    }

    // Before the body is even read, because what this protects is the two expensive things further
    // down and the cheapest possible refusal is one that has parsed nothing.
    const rate = await takeRateLimitSlot(request, env)
    if (!rate.allowed) {
        console.warn(`waitlist: rate limit reached for ${rate.client}, ${rate.count} in the current window`)
        return json({ ok: false, error: 'rate_limited' }, 429, { ...cors, 'retry-after': String(rate.retryAfter) })
    }

    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false, error: 'too_large' }, 413, cors)

    let body: Record<string, unknown>
    try {
        const parsed: unknown = JSON.parse(raw)
        if (typeof parsed !== 'object' || parsed === null) throw new Error('not an object')
        body = parsed as Record<string, unknown>
    } catch {
        return json({ ok: false, error: 'bad_json' }, 400, cors)
    }

    // A field no human ever sees. Answer a bot the way a success looks, and store nothing.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
        console.warn('waitlist: honeypot filled, submission dropped')
        return json({ ok: true }, 200, cors)
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    if (email.length < 3 || email.length > 254 || !EMAIL.test(email)) {
        return json({ ok: false, field: 'email' }, 400, cors)
    }

    const country = typeof body.country === 'string' ? body.country : ''
    if (!(COUNTRY_VALUES as readonly string[]).includes(country)) {
        return json({ ok: false, field: 'country' }, 400, cors)
    }

    const companySize = typeof body.companySize === 'string' ? body.companySize : ''
    if (!(COMPANY_SIZE_VALUES as readonly string[]).includes(companySize)) {
        return json({ ok: false, field: 'companySize' }, 400, cors)
    }

    const key = `entry:${email}`

    // Store first. One key per address, so a second submit updates the answers rather than adding a
    // second row.
    //
    // `createdAt` survives that update untouched. It records when this person gave their consent,
    // and the first time they gave it is the date that is certainly true: stamping the row with the
    // later submission would leave the record claiming consent began after it actually did, which
    // is the one direction that cannot be defended if it is ever asked for. A second submission
    // corrects an answer; it does not start the consent over.
    const existing = await env.WAITLIST.get<Entry>(key, 'json').catch(() => null)
    const entry: Entry = {
        email,
        country: country as CountryValue,
        companySize: companySize as CompanySizeValue,
        createdAt: existing?.createdAt ?? new Date().toISOString(),
    }
    await env.WAITLIST.put(key, JSON.stringify(entry))

    // Mail second, and never at the expense of the entry: the address is already safe, so a Resend
    // outage is a line in the log rather than an error shown to somebody who did their part.
    await sendMail(env, entry).catch((error: unknown) => {
        console.error(`waitlist: mail failed for ${entry.email}:`, error)
    })

    return json({ ok: true }, 200, cors)
}

async function sendMail(env: Env, entry: Entry): Promise<void> {
    if (!env.RESEND_API_KEY) {
        console.error(`waitlist: RESEND_API_KEY is not set, no mail sent for ${entry.email}`)
        return
    }

    // The same four fields that are in KV, and no others: a mail that carried more would be a
    // second copy of data the privacy policy does not declare.
    const lines = [
        `E-mail: ${entry.email}`,
        `Country: ${entry.country}`,
        `Company size: ${entry.companySize}`,
        `Consent given: ${entry.createdAt}`,
    ]

    const response = await fetch(env.WAITLIST_MAIL_ENDPOINT, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${env.RESEND_API_KEY}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            from: env.WAITLIST_MAIL_FROM,
            to: [env.WAITLIST_MAIL_TO],
            subject: `Waiting list: ${entry.email} (${entry.country}, ${entry.companySize})`,
            text: `${lines.join('\n')}\n`,
        }),
    })

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: ${(await response.text()).slice(0, 500)}`)
    }
}

function corsHeaders(request: Request): Record<string, string> {
    const origin = request.headers.get('origin')
    if (!origin) return {}
    const allowed = CORS_ORIGINS.has(origin) || origin === new URL(request.url).origin
    if (!allowed) return {}
    return {
        'access-control-allow-origin': origin,
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type',
        'access-control-max-age': '86400',
        vary: 'Origin',
    }
}

function preflight(request: Request): Response {
    const cors = corsHeaders(request)
    // No allow-origin header means the origin is not on the list, and the browser blocks the POST.
    return new Response(null, { status: cors['access-control-allow-origin'] ? 204 : 403, headers: cors })
}

function json(payload: unknown, status: number, cors: Record<string, string>): Response {
    return new Response(JSON.stringify(payload), {
        status,
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...cors },
    })
}
