# Deploy to your Cloudflare Pages account

## 1. Connect this repository

In Cloudflare Dashboard, open **Workers & Pages → Create application → Pages → Connect to Git**. Select `pythonhero1/Verto-Immigration-Inc` and the implementation branch (or `main` after merging).

| Setting | Value |
| --- | --- |
| Project name | `verto-immigration` or your chosen name |
| Framework preset | Astro |
| Root directory | Repository root |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `24.22.1` or newer compatible Node 24 |
| Compatibility flag | `nodejs_compat` |

Use the actual returned Pages domain in the settings below. The suggested `verto-immigration.pages.dev` is not a claim that this name is available or deployed.

## 2. Set the site URL and allowed origin

Set **both** build-time `PUBLIC_SITE_URL` and runtime `SITE_ORIGIN` to your actual canonical HTTPS origin, without a trailing slash. They must match the origin people use to register. The build-time variable controls canonical links, sitemap and social metadata; runtime `SITE_ORIGIN` protects form and staff mutations.

A different preview hostname should have separate preview configuration and storage. Do not connect an untrusted branch preview to the production database. One deployment supports one configured mutation origin; redirect additional hostnames to your canonical hostname.

## 3. Create and bind D1

After signing into Wrangler or using the Cloudflare dashboard:

```sh
npx wrangler login
npx wrangler d1 create verto-intake
```

Copy the returned **real** database ID into a `d1_databases` entry in `wrangler.jsonc`:

```json
"d1_databases": [{
  "binding": "DB",
  "database_name": "verto-intake",
  "database_id": "COPY_REAL_DATABASE_ID_HERE",
  "migrations_dir": "migrations"
}]
```

Apply the schema:

```sh
npm run db:remote
```

Alternatively, use the D1 dashboard console to run `migrations/0001_intake.sql` and configure the Pages D1 binding named **DB** in the project settings. If you use Wrangler configuration to manage bindings, keep its configuration authoritative and avoid conflicting dashboard settings. Redeploy after binding changes.

For local full-stack development, add the real binding configuration, copy `.dev.vars.example` to the ignored `.dev.vars`, set `ALLOW_LOCAL_INTAKE=true`, then run:

```sh
npm run db:local
npm run pages:dev
```

The Turnstile bypass works only on `localhost` or `127.0.0.1` and only with the explicit local flag. It cannot enable public intake.

## 4. Configure Turnstile

Create a managed Turnstile widget in Cloudflare, restricted to the deployed site hostname. Set:

- Build variable `PUBLIC_TURNSTILE_SITE_KEY`: the widget site key.
- Runtime **secret** `TURNSTILE_SECRET_KEY`: its matching secret.

Rebuild after changing the public site key. The backend verifies success, the configured hostname and the `register` action. It refuses production submissions without verification.

## 5. Protect the staff workspace

In Cloudflare Zero Trust, create a self-hosted Access application covering **both** `/admin` (and descendants) and `/api/admin` (and descendants) on your canonical domain. The paths must share the same application audience. Allow only your actual staff identities; do not use an Everyone policy.

Set runtime values:

- `ACCESS_TEAM_DOMAIN`: your exact team hostname, e.g. `your-team.cloudflareaccess.com` (no scheme or path).
- `ACCESS_AUD`: the application’s Audience tag.

The server verifies the signature, issuer, audience and expiry of `Cf-Access-Jwt-Assertion` using the team’s public signing keys. A forged header alone does not grant access. Access is denied if configuration or the signed token is missing. The static workspace contains no records or embedded secrets.

Open `/admin/`, sign in, and load registrations. Select a record to review it. Workflow statuses are received, reviewing, contacted, awaiting payment, in progress and closed. Updates write an audit entry.

## 6. Configure embedded Stripe payments

Use a separate Stripe sandbox for testing. The account whose keys are configured receives the payments. The prior project designated **DALTON CAPITAL VENTURES LTD**; make sure the merchant, written service agreement and public disclosure are consistent before enabling live payment.

Create a **one-time** Stripe Price for **CAD 622.00**. Runtime secrets/values:

| Name | Purpose |
| --- | --- |
| `STRIPE_RESTRICTED_KEY` | Restricted key authorized to create/read Checkout Sessions and read Prices; test its permissions in sandbox |
| `STRIPE_PUBLISHABLE_KEY` | Matching account/environment public key |
| `STRIPE_PRICE_ID` | Active one-time CAD 622.00 Price |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for the endpoint below |
| `STRIPE_MERCHANT_NAME` | Accurate payment recipient shown before checkout |
| `PAYMENTS_ENABLED` | Set `true` only after sandbox checks and merchant/service terms are ready |

Store private values as encrypted Cloudflare secrets. Never put them in GitHub files, chat messages or frontend `PUBLIC_` variables. API version is pinned to `2026-10-28.endive`, matching Stripe Node SDK 23.1.0.

Register this webhook using your **actual** deployed origin:

```text
https://YOUR_CANONICAL_HOST/api/stripe-webhook
```

Subscribe to `checkout.session.completed`, `checkout.session.async_payment_succeeded` and `checkout.session.async_payment_failed`. Webhooks are required. The handler verifies signatures and marks payment paid only when currency, amount and registration metadata match. The success callback only refreshes the server status.

After service terms are agreed, staff mark the intake as awaiting payment and confirm the terms checkbox. The visitor can open their private tracking page and pay on the same website. Redirect-based payment methods are disabled to keep checkout on-site. An issuing bank may still require authentication inside Stripe’s payment experience. Session retries use Stripe idempotency keys; a completed session is not charged again. Taxes are not automatically calculated: confirm whether CAD $622 is the agreed total, and update the product, public disclosure, validations and tests together if the fee/tax treatment changes.

## 7. Publish and check

Commit configuration changes and deploy through the connected Git repository, or use:

```sh
npm run deploy
```

Do not use dashboard drag-and-drop for this full-stack deployment: the root `functions/` directory must be compiled with the project.

Check a synthetic registration on the deployed domain, private tracking, staff sign-in and sandbox payment before enabling live services. Then connect your custom domain through Pages and update the URL/origin and Turnstile hostname consistently. Verify the actual deployment URL and status before announcing launch.
