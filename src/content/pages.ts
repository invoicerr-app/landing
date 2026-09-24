// Every content page on the site, in one table: the five country guides and the pages around them.
// scripts/prerender.mjs builds each page's <head> (title, description, canonical, JSON-LD, lang) from
// it, and src/components/guide-links.tsx builds the links between the pages from it, so a page added
// here is both described to search engines and reachable from every other page.
//
// A page listed here still has to be declared by hand in public/sitemap.xml; the prerender step
// refuses to finish when the two disagree.
//
// Each entry is written in the language of the page it describes. `label` is the text other pages
// use to link to it, in that same language, whatever the language of the page the link sits on.

export type ContentLanguage = 'en' | 'fr' | 'de' | 'it' | 'pl' | 'pt'

export interface ContentPage {
    /** Pathname without a trailing slash. The canonical URL adds one, as the sitemap does. */
    path: string
    lang: ContentLanguage
    /** The <title>, and og:title / twitter:title. */
    title: string
    description: string
    /** The WebPage node's name in the JSON-LD. */
    name: string
    /** Breadcrumb trail after "Home", ending with this page. Every entry must be a page that exists. */
    breadcrumb: { name: string; path: string }[]
    /** Link text when another page links here. */
    label: string
    /** One line under that link text, same language as the label. */
    blurb: string
    group: 'country' | 'europe' | 'topic'
}

