# Invoicerr landing - Visual guide

Annotated screenshots of the home page after the i18n, pricing and illustrations work, one per
point of the brief. Taken on the production build (`npm run build && npx vite preview`) with the
`app-screenshots` skill (agent-browser plus its annotation script), 1440 × 900 unless noted.
The local price shots use a stored rate (the Worker endpoint is not deployed yet): $1.16 and
¥8.21 for one euro.

**URL:** http://localhost:4173 (build of `feat/i18n-pricing-illustrations`)
**Date:** 2026-11-03

---

## 1. Fifteen languages

The French page: the **menu** (1) is translated, the **headline** (2) stays in English on every
page, and **Join the waiting list** (3) goes straight to the French waiting list.

![French page](screens/proof/01-i18n-page-francaise.png)

The footer lists the **fifteen languages** (1). A reader whose browser prefers another of them
gets a **dismissible note** (2) in that language; nobody is redirected.

![Languages and suggestion](screens/proof/02-i18n-15-langues-et-suggestion.png)

Arabic reads **right to left** (1), and the **sample invoice** (2) is translated, with its
amounts in the page's locale.

![Arabic, right to left](screens/proof/03-i18n-arabe-rtl.png)

## 2. Unslop pass

The **status badge** (1) is in sentence case instead of tracked capitals, and the **headline**
(2) has no trailing period.

![Hero](screens/proof/04-unslop-hero.png)

Section **labels** (1) lose their tracked capitals, **headings** (2) their trailing period.

![Labels](screens/proof/05-unslop-libelles.png)

The last call to action keeps **one primary and one secondary button** (1), down from three.

![Final call to action](screens/proof/06-unslop-cta-final.png)

## 3. Illustrations instead of icons

Blender renders lying on the cards: the **stamp and ink pad** (1), the **stopwatch** (2), the
**keys** (3)...

![Illustrations](screens/proof/07-illustrations-3d.png)

...the **magnifier on a receipt** (1), the **USB-C cable** (2) and the **banknotes** (3).

![Illustrations, continued](screens/proof/08-illustrations-3d-suite.png)

## 4. Pricing readability

Yearly carries a **−17 % badge** (1), the **monthly price crossed out** (2) next to the monthly
equivalent, and the **bill line by line** (3).

![Pricing, yearly](screens/proof/09-pricing-annuel-moins-17.png)

## 5. Local price

A visitor in the United States reads the **price in dollars** (1), with one line saying it is
converted from euros at the ECB's rate.

![Local price, dollars](screens/proof/10-prix-local-usd.png)

The same card on a phone, in Chinese, for a visitor in China (iPhone 14 emulation).

![Local price, yuan, mobile](screens/proof/13-prix-local-cny-mobile.png)

## 6. Humanizer, one skill per language

French, after `humanizer-fr`: the **portal card** (1) now reads « Ils ne vous demandent plus leurs
relevés par e-mail » instead of « Fini les demandes de relevé de compte par e-mail ».

![French, humanizer-fr](screens/proof/11-humanizer-fr.png)

German, after `humanizer-de`: « Eingangsrechnungen, für Sie gelesen » became
**« Eingangsrechnungen per OCR erfasst »** (1), and the API card title lost its English sentence
shape (2).

![German, humanizer-de](screens/proof/12-humanizer-de.png)
