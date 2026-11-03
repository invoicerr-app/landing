// The languages the home page is written in. English lives at "/", every other one at "/<code>/".
//
// The country guides and the waiting list keep their own language sets (src/content/pages.ts and
// src/waitlist/languages.ts): a guide is written once, in its country's language, and the waiting
// list covers the six languages its mail and its privacy terms are written in.

export const HOME_LANGUAGES = ['en', 'fr', 'de', 'es', 'it', 'pt', 'nl', 'pl', 'ru', 'tr', 'ar', 'hi', 'zh', 'ja', 'ko'] as const

export type HomeLanguage = (typeof HOME_LANGUAGES)[number]

export const DEFAULT_HOME_LANGUAGE: HomeLanguage = 'en'

interface LanguageInfo {
    /** The language's own name for itself, as the switcher lists it. */
    name: string
    /** BCP 47 tag for <html lang>, hreflang and Intl. */
    tag: string
    /** The locale numbers and dates are formatted in. */
    locale: string
    /** Open Graph's language_TERRITORY form. */
    ogLocale: string
    dir: 'ltr' | 'rtl'
}

export const LANGUAGE_INFO: Record<HomeLanguage, LanguageInfo> = {
    en: { name: 'English', tag: 'en', locale: 'en-GB', ogLocale: 'en_US', dir: 'ltr' },
    fr: { name: 'Français', tag: 'fr', locale: 'fr-FR', ogLocale: 'fr_FR', dir: 'ltr' },
    de: { name: 'Deutsch', tag: 'de', locale: 'de-DE', ogLocale: 'de_DE', dir: 'ltr' },
    es: { name: 'Español', tag: 'es', locale: 'es-ES', ogLocale: 'es_ES', dir: 'ltr' },
    it: { name: 'Italiano', tag: 'it', locale: 'it-IT', ogLocale: 'it_IT', dir: 'ltr' },
    pt: { name: 'Português', tag: 'pt-PT', locale: 'pt-PT', ogLocale: 'pt_PT', dir: 'ltr' },
    nl: { name: 'Nederlands', tag: 'nl', locale: 'nl-NL', ogLocale: 'nl_NL', dir: 'ltr' },
    pl: { name: 'Polski', tag: 'pl', locale: 'pl-PL', ogLocale: 'pl_PL', dir: 'ltr' },
    ru: { name: 'Русский', tag: 'ru', locale: 'ru-RU', ogLocale: 'ru_RU', dir: 'ltr' },
    tr: { name: 'Türkçe', tag: 'tr', locale: 'tr-TR', ogLocale: 'tr_TR', dir: 'ltr' },
    // Western digits, as on most Arabic-language software and as the monospaced figures are drawn.
    ar: { name: 'العربية', tag: 'ar', locale: 'ar-u-nu-latn', ogLocale: 'ar_AR', dir: 'rtl' },
    hi: { name: 'हिन्दी', tag: 'hi', locale: 'hi-IN', ogLocale: 'hi_IN', dir: 'ltr' },
    zh: { name: '简体中文', tag: 'zh-Hans', locale: 'zh-CN', ogLocale: 'zh_CN', dir: 'ltr' },
    ja: { name: '日本語', tag: 'ja', locale: 'ja-JP', ogLocale: 'ja_JP', dir: 'ltr' },
    ko: { name: '한국어', tag: 'ko', locale: 'ko-KR', ogLocale: 'ko_KR', dir: 'ltr' },
}

export const SITE = 'https://invoicerr.app'

export function homePath(language: HomeLanguage): string {
    return language === DEFAULT_HOME_LANGUAGE ? '/' : `/${language}/`
}

export function homeUrl(language: HomeLanguage): string {
    return `${SITE}${homePath(language)}`
}

export function isHomeLanguage(value: unknown): value is HomeLanguage {
    return typeof value === 'string' && (HOME_LANGUAGES as readonly string[]).includes(value)
}

/** The first of the reader's preferred languages the home page is written in, if any. */
export function preferredHomeLanguage(preferences: readonly string[]): HomeLanguage | null {
    for (const preference of preferences) {
        const base = preference.toLowerCase().split('-')[0]
        if (isHomeLanguage(base)) return base
    }
    return null
}
