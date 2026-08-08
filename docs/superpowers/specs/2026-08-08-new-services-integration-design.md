# New Services Integration — Design Spec

**Date:** 2026-08-08
**Status:** Draft — pending user review

## 1. Overview

Raynald Tech ICT is expanding beyond core IT services into three new offerings, currently only documented as marketing flyers/catalogues in `temp/`:

1. **Monthly IT Support Packages** — a 3-tier retainer (Starter / Business / Premium)
2. **Branding & Print Solutions** — apparel printing, signage, and promotional print, alongside an expanded device-repair/CCTV/networking lineup
3. **Wedding Catalogue** — priced wedding stationery, décor, and signage items

This spec defines how each is integrated into the existing Nuxt 3 site (`raynald-tech-ict`) with the smallest structural change that still does the content justice. No implementation has happened yet — this document is the plan to be reviewed before an implementation plan is written.

## 2. Source Material

| File | Content |
|---|---|
| `temp/WhatsApp Image 2026-08-02 at 18.01.31.jpeg` | "Affordable Monthly IT Support" flyer — 3 pricing tiers |
| `temp/WhatsApp Image 2026-08-02 at 18.07.01.jpeg` | "One Stop Tech & Print Solutions" flyer — repairs + branding/print services |
| `temp/Raynald Tech Wedding.pdf` (6 pages, 23MB) | Wedding Catalogue — invitations, décor, ring trays, welcome boards, table numbers, special deals |

## 3. Current State (relevant to this change)

