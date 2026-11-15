# EasyGSTBilling

**Offline-first GST invoicing for Indian businesses. Runs on your own computer. No account, no subscription, no tracking.**

[![Licence](https://img.shields.io/badge/licence-proprietary-red.svg)](LICENCE-EasyGSTBilling.md)
[![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Docker-blue.svg)](#get-it-running)

EasyGSTBilling turns out GST invoices, purchase bills and return-ready JSON files from a browser tab on your own machine. Your books are plain files in a folder you control — nothing is uploaded anywhere unless you tell it to.

---

## Why this one

- **Your data never leaves the machine.** No cloud, no login, no telemetry. Backups are folders you can see and copy.
- **Return-ready output.** GSTR-1 and GSTR-3B JSON that the GST portal accepts, plus GSTR-2B matching, e-invoice and e-way bill JSON.
- **Tax math you can check.** CGST/SGST/IGST/UTGST split, reverse charge, LUT exports, cess, TDS/TCS with the correct bases and the ₹50 lakh threshold. The engine is one shared module with a regression suite.

## Get it running

### Fastest: Docker (NAS, server, or any machine with Docker)

```bash
git clone https://github.com/Sasuke021990/EasyGSTBilling.git
cd EasyGSTBilling/packaging/docker
cp ../../.env.example .env          # set EASYGST_PIN to 6 or 8 digits
docker compose up -d
docker logs easygstbilling          # shows the pairing link
```

Open the pairing link from a device on your network, accept the certificate warning once, type the PIN. Your books live in the `easygst-data` volume and survive restarts and updates. Never forward port 47443 on your router.

### Desktop (Windows, macOS, Linux)

| System | How |
|---|---|
| Windows 10 / 11 | Run the Setup `.exe` from [Releases](https://github.com/Sasuke021990/EasyGSTBilling/releases/latest), or use the ZIP. |
| macOS 11+ | One line in Terminal (see the release notes for the exact command), then start from Applications. |
| Linux | AppImage or `.deb` from [Releases](https://github.com/Sasuke021990/EasyGSTBilling/releases/latest). |

Needs Node.js 18 or newer only when running from source. The packaged builds carry their own launcher.

### From source

```bash
git clone https://github.com/Sasuke021990/EasyGSTBilling.git
cd EasyGSTBilling
npm ci
npm start          # builds the UI, then serves on http://localhost:47371
```

## The PIN (env file, no startup prompt)

EasyGSTBilling never asks for a PIN at startup. If you want one — for phone pairing or the on-screen **Lock now** button — put it in `.env`:

```bash
EASYGST_PIN=123456        # 6 or 8 digits
```

Reads `.env` from the books folder first, then the app folder. If the books already hold a different PIN, the one in `.env` wins on the next start. `FGSB_PIN` still works as a legacy name.

## What it covers

| Area | In the box |
|---|---|
| Documents | Tax invoice, quotation, sales order, proforma, bill of supply, composition bill, credit note, delivery challan |
| GST | CGST/SGST, IGST, UTGST, place of supply, SEZ, LUT exports, reverse charge, cess, HSN/SAC with UQC |
| Returns | GSTR-1 + GSTR-3B JSON and CSV, GSTR-2B matching, e-invoice JSON, e-way bill JSON, "close the books" period lock |
| Money | Payments at billing time, receipts, cash book, bank statement matching, TDS/TCS (Form 26Q / 27EQ), income tax old vs new regime |
| Stock & purchases | Products with units and secondary units, categories, brands, barcodes, serials, purchase bills, purchase orders, debit notes, supplier payments, expenses |
| Clients | Statements, aging, payment history, credit limits, price levels |
| Look | 5 invoice layouts, 8 colour schemes, dark mode, thermal 58/80 mm receipts, labels in English, Hindi, Tamil, Marathi, Bengali |
| Reach | 23 countries, 20 currencies, multi-business / multi-GSTIN profiles |

## Your data

- Books folder: `data/` inside the app folder (or the folder named in `home.txt` after a Windows setup install). One JSON file per record — inspectable, diffable, restorable by hand.
- Daily backups to a folder you choose; restore any date from the Control Panel. Deleted invoices go to a Trash bin first.
- In and out: CSV/Excel import (including Vyapar and Tally exports), full backup export/import, Tally XML export, multi-invoice PDF bundles.
- Optional Google Drive copy runs in your browser with your own Google account.

## Security notes

- The server answers `http://localhost` only, with a host-header check (blocks DNS rebinding) and strict CORS.
- Phone/tablet access is opt-in, LAN-only, HTTPS with a device pairing code plus the PIN; only token hashes are stored.
- Error reports are redacted (no GSTINs, phone numbers, e-mail addresses, UPI IDs or file paths).
- The full source is published on GitHub, so you can read exactly what the app does. See [SECURITY.md](SECURITY.md) for how to report a problem.

## Development

```bash
npm run lint          # eslint
npm run test:unit     # 44 regression suites: tax, returns, stock, locks, more
npm test              # unit suites + Playwright smoke test
npm run build         # production build with service worker
```

Project layout: `src/` React UI · `src/utils/` domain logic (tax engine in `src/utils.js`) · `server.js` local Express API and file store · `scripts/` tests and release builders · `packaging/` Docker and Linux packaging · `installer/` Windows setup · `docs-site/` user guide source.

Releases are cut with `npm run release:zip` (lint + tests + build + checks).

## Licence

EasyGSTBilling is distributed under a proprietary licence: [LICENCE-EasyGSTBilling.md](LICENCE-EasyGSTBilling.md). In short — you may use it free for your own business bookkeeping on machines you control; you may not redistribute it, resell it, or publish modified builds without written agreement. Your business data created with it is yours.

The upstream portions remain MIT-licensed, and the original licence is kept in [LICENSE](LICENSE) with attribution in [NOTICE](NOTICE): EasyGSTBilling is based on Free GST Billing Software by DiceCodes.

## Contact

- Bugs and ideas: [open an issue](https://github.com/Sasuke021990/EasyGSTBilling/issues/new/choose)
- Everything else: contact@easygstbilling.com
