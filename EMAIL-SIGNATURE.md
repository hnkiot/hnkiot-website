# HNK IoT Solutions — email signatures

**Canonical rich signature:** `HNK-signature.html` (email-safe: tables + inline CSS, no scripts / web-fonts /
icon-fonts / external images). This is an adaptation of the user-supplied `signature.txt` design
(that file was a Tailwind-CDN HTML artboard — `<script>`, utility classes, Material-Symbols icon font
and the temporary googleusercontent photo are all stripped by mail clients, so it can't be pasted as-is).

**Status:** pushed to Zoho via API on 2026-09-06 as signature id `7723912000000013001` ("HNK IoT Solutions"),
position 1, assigned to `henock@` + all 5 aliases. The old placeholder signature (`7723912000000012001`)
was blanked. Confirm it's the default in Zoho webmail: Settings → Signatures.

To swap in a real headshot later: host a square photo at `https://hnkiot.com/sig/henock.jpg`
(add to `site/public/sig/`, redeploy) and replace the `HNK` avatar `<td>` with an `<img>`.

Plain-text fallbacks below.

---

## Plain text — primary (`henock@hnkiot.com`)

```
Henock Mukonkole
Founder & Engineer — HNK IoT Solutions

Embedded Systems | IoT | Software Development | Technical Support | Engineering Training

e: henock@hnkiot.com
w: https://hnkiot.com
Cape Town, South Africa — working with clients worldwide
```

## Plain text — shared / alias (`hello@`, `support@`, `projects@`, `training@`, `accounts@`)

```
HNK IoT Solutions
Embedded Systems | IoT | Software Development | Technical Support | Engineering Training

e: hello@hnkiot.com
w: https://hnkiot.com
Cape Town, South Africa — working with clients worldwide
```

---

## HTML (optional, for `henock@`)

```html
<table style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1f2937;line-height:1.5">
  <tr><td style="padding-bottom:2px"><strong style="font-size:14px;color:#0b1220">Henock Mukonkole</strong></td></tr>
  <tr><td style="padding-bottom:6px;color:#33a9d1">Founder &amp; Engineer — HNK IoT Solutions</td></tr>
  <tr><td style="padding-bottom:6px;color:#6b7280;font-size:12px">
    Embedded Systems &nbsp;|&nbsp; IoT &nbsp;|&nbsp; Software Development &nbsp;|&nbsp; Technical Support &nbsp;|&nbsp; Engineering Training
  </td></tr>
  <tr><td>
    <a href="mailto:henock@hnkiot.com" style="color:#1f2937;text-decoration:none">henock@hnkiot.com</a>
    &nbsp;&middot;&nbsp;
    <a href="https://hnkiot.com" style="color:#1f2937;text-decoration:none">hnkiot.com</a>
  </td></tr>
  <tr><td style="color:#6b7280;font-size:12px;padding-top:2px">Cape Town, South Africa — working with clients worldwide</td></tr>
</table>
```

> Keep signatures text-first. No tracking pixels, no remote images — they hurt deliverability and
> trip spam filters while the domain is still building reputation.

---

## Auto-reply / Out of Office

**Zoho path:** https://mail.zoho.com/zm/#settings/mail/outofoffice
(Settings ⚙ → Mail → Out of Office → Add / enable)

**Recommended settings**
- Send to: **Everyone** (or "Contacts and Non-Contacts")
- **Reply once every 7 days** to the same sender  ← prevents reply loops / nagging
- Date range: leave open, or set start/end when actually away
- Keep it short, no images

**Suggested message**

```
Subject: Message received — HNK IoT Solutions

Thank you for contacting HNK IoT Solutions. Your message has been received
and I will reply personally, usually within one business day.

For anything time-critical, please add "URGENT" to your subject line.

Henock Mukonkole
HNK IoT Solutions
Embedded Systems | IoT | Software Development | Technical Support | Engineering Training
https://hnkiot.com
```

> Caution: an always-on auto-reply fires on *every* inbound mail, including replies during an
> active conversation and cold-outreach responses — that can read as impersonal. Options:
> (a) enable it only when you're genuinely away, or
> (b) keep it on permanently but with the 7-day-per-sender limit above so each contact sees it once.
> Do **not** enable auto-reply on a shared alias that could receive automated mail (bounces,
> newsletters) — reply loops. `henock@` only.
