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
| CNAME | `www.hnkiot.com` | `hnkiot.pages.dev` | Proxied 🟠 | Auto | www → Pages; 301 → apex via Redirect Rule "Redirect from WWW to root" |
| TXT | `hnkiot.com` | `zoho-verification=zb31779327.zmverify.zoho.com` | 🔘 DNS-only | 300 | Zoho domain ownership (safe to delete after ~30 days) |
| MX | `hnkiot.com` | `mx.zoho.com` | 🔘 | Auto | Zoho Mail inbound — priority **10** |
| MX | `hnkiot.com` | `mx2.zoho.com` | 🔘 | Auto | Zoho Mail inbound — priority **20** |
| MX | `hnkiot.com` | `mx3.zoho.com` | 🔘 | Auto | Zoho Mail inbound — priority **50** |
| TXT | `hnkiot.com` | `v=spf1 include:zohomail.com ~all` | 🔘 | Auto | **SPF** — sole SPF record; only Zoho may send |
| TXT | `zmail._domainkey.hnkiot.com` | `v=DKIM1; k=rsa; p=MIGfMA0GCS…IDAQAB` | 🔘 | Auto | **DKIM** selector `zmail` (Zoho) — verified Active |
| TXT | `_dmarc.hnkiot.com` | `v=DMARC1; p=none; rua=mailto:henock@hnkiot.com; ruf=mailto:henock@hnkiot.com; fo=1; adkim=r; aspf=r` | 🔘 | Auto | **DMARC** — observe mode; escalate to quarantine→reject after Phase 8 |

_Web records + zone settings: 2026-09-06. Email records: 2026-09-06, all verified in Zoho._
_Only one SPF record exists at the root. The `zoho-verification` TXT is not an SPF record and does not conflict._

### Future changes (not yet made)

| TYPE | NAME | CHANGE | WHEN |
|------|------|--------|------|
| TXT | `_dmarc.hnkiot.com` | `p=none` → `p=quarantine` | After 1–2 weeks of clean DMARC aggregate reports |
| TXT | `_dmarc.hnkiot.com` | `p=quarantine` → `p=reject` | After quarantine runs clean |
| TXT | `hnkiot.com` | delete `zoho-verification=…` | ~30 days after 2026-09-06 (ownership already confirmed) |

> All records are inside Cloudflare. Web records (apex/www) are proxied 🟠; mail records
> (MX/TXT) are DNS-only 🔘 — proxying never applies to MX/TXT.

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
