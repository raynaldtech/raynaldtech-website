# IT Support Packages Pricing Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 3-tier "Monthly IT Support Packages" pricing section to `/services`, with each tier's CTA pre-filling the contact form.

**Architecture:** One new presentational component (`PricingTier.vue`) rendered 3-up from a data array in `pages/services.vue`, placed between the page hero and the existing service-card grid. Each tier's CTA is a `NuxtLink` to `/contact` carrying the package name as a query param; `contact.vue` reads that param on mount to pre-select the "Service Needed" dropdown.

**Tech Stack:** Nuxt 3 (Vue 3 `<script setup>`), Tailwind CSS (existing `primary`/`secondary`/`neutral` tokens, `dark:` variants), `@heroicons/vue`. No test framework is configured in this repo — verification is via `npm run build` (compiles/type-checks) and manual checks in `npm run dev`.

## Global Constraints

- Package names and prices are copied verbatim from `temp/WhatsApp Image 2026-08-02 at 18.01.31.jpeg`: Starter R2200/month, Business R3500/month, Premium R5000+/month.
- Business tier is visually marked "Most Popular" (per spec §5.1).
- No new dependencies — use only what's already in `package.json`.
- Follow existing component conventions: Tailwind utility classes only, `dark:` variants on every color class, no scoped `<style>` blocks unless the file already has one.
- This plan only adds the three IT package names to the contact form's service dropdown — it does NOT add "Branding & Print" or "Wedding Stationery & Décor" (those belong to their own plans).

---

### Task 1: Build the `PricingTier` presentational component

**Files:**
- Create: `components/PricingTier.vue`

**Interfaces:**
- Produces: `PricingTier.vue` component with props `name: string` (required), `price: string` (required), `priceSuffix?: string` (default `'/month'`), `tagline?: string` (default `''`), `features: string[]` (default `[]`), `featured?: boolean` (default `false`). No emits. Renders a CTA `NuxtLink` to `{ path: '/contact', query: { service: name } }`.

- [ ] **Step 1: Write the component**

```vue
<template>
  <article class="relative bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 flex flex-col h-full"
    :class="featured ? 'ring-2 ring-secondary' : ''">
    <span v-if="featured"
      class="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
      Most Popular
    </span>

    <h3 class="text-xl font-heading text-primary dark:text-primary-300 mb-2">{{ name }}</h3>

    <p class="mb-4">
      <span class="text-3xl font-heading text-neutral-900 dark:text-neutral-100">{{ price }}</span>
      <span class="text-neutral-500 dark:text-neutral-400 ml-1">{{ priceSuffix }}</span>
    </p>

    <p class="text-neutral-600 dark:text-neutral-300 mb-6">{{ tagline }}</p>

    <ul class="space-y-3 mb-8 flex-1">
      <li v-for="(feature, index) in features" :key="index" class="flex items-start gap-2">
        <span class="text-primary-600">•</span>
        <span class="text-neutral-700 dark:text-neutral-300">{{ feature }}</span>
      </li>
    </ul>

    <NuxtLink :to="{ path: '/contact', query: { service: name } }"
      class="block text-center bg-secondary hover:bg-red-800 dark:hover:bg-red-900 dark:bg-red-800 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300">
      Get Started
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, required: true },
  price: { type: String, required: true },
  priceSuffix: { type: String, default: '/month' },
  tagline: { type: String, default: '' },
  features: { type: Array as () => string[], default: () => [] },
  featured: { type: Boolean, default: false }
})
</script>
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build completes with no errors (the component isn't used anywhere yet, so this only checks it's valid Vue/TS — Nuxt will not fail on an unused component).

- [ ] **Step 3: Commit**

```bash
git add components/PricingTier.vue
git commit -m "feat: add PricingTier presentational component"
```

---

### Task 2: Add the pricing section to `/services`

**Files:**
- Modify: `pages/services.vue`

**Interfaces:**
- Consumes: `PricingTier` component from Task 1 with props `name, price, priceSuffix, tagline, features, featured`.

- [ ] **Step 1: Add the `pricingTiers` data array**

In `pages/services.vue`, inside `<script setup lang="ts">`, add this above the existing `const allServices = ref([...])`:

```ts
const pricingTiers = ref([
  {
    name: 'Starter Package',
    price: 'R2200',
    priceSuffix: '/month',
    tagline: 'Essential IT support to keep your business running without interruptions.',
    features: [
      'WhatsApp Support',
      'Remote Support',
      'Virus & Malware Removal',
      'Printer Setup & Support',
      'Wi-Fi Troubleshooting',
      'CCTV Checks',
      'Device Health Checks',
      'Software Installs',
      'Backup Assistance'
    ],
    featured: false
  },
  {
    name: 'Business Package',
    price: 'R3500',
    priceSuffix: '/month',
    tagline: 'More coverage, faster support and proactive care for your growing business.',
    features: [
      'Everything in Starter, plus:',
      'Up to 10 Devices Covered',
      'Priority Support',
      '2 Onsite Visits Per Month',
      'Enhanced Printer Support',
      'Enhanced CCTV Support',
      'Preventative Maintenance',
      'Device Inventory'
    ],
    featured: true
  },
  {
    name: 'Premium Package',
    price: 'R5000+',
    priceSuffix: '/month',
    tagline: 'Complete IT care with maximum uptime, security and peace of mind.',
    features: [
      'Everything in Business, plus:',
      'Unlimited Remote Support',
      'Multiple Onsite Visits',
      'Backup Management',
      '24/7 Network Monitoring',
      'Full CCTV Support',
      'Priority Response',
      'Proactive System Maintenance'
    ],
    featured: false
  }
])
```

- [ ] **Step 2: Add the pricing section markup**

In the `<template>`, insert a new `<section>` immediately after the closing `</section>` of the existing hero block and before the `<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-16">` that renders `allServices`:

