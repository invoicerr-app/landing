// The one table both halves of the waiting list read: the page (which renders the language switcher
// and the hreflang set) and the Worker (which resolves which language to serve). Keeping it in a
// single module is what stops the two from drifting apart; the Worker imports it by relative path
// because wrangler does not know the `@/` alias.
//
// There is deliberately no i18n framework here. The landing has none, the five country guides are
// each written straight into their own language, and this follows the same rule: the copy lives in
// src/waitlist/copy.ts, one object per language, written rather than translated.

export const LANGUAGES = ['en', 'fr', 'de', 'it', 'pl', 'pt'] as const

export type Language = (typeof LANGUAGES)[number]

export const DEFAULT_LANGUAGE: Language = 'en'

export const SITE = 'https://invoicerr.app'

/**
 * The guides written in a language other than English, and the language each one implies. A reader
 * who clicked the call to action at the foot of a guide is reading that language, so that is the
 * version they get. The English guides are absent on purpose: English is what the Worker falls
 * back to anyway, and a reader of an English guide may well prefer their own language.
 *
 * Keyed by pathname without a trailing slash; matchGuideLanguage() normalises before looking up.
 */
export const GUIDE_LANGUAGES: Record<string, Language> = {
    '/facturation-electronique': 'fr',
    '/facturation-electronique/plateforme-agreee': 'fr',
    '/e-rechnung': 'de',
    '/e-rechnung/xrechnung': 'de',
    '/fatturazione-elettronica': 'it',
    '/ksef': 'pl',
    '/faturacao-eletronica': 'pt',
}

/** Where each version lives on invoicerr.app. English is also the x-default. */
export function pagePath(language: Language): string {
    return language === DEFAULT_LANGUAGE ? '/waitlist/' : `/waitlist/${language}/`
}

/** The canonical URL of one version. */
export function pageUrl(language: Language): string {
    return `${SITE}${pagePath(language)}`
}

export function isLanguage(value: unknown): value is Language {
    return typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)
}

/**
 * Step 1 of the resolution order: the Referer, when it is one of the guides above.
 *
 * The host is not checked. The guide paths are specific enough that a match means a guide, and
 * ignoring the host is what lets the rule be exercised against a local build without faking a
 * production hostname.
 */
export function matchGuideLanguage(referer: string | null | undefined): Language | null {
    if (!referer) return null
    let pathname: string
    try {
        pathname = new URL(referer).pathname
    } catch {
        // A Referer that is not a URL tells us nothing; fall through to the next step.
        return null
    }
    const normalised = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
    return GUIDE_LANGUAGES[normalised] ?? null
}

/**
 * Step 2: Accept-Language, matched against the six by base subtag, highest q first. `pt-BR` matches
 * `pt`, `de-AT` matches `de`. A q of 0 means "not this one" and is skipped, as the header defines it.
 */
export function matchAcceptLanguage(header: string | null | undefined): Language | null {
    if (!header) return null
    const entries = header
        .split(',')
        .map((part) => {
            const [tag, ...params] = part.trim().split(';')
            const quality = params.map((param) => param.trim()).find((param) => param.startsWith('q='))
            const q = quality ? Number.parseFloat(quality.slice(2)) : 1
            return { tag: tag.trim().toLowerCase(), q: Number.isFinite(q) ? q : 0 }
        })
        .filter((entry) => entry.tag.length > 0 && entry.q > 0)
        .sort((a, b) => b.q - a.q)

    for (const entry of entries) {
        const base = entry.tag.split('-')[0]
        if (isLanguage(base)) return base
    }
    return null
}

export interface ResolutionInput {
    /** The `?lang=` query parameter, which overrides everything when it names a known language. */
    lang?: string | null
    referer?: string | null
    acceptLanguage?: string | null
}

export interface Resolution {
    language: Language
    /** Which rule answered. Returned as a response header so the rule can be checked from outside. */
    by: 'query' | 'referer' | 'accept-language' | 'default'
}

/** Referer, then Accept-Language, then English, with `?lang=` overriding both. */
export function resolveLanguage(input: ResolutionInput): Resolution {
    if (isLanguage(input.lang)) return { language: input.lang, by: 'query' }

    const fromGuide = matchGuideLanguage(input.referer)
    if (fromGuide) return { language: fromGuide, by: 'referer' }

    const fromHeader = matchAcceptLanguage(input.acceptLanguage)
    if (fromHeader) return { language: fromHeader, by: 'accept-language' }

    return { language: DEFAULT_LANGUAGE, by: 'default' }
}

/** The values the form accepts. The Worker rejects anything else. */
export const COUNTRY_VALUES = ['FR', 'DE', 'IT', 'PL', 'PT', 'OTHER'] as const
export type CountryValue = (typeof COUNTRY_VALUES)[number]

export const COMPANY_SIZE_VALUES = ['SOLO', '2_5', '6_20', '20_PLUS'] as const
export type CompanySizeValue = (typeof COMPANY_SIZE_VALUES)[number]
