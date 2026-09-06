# HNK IoT Solutions — Infrastructure Project Status

**Spec:** `domain-email.txt` (authoritative)
**Last updated:** 2026-09-06
**Working FX rate:** USD 1 ≈ ZAR 15.96 (open.er-api.com, 2026-09-06). Budget with ~R16.5–17.5/USD to allow for card FX markup.

## Architecture (2026-09-06 — all Cloudflare, Netlify removed)

| Layer | Choice |
|-------|--------|
| Registrar | Cloudflare Registrar — `hnkiot.com` (registered) |
| DNS / DNSSEC / SSL | Cloudflare Free |
| Frontend hosting | **Cloudflare Pages** (Free) — dedicated project, React (Vite) build |
| Backend / API | Cloudflare Workers (Free) — only if/when needed |
| Redirects | Cloudflare — `www.hnkiot.com` → `hnkiot.com` |
| Inbound email | Cloudflare Email Routing (aliases → 1 primary mailbox) |
| Outbound email | TBD in Phase 6 — must send as `@hnkiot.com` |

Netlify is **not** used. `netlify` CLI is installed/authed but will not be configured
unless a capability gap vs Cloudflare is found later.

---

## Phase tracker

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Inventory (Cloudflare / workspace / Git / Netlify) | ✅ Completed |
| 2 | Domain research (availability + reg/renewal pricing) | ✅ Completed |
| 3 | Purchase selected domain | ✅ **Completed 2026-09-06** — `hnkiot.com` registered (order 22943b47-10ef-4847-9c1f-552d06dc0c63), expires 2027-09-06, auto-renew ON |
| 4 | Cloudflare zone / DNS / DNSSEC / SSL / security | ✅ **Core done 2026-09-06** — TLS 1.2 min, Always-HTTPS on, DNSSEC enabled (pending→active). SSL mode → strict in Phase 5. HSTS deferred to Phase 8. See `DNS-RECORDS.md` |
| 5 | Website — Cloudflare Pages + React + domain + www redirect + HTTPS | ✅ **Done 2026-09-06** — React site live at https://hnkiot.com, valid TLS cert (Google Trust Services, auto-renew), http→https 301, www→apex 301 (path+query preserved), SSL Full(strict), security headers. DNSSEC still auto-activating. |
| 6 | Email research (lowest-cost professional custom-domain email) | ✅ **Done 2026-09-06** — see `EMAIL-PLAN.md`. Recommend Zoho Mail (Free → Lite). **Waiting for user: pick Free (R0) vs Lite (~R200/yr)** |
| 7 | Email setup — mailbox + aliases + MX/SPF/DKIM/DMARC | ⏸ Waiting for user to create Zoho account; then I add all DNS via token |
| 8 | Verify — DNS / HTTPS / cert / redirects / mail auth / send+receive | ⛔ Not started |
| 9 | Final cost report | ⛔ Not started |

Legend: ✅ Completed · 🔄 In progress · ⏸ Waiting for user · ⛔ Not started

---

## Phase 1 — Inventory (findings)

### Tooling available in this session
- **No Cloudflare MCP server is connected** to this Claude session. What *is* available:
  - `wrangler` CLI **v4.126.0**, logged in via OAuth as `henockhnk092@gmail.com`.
    - Account: `Henockhnk092@gmail.com's Account` — ID `dd8003163e9d7e2b5542b65e5e7ae779`
    - Token scopes: `account(read)`, `zone(read)`, `ssl_certs(write)`, `pages(write)`,
      `email_routing(write)`, `email_sending(write)`, `workers(write)`, `d1(write)`, etc.
    - **Limitation:** `zone` is **read-only** → I can *list/inspect* zones but **cannot create a zone
      or write DNS records** through this token. Zone creation + DNS edits will need the Cloudflare
      dashboard, or a scoped API token you generate (Zone:Edit + DNS:Edit).
    - **Registrar API:** not authorised by this token (`/registrar/domains` → auth error). Domain
      purchase is a dashboard + payment action anyway → always requires you.
- `netlify` CLI **v26.0.1**, logged in as `Henock Hnk` / `henockhnk092@gmail.com`, team **HNK**.
  Workspace is **not** linked to a Netlify project yet.
- `node` v24, `npm`, `npx`, `git`, `curl`, `openssl`, `nslookup` present. `dig` / `whois` **not** installed.

### Cloudflare account state
- **Zones: 0** — no domains are on Cloudflare yet. Clean slate.
- **Pages projects: 15** (all `*.pages.dev`, no custom domains, no Git integration — direct uploads).
  Nearest-named existing project: `hnk-energy-showcase` (energy showcase — **not** reused; new site
  will be its own project).
- **Registrar:** no domains.
- **Account 2FA:** `enforce_twofactor = false` → **enable MFA** (recommended in Phase 4 security review).

