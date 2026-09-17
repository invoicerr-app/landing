# Invoicerr landing page

The marketing site served at [invoicerr.app](https://invoicerr.app). It points to the hosted app
([my.invoicerr.app](https://my.invoicerr.app)) and to the documentation
([docs.invoicerr.app](https://docs.invoicerr.app)).

React 19, Vite, Tailwind CSS 4, Motion and TanStack Router.

## Development

```bash
npm install
npm run dev
```

## Staying in sync with the app

- `src/index.css` carries the "Lagune" tokens and fonts, copied from `frontend/src/index.css` in the
  [app repository](https://github.com/invoicerr-app/invoicerr). The app stays the source of truth.
- `public/screens/` holds screenshots taken from `documentation/static/img/readme/` in the same repository.
- `src/data/countries.ts` is read from the app's country catalogues, and `src/lib/pricing.ts` holds the
  cloud prices. Update both when the app changes.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages. `public/CNAME` sets the custom domain, and DNS for it is managed in Cloudflare, the same
way as the documentation site.
