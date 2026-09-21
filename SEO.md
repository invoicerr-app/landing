# Search visibility

What the site does for itself now lives in the repository — the page is rendered to HTML at build
time, the head carries its metadata, `public/robots.txt` and `public/sitemap.xml` ship with it.
This file is the other half: the work that happens outside the repository, needs an account, or
needs someone to write something. It is ordered by what it returns per hour spent.

Everything below was measured on 2026-09-21. Re-measure before trusting a number.

---

## 0. Before any of this: the call-to-action goes nowhere

`https://my.invoicerr.app` answers **301 → `https://invoicerr.app/`**. Every "Start free trial" and
"Log in" button on the page, and the `links.app` entry they come from, sends a visitor back to the
page they were already on. The hero, the pricing card and the closing section all promise a 14-day
trial that cannot currently be started.

Nothing else in this file matters as much. Either point the subdomain at the hosted app, or change
the buttons to what is genuinely available today (the install guide, the GitHub repository) until it
is. Traffic that arrives to a circular button is traffic spent.

---

## 1. The GitHub repository is the strongest asset the project has, and it points at the wrong site

722 stars, 57 forks, 22 contributors. It is the page other people link to, the page every aggregator
scrapes, and the highest-authority surface the project owns. Three fields on it are wrong or thin,
and all three are one click each in **Settings → General** and the **About** panel of
<https://github.com/invoicerr-app/invoicerr>.

**Website field.** Currently `https://docs.invoicerr.app/`. Change it to `https://invoicerr.app`.
The docs subdomain keeps its own visibility; the marketing domain currently gets none of this link.

**Description.** Currently:

> Invoicerr is a freelance-focused invoicing app that lets you create quotes, generate invoices,
> track payments, and collect secure signatures.

It predates e-invoicing, the country catalogues and self-hosting being the headline. This is the
single string that appears in GitHub search, in topic listings, in every "awesome" list entry and in
most aggregator cards. Paste-ready replacement, 158 characters:

> Open-source invoicing for freelancers and small companies: quotes, invoices, payments, and
> e-invoicing to the tax office in Germany, France, Italy, Poland and Portugal. Self-host it with
> Docker or use the cloud.

**Topics.** Currently `invoicing`, `nestjs`, `open-source`, `pdf`, `prisma`, `react`, `signature` —
four of the seven describe the stack rather than the product, and the ones people search are
missing. GitHub allows 20. Paste-ready list:

```
invoicing  invoice  billing  e-invoicing  einvoicing  self-hosted  selfhosted  docker
accounting  freelance  small-business  factur-x  xrechnung  ksef  peppol  saas
open-source  typescript  react  nestjs
```

**README.** Add a link to <https://invoicerr.app> near the top. The README is rendered by GitHub,
by every mirror, and by the model crawlers that read repositories rather than websites.

---

## 2. Tell the search engines the site exists

The site has never declared itself. Both take about ten minutes, once.

**Google Search Console** — <https://search.google.com/search-console>. Add a **Domain** property
for `invoicerr.app` (this covers `docs.` and `my.` too), verify with the DNS TXT record it gives
you, in Cloudflare. Then **Sitemaps → Add a new sitemap → `sitemap.xml`**. Then **URL Inspection →
`https://invoicerr.app/` → Request indexing**.

Two things worth reading there in the weeks after, and nowhere else: the *Page indexing* report
(whether the page is actually in the index) and *Performance → Queries* (what people already type to
reach it, which is the only honest input for section 6).

**Bing Webmaster Tools** — <https://www.bing.com/webmasters>. Import the Search Console property in
one click. Bing's index also feeds DuckDuckGo and, in part, ChatGPT search.

