# Immigration website research and design decisions

Research date: 11 November 2026. Public pages were reviewed; no competitor form was submitted and no private client portal was accessed. This is a review of relevant information architecture and visible form patterns, not a claim to have audited every URL, internal workflow or security control at these businesses.

## Sources reviewed

| Source | Pages and patterns observed | Verto implementation |
| --- | --- | --- |
| [Canadim sitemap](https://www.canadim.com/sitemap/) and [general assessment](https://www.canadim.com/assessment/general/) | Broad navigation grouped around immigrating, work, study, family and business. Separate assessment forms. Personal/contact profile followed by background and route-specific questions; visible form includes nationality, age, residence/status, service need and an open needs summary. | Clear service index, separate pages for the two services Verto has confirmed, a goal-first entry point and route-specific registration questions. Avoid publishing unconfirmed services merely to match a larger competitor’s catalogue. |
| [CanadaVisa / Cohen Immigration Law assessment](https://www.canadavisa.com/assess/canada-immigration-assessment-form.htm) and [tools](https://www.canadavisa.com/canadian-immigration-tools.html) | Service-specific assessment entry points, explanation of what the assessment does, privacy context and further assistance after submission. Search-visible form sections cover personal profile, language, education, employment, dependants/connections and contact information. Navigation includes about, contact, resources and a client portal. | Explain the purpose of intake; collect relevant basic background; provide privacy/consent text, a review step and follow-up expectations. Offer limited private intake tracking rather than pretending to provide a fully developed case portal or automatic eligibility scoring. |
| [Boundless FAQs](https://www.boundless.com/boundless-faqs) and [individual services](https://www.boundless.com/services/individuals) | Questions grouped around working together, timelines, pricing/government fees and policies. Describes a questionnaire-led workflow, document gathering and review. Differentiates service fees from government charges. | Dedicated process, fee, FAQ, refund and policy pages. Staged questions, explicit next steps and a separate service-terms/payment stage. Boundless serves different jurisdictions and is used as a UX reference, not a source of Canadian legal requirements. |
| [College public register](https://register.college-ic.ca/) and [R711253 record](https://register.college-ic.ca/Public-Register-EN/Public-Register-EN/Licensee/Profile.aspx?ID=12434) | Official mechanism to check a consultant’s name, licence, eligibility, contact information and disciplinary history. Public search matched Harmanpreet Kaur and R711253. Search guidance warns visitors to verify contact details directly. | Link to the official record and explain verification. Do not claim that a name/licence match independently proves the business relationship, or reproduce a cached status as a permanent endorsement. |

## Core decisions

1. **Navigation:** Services, approach, about, resources and contact, with one clear registration call to action and a quieter tracking link.
2. **Trust through verifiable facts:** Actual contact information, supplied branding, representative verification, clear scope and policy pages. No fabricated testimonials, success statistics, office locations or government affiliations.
3. **Lower initial data burden:** Collect enough context to begin a review without requiring passport or banking documents. A four-step form groups the decision, personal profile, route-specific background and final consent/review.
4. **Relevant branching:** Work permit applicants see education, work experience and job-offer questions. Visitors see travel purpose, month and duration. Both can mention a prior refusal without entering sensitive details.
5. **Clear boundaries:** No automatic qualification score or approval claim. Registration is explicitly separate from an IRCC application and the later paid service agreement.
6. **Payment clarity:** Retain the stated CAD $622 fee and prior embedded-payment preference. Disclose the designated merchant. Require service terms to be confirmed before checkout. Verify payment via signed server events rather than trusting a success screen.
7. **Visual direction:** Editorial typography, generous spacing, cream backgrounds, navy foundations and restrained red accents drawn from the logo. Canadian photography grounds the service without using immigration-officer or government-seal imagery.

## Technical references

- [Astro deployment guidance](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Pages Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Pages bindings](https://developers.cloudflare.com/pages/functions/bindings/)
- [Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Access JWT validation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/)
- [Stripe embedded Checkout](https://docs.stripe.com/payments/checkout/how-checkout-works?payment-ui=embedded-page)
- [Stripe redirect behavior and required webhooks](https://docs.stripe.com/payments/checkout/custom-success-page?payment-ui=embedded-page)

Government guidance linked from service pages remains authoritative for current requirements. The website does not reproduce volatile eligibility thresholds, government fee tables or processing-time claims.
