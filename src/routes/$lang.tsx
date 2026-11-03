import { createFileRoute, notFound } from '@tanstack/react-router'

import { HomePage } from '@/components/home/home-page'
import { loadHomeLocale } from '@/i18n/home/context'
import { DEFAULT_HOME_LANGUAGE, isHomeLanguage } from '@/i18n/home/languages'

// The home page in one of its other languages: /fr/, /de/, /ja/… Any other single-segment path that
// is not a page of its own lands here and is a 404, as it was before this route existed. English
// has no /en/: it is "/".
export const Route = createFileRoute('/$lang')({
    beforeLoad: ({ params }) => {
        if (!isHomeLanguage(params.lang) || params.lang === DEFAULT_HOME_LANGUAGE) throw notFound()
    },
    loader: ({ params }) => loadHomeLocale(params.lang as Parameters<typeof loadHomeLocale>[0]),
    component: LocalizedHome,
})

function LocalizedHome() {
    return <HomePage locale={Route.useLoaderData()} />
}