Optional, low value for a one-page site: **IndexNow** (<https://www.indexnow.org>) pings Bing and
Yandex on publish. It needs a key file in `public/` and an HTTP call from the deploy workflow. Worth
it only once there are several pages that change.

---

## 3. Where a self-hosted product actually gets found

This is the channel a closed SaaS competitor cannot use at all, and it is worth more than any amount
of on-page tuning. Each of these is both a backlink from a high-authority domain and a source of
real installs. Read each project's contributing guide before opening anything — most want a specific
entry format, and a sloppy PR is a rejected PR.

| Where | What it is | What to do |
| --- | --- | --- |
| [awesome-selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted) | The reference list; feeds dozens of mirrors and the website [awesome-selfhosted.net](https://awesome-selfhosted.net) | PR an entry under *Money, Budgeting & Management*. Read `CONTRIBUTING.md` first: it requires a description under 250 characters, the licence, and the language |
| [AlternativeTo](https://alternativeto.net) | Where people search "alternative to FreshBooks/Invoice Ninja" | Add the app, then list it as an alternative to Invoice Ninja, InvoicePlane, Crater, FreshBooks, Wave |
| [OpenAlternative](https://openalternative.co) | Open-source alternatives directory, submissions open | Submit; it asks for the repository and a one-line description |
| [SaaSHub](https://www.saashub.com) | Software comparison directory, free listing | Submit the product |
| [LibHunt](https://www.libhunt.com) | Indexes GitHub repositories by topic; the topics from section 1 feed it | Mostly automatic once the topics are right |
| [Product Hunt](https://www.producthunt.com) | One-shot launch | Only once `my.invoicerr.app` works. A launch that ends on a broken trial button is a launch wasted |
| [r/selfhosted](https://www.reddit.com/r/selfhosted/) | ~500k members, the single best audience for this product | Post the honest version: what it does, what it does not, screenshots, the compose file. Read the subreddit rules on self-promotion first |
| Show HN on [Hacker News](https://news.ycombinator.com/show) | One shot, unpredictable, occasionally enormous | Same condition as Product Hunt |

Also worth packaging, in roughly this order of audience size. Each one is a repository PR, and each
puts the app one click away inside a platform people already run:

- **Umbrel** — <https://github.com/getumbrel/umbrel-apps>
- **CasaOS** — <https://github.com/IceWhaleTech/CasaOS-AppStore>
- **YunoHost** — <https://github.com/YunoHost/apps>
- **Coolify** and **Dokploy** — both take community service templates in their main repositories
- **Unraid Community Applications** — template repository, submitted through the CA documentation
- **Cloudron** — <https://docs.cloudron.io/packaging/>

---

## 4. The documentation subdomain has a hole

`https://docs.invoicerr.app/robots.txt` answers **404**. The sitemap at
`https://docs.invoicerr.app/sitemap.xml` exists and is served, but nothing declares it. Docusaurus
will emit a `robots.txt` from a file placed in its `static/` directory — one file, in the
documentation repository:

```
User-agent: *
Allow: /

Sitemap: https://docs.invoicerr.app/sitemap.xml
```

While there: the docs currently declare `og:locale:alternate` `fr` and `hreflang` for a French
locale. If the documentation goes English-only, those have to go with it, or search engines keep
asking for pages that no longer exist.

The docs homepage description still reads *"the open-source invoicing platform for freelancers"* —
same drift as the repository description in section 1.

---

## 5. invoicer.fr, measured

Fetched 2026-09-21.

| | invoicerr.app (after this change) | invoicer.fr |
| --- | --- | --- |
| Framework | Vite + React, rendered to HTML at build time | Next.js, server-rendered |
| HTML a crawler receives | 92 kB, full page | 172 kB, full page |
| Visible text, home page | ~6 700 characters | ~11 200 characters |
| URLs in sitemap | 1 | 30 |
| Language | English | French (`lang="fr"`) |
| Title | Invoicerr — Open-source invoicing software, self-hosted or cloud | Invoicer - Logiciel de facturation pour auto-entrepreneurs |
| Canonical | yes | **none** |
| Open Graph / Twitter cards | yes | **none** |
| Structured data | Organization, WebSite, SoftwareApplication, FAQPage | Organization, WebSite, SoftwareApplication, FAQPage |
| robots.txt | yes | yes, with 13 AI crawlers named explicitly |
| Publisher | the project | inRage SARL, La Rochelle, a web agency trading since 2015 |

Their 30 URLs are the gap that matters: `/tarifs`, `/auto-entrepreneur`, `/pourquoi-invoicer`,
`/facturation-electronique`, `/alternatives`, `/conformite`, and eighteen `/features/*` pages, each
one a landing page for a separate query. Their own FAQ names Abby, Indy and Tiime as the competition
— all French micro-entrepreneur tools.

Their product sells one thing above all others: **automatic Urssaf declaration**, télétransmitted at
the frequency the user picked. Then Stripe Connect card collection, bank reconciliation through
Bridge, French hosting, and Factur-X for the 2026 mandate. Pricing 0 / 15 / 39 € per month.

### Is passing it the right objective?

Honestly: no, not as stated, and chasing it would cost a year for very little.

They rank in **French**, for **French auto-entrepreneurs**, on queries about a product built around
**Urssaf** — a feature Invoicerr does not have and has no reason to build. Two of the three things
that decide those results are things this site would have to become rather than improve: a
French-language site, and a site with thirty pages of French content. And even then the buyer is
someone who wants a closed French SaaS with a French accountant's workflow, not an AGPL application
they can run on a NAS.

The queries actually worth owning, where the competitor does not appear at all, are the ones that
match what the product is:

- `open source invoicing software`, `self-hosted invoicing`, `docker invoicing app`,
  `invoice ninja alternative`, `open source billing self hosted`
- the per-country e-invoicing terms the app genuinely implements: `KSeF integration`,
  `Factur-X open source`, `XRechnung Docker`, `FatturaPA SdI API`, `open source PDP`
- the developer-shaped ones nothing else in this market serves: `invoicing REST API self-hosted`,
  `invoicing MCP server`

Those are low-competition, high-intent, in English, and true. They are also the queries that convert
into GitHub stars and self-hosted installs, which feed section 3, which feeds everything else. The
right framing is not "beat invoicer.fr" but "be the answer for open-source and self-hosted
invoicing, and for each of the five countries' e-invoicing formats by name".

If the French market is a goal in its own right — and with France in the five supported countries it
reasonably might be — that is a separate decision with a real cost: a French version of the site,
and pages about PDP, Factur-X and Chorus Pro written for French readers. It would not be aimed at
invoicer.fr's auto-entrepreneur buyer either; it would be aimed at the companies that have to pick a
PDP-compatible tool. Worth doing deliberately, not as a side effect of a ranking contest.

---

## 6. Content someone has to write

The site is one page. That is not a defect in itself — a single page can rank — but one page can
only rank for one cluster of queries. Each item below is a page that answers a question people
already type, and each has to be genuinely written, not spun.

In descending order of expected return:

1. **Five country pages** — one each for Germany, France, Italy, Poland and Portugal. Everything
   they need already exists as sourced data in the application's catalogues: identifiers, VAT rates,
   format, transmission channel, archive retention and the legal text each rule comes from. This is
   the content nobody else in the open-source invoicing market has, it is already written and
   verified inside the product, and it targets the terms in section 5 by name. Highest return per
   hour of anything in this file.
2. **A comparison page** — Invoicerr against Invoice Ninja, InvoicePlane, Crater and SolidInvoice.
   "X alternative" is the highest-intent query in this category. It only works if it is fair: say
   where the others are better.
3. **A self-hosting page** — the compose file, the Redis and PostgreSQL requirement, the Helm chart,
   the three architectures. Half of it is already in the docs; a page aimed at someone deciding
   rather than installing is a different page.
4. **A changelog or blog on the marketing domain**. Right now the only thing that ever changes on
   `invoicerr.app` is nothing, and a domain that never changes gets crawled accordingly.

---

## 7. Smaller things, and things to keep honest

- **`public/og.jpg` is 1200×600.** The declared dimensions match, so nothing is broken, but 1200×630
  is what the major networks crop to. Re-export when the image is next touched.
- **FAQ rich results.** The page declares `FAQPage` and every question and answer in it is on the
  page word for word. Expect no accordion in Google results: since 2023 Google shows FAQ rich
  results almost exclusively for government and health sites. The markup still earns its place —
  Bing uses it, and the answer engines read it.
- **Claims on the page that were checked.** "22 contributors" matches the repository. "18 interface
  languages" matches the eighteen locale directories in the application, and the eighteen names
  listed on the page are the right eighteen. The star count is read live from the GitHub API and
  falls back to "700+", which is correct at 722.
- **Claims on the page that were not checked**, because nothing reachable from here proves them:
  "18 webhook events", the three architectures the Docker image is built for, and the read-only
  period and export described in the FAQ. They are plausible and internally consistent; verify them
  against the application repository before they end up in a press kit.
- **JavaScript weight.** The page ships 493 kB of JavaScript, 159 kB compressed, for a site with one
  route, plus 47 kB of CSS. Since the markup is now rendered at build time, none of that blocks the
  first paint any more, so this is no longer urgent — but a one-route site carrying a full
  client-side router is worth a question when someone next opens the dependency list.
- **Font subsets.** The eighteen language names in the "Speaks your language" card are written in
  their own scripts, which makes the browser fetch the Cyrillic, Greek and extended-Latin subsets of
  Inter — about 130 kB of fonts that a purely Latin page would never request. It is a real cost for
  a real piece of content; noted, not a recommendation to remove it.

---

## 8. The measurement to compare against

Taken on the built site, Chromium, 1.6 Mbit/s with 150 ms latency and 4× CPU throttling, median of
five runs — the point being the difference between the two columns, not the absolute numbers.

| | Empty shell (what was deployed) | Rendered at build time (now) |
| --- | --- | --- |
| HTML served | 2 465 bytes, `<div id="root"></div>` | ~92 kB, the whole page |
| Text without JavaScript | none | ~6 700 characters |
| First Contentful Paint | 3 492 ms | 680 ms |
| Largest Contentful Paint | 4 160 ms | 1 476 ms |

With JavaScript disabled the page renders in full, in both themes, at desktop and phone widths. With
JavaScript on, the browser takes over the existing markup instead of rebuilding it, and the console
is clean.
