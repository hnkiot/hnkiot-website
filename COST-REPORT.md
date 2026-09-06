# HNK IoT Solutions — Infrastructure Cost Report (Phase 9)

**Date:** 2026-09-06
**FX reference:** USD 1 ≈ ZAR 15.96 on 2026-09-06. Card/bank conversion typically adds ~2–3%
plus a small fixed fee, so effective ≈ R16.5–17.5 per USD.

---

## DOMAIN
| | |
|---|---|
| Provider | **Cloudflare Registrar** (at-cost, no markup) |
| Domain | `hnkiot.com` |
| Registration (year 1) | **USD 10.46** ≈ **R170–185** — charged 2026-09-06, order `22943b47-10ef-4847-9c1f-552d06dc0c63` |
| Renewal | **USD 10.46 / year** ≈ **R170–195** (rises to ~USD 11.15 ≈ R185–200 after the Verisign `.com` wholesale increase on 1 Nov 2026) |
| Renewal date | 2027-09-06 — **auto-renew ON** |
| Included free | WHOIS redaction, registrar transfer-lock, DNSSEC |

## WEBSITE
| | |
|---|---|
| Provider | **Cloudflare Pages** (Free plan), project `hnkiot` |
| Build | React + Vite, static SPA |
| Monthly | **R0** |
| Annual | **R0** |
| Free-tier limits | 500 builds/month, unlimited requests & bandwidth, 100 custom domains |

## DNS / CDN
| | |
|---|---|
| Provider | **Cloudflare** (Free plan) |
| Monthly | **R0** |
| Annual | **R0** |
| Includes | authoritative DNS, proxy/CDN, DDoS protection, DNSSEC, Redirect Rule (www→apex) |

## SSL
| | |
|---|---|
| Provider | Cloudflare Universal SSL (Google Trust Services cert) |
| Cost | **R0** — auto-issued, auto-renews (~90-day cert) |
| Config | SSL mode **Full (strict)**, TLS 1.2 min, TLS 1.3 on, Always Use HTTPS on |

## EMAIL
| | |
|---|---|
| Provider | **Zoho Mail — Forever Free plan** |
| Mailboxes | **1** — `henock@hnkiot.com` (5 GB) |
| Aliases | **5**, all → the same mailbox — `hello@ · support@ · projects@ · training@ · accounts@` |
| Receiving | ✅ (MX → Zoho) |
| Sending as @hnkiot.com | ✅ via Zoho webmail + Zoho mobile app — SPF, DKIM, DMARC all pass & align (verified) |
| IMAP / POP / SMTP | ❌ not on Free (webmail + app only). Upgrade path: Zoho Mail Lite ≈ USD 12/yr ≈ R190–210 |
| Monthly | **R0** |
| Annual | **R0** |
| Auth records | MX (Zoho), SPF `v=spf1 include:zohomail.com ~all` (single record), DKIM selector `zmail` (verified), DMARC `p=none` |

## OTHER
| Item | Cost |
|---|---|
| Cloudflare Workers / backend | Not deployed — R0 (Free tier available if needed) |
| DNSSEC | R0 |
| Any paid add-on / subscription | **None** |

---

## TOTAL

| | Amount |
|---|---|
| **TOTAL FIRST YEAR** | **≈ R170–185** (domain only; everything else R0) |
| **EXPECTED YEAR 2** | **≈ R175–200** (domain renewal only; higher end reflects the Nov 2026 `.com` registry increase + FX drift) |

Target in `domain-email.txt` was ~R250–350 first year. **Actual ≈ R170–185 — under target.**

### If email later moves to Zoho Mail Lite (optional, only if IMAP/SMTP needed)
| | Amount |
|---|---|
| First year | ≈ R360–395 |
| Year 2 | ≈ R365–410 |

---

## Recurring-cost summary (what actually leaves your account)

| Frequency | Item | Amount |
|---|---|---|
| Once / year | `hnkiot.com` renewal (Cloudflare, auto) | ~USD 10.46 → R170–200 |
| — | Everything else (DNS, SSL, hosting, email) | R0 |

**No monthly charges. One annual domain renewal is the entire recurring cost.**
