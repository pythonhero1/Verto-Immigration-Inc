CREATE TABLE IF NOT EXISTS registrations (
 reference TEXT PRIMARY KEY,
 access_hash TEXT NOT NULL,
 submission_hash TEXT NOT NULL UNIQUE,
 payload_hash TEXT NOT NULL,
 email TEXT NOT NULL,
 service TEXT NOT NULL,
 payload TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'received',
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL,
 consent_version TEXT NOT NULL,
 terms_confirmed_at TEXT,
 payment_status TEXT NOT NULL DEFAULT 'unpaid',
 stripe_session TEXT,
 checkout_attempt INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS registrations_created ON registrations(created_at DESC);
CREATE TABLE IF NOT EXISTS rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS payment_events (id TEXT PRIMARY KEY, reference TEXT NOT NULL, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS audit_log (id TEXT PRIMARY KEY, reference TEXT NOT NULL, actor TEXT NOT NULL, action TEXT NOT NULL, created_at TEXT NOT NULL);
