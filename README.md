# HNK IoT Solutions

Website and online infrastructure for **HNK IoT Solutions**, a South African engineering
and technology company working with clients worldwide.

Live site: **https://hnkiot.com**

Services: embedded systems (ESP32, STM32, Arduino), IoT and telemetry, device to cloud
systems, PCB and prototype work, software development (React, TypeScript, Python, C, C++,
.NET), technical and IT support, and engineering and programming training.

## Stack

| Layer | Choice |
|-------|--------|
| Frontend | React 18 + Vite, static single page, in `site/` |
| Hosting | Cloudflare Pages (project `hnkiot`) |
| DNS, DNSSEC, SSL | Cloudflare |
| Registrar | Cloudflare Registrar |
| Email | Zoho Mail on `hnkiot.com`, with SPF, DKIM and DMARC |

Everything runs on free tiers. The only recurring cost is the domain renewal.

## Local development

```bash
cd site
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs site/dist
```

## Deploy

```bash
cd site
npm run build
npx wrangler pages deploy dist --project-name=hnkiot --branch=main
```

A GitHub Action in `.github/workflows/deploy.yml` runs this automatically on every push to `main`.

## Repository layout

```
site/                 React + Vite source for hnkiot.com
site/public/sig/       images used in the email signature
img/                   original brand assets
HNK-signature.html     email signature (email safe HTML)
DNS-RECORDS.md         every DNS record and why it exists
EMAIL-PLAN.md          email provider comparison and decision
EMAIL-SIGNATURE.md     signature and auto reply text
COST-REPORT.md         full first year and renewal cost breakdown
PROJECT-STATUS.md      build log, phase by phase
domain-email.txt       original project brief
```

## Licence

MIT. See [LICENSE](LICENSE).