### Workspace / Git
- Working dir: `C:\Users\henoc\OneDrive\Documents\TIA SPACE INNOVATION 2026\HNK`
- Contents: `domain-email.txt` (spec) + this file only. **Not a Git repository.**
- No existing website code → the HNK IoT Solutions site will be **built from scratch** in Phase 5.

---

## Phase 2 — Domain research (findings)

### Availability (checked via authoritative RDAP, 2026-09-06)

| Domain | Result |
|--------|--------|
| hnkiot.com | ✅ **Available** (Verisign RDAP 404) |
| hnkiotsolutions.com | ✅ Available |
| hnk-iot.com | ✅ Available |
| hnkiot.tech | ✅ Available |
| hnkiot.io | ✅ Available |
| hnkiotsolutions.co.za | ✅ Available (ZACR RDAP 404) |

### Pricing (Cloudflare Registrar = at-cost, registration price = renewal price, no promo trap)

| Domain | Registrar | Reg (USD/yr) | Renewal (USD/yr) | ≈ Reg (ZAR) | ≈ Renewal (ZAR) | Notes |
|--------|-----------|--------------|------------------|-------------|-----------------|-------|
| **hnkiot.com** | **Cloudflare** | **$10.46** | **$10.46** | **≈ R168–183** | **≈ R168–195** | Verisign wholesale rises Nov 1 2026 → ~$11.15 (~R185–200). Free WHOIS privacy + DNSSEC. |
| hnkiot.com | Porkbun | $11.08 | $11.08 | ≈ R178–194 | ≈ R178–194 | Flat, no trap. Slightly more than Cloudflare. |
| hnkiotsolutions.com | Cloudflare | $10.46 | $10.46 | ≈ R168–183 | ≈ R168–195 | 15 chars — long to say/type. Defensive only. |
| hnk-iot.com | Cloudflare | $10.46 | $10.46 | ≈ R168–183 | ≈ R168–195 | Hyphen = dictation/spelling friction. Avoid as primary. |
| hnkiot.io | Cloudflare | ≈ $29–35 | ≈ $29–35 | ≈ R465–560 | ≈ R465–560 | **Over budget.** .io registry/geopolitical uncertainty. |
| hnkiot.io | Porkbun | $28.12 (promo) | **$51.80** | ≈ R450 | ≈ **R830** | Renewal trap. |
| hnkiot.tech | Cloudflare | ≈ $35 | ≈ $35 | ≈ R560 | ≈ R560 | **Over budget.** Weaker trust than .com. |
| hnkiot.tech | Porkbun | $6.99 (promo) | **$50.98** | ≈ R112 | ≈ **R815** | Severe renewal trap. |
| hnkiotsolutions.co.za | local ZA registrar | ≈ R80–150 | ≈ R80–150 | ≈ R80–150 | ≈ R80–150 | Cheapest, but signals "South Africa only" — conflicts with international positioning. Not on Cloudflare Registrar. |

### Recommendation

**Primary domain: `hnkiot.com` via Cloudflare Registrar.**
- Registration: **≈ $10.46 ≈ R168–183** (first year)
- Renewal: **≈ $10.46 / year ≈ R168–195** (at-cost, no markup; ~$11.15 after Nov 2026 registry increase)
- Meets every priority: professional, international (.com), short (7 chars), easy to spell/say, memorable,
  on-brand for IoT/engineering/software, lowest renewal cost of all candidates.
- Well within the "under R250/year" domain target and the R250–R350 first-year infra target
  (hosting/DNS/SSL are R0).

Optional defensive registrations (**only with your approval**, ≈ R168–183/yr each):
`hnkiotsolutions.com` (redirect to primary) and/or `hnkiot.co.za` (local presence).
Not required for the project.

### ⏸ ACTION REQUIRED FROM YOU
Approve purchase of **hnkiot.com** at Cloudflare Registrar (≈ R168–183 first year, same at renewal),
or tell me to adjust. **Nothing has been purchased.** I cannot complete checkout — it needs your
payment card + confirmation in the Cloudflare dashboard.

---

## Cost snapshot (projected, pending approval)

| Item | Provider | First year | Year 2+ |
|------|----------|-----------|---------|
| Domain | Cloudflare Registrar | ≈ R168–183 (actual: $10.46) | ≈ R168–195 |
| DNS / CDN | Cloudflare Free | R0 | R0 |
| SSL | Cloudflare Universal SSL | R0 | R0 |
| Website hosting | Cloudflare Pages Free | R0 | R0 |
| Backend/API | Cloudflare Workers Free (if used) | R0 | R0 |
| Email | TBD in Phase 6 (targeting R0 → low-cost) | TBD | TBD |
| **Total** | | **≈ R170–185 + email** | **≈ R170–195 + email** |
