export const links = {
    app: 'https://my.invoicerr.app',
    docs: 'https://docs.invoicerr.app',
    selfHost: 'https://docs.invoicerr.app/docs/user-guide/docker-installation',
    kubernetes: 'https://docs.invoicerr.app/docs/user-guide/kubernetes',
    countries: 'https://docs.invoicerr.app/docs/developer-guide/country-support',
    api: 'https://docs.invoicerr.app/docs/developer-guide/api-reference',
    changelog: 'https://docs.invoicerr.app/changelog',
    github: 'https://github.com/invoicerr-app/invoicerr',
    license: 'https://github.com/invoicerr-app/invoicerr/blob/dev/LICENSE',
    commercialLicense: 'https://github.com/invoicerr-app/invoicerr/blob/dev/LICENSE.COMMERCIAL.md',
    weblate: 'https://hosted.weblate.org/engage/invoicerr/',
    // Docs pages built by the `docs` plugin instance, hence the `/docs/legal/` prefix (same pattern
    // as `selfHost`/`kubernetes`/`api` above) rather than the bare `/legal/` a naive guess would use.
    termsOfService: 'https://docs.invoicerr.app/docs/legal/terms-of-service',
    privacyPolicy: 'https://docs.invoicerr.app/docs/legal/privacy-policy',
    dataProcessingAgreement: 'https://docs.invoicerr.app/docs/legal/data-processing-agreement',
    legalNotice: 'https://docs.invoicerr.app/docs/legal/legal-notice',
    cookiesAcceptableUse: 'https://docs.invoicerr.app/docs/legal/cookies-and-acceptable-use',
} as const
