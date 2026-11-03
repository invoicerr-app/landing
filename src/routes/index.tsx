import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '@/components/home/home-page'
import { ENGLISH } from '@/i18n/home/context'

// English, the home page's own language and its x-default. The other fourteen are /$lang.
export const Route = createFileRoute('/')({
    component: () => <HomePage locale={ENGLISH} />,
})
