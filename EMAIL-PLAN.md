# HNK IoT Solutions — Email Plan (Phase 6 research)

**Requirement:** receive **and** send professional mail as `henock@hnkiot.com` / `hello@hnkiot.com`,
recipients see the company domain, correct SPF + DKIM + DMARC, one paid mailbox max + free aliases,
lowest cost. Researched 2026-09-06.

---

## Options compared

| | **Zoho Mail — Forever Free** | **Zoho Mail — Lite** | **Cloudflare Email Routing** | **Purelymail** | **Migadu Micro** |
|---|---|---|---|---|---|
| Monthly | **R0** | ~$1/user → **~R17** | **R0** | ~$0.83 → ~R14 | ~$1.58 → ~R27 |
| Annual | **R0** | **$12/user ≈ R190–210** | **R0** | **$10 ≈ R165–180** | **$19 ≈ R320–340** |
| Mailboxes | 1 domain, up to 5 users (use 1) | per user (use 1) | 0 (forwarding only) | unlimited-ish | 1 (soft) |
| Aliases | Yes, free (add to the user) | Yes, free | Up to 200 routes | Unlimited | Unlimited |
| **Receiving** | ✅ Zoho mailbox | ✅ Zoho mailbox | ✅ forwards to your Gmail | ✅ | ✅ |
| **Sending as @hnkiot.com** | ✅ via Zoho webmail + app | ✅ webmail, app **and** SMTP | ❌ **no outbound at all** | ✅ SMTP | ✅ SMTP |
| SMTP / IMAP / POP | ❌ **webmail + Zoho app only** | ✅ IMAP + POP + SMTP + ActiveSync | ❌ | ✅ | ✅ |
| Desktop clients (Outlook/Thunderbird/Apple Mail) | ❌ | ✅ | n/a | ✅ | ✅ |
| Mobile access | ✅ Zoho Mail app | ✅ Zoho Mail app + any client | via your Gmail app | any client | any client |
| Storage | 5 GB/user | 5 GB/user (+10 GB attach store) | n/a | pooled, generous | 5 GB soft |
| SPF | ✅ `include:zoho.com` | ✅ | ✅ `include:_spf.mx.cloudflare.net` | ✅ | ✅ |
| DKIM | ✅ Zoho selector | ✅ | ✅ Cloudflare-managed | ✅ | ✅ |
| DMARC | ✅ you publish record | ✅ | ✅ | ✅ | ✅ |
| Send/day limit | ~throttled, fine for low volume | generous | n/a | generous | **20/day — too low** |
| Provider maturity | Large, established | Large, established | Large, established | Tiny 1-person shop | Small, reputable |
| Eligibility caveat | "select regions" — must confirm ZA at signup; needs domain + DNS access (you have both) | none | none | none | none |

### Not a fit
- **Cloudflare Email Routing alone** — inbound only, no outbound SMTP. Spec explicitly rejects this as a
  complete answer. Useful only as a free *receive* layer paired with a separate sender (and it would take
  over MX, conflicting with a Zoho mailbox). Not used in the primary plan.
- **Cloudflare Email Sending (beta)** — free only to *verified addresses in your own account*; sending to
  arbitrary recipients (i.e. client outreach) needs **Workers Paid (~$5/mo)**. It is transactional
  (Workers/REST/SMTP), not a webmail mailbox. Wrong tool for founder email.
- **Gmail "Send mail as" + Email Routing** — without a real domain SMTP host, SPF/DKIM don't align to
  `hnkiot.com`, so DMARC alignment fails and deliverability suffers. Rejected.
- **MXroute** ($59/yr), **Fastmail** ($50/yr) — reliable but 3–4× the budget for no benefit we need yet.

---

## Recommendation

**Primary: Zoho Mail (same provider either tier — trivial to upgrade later, no migration).**

1. **Start on Zoho Mail Forever Free — R0.** Meets every hard requirement: real mailbox
   `henock@hnkiot.com`, sends as the domain with proper SPF/DKIM/DMARC, free aliases
   (`hello@`, `support@`, `projects@`, `training@`, `accounts@` → same inbox), webmail + Zoho
   mobile app. Only limitation: no IMAP/POP/SMTP, so no Outlook/Thunderbird/Apple Mail and no
   external SMTP.

2. **Upgrade to Zoho Mail Lite (~R190–210/yr) only if/when** you need a desktop mail client,
   SMTP for automation, or ActiveSync. It's a plan switch in the same account — DNS and mailbox
   stay exactly as configured.

**Fallback if Zoho Free signup is not offered to South Africa:** Zoho Mail Lite at ~$12/yr
(≈ R190–210) — still inside the overall budget — or Purelymail at ~$10/yr if a rock-bottom price
matters more than provider size.

### First-year cost impact
- Zoho Free path: **R0** → total first-year infra stays ≈ **R170–185** (domain only).
- Zoho Lite path: **≈ R190–210/yr** → total first-year infra ≈ **R360–395**.

---

## Planned DNS (values finalised from the Zoho console in Phase 7)

| TYPE | NAME | VALUE (indicative — confirm in Zoho console) | PURPOSE |
|------|------|----------------------------------------------|---------|
| TXT | `hnkiot.com` | `zoho-verification=zb……` (or `zmverify.zoho.com` CNAME) | Domain ownership |
| MX | `hnkiot.com` | `mx.zoho.com` (10), `mx2.zoho.com` (20), `mx3.zoho.com` (50) | Inbound mail |
| TXT | `hnkiot.com` | `v=spf1 include:zoho.com ~all` | SPF — single record |
| TXT | `<selector>._domainkey` | Zoho-provided DKIM public key | DKIM |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:henock@hnkiot.com; fo=1` | DMARC — start at p=none |

DMARC path: `p=none` (observe) → `p=quarantine` → `p=reject` after alignment is verified in Phase 8+.
