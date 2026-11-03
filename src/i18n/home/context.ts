import { createContext, useContext } from 'react'

import { type HomeCopy, en } from './en'
import { DEFAULT_HOME_LANGUAGE, type HomeLanguage, LANGUAGE_INFO } from './languages'

export interface HomeLocale {
    lang: HomeLanguage
    copy: HomeCopy
    /** For Intl: numbers, currencies, dates, plurals. */
    locale: string
    dir: 'ltr' | 'rtl'
}

export const ENGLISH: HomeLocale = { lang: DEFAULT_HOME_LANGUAGE, copy: en, locale: LANGUAGE_INFO.en.locale, dir: 'ltr' }

const HomeLocaleContext = createContext<HomeLocale>(ENGLISH)

export const HomeLocaleProvider = HomeLocaleContext.Provider

/**
 * The home page's language. The header and the footer read it too, so outside the home page (the
 * guides, the waiting list) they get English, which is what they showed before.
 */
export function useHome(): HomeLocale {
    return useContext(HomeLocaleContext)
}

// Every catalog but English is its own chunk: a reader downloads the language they read, not
// fifteen. The route's loader awaits it, before the prerender renders and before the browser
// hydrates, so both sides start from the same text.
const catalogs = import.meta.glob<{ default: HomeCopy }>(['./*.ts', '!./en.ts', '!./languages.ts', '!./context.ts'])

export async function loadHomeLocale(lang: HomeLanguage): Promise<HomeLocale> {
    const info = LANGUAGE_INFO[lang]
    if (lang === DEFAULT_HOME_LANGUAGE) return ENGLISH
    const load = catalogs[`./${lang}.ts`]
    if (!load) return ENGLISH
    const { default: copy } = await load()
    return { lang, copy, locale: info.locale, dir: info.dir }
}