export const CONTENT_PAGES: ContentPage[] = [
    {
        path: '/europe/e-invoicing-mandates',
        lang: 'en',
        title: 'E-invoicing mandates in France, Germany, Italy, Poland and Portugal · Invoicerr',
        description:
            'Which of the five countries requires what, from when, and through which channel, with the EU rules behind them. Every date is cited to the law or the tax administration.',
        name: 'E-invoicing mandates in France, Germany, Italy, Poland and Portugal',
        breadcrumb: [{ name: 'E-invoicing mandates', path: '/europe/e-invoicing-mandates' }],
        label: 'E-invoicing mandates in Europe',
        blurb: 'The five countries side by side, and the EU rules behind them.',
        group: 'europe',
    },
    {
        path: '/europe/vida',
        lang: 'en',
        title: 'ViDA: what the EU VAT in the Digital Age package changes for invoices, and when · Invoicerr',
        description:
            'Directive (EU) 2025/516, read article by article: what changes for domestic e-invoicing now, for cross-border invoices in 2030, and for national reporting systems in 2035.',
        name: 'ViDA: what VAT in the Digital Age changes for invoices, and when',
        breadcrumb: [
            { name: 'E-invoicing mandates', path: '/europe/e-invoicing-mandates' },
            { name: 'ViDA', path: '/europe/vida' },
        ],
        label: 'ViDA, VAT in the Digital Age',
        blurb: 'What Directive (EU) 2025/516 changes for invoices, and on which date.',
        group: 'europe',
    },
    {
        path: '/e-invoicing/en-16931',
        lang: 'en',
        title: 'EN 16931: what makes an electronic invoice compliant · Invoicerr',
        description:
            'The European standard for electronic invoices: what it defines, the two syntaxes it allows, how national formats build on it, and what it does not decide. Sourced to the EU texts.',
        name: 'EN 16931: what makes an electronic invoice compliant',
        breadcrumb: [{ name: 'EN 16931', path: '/e-invoicing/en-16931' }],
        label: 'EN 16931, the European invoice standard',
        blurb: 'What a compliant electronic invoice is, and what the standard leaves to each country.',
        group: 'europe',
    },
    {
        path: '/e-invoicing/peppol',
        lang: 'en',
        title: 'Peppol: what the network is, and whether you need it · Invoicerr',
        description:
            'Access points, participant identifiers, the four-corner model and how a receiver is found. What Peppol is as a network, and where the five countries use it. Sourced to OpenPeppol and the administrations.',
        name: 'Peppol: what the network is, and whether you need it',
        breadcrumb: [{ name: 'Peppol', path: '/e-invoicing/peppol' }],
        label: 'Peppol, the network',
        blurb: 'Access points, identifiers, the four-corner model, and whether you need it.',
        group: 'europe',
    },
    {
        path: '/facturation-electronique',
        lang: 'fr',
        title: 'Facturation électronique en France : guide complet · Invoicerr',
        description:
            "Qui est concerné, à partir de quand selon la taille de l'entreprise, ce qui change avec le PDP et les formats acceptés. Sources officielles citées et liées, sans comparatif produit.",
        name: 'Facturation électronique en France : guide complet',
        breadcrumb: [{ name: 'Facturation électronique', path: '/facturation-electronique' }],
        label: 'Facturation électronique en France',
        blurb: 'Qui est concerné, et à partir de quand.',
        group: 'country',
    },
    {
        path: '/e-rechnung',
        lang: 'de',
        title: 'E-Rechnung in Deutschland: vollständiger Leitfaden · Invoicerr',
        description:
            'Wer betroffen ist, ab wann nach der Übergangsregelung bis 2028, was sich mit XRechnung und ZUGFeRD ändert. Offizielle Quellen zitiert und verlinkt, ohne Produktvergleich.',
        name: 'E-Rechnung in Deutschland: vollständiger Leitfaden',
        breadcrumb: [{ name: 'E-Rechnung', path: '/e-rechnung' }],
        label: 'E-Rechnung in Deutschland',
        blurb: 'Wer betroffen ist, und ab wann.',
        group: 'country',
    },
    {
        path: '/fatturazione-elettronica',
        lang: 'it',
        title: 'Fatturazione elettronica in Italia: guida completa · Invoicerr',
        description:
            'Chi è interessato, da quando secondo il regime, cosa cambia con il Sistema di Interscambio e il formato FatturaPA. Fonti ufficiali citate e collegate, senza confronto tra prodotti.',
        name: 'Fatturazione elettronica in Italia: guida completa',
        breadcrumb: [{ name: 'Fatturazione elettronica', path: '/fatturazione-elettronica' }],
        label: 'Fatturazione elettronica in Italia',
        blurb: 'Chi è interessato, e da quando.',
        group: 'country',
    },
    {
        path: '/ksef',
        lang: 'pl',
        title: 'KSeF w Polsce: obowiązkowe fakturowanie elektroniczne · Invoicerr',
        description:
            'Kogo dotyczy obowiązek, od kiedy według progu obrotu, co zmienia format FA(3) i Krajowy System e-Faktur. Źródła urzędowe cytowane i linkowane, bez porównania narzędzi.',
        name: 'KSeF w Polsce: obowiązkowe fakturowanie elektroniczne',
        breadcrumb: [{ name: 'KSeF', path: '/ksef' }],
        label: 'KSeF w Polsce',
        blurb: 'Kogo dotyczy obowiązek, i od kiedy.',
        group: 'country',
    },
    {
        path: '/faturacao-eletronica',
        lang: 'pt',
        title: 'Faturação eletrónica em Portugal: ATCUD e SAF-T (PT) · Invoicerr',
        description:
            'Quem é abrangido, desde quando, o que muda com o ATCUD, o software certificado e o SAF-T (PT). Fontes oficiais citadas e ligadas, sem comparação de produtos.',
        name: 'Faturação eletrónica em Portugal: ATCUD e SAF-T (PT)',
        breadcrumb: [{ name: 'Faturação eletrónica', path: '/faturacao-eletronica' }],
        label: 'Faturação eletrónica em Portugal',
        blurb: 'Quem é abrangido, e desde quando.',
        group: 'country',
    },
    {
        path: '/facturation-electronique/plateforme-agreee',
        lang: 'fr',
        title: 'Plateforme agréée : la choisir et s’y raccorder · Invoicerr',
        description:
            "Ce que fait une plateforme agréée, ce que dit la loi de son immatriculation, comment vérifier qu'elle l'est, et les étapes pour s'y raccorder. Sources officielles citées, sans comparatif.",
        name: 'Plateforme agréée : la choisir et s’y raccorder',
        breadcrumb: [
            { name: 'Facturation électronique', path: '/facturation-electronique' },
            { name: 'Plateforme agréée', path: '/facturation-electronique/plateforme-agreee' },
        ],
        label: 'Choisir sa plateforme agréée',
        blurb: 'Vérifier son immatriculation, et s’y raccorder.',
        group: 'topic',
    },
    {
        path: '/e-rechnung/xrechnung',
        lang: 'de',
        title: 'XRechnung oder ZUGFeRD: welches Format Sie senden · Invoicerr',
        description:
            'Öffentlicher oder privater Empfänger, Leitweg-ID, Einreichungsweg: der Entscheidungsweg zum richtigen Format, mit Verordnung, Gesetz und BMF-Schreiben als Quelle.',
        name: 'XRechnung oder ZUGFeRD: welches Format Sie senden',
        breadcrumb: [
            { name: 'E-Rechnung', path: '/e-rechnung' },
            { name: 'XRechnung oder ZUGFeRD', path: '/e-rechnung/xrechnung' },
        ],
        label: 'XRechnung oder ZUGFeRD?',
        blurb: 'Welches Format an welchen Empfänger, über welchen Weg.',
        group: 'topic',
    },
]

export function contentPage(path: string): ContentPage {
    const page = CONTENT_PAGES.find((entry) => entry.path === path)
    if (!page) throw new Error(`No content page is registered at ${path}.`)
    return page
}
