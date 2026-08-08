# Weddings Teaser Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a `/weddings` teaser page introducing the wedding stationery/décor line, with a downloadable catalogue PDF and a "Request a Quote" CTA, reachable from the main nav.

**Architecture:** One new presentational component (`WeddingCategoryCard.vue`) for the category overview grid, one new page (`pages/weddings.vue`) following the same hero + `useSeoMeta` pattern as `pages/services.vue`/`pages/about.vue`, plus a compressed copy of the source PDF hosted under `public/documents/`. No per-item prices are shown on the page (per spec §5.3, to avoid a second place prices go stale).

**Tech Stack:** Nuxt 3 (Vue 3 `<script setup>`), Tailwind CSS, `@heroicons/vue`, PyMuPDF (`fitz`, already installed in this environment) for the one-time PDF compression step. No test framework is configured — verification is via `npm run build` and manual checks in `npm run dev`.

## Global Constraints

- Content is copied from `temp/Raynald Tech Wedding.pdf` (6-page catalogue).
- No per-item prices from the catalogue are published on the page (spec §5.3 decision).
- The source PDF is 23MB and must be compressed to under ~5MB before being hosted (spec §5.4/§7).
- Site chrome (header/footer/brand colors) stays as-is — no palette fork at that level (spec §5.3).
- Navigation stays flat — add exactly one new nav entry, "Weddings" (spec §4, decision 4).
- New page's `robots` SEO meta uses the value `'index, follow'` (the valid/correct value) even though some existing pages in this repo use non-standard values like `'services, follow'` — that's a pre-existing issue on other pages, out of scope for this plan, not a pattern to replicate.

---

### Task 1: Compress the wedding catalogue PDF and host it as a public asset

**Files:**
- Create: `public/documents/raynald-tech-wedding-catalogue.pdf`

- [ ] **Step 1: Create the destination directory**

```bash
mkdir -p public/documents
```

- [ ] **Step 2: Run the compression script**

The source PDF (`temp/Raynald Tech Wedding.pdf`) is 23MB because each page is a high-resolution embedded image. Re-render each page at a web-appropriate resolution and re-save as JPEG-backed pages:

```bash
python -c "
import fitz
src = fitz.open('temp/Raynald Tech Wedding.pdf')
out = fitz.open()
for page in src:
    pix = page.get_pixmap(dpi=150)
    img_bytes = pix.tobytes('jpg', jpg_quality=70)
    rect = page.rect
    new_page = out.new_page(width=rect.width, height=rect.height)
    new_page.insert_image(rect, stream=img_bytes)
out.save('public/documents/raynald-tech-wedding-catalogue.pdf', garbage=4, deflate=True)
out.close()
src.close()
print('done')
"
```

- [ ] **Step 3: Verify the output**

```bash
ls -la public/documents/raynald-tech-wedding-catalogue.pdf
```

Expected: file exists and is under 5MB. Open it in a PDF viewer and confirm all 6 pages are present and legible (text and photos still readable, some JPEG softness on photos is acceptable).

If the file is still too large, lower `dpi` to `120` or `jpg_quality` to `60` in the script and re-run.

- [ ] **Step 4: Commit**

```bash
git add public/documents/raynald-tech-wedding-catalogue.pdf
git commit -m "asset: add compressed wedding catalogue PDF"
```

---

### Task 2: Build the `WeddingCategoryCard` presentational component

**Files:**
- Create: `components/WeddingCategoryCard.vue`

**Interfaces:**
- Produces: `WeddingCategoryCard.vue` component with props `title: string` (required), `description: string` (required), and an `#icon` slot. No expand/collapse behavior, no price display — this is intentionally simpler than `ServiceCard.vue`.

- [ ] **Step 1: Write the component**

