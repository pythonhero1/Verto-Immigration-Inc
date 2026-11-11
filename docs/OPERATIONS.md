# Operating the Verto intake service

## What is included

The public site and guided intake, a private status key, D1 records, authenticated staff review and workflow updates, a CAD $622 embedded checkout integration and verified webhooks. This is an intake workflow, not a full case-management platform or an IRCC filing system.

## What is not automatically sent

The app does not send email or SMS. Visitors receive their confirmation and private tracking credentials on screen and can print them. Staff review the workspace and contact applicants using the existing business channels. There are no invented response-time guarantees. Do not describe confirmation email delivery as active unless an email provider and delivery workflow are actually added and verified.

## Private information

- Initial intake does not accept passport or financial document uploads.
- Contact/background records stay in D1; they are never embedded in static pages or exposed by public tracking responses.
- Tracking keys are hashed. API credentials travel in headers and are not placed in query strings.
- Keys are bearer credentials; anyone possessing one can access limited status and an eligible checkout. Lost/exposed keys require staff-assisted handling. There is no automated recovery or identity-verification flow.
- Browser draft saving is optional and session-scoped. It is not cross-device sync.
- Define and implement your actual retention/deletion schedule with regard to your service agreements and professional obligations. There is no automatic data-retention purge in this version. Rate-limit records expire and are cleaned during requests; these are separate from applicant records.
- Use D1 backups/time travel and account access controls. Back up before schema changes. Verify restore procedures with synthetic data. Do not export applicant data to the public repository.
- The owner should review the privacy, terms, fee and refund pages for the actual business practices before public launch. These pages do not replace signed client agreements.

## Staff access

Use Cloudflare Access for both the workspace and staff API paths with a shared audience and staff-only allow rules. No default administrator password or frontend API secret exists. The backend denies access if configuration is missing. Access token verification requires the configured Cloudflare team cert endpoint to be available.

Staff actions update status; they do not determine immigration eligibility. Payment can only be requested after the staff member records that written scope, total, merchant and refund terms have been agreed. The audit log records actor, reference, change and time. This does not upload or cryptographically validate an agreement; the business must retain its signed agreements through its established process.

## Payments

Use sandbox credentials first. Check successful payment, failed payment, refresh/retry, duplicate webhook delivery, delayed success and invalid signature. Test a session linked to the wrong registration and a mismatched amount/currency. Do not run test charges against live cards.

The backend checks an active one-time CAD 622 Price, creates an embedded Checkout Session with the stored email/reference and uses per-intake idempotency keys. A completed session blocks further checkout attempts while the webhook is pending. Payment status is separate from intake status. A late failure does not overwrite an already confirmed payment.

This version records payment completion/failure. Stripe disputes and refunds must be managed in Stripe and reconciled by staff; the app does not initiate refunds or track dispute/refund events. Ask the merchant to enable appropriate account alerts. Never imply a Stripe receipt means a visa approval.

## Verification performed in this build

- Astro/TypeScript diagnostics and production static build.
- Cloudflare Pages Functions compilation with Wrangler.
- Tests for schema constraints, work/visitor routing, consent, exact payment amounts/currency/reference, origin protection, hashing and payment configuration.
- Direct API handler integration tests against an in-memory SQLite database using the actual schema: intake persistence, duplicate submission retry, mismatched retry rejection, private tracking authorization, missing staff/payments configuration, production Turnstile fail-closed behavior and signature-verified webhook processing.
- Browser checks of the built static site and form interactions. No actual Cloudflare account deployment or live Stripe payment is implied by these tests.

## Assets

The supplied Verto logo is retained. Landscape photography is downloaded locally from Unsplash sources used in the project and does not depend on a remote image request at runtime. Fonts are served locally from Fontsource packages. Preserve applicable asset/font licence notices.
