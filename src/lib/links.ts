export const links = {
    // my.invoicerr.app does not serve an application yet: it redirects to the six-language waiting
    // list page, so every button pointing here has to name the waiting list and nothing else.
    app: 'https://my.invoicerr.app',
    docs: 'https://docs.invoicerr.app',
    selfHost: 'https://docs.invoicerr.app/docs/user-guide/docker-installation',
    kubernetes: 'https://docs.invoicerr.app/docs/user-guide/kubernetes',
    countries: 'https://docs.invoicerr.app/docs/developer-guide/country-support',
    api: 'https://docs.invoicerr.app/docs/developer-guide/api-reference',
    changelog: 'https://docs.invoicerr.app/changelog',
    github: 'https://github.com/invoicerr-app/invoicerr',
    license: 'https://github.com/invoicerr-app/invoicerr/blob/dev/LICENSE',
    weblate: 'https://hosted.weblate.org/engage/invoicerr/',
    // Docs pages built by the `docs` plugin instance, hence the `/docs/legal/` prefix (same pattern
    // as `selfHost`/`kubernetes`/`api` above) rather than the bare `/legal/` a naive guess would use.
    termsOfService: 'https://docs.invoicerr.app/docs/legal/terms-of-service',
    privacyPolicy: 'https://docs.invoicerr.app/docs/legal/privacy-policy',
    dataProcessingAgreement: 'https://docs.invoicerr.app/docs/legal/data-processing-agreement',
    legalNotice: 'https://docs.invoicerr.app/docs/legal/legal-notice',
    cookiesAcceptableUse: 'https://docs.invoicerr.app/docs/legal/cookies-and-acceptable-use',
} as const

/**
 * Whether the hosted version of Invoicerr accepts sign-ins.
 *
 * It does not today: my.invoicerr.app serves the waiting list page and there is no account to log
 * into, so the three "Log in" links (header on desktop, header in the mobile menu, footer) are
 * hidden. Set this to true on the day the hosted version opens, in November 2026, and all three
 * come back exactly where they were. Nothing else gates them.
 */
export const hostedLoginOpen = false