```vue
<template>
  <article class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 h-full text-center">
    <div
      class="mx-auto mb-4 w-14 h-14 rounded-lg bg-primary-100 dark:bg-neutral-700 flex items-center justify-center">
      <slot name="icon"></slot>
    </div>
    <h3 class="text-lg font-heading text-primary dark:text-primary-300 mb-2">{{ title }}</h3>
    <p class="text-neutral-600 dark:text-neutral-300 text-sm">{{ description }}</p>
  </article>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true }
})
</script>
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/WeddingCategoryCard.vue
git commit -m "feat: add WeddingCategoryCard presentational component"
```

---

### Task 3: Build the `/weddings` page

**Files:**
- Create: `pages/weddings.vue`

**Interfaces:**
- Consumes: `WeddingCategoryCard` from Task 2 (props `title`, `description`, `#icon` slot), the compressed PDF from Task 1 at `/documents/raynald-tech-wedding-catalogue.pdf`.

- [ ] **Step 1: Write the page**

```vue
<template>
  <div>
    <main class="container mx-auto px-4 pb-16">
      <!-- Hero Section -->
      <section class="bg-primary-900 text-neutral-100 py-20">
        <div class="container mx-auto px-4 text-center max-w-4xl">
          <h1 class="text-4xl md:text-6xl font-heading mb-6 animate-fade-in">
            Wedding Stationery, Décor & Signage
          </h1>
          <p class="text-xl text-primary-200 max-w-2xl mx-auto mb-8">
            Designed for your big day.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/documents/raynald-tech-wedding-catalogue.pdf" download
              class="btn-secondary" aria-label="Download our wedding catalogue PDF">
              Download Our Wedding Catalogue (PDF)
            </a>
            <NuxtLink :to="{ path: '/contact', query: { service: 'Wedding Stationery & Décor' } }"
              class="block text-center bg-white text-primary-900 px-6 py-3 rounded-lg font-medium hover:bg-neutral-100 transition-colors duration-300">
              Request a Quote
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Promo Banner -->
      <!-- Copied from the source catalogue (undated) - confirm this offer is still valid before publishing, and periodically after. -->
      <section class="bg-secondary-50 dark:bg-neutral-800 border border-secondary-200 dark:border-neutral-700 rounded-xl mt-12 p-6 text-center">
        <p class="text-secondary-700 dark:text-secondary-300 font-heading text-lg">
          Get 15% off if your order is more than R3000
        </p>
      </section>

      <!-- Category Overview -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        <WeddingCategoryCard v-for="(category, index) in categories" :key="index" :title="category.title"
          :description="category.description">
          <template #icon>
            <component :is="category.icon" class="w-8 h-8 text-primary" />
          </template>
        </WeddingCategoryCard>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
import { EnvelopeIcon, PhotoIcon, SparklesIcon, RectangleGroupIcon, HashtagIcon, GiftIcon } from '@heroicons/vue/24/outline'

const categories = ref([
  {
    title: 'Invitations & Stationery',
    description: 'Custom wedding invitations, programs and pocket-fold stationery.',
    icon: EnvelopeIcon
  },
  {
    title: 'Décor & Backdrops',
    description: 'Elegant backdrops, welcome boards and reception styling.',
    icon: PhotoIcon
  },
  {
    title: 'Ring Trays',
    description: 'Engraved ring trays and personalized engagement displays.',
    icon: SparklesIcon
  },
  {
    title: 'Welcome Boards',
    description: 'Custom welcome signage for your ceremony and reception.',
    icon: RectangleGroupIcon
  },
  {
    title: 'Table Numbers',
    description: 'Table numbers in a range of styles, from rustic wood to gold foil.',
    icon: HashtagIcon
  },
  {
    title: 'Personalized Gifts',
    description: 'Personalized keepsakes and gifts for your wedding party.',
    icon: GiftIcon
  }
])

useSeoMeta({
  title: 'Wedding Stationery, Décor & Signage Nelspruit | Raynald Tech',
  description: 'Custom wedding invitations, décor, ring trays, welcome boards and table numbers, designed and printed in Nelspruit by Raynald Tech.',
  keywords: 'wedding stationery Nelspruit, wedding invitations Mpumalanga, wedding decor printing, wedding signage',
  ogTitle: 'Wedding Stationery & Décor - Raynald Tech',
  ogDescription: 'Designed for your big day - invitations, décor, ring trays, welcome boards and more.',
  ogUrl: `${config.public.siteUrl}/weddings`,
  robots: 'index, follow'
})
</script>
```

