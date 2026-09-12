<div align="center">
<img src="https://raw.githubusercontent.com/hnkiot/hnkiot-website/main/assets/readme-hero.jpg" alt="HNK IoT Solutions smart energy monitoring hardware" width="100%" />
</div>

<div align="center">

<img src="https://raw.githubusercontent.com/hnkiot/hnkiot-website/main/assets/banner.png" alt="HNK IoT Solutions" width="140" />

# HNK IoT Solutions

Embedded systems, IoT and software, from the circuit board to the cloud.

[![Deploy to Cloudflare Pages](https://github.com/hnkiot/hnkiot-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/hnkiot/hnkiot-website/actions/workflows/deploy.yml)
[![Live site](https://img.shields.io/badge/live-hnkiot.com-0b1220?style=flat-square)](https://hnkiot.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-hosted-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![Last commit](https://img.shields.io/github/last-commit/hnkiot/hnkiot-website?style=flat-square&color=0b1220)](https://github.com/hnkiot/hnkiot-website/commits/main)

**[hnkiot.com →](https://hnkiot.com)**

</div>

---

## Contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Local development](#local-development)
- [Deploy](#deploy)
- [Marketing video](#marketing-video)
- [Project layout](#project-layout)
- [Security](#security)
- [License](#license)

## About

This repository is the source for **hnkiot.com**, the website and email/DNS infrastructure for
**HNK IoT Solutions (Pty) Ltd**, a Cape Town based engineering company registered with the CIPC
in South Africa. HNK IoT Solutions designs and builds embedded systems, IoT and telemetry
solutions, software and dashboards, and provides technical support, networking, energy
monitoring and engineering training, working with clients across South Africa and
internationally.

> [!NOTE]
> This is a company website repository, not an open-source library. It is public for
> transparency and portfolio purposes. Issues and pull requests from outside the team are not
> expected to be actioned, but the code is free to read and reuse under the license below.

## Features

- Single-page, mobile-first React site with GSAP scroll animations and a three.js shader panel
- A scroll-reactive canvas glitch effect on the services grid, matching the original design
  template's interaction pattern
- A full per-service detail view (in-place, no route change) for all 8 services
- A hide-on-scroll-down, show-on-scroll-up header
- A Formspree-backed contact form with a `mailto:` fallback when no endpoint is configured
- Full SEO: sitemap, robots.txt, Open Graph and Twitter meta, `ProfessionalService` JSON-LD
  structured data, verified in Google Search Console and Bing Webmaster Tools
- Cloudflare Web Analytics, no cookies, no consent banner needed
- A reproducible marketing video pipeline: an animated promo built with
  [Motion](https://motion.dev) and recorded to MP4 with Playwright (`npm run record-promo`)

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite, single page, in [`site/`](site/) |
| Animation | GSAP + ScrollTrigger, [Motion](https://motion.dev) for the promo video |
| 3D | three.js, a retinted shader panel in the contact section |
| Hosting | Cloudflare Pages, project `hnkiot` |
| DNS, DNSSEC, SSL | Cloudflare |
| Registrar | Cloudflare Registrar |
| Email | Zoho Mail on `hnkiot.com`, with SPF, DKIM and DMARC |
| Forms | Formspree |
| CI/CD | GitHub Actions, deploys `site/` to Cloudflare Pages on push to `main` |

Everything runs on free tiers. The only recurring cost is the domain renewal.

## Local development

```bash
cd site
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs site/dist
npm run preview    # serve the production build locally
```

## Deploy

```bash
cd site
npm run build
npx wrangler pages deploy dist --project-name=hnkiot --branch=main
```

A GitHub Action in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs this
automatically on every push to `main` that touches `site/`.

## Marketing video

The promo video (vertical, 1080x1920, built with Motion and recorded via a headless browser) is
reproducible:

```bash
cd site
npm run record-promo   # renders site/marketing/promo-out/hnk-promo.mp4
```

Source scene: [`site/marketing/promo/index.html`](site/marketing/promo/index.html).

## Project layout

<details>
<summary>Expand full file tree</summary>

```
site/                       React + Vite source for hnkiot.com
site/src/sections/           page sections (Hero, Works, About, Contact, etc.)
site/src/pages/               ServiceDetail, the per-service view
site/src/data/services.js     the 8 services shown on the site
site/public/sig/              images used in the email signature
site/public/images/           site photography
site/marketing/promo/         Motion-based promo video source
site/scripts/                 record-promo.mjs and other build tooling

img/                         original brand assets
HNK-signature.html            email signature (email safe HTML)
site/public/signature-preview.html   live preview of the signature, at /signature-preview

DNS-RECORDS.md                every DNS record and why it exists
EMAIL-PLAN.md                 email provider comparison and decision
EMAIL-SIGNATURE.md            signature, auto-reply text, and the Zoho API notes
COST-REPORT.md                full first-year and renewal cost breakdown
PROJECT-STATUS.md             build log, phase by phase
marketing/                    social post copy and a NotebookLM video prompt
domain-email.txt              original project brief
```

</details>

## Security

See [SECURITY.md](SECURITY.md) for how to report a vulnerability, and for a record of the one
credential exposure this repository has had and how it was resolved.

> [!IMPORTANT]
> Never commit API tokens, client secrets, or `.env` files. See the root `.gitignore` for the
> current exclusion list.

## License

MIT. See [LICENSE](LICENSE).
