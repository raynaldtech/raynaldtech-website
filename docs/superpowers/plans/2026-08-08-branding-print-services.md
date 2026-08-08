# Branding & Print Solutions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the existing repair-related service cards on `/services` to explicitly cover the items from the "One Stop Tech & Print Solutions" flyer, and add a new "Branding & Print Solutions" category with two new service cards.

**Architecture:** No new components — reuses the existing `ServiceCard.vue` and the `allServices` data array already in `pages/services.vue`. This is a content-only change: edit two existing array entries, add two new ones, and add one new option to the contact form's service dropdown.

**Tech Stack:** Nuxt 3 (Vue 3 `<script setup>`), Tailwind CSS, `@heroicons/vue`. No test framework is configured — verification is via `npm run build` and manual checks in `npm run dev`.

## Global Constraints

- Content is copied from `temp/WhatsApp Image 2026-08-02 at 18.07.01.jpeg`.
- No pricing is shown for these items (the source flyer lists none) — cards use the existing `ServiceCard` expand/specs pattern only, no new UI.
- Do not modify `pages/index.vue` (`featuredServices`) — the spec (§5.2) leaves the homepage as-is; swapping a card there is an optional follow-up, not part of this plan.
- Follow existing `allServices` entry shape exactly: `{ title, category, description, specifications: string[], icon }` (icon is a Heroicons component reference; see `pages/services.vue` for the existing import style).

---

### Task 1: Update existing repair-related cards with the new specifics

**Files:**
- Modify: `pages/services.vue`

- [ ] **Step 1: Add printer repair to the "Device Repairs" card**

In `pages/services.vue`, find the `Device Repairs` entry in `allServices`:

```ts
  {
    title: 'Device Repairs',
    category: 'Hardware Services',
    description: 'Expert repair services for all your electronic devices',
    specifications: [
      'Cellphone repairs',
      'Computer hardware repair',
      'Component replacement',
      'Diagnostic testing'
    ],
    icon: DevicePhoneMobileIcon
  },
```

Replace its `specifications` array with:

```ts
    specifications: [
      'Cellphone repairs (screens, batteries, charging ports)',
      'Laptop repair (hardware & software)',
      'Computer hardware repair',
      'Printer repair & maintenance',
      'Component replacement',
      'Diagnostic testing'
    ],
```

- [ ] **Step 2: Add CCTV to the "IT Infrastructure" card**

In the same file, find the `IT Infrastructure` entry:

```ts
  {
    title: 'IT Infrastructure',
    category: 'Enterprise Solutions',
    description: 'Complete technology infrastructure design and implementation',
    specifications: [
      'Computer network installation',
      'Network architecture design',
      'Cloud integration',
      'Security protocols'
    ],
    icon: CloudIcon
  },
```

Replace its `specifications` array with:

```ts
    specifications: [
      'Computer network installation (LAN, Wi-Fi, structured cabling)',
      'CCTV camera supply, installation & maintenance',
      'Network architecture design',
      'Cloud integration',
      'Security protocols'
    ],
```

- [ ] **Step 3: Manually verify**

Run: `npm run dev`, open `/services`, expand both the "Device Repairs" and "IT Infrastructure" cards, confirm the new bullet points appear.

- [ ] **Step 4: Commit**

```bash
git add pages/services.vue
git commit -m "content: expand device repair and IT infrastructure cards with printer and CCTV coverage"
```

---

### Task 2: Add the "Branding & Print Solutions" category cards

**Files:**
- Modify: `pages/services.vue`

**Interfaces:**
- Consumes: `ServiceCard.vue` (existing, unchanged) with props `title, category, description, specifications`, and an `#icon` slot.

- [ ] **Step 1: Add the two new heroicon imports**

In `pages/services.vue`, find the icon import line:

```ts
import { ComputerDesktopIcon, WrenchScrewdriverIcon, CommandLineIcon, DevicePhoneMobileIcon, PaintBrushIcon, CloudIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'
```

Replace with:

```ts
import { ComputerDesktopIcon, WrenchScrewdriverIcon, CommandLineIcon, DevicePhoneMobileIcon, PaintBrushIcon, CloudIcon, DocumentTextIcon, TagIcon, PrinterIcon } from '@heroicons/vue/24/outline'
```

- [ ] **Step 2: Add the two new entries to `allServices`**

Append these two objects to the end of the `allServices` array (after the existing "Software Solutions" entry, before the closing `])`):

```ts
  {
    title: 'Printed Apparel & Promotional Items',
    category: 'Branding & Print Solutions',
    description: 'Custom branded apparel and promotional items for events, teams and businesses',
    specifications: [
      'Custom branded gazebos',
      'T-shirt printing',
      'Sublimation printing (mugs, cups, plates & more)',
      'Professional embroidery',
      'Contisuit & workwear printing'
    ],
    icon: TagIcon
  },
  {
    title: 'Signage & Print Media',
    category: 'Branding & Print Solutions',
    description: 'Eye-catching signage and print media that build your brand identity',
    specifications: [
      'Outdoor & indoor signage',
      'Pull-up banners',
      'X-banners',
      'Chromadec boards',
      'Business cards',
      'Flyers',
      'Product labeling'
    ],
    icon: PrinterIcon
  }
```

- [ ] **Step 3: Manually verify**

Run: `npm run dev`, open `/services`, confirm both new cards render at the end of the grid with the correct titles, category label "Branding & Print Solutions", and that expanding each shows the correct bullet list. Check dark mode and mobile width same as the existing cards.

- [ ] **Step 4: Verify the production build**

Run: `npm run build`
Expected: build completes with no errors (confirms the new heroicon imports resolve).

- [ ] **Step 5: Commit**

```bash
git add pages/services.vue
git commit -m "feat: add Branding & Print Solutions service cards"
```

---

### Task 3: Add "Branding & Print" to the contact form's service dropdown

**Files:**
- Modify: `pages/contact.vue`

- [ ] **Step 1: Add the option**

In `pages/contact.vue`, find the `services` array (if Task 3 of the IT Support Packages plan has already run, it will include the three package names — add to whatever is currently there):

```ts
const services = ref([
  'Network Installation',
  'Hardware Maintenance',
  'Software Support',
  'Device Repair',
  'IT Consulting',
  'Security Audit'
])
```

Add `'Branding & Print'` as a new entry in the array (order doesn't matter, appending is simplest):

```ts
const services = ref([
  'Network Installation',
  'Hardware Maintenance',
  'Software Support',
  'Device Repair',
  'IT Consulting',
  'Security Audit',
  'Branding & Print'
])
```

- [ ] **Step 2: Manually verify**

Run: `npm run dev`, open `/contact`, open the "Service Needed" dropdown, confirm "Branding & Print" appears as an option.

- [ ] **Step 3: Commit**

```bash
git add pages/contact.vue
git commit -m "content: add Branding & Print to contact form service options"
```
