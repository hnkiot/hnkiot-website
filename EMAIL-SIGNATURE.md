# HNK IoT Solutions. Email signatures

**Canonical rich signature:** `HNK-signature.html` (email-safe: tables + inline CSS, no scripts, no web-fonts,
no icon-fonts, no external images besides the hosted photo and banner). This is an adaptation of the
user-supplied `signature.txt` design. That file was a Tailwind-CDN HTML artboard: the `<script>` tag, utility
classes, Material-Symbols icon font, and the temporary googleusercontent photo are all stripped by mail
clients, so it could not be pasted in as-is.

**Status:** originally pushed to Zoho via API on 2026-09-06 as signature id `7723912000000013001`
("HNK IoT Solutions"), position 1, assigned to `henock@` plus all 5 aliases. The old placeholder
signature (`7723912000000012001`) was blanked.

**2026-09-12 update:** the Zoho Self Client credentials used for that API automation were found
committed to this repo's git history (`img/self_client.json`) and had to be treated as compromised.
The old Self Client was deleted in the Zoho API Console, which also invalidated its refresh token. A
new Self Client was created, its credentials kept only in a local, gitignored scratchpad, and API
access was restored the same day: the signature was re-pushed with the social links row and a swapped
profile image (the HNK icon mark instead of a headshot), and the old empty placeholder signature
(`7723912000000012001`) was deleted from the account.

The working endpoint pattern (undocumented publicly, found via testing):
`GET/PUT https://mail.zoho.com/api/organization/{orgId}/accounts/{zuid}/signature`, `org id
938105809`, `zuid 938105669`. A PUT to update requires the full object back: `id`, `name`, `content`,
`position`, plus `assignUsers` and `unassignUsers` (even if the latter is an empty array), or the API
returns a 500 with a `moreInfo` field naming the next missing key. Delete works on the base URL (no id
in the path) with `{"id": "..."}` in the body; an id in the URL path 404s with `URL_RULE_NOT_CONFIGURED`
for every signature verb tried (GET, PUT, DELETE all only work on the base URL).

**Note:** the git history of this repo still contains the old, now-revoked, `img/self_client.json`.
It needs to be stripped from history (not just deleted in a new commit) and force-pushed, pending
explicit approval since that rewrites shared history.

A standalone preview of the live signature is at `https://hnkiot.com/signature-preview`
(`site/public/signature-preview.html`), for checking it without opening a mail client.

To swap in a different signature manually instead of via API: Zoho webmail, Settings, Signatures, edit
the signature, switch to source view (`<>`), paste the contents of `HNK-signature.html`, Save, confirm
it is still the default.

Phone number updated 2026-09-06 to the dedicated WhatsApp number `+27 61 471 9400`, linked via `wa.me`.

Social links row added 2026-09-12: LinkedIn, Instagram, X, Facebook, YouTube, TikTok, Pinterest.

To swap in a different headshot later: host a square photo at `https://hnkiot.com/sig/profile.jpg`
(add to `site/public/sig/`, redeploy). The image is already referenced from `HNK-signature.html`.

Plain-text fallbacks below.

---

## Plain text, primary (`henock@hnkiot.com`)

```
Henock Mukonkole
Founder and Lead Engineer, HNK IoT Solutions

Embedded Systems | IoT | Software Development | Technical Support | Engineering Training

e: henock@hnkiot.com
w: https://hnkiot.com
WhatsApp: +27 61 471 9400
Cape Town, South Africa. Working with clients worldwide.

LinkedIn: https://www.linkedin.com/in/hnk-iot-solutions/
Instagram: https://www.instagram.com/hnkiotsolutions/
X: https://x.com/HnkIotSolutions
Facebook: https://www.facebook.com/HnkIoTSolutions
YouTube: https://www.youtube.com/@HNKIoTSolutions
TikTok: https://www.tiktok.com/@hnkiot
Pinterest: https://www.pinterest.com/HNKIoTSolutions
```

## Plain text, shared / alias (`hello@`, `support@`, `projects@`, `training@`, `accounts@`)

```
HNK IoT Solutions
Embedded Systems | IoT | Software Development | Technical Support | Engineering Training

e: hello@hnkiot.com
w: https://hnkiot.com
WhatsApp: +27 61 471 9400
Cape Town, South Africa. Working with clients worldwide.

LinkedIn: https://www.linkedin.com/in/hnk-iot-solutions/
Instagram: https://www.instagram.com/hnkiotsolutions/
X: https://x.com/HnkIotSolutions
Facebook: https://www.facebook.com/HnkIoTSolutions
YouTube: https://www.youtube.com/@HNKIoTSolutions
TikTok: https://www.tiktok.com/@hnkiot
Pinterest: https://www.pinterest.com/HNKIoTSolutions
```

---

## HTML (optional, simple version for `henock@`)

```html
<table style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#1f2937;line-height:1.5">
  <tr><td style="padding-bottom:2px"><strong style="font-size:14px;color:#0b1220">Henock Mukonkole</strong></td></tr>
  <tr><td style="padding-bottom:6px;color:#33a9d1">Founder and Lead Engineer, HNK IoT Solutions</td></tr>
  <tr><td style="padding-bottom:6px;color:#6b7280;font-size:12px">
    Embedded Systems &nbsp;|&nbsp; IoT &nbsp;|&nbsp; Software Development &nbsp;|&nbsp; Technical Support &nbsp;|&nbsp; Engineering Training
  </td></tr>
  <tr><td>
    <a href="mailto:henock@hnkiot.com" style="color:#1f2937;text-decoration:none">henock@hnkiot.com</a>
    &nbsp;&middot;&nbsp;
    <a href="https://hnkiot.com" style="color:#1f2937;text-decoration:none">hnkiot.com</a>
  </td></tr>
  <tr><td style="color:#6b7280;font-size:12px;padding-top:2px">Cape Town, South Africa. Working with clients worldwide.</td></tr>
</table>
```

This simple version is a fallback only. The live signature is `HNK-signature.html`, pushed via the Zoho API.

> Keep signatures text-first. No tracking pixels and no remote images beyond the hosted photo and banner.
> They hurt deliverability and trip spam filters while the domain is still building reputation.

---

## Auto-reply / Out of Office

**Zoho path:** https://mail.zoho.com/zm/#settings/mail/outofoffice
(Settings, gear icon, Mail, Out of Office, Add or enable)

**Recommended settings**
- Send to: **Everyone** (or "Contacts and Non-Contacts")
- **Reply once every 7 days** to the same sender. This stops it firing on every message in a live thread.
- Date range: leave open, or set a start and end date when actually away
- Keep it short, no images

**Suggested message**

```
Subject: Message received. HNK IoT Solutions

Thank you for contacting HNK IoT Solutions. Your message has been received
and I will reply personally, usually within one business day.

For anything time-critical, please add "URGENT" to your subject line.

Henock Mukonkole
HNK IoT Solutions
Embedded Systems | IoT | Software Development | Technical Support | Engineering Training
https://hnkiot.com

Find us: LinkedIn, Instagram, X, Facebook, YouTube, TikTok and Pinterest, all linked from hnkiot.com
```

> Caution: an always-on auto-reply fires on every inbound mail, including replies during an active
> conversation and responses to cold outreach, which can read as impersonal. Two reasonable options:
> (a) enable it only when genuinely away, or
> (b) keep it on permanently but with the 7-day-per-sender limit above, so each contact sees it once.
> Do not enable auto-reply on a shared alias that could receive automated mail such as bounces or
> newsletters, since that causes reply loops. Set it on `henock@` only.
