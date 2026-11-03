import { Fragment, type ReactNode } from 'react'

/** A plural, keyed by CLDR plural category; `other` is the one every language has. */
export type Plural = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }

/** "Issued {issued}" with { issued: '2 Nov 2026' }. Unknown names are left as they are. */
export function fmt(template: string, values: Record<string, string | number> = {}): string {
    return template.replace(/\{(\w+)\}/g, (match, name: string) => (name in values ? String(values[name]) : match))
}

export function plural(forms: Plural, count: number, locale: string, values: Record<string, string | number> = {}): string {
    let category: Intl.LDMLPluralRule = 'other'
    try {
        category = new Intl.PluralRules(locale).select(count)
    } catch {
        /* an engine without the locale: `other` */
    }
    return fmt(forms[category] ?? forms.other, { n: count, ...values })
}

/**
 * A template with markup: "{link}self-host it{/link} with Docker" becomes text with the wrapped
 * words passed through `tags.link`. Values in braces are filled first, as `fmt` does.
 */
export function rich(template: string, tags: Record<string, (children: string) => ReactNode>, values: Record<string, string | number> = {}): ReactNode {
    const text = fmt(template, values)
    const parts: ReactNode[] = []
    const pattern = /\{(\w+)\}([\s\S]*?)\{\/\1\}/g
    let last = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(text))) {
        if (match.index > last) parts.push(text.slice(last, match.index))
        const render = tags[match[1]]
        parts.push(<Fragment key={match.index}>{render ? render(match[2]) : match[2]}</Fragment>)
        last = pattern.lastIndex
    }
    if (last < text.length) parts.push(text.slice(last))
    return <>{parts}</>
}

/** The same template with its markup stripped, for an attribute or structured data. */
export function plain(template: string, values: Record<string, string | number> = {}): string {
    return fmt(template, values).replace(/\{\/?\w+\}/g, '')
}
