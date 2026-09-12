# Security

## Reporting a vulnerability

If you find a security issue in this repository or on hnkiot.com, please report it privately
rather than opening a public issue: email **hello@hnkiot.com** or message
[WhatsApp +27 61 471 9400](https://wa.me/27614719400). Include what you found and how to
reproduce it. There is no bug bounty program, but reports are read and acted on.

## Disclosure history

**2026-09-12.** A Zoho Mail Self Client credential file (`img/self_client.json`, containing a
client ID and client secret used for email signature API automation) was found committed in this
repository's git history. It was public, since this repository is public.

Response, in order:

1. The Self Client was deleted in the Zoho API Console, invalidating its client secret and any
   access or refresh tokens issued from it.
2. A new Self Client was created for the same purpose, with its credentials kept only in a local,
   gitignored location, never committed.
3. The exposed file was stripped from the entire git history with `git filter-repo` (not just
   deleted in a new commit, which would have left it recoverable from earlier commits), and the
   rewritten history was force-pushed.
4. `HANDOVER.md` and `.env` files are `.gitignore`d; the ignore list was reviewed and extended
   after this incident.

No evidence of misuse was found. The credential's only scope was
`ZohoMail.accounts.ALL ZohoMail.organization.accounts.ALL ZohoMail.organization.domains.ALL`
against a single mailbox, not a financial or customer-data system.

## What is intentionally not in this repository

- No `.env` files, API tokens, or client secrets. See `.gitignore`.
- No residential or physical business address. HNK IoT Solutions operates as a service-area
  business; no public street address is published anywhere in this repository, the live site, or
  its business listings.