```html
      <section class="py-16">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-heading text-primary dark:text-primary-300 mb-4">
            Monthly IT Support Packages
          </h2>
          <p class="text-neutral-600 dark:text-neutral-300">
            Three packages. One goal. Your business running smoothly.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 items-start">
          <PricingTier v-for="(tier, index) in pricingTiers" :key="index" :name="tier.name" :price="tier.price"
            :price-suffix="tier.priceSuffix" :tagline="tier.tagline" :features="tier.features"
            :featured="tier.featured" />
        </div>
      </section>
```

- [ ] **Step 3: Manually verify in the browser**

Run: `npm run dev`, open `http://localhost:3000/services`.

Confirm:
- Three pricing cards render in order Starter, Business, Premium, each with correct price and feature list.
- The Business card shows the "Most Popular" badge and a visible highlight ring.
- Resize to mobile width (or use devtools responsive mode) — cards stack in a single column, remain readable.
- Toggle dark mode (site's `ThemeToggle` in the header) — text and backgrounds remain legible, no unstyled/invisible text.

- [ ] **Step 4: Verify the production build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add pages/services.vue
git commit -m "feat: add monthly IT support packages pricing section to services page"
```

---

### Task 3: Pre-fill the contact form from a pricing tier CTA

**Files:**
- Modify: `pages/contact.vue`

**Interfaces:**
- Consumes: query param `service` (string) on the `/contact` route, as set by `PricingTier`'s CTA link (`?service=Starter%20Package` etc.).

- [ ] **Step 1: Add the three package names to the service dropdown**

In `pages/contact.vue`, find:

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

Replace with:

```ts
const services = ref([
  'Network Installation',
  'Hardware Maintenance',
  'Software Support',
  'Device Repair',
  'IT Consulting',
  'Security Audit',
  'Starter Package',
  'Business Package',
  'Premium Package'
])
```

- [ ] **Step 2: Pre-fill `form.service` from the query param**

Still in `pages/contact.vue`, find the `onMounted` block that loads the reCAPTCHA script:

```ts
// Load reCAPTCHA script
onMounted(() => {
  const script = document.createElement('script')
  script.src = `https://www.google.com/recaptcha/api.js?render=${config.public.recaptchaSiteKey}`
  document.head.appendChild(script)
})
```

Add a `useRoute()` call near the top of the `<script setup>` block (alongside the existing `const config = useRuntimeConfig()`):

```ts
const route = useRoute()
```

Then extend the `onMounted` block to also pre-fill the form:

```ts
// Load reCAPTCHA script
onMounted(() => {
  const script = document.createElement('script')
  script.src = `https://www.google.com/recaptcha/api.js?render=${config.public.recaptchaSiteKey}`
  document.head.appendChild(script)

  const requestedService = route.query.service
  if (typeof requestedService === 'string' && services.value.includes(requestedService)) {
    form.service = requestedService
  }
})
```

- [ ] **Step 3: Manually verify end to end**

Run: `npm run dev`. From `/services`, click each pricing tier's "Get Started" button in turn.

Confirm for each: the browser navigates to `/contact?service=<Package%20Name>` and the "Service Needed" dropdown is already showing the matching package name (not the "Select a service" placeholder).

- [ ] **Step 4: Verify the production build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add pages/contact.vue
git commit -m "feat: pre-fill contact form service field from pricing tier CTA"
```
