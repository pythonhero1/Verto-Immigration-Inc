# Verto Immigration Inc. — Astro + Cloudflare Pages

A professional immigration service website with 21 HTML pages, a four-step registration journey, private intake tracking, an authenticated staff workspace and embedded Stripe payments.

## Stack

- Astro 7, TypeScript, self-hosted DM Sans and Instrument Serif fonts
- Static Astro pages on Cloudflare Pages
- Cloudflare Pages Functions for registration, tracking, staff updates and checkout
- Cloudflare D1 for private intake records, rate limiting and audit entries
- Cloudflare Turnstile to verify new registrations
- Cloudflare Access JWT verification for staff APIs
- Stripe Checkout embedded on the website, signed payment webhooks

This intentionally uses **Astro static output plus Pages Functions**. It targets **Cloudflare Pages**, without depending on a Cloudflare Workers-only Astro server adapter.

## Run locally

Use Node 24.22 or newer.

```sh
npm ci
npm run dev
```

`npm run dev` previews pages and browser interactions. The `/api/` endpoints require the Pages development runtime or a deployed Pages project.

```sh
npm run check
npm test
npm run build
```

See [Cloudflare setup](docs/CLOUDFLARE.md) for D1 bindings, local full-stack development, deployment and secret configuration.

## Pages

Home; services overview; work permits; visitor visas; about; how it works; fees; contact; FAQs; resources overview; three preparation guides; registration; tracking; staff workspace; privacy; website terms; refunds; accessibility; 404. Robots and sitemap endpoints are generated at build time. Private routes are excluded from the sitemap and marked noindex.

## Registration workflow

1. Select work permit or visitor visa support.
2. Enter contact, citizenship, residence, age range and current Canada status.
3. Answer relevant background questions and optionally add a short message.
4. Review answers, provide required consents and complete Turnstile.
5. Receive a private reference and access key. The tracking link carries credentials in the URL fragment, which is removed when the page loads. The key is sent to APIs in an Authorization header. Only its hash is stored in D1.
6. Staff review and contact the applicant. The tracking page shows limited status information, not the full submitted personal profile.
7. Staff may request payment after confirming the written service agreement, fee, merchant and refund terms. Embedded checkout charges CAD $622 using a configured Stripe Price. Only verified, amount-checked Stripe webhooks mark it paid.

Registration is an intake enquiry. It is not an application to IRCC and does not create a representation agreement. There is no automatic eligibility decision, job offer or immigration approval.

## Business content

The logo, business name, contact details, Facebook link and stated CAD $622 fee come from the prior Verto project. Work permits and visitor visas are the confirmed service scope. No invented testimonials, success rates, office addresses, accreditations or additional services are included.

The immigration contact supplied is Harmanpreet Kaur, College ID R711253. The public register link lets visitors verify current status and contact details. A register match is not independent verification of the relationship between the licensee and this business. Before launch, the owner should check that the business contact details and service arrangements accurately represent the authorized representative.

The previously specified payment recipient is DALTON CAPITAL VENTURES LTD. This identity is disclosed on the fees page. Configure the actual Stripe merchant consistently and confirm its relationship to the service in the written agreement. Payment is disabled until all configuration is present; no live charge has been made or verified as part of this build.

## Research and implementation decisions

[Competitor research](docs/RESEARCH.md) records the reviewed sources, navigation and form patterns, and how they informed this implementation. [Operations](docs/OPERATIONS.md) covers staff access, data handling, backups and payment testing.

## Deployment state

Code is deployable; publishing it on GitHub does not create a Cloudflare account, database, Turnstile widget or Stripe webhook. Configure those account-owned resources before enabling intake or payments. Until then, the APIs return a clear unavailable response and do not claim a registration or payment succeeded.
