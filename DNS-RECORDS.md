# HNK IoT Solutions — DNS & Infrastructure Records

**Domain:** `hnkiot.com`
**Registrar:** Cloudflare Registrar (at-cost)
**Authoritative DNS:** Cloudflare (Free plan)
**Zone ID:** `75542f4948eee3b2dea22f2f54d35dd5`
**Account ID:** `dd8003163e9d7e2b5542b65e5e7ae779`
**Nameservers:** `cecelia.ns.cloudflare.com`, `jerry.ns.cloudflare.com`
**Last updated:** 2026-09-06

---

## DNS records (live)

| TYPE | NAME | VALUE | PROXY | TTL | PURPOSE |
|------|------|-------|-------|-----|---------|
| CNAME | `hnkiot.com` | `hnkiot.pages.dev` | Proxied 🟠 | Auto | Apex → Cloudflare Pages project `hnkiot` |
| CNAME | `www.hnkiot.com` | `hnkiot.pages.dev` | Proxied 🟠 | Auto | www → Pages; 301-redirected to apex by Redirect Rule "Redirect from WWW to root" (active) |

_Created 2026-09-06 via API. Email records (MX/SPF/DKIM/DMARC) added in Phase 7._

### Planned (not yet created)

| TYPE | NAME | VALUE | PROXY | TTL | PURPOSE | Phase |
|------|------|-------|-------|-----|---------|-------|
| CNAME | `hnkiot.com` (apex) | `hnkiot.pages.dev` | Proxied (auto by Pages) | Auto | Website — Cloudflare Pages custom domain | 5 |
| CNAME | `www` | `hnkiot.pages.dev` | Proxied (auto by Pages) | Auto | www → 301 redirect to apex | 5 |
| MX | `hnkiot.com` | Cloudflare Email Routing MX (×3) | n/a (grey) | Auto | Inbound mail → Email Routing | 7 |
| TXT | `hnkiot.com` | `v=spf1 include:_spf.mx.cloudflare.net ~all` (+ outbound provider) | n/a | Auto | SPF — single merged record | 7 |
| TXT | `cf2024-1._domainkey` | Cloudflare Email Routing DKIM | n/a | Auto | DKIM (inbound/forwarding) | 7 |
| CNAME/TXT | outbound DKIM selector | outbound provider key | n/a | Auto | DKIM for sending as @hnkiot.com | 7 |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:...` | n/a | Auto | DMARC — start at p=none | 7 |

> All records are managed inside Cloudflare (Pages custom domains create + proxy the apex/www
> records automatically). No cross-provider DNS or orange-cloud caveats apply.
> Email records stay **grey (DNS-only)** — proxying does not apply to MX/TXT.

---

## SSL / TLS (Cloudflare zone settings — configured 2026-09-06)

| Setting | Value | Notes |
|---------|-------|-------|
| SSL/TLS mode | **Full (strict)** | Set 2026-09-06 — origin is Cloudflare Pages (always-valid cert) |
| Always Use HTTPS | **On** | HTTP → HTTPS redirect at edge |
| Automatic HTTPS Rewrites | **On** | |
| Minimum TLS version | **1.2** | Raised from default 1.0 |
| TLS 1.3 | **On** | |
| HSTS | **Off** | Enable only after HTTPS is fully stable (Phase 8) — planned: max-age 6 months, then 1 year + preload |

## DNSSEC

| Item | Value |
|------|-------|
| Status | **Pending → auto-activating** (enabled 2026-09-06 via API) |
| DS record | `hnkiot.com. 3600 IN DS 2371 13 2 2E2498DEAF387CF87BB488871CF2B29D499AEE1EAD9C18BBB8574C8BAFF8B240` |
| Registry submission | Automatic — Cloudflare is both registrar and DNS host, no manual DS entry needed |

## Registrar security

| Item | Status |
|------|--------|
| WHOIS privacy / redaction | On by default (Cloudflare free redaction) |
| Registrar transfer lock | On by default for Cloudflare Registrar domains — verify in dashboard: Domains → Registrations → hnkiot.com |
| Auto-renew | ON (set at purchase) |
| Account 2FA / MFA | **NOT enabled** — action for user: https://dash.cloudflare.com/profile/authentication |