- `pages/services.vue` and `pages/index.vue` render service lists via a single reusable `components/ServiceCard.vue` (title, category, description, expandable bullet specs). No pricing UI, no product photos anywhere on the site today.
- `components/app/Header.vue` has a flat nav array (`navLinks`) shared by desktop and mobile menus: `Home / Services / About` (+ a standalone "Contact Us" button).
- `pages/contact.vue` has a "Service Needed" `<select>` with a hardcoded list of service names, submitted with the contact form.
- Brand tokens (`tailwind.config.ts`): `primary` (#13775F green), `secondary` (#D70000 red), dark-mode via `class` strategy. The wedding catalogue's own visual style (gold/cream/navy, script fonts) does not match this palette.
- Existing "Device Repairs" and "IT Infrastructure" service cards already partially cover phone/computer repair and networking — the new repair content should update these, not duplicate them.

## 4. Decisions

These were confirmed with the stakeholder before writing this spec:

1. **IT Support Packages** → a dedicated pricing section added to `/services` (not a separate `/pricing` page).
2. **Branding & Print Solutions** → new category added within the existing `/services` card grid (not a separate page).
3. **Wedding Catalogue** → a short teaser page with a downloadable PDF (not a full in-site priced catalogue).
4. **Navigation** → stays flat; add nav items only where a new page actually needs one (i.e., only for Weddings).

## 5. Design Detail

### 5.1 IT Support Packages (pricing section on `/services`)

- New component `components/PricingTier.vue`, rendered 3-up in a new section on `pages/services.vue`, placed between the page hero and the existing service-card grid.
- Section heading: "Monthly IT Support Packages" / subheading: "Three packages. One goal. Your business running smoothly."
- Data (from flyer), each tier: name, monthly price, one-line positioning, feature checklist, CTA button:
  - **Starter** — R2200/mo — WhatsApp support, remote support, virus/malware removal, printer setup, Wi-Fi troubleshooting, CCTV checks, device health checks, software installs, backup assistance.
  - **Business** — R3500/mo — everything in Starter, plus up to 10 devices covered, priority support, 2 onsite visits/month, enhanced printer/CCTV support, preventative maintenance, device inventory. Marked visually as "Most Popular."
  - **Premium** — R5000+/mo — everything in Business, plus unlimited remote support, multiple onsite visits, backup management, 24/7 network monitoring, full CCTV management, priority response, proactive maintenance.
- CTA on each tier routes to `/contact` with the package name pre-selected in the "Service Needed" field (via query param, e.g. `/contact?service=Business%20Package`); `contact.vue` reads the query param on mount and pre-fills `form.service`.
- `contact.vue`'s service `<select>` options list gets the three package names added.
- Mobile: tiers stack vertically in Starter → Business → Premium order; Business keeps its "Most Popular" badge.
- Pricing values live in a plain `ref`/array in the component (matching how `allServices` is authored today) — no CMS, so future price changes are a code edit.

### 5.2 Branding & Print Solutions (new category in `/services` grid)

- Update existing cards rather than duplicate:
  - "Device Repairs" card specs updated to explicitly list cell phone repairs, laptop repair, and printer repair & maintenance.
  - "IT Infrastructure" card specs updated to explicitly list CCTV camera supply/installation and network installations (LAN/Wi-Fi/structured cabling).
- Add two new `ServiceCard` entries under a new category, **"Branding & Print Solutions"**:
  1. **Printed Apparel & Promotional Items** — gazebos, t-shirt printing, sublimation (mugs/cups/plates), embroidery, workwear/contisuit printing.
  2. **Signage & Print Media** — signage, pull-up banners, x-banners, chromadec boards, business cards, flyers, product labeling.
- No prices shown for these (the source flyer doesn't list any) — each card's expand view ends with a "Get a Quote" link to `/contact` instead of a spec-only list, consistent with how repair/IT cards behave today (no pricing anywhere in `ServiceCard`, so no component change needed here beyond content).
- `contact.vue` service list gets "Branding & Print" added.
- Homepage `featuredServices` (in `pages/index.vue`) is left as-is by default; swapping in a Branding & Print card there is a one-line optional enhancement, not required for this spec.

### 5.3 Wedding Catalogue (new `/weddings` teaser page)

- New route `pages/weddings.vue`, following the same structural pattern as `pages/services.vue` / `pages/about.vue` (dark `primary-900` hero, `container mx-auto` content, `useSeoMeta` block).
- Hero: heading "Wedding Stationery, Décor & Signage", sub-copy "Designed for your big day."
- A simple category overview grid (reusing the `ServiceCard` shell without the expandable specs, or a lightweight new presentational-only card) covering: Invitations & Stationery, Décor & Backdrops, Ring Trays, Welcome Boards, Table Numbers, Personalized Gifts. No per-item prices are shown on-site (avoids a second place prices go stale).
- Primary CTA block: "Download our Wedding Catalogue (PDF)" button linking to a hosted, compressed copy of the catalogue, plus a "Request a Quote" button linking to `/contact`.
- The catalogue's "15% off orders over R3000" promo is shown as a callout banner. **Flagged as a risk below** — it has no visible expiry and needs an owner decision before publishing.
- New nav entry `{ label: 'Weddings', path: '/weddings' }` added to the single `navLinks` array in `components/app/Header.vue` (covers desktop and mobile since both consume the same array).
- `contact.vue` service list gets "Wedding Stationery & Décor" added.
- Visual tone: page keeps the site's existing header/footer/brand chrome as-is (no palette fork at the site-chrome level). Within the page's own content area, warmer neutral/accent tones may be used sparingly to nod at the catalogue's elegant look, but this is a visual-polish decision to confirm during implementation, not a structural one.

### 5.4 Asset & content prep (prerequisite work, not page-building)

- `temp/Raynald Tech Wedding.pdf` is 23MB — must be compressed (target: under ~5MB) before being hosted, then moved to `public/documents/raynald-tech-wedding-catalogue.pdf`. At 23MB it would meaningfully hurt page weight and mobile download time.
- The two flyer images and the wedding PDF are composite marketing graphics, not individual product photos — there are no cropped, reusable photo assets for the category tiles in `5.2`/`5.3`. Two options, to be decided during implementation:
  - Ship v1 icon-first (matching the existing `ServiceCard` visual style, no photos), or
  - Source/crop individual photos per category before building the tiles.
- Files in `temp/` are working source material, not site assets — nothing in `temp/` gets referenced directly from site code; anything used gets copied/optimized into `public/` first.

## 6. Suggested Sequencing

The three pieces are independent and can ship separately:

1. **IT Support Packages pricing section** — smallest, highest business value (recurring revenue), touches only `services.vue` + one new component.
2. **Branding & Print category** — moderate effort, extends the existing card grid and contact form list.
3. **Weddings teaser page** — largest effort: new page, new nav entry, plus the PDF compression/hosting prerequisite in 5.4.

## 7. Risks / Open Questions

- **Stale promo pricing**: the "15% off orders over R3000" banner and all package/print prices are hardcoded with no expiry mechanism. Recommend the stakeholder treat these as things to actively revisit, since nothing on the site will flag them as outdated.
- **Missing product photography**: see 5.4 — category tiles for Branding & Print and Weddings may need real photos sourced separately from the flyers.
- **PDF hosting weight**: needs compression before publishing (5.4).

## 8. Testing / Acceptance Criteria

- Pricing section renders correctly at desktop and mobile widths, and in dark mode.
- Contact form pre-fills the correct "Service Needed" value when arriving from a pricing tier CTA.
- New Branding & Print cards behave identically to existing cards (expand/collapse, dark mode).
- `/weddings` is reachable from the nav, the PDF link downloads a working file, and the "Request a Quote" CTA lands on `/contact`.
- No visual or functional regressions on `/`, `/services`, `/about`, `/contact`.
- New/updated images have alt text; new nav link and CTAs are keyboard-navigable (matches existing accessibility patterns on the site, e.g. skip-nav link in `Header.vue`).

## 9. Out of Scope

- Online payments or an e-commerce cart for print or wedding items.
- A mega-menu or dropdown navigation rework.
- A separate subdomain/microsite for the wedding line.
- CMS integration — content stays hardcoded in Vue files, consistent with the rest of the site today.
