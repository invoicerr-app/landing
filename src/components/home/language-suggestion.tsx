import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { type HomeLocale, loadHomeLocale, useHome } from '@/i18n/home/context'
import { homePath, preferredHomeLanguage } from '@/i18n/home/languages'

const DISMISSED = 'invoicerr:language-suggestion-dismissed'

/**
 * A quiet note, in the reader's own language, when their browser prefers a language the home page
 * is written in and they are reading another one. Nobody is redirected: a link someone shared, or a
 * search result, opens the language it points at, and the reader decides.
 *
 * Rendered after hydration only: the prerendered page cannot know the reader's languages.
 */
export function LanguageSuggestion() {
    const { lang } = useHome()
    const [target, setTarget] = useState<HomeLocale | null>(null)

    useEffect(() => {
        try {
            if (localStorage.getItem(DISMISSED)) return
        } catch {
            /* storage blocked: the note may show again, which is harmless */
        }
        const preferred = preferredHomeLanguage(navigator.languages?.length ? navigator.languages : [navigator.language])
        if (!preferred || preferred === lang) return
        let cancelled = false
        loadHomeLocale(preferred).then((locale) => {
            if (!cancelled) setTarget(locale)
        })
        return () => {
            cancelled = true
        }
    }, [lang])

    if (!target) return null

    const dismiss = () => {
        setTarget(null)
        try {
            localStorage.setItem(DISMISSED, '1')
        } catch {
            /* nothing to remember it with */
        }
    }

    return (
        <aside
            lang={target.lang}
            dir={target.dir}
            aria-label={target.copy.language.label}
            className="fixed bottom-4 start-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-xl bg-card py-2 pe-2 ps-4 text-sm text-foreground shadow-[0_0_0_1px_var(--border),0_12px_32px_rgb(10_40_60/0.18)]"
        >
            <span className="text-muted-foreground">{target.copy.language.suggestion}</span>
            <a
                href={homePath(target.lang)}
                hrefLang={target.lang}
                onClick={dismiss}
                className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
                {target.copy.language.switchTo}
            </a>
            <button type="button" onClick={dismiss} aria-label={target.copy.language.dismiss} className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                <X className="size-4" />
            </button>
        </aside>
    )
}