- [ ] **Step 2: Manually verify in the browser**

Run: `npm run dev`, open `http://localhost:3000/weddings`.

Confirm:
- Hero renders with heading, sub-copy, and both CTA buttons.
- "Download Our Wedding Catalogue (PDF)" downloads/opens the file produced in Task 1.
- "Request a Quote" navigates to `/contact?service=Wedding%20Stationery%20%26%20D%C3%A9cor` with that service pre-selected in the dropdown (this pre-fill logic was added in the IT Support Packages plan's Task 3 — if that plan hasn't been implemented yet, the dropdown will just show the placeholder instead, which is an acceptable interim state).
- All 6 category cards render with correct icons, titles, and descriptions.
- Dark mode and mobile width both remain legible.

- [ ] **Step 3: Verify the production build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add pages/weddings.vue
git commit -m "feat: add weddings teaser page"
```

---

### Task 4: Add the "Weddings" nav link and allow it in robots config

**Files:**
- Modify: `components/app/Header.vue`
- Modify: `nuxt.config.ts`

- [ ] **Step 1: Add the nav entry**

In `components/app/Header.vue`, find:

```ts
const navLinks = [
    { label: 'Home', path: '/', current: true },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
]
```

Replace with:

```ts
const navLinks = [
    { label: 'Home', path: '/', current: true },
    { label: 'Services', path: '/services' },
    { label: 'Weddings', path: '/weddings' },
    { label: 'About', path: '/about' },
]
```

This single array feeds both the desktop and mobile menus, so no other template change is needed.

- [ ] **Step 2: Allow the route in robots config**

In `nuxt.config.ts`, find:

```ts
  robots: {
    allow: ['/', '/about', 'services','/contact'],
    //disallow: ['/admin'],
  },
```

Replace with:

```ts
  robots: {
    allow: ['/', '/about', 'services', '/contact', '/weddings'],
    //disallow: ['/admin'],
  },
```

(The pre-existing `'services'` entry is missing its leading slash — that's an existing issue on an unrelated route and is out of scope for this plan; leave it as-is.)

- [ ] **Step 3: Manually verify**

Run: `npm run dev`. Confirm "Weddings" appears in both the desktop nav and the mobile menu (resize/devtools), between "Services" and "About", and clicking it navigates to `/weddings` with the active-link underline styling applied when on that page.

- [ ] **Step 4: Commit**

```bash
git add components/app/Header.vue nuxt.config.ts
git commit -m "feat: add Weddings nav link and robots allow entry"
```

---

### Task 5: Add "Wedding Stationery & Décor" to the contact form's service dropdown

**Files:**
- Modify: `pages/contact.vue`

- [ ] **Step 1: Add the option**

In `pages/contact.vue`, find the `services` array (append to whatever entries already exist from the other plans):

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

Add `'Wedding Stationery & Décor'` as a new entry:

```ts
const services = ref([
  'Network Installation',
  'Hardware Maintenance',
  'Software Support',
  'Device Repair',
  'IT Consulting',
  'Security Audit',
  'Wedding Stationery & Décor'
])
```

- [ ] **Step 2: Manually verify end to end**

Run: `npm run dev`. From `/weddings`, click "Request a Quote" — confirm you land on `/contact` with "Wedding Stationery & Décor" pre-selected in the "Service Needed" dropdown.

- [ ] **Step 3: Commit**

```bash
git add pages/contact.vue
git commit -m "content: add Wedding Stationery & Décor to contact form service options"
```
