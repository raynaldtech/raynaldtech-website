# MailerSend Contact Form Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the contact form's `nodemailer`/Gmail SMTP transport with MailerSend's transactional email API, via the official `mailersend` npm SDK.

**Architecture:** A new `server/api/utils/email.ts` (matching the existing `server/api/utils/recaptcha.ts` convention) wraps the MailerSend SDK behind a single `sendEmail()` function. Task 1 adds this new path additively (old nodemailer path untouched, still builds). Task 2 cuts `contact.post.ts` over to the new path and removes the old one entirely, so the migration never leaves the build in a broken intermediate state.

**Tech Stack:** Nuxt 3 (Vue 3 `<script setup>`, H3 server routes), the `mailersend` npm SDK (`MailerSend`, `EmailParams`, `Sender`, `Recipient` — verified against the SDK's current published README before this plan was written). No test framework is configured in this repo — verification is via `pnpm run build` (compiles/type-checks) and manual review of the request-handling logic.

## Global Constraints

- `from` must be a fixed address on the `raynaldtech.com` domain (e.g. `no-reply@raynaldtech.com`) — MailerSend rejects sends from unverified sender addresses, unlike the old Gmail SMTP relay which didn't check. The visitor's email goes in `replyTo` instead, not `from`.
- No anti-spam rate-limiting or content-filtering layer is being added — reCAPTCHA v3 (already in place, untouched by this plan) is the agreed spam defense.
- No file-attachment support — the current form has no file upload field.
- No multi-provider abstraction — MailerSend is the only provider, no `SmtpProvider`-style enum.
- The email's subject/text/html template strings are carried over verbatim — this plan changes the transport, not the content.
- `pages/contact.vue` (the frontend form) is not touched by this plan.
- This project has no real MailerSend API key or verified sender domain available during implementation — a live end-to-end send cannot be verified. Verification is build success + manual code-path review, and that limitation must be reported, not silently glossed over.

---

### Task 1: Add the MailerSend email util (additive — old path untouched)

**Files:**
- Modify: `package.json` (add `mailersend` dependency)
- Modify: `nuxt.config.ts` (add 3 new runtimeConfig keys, keep the 5 old `mail*` keys for now)
- Create: `server/api/utils/email.ts`

**Interfaces:**
- Produces: `sendEmail(options: SendEmailOptions): Promise<...>` from `server/api/utils/email.ts`, where `SendEmailOptions = { to: string; subject: string; html: string; text: string; replyTo?: { email: string; name?: string } }`. Task 2 is the only consumer.

- [ ] **Step 1: Install the `mailersend` package**

Run: `pnpm add mailersend`

This resolves and pins the current published version automatically — do not hand-edit a version string into `package.json`.

- [ ] **Step 2: Add the new runtimeConfig keys**

In `nuxt.config.ts`, find:

```ts
  runtimeConfig: {
    mailService: process.env.MAIL_SERVICE,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    contactEmail: process.env.CONTACT_EMAIL,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    public: {
      siteUrl: process.env.SITE_URL,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
    }
  },
```

Replace with (the 5 `mail*` keys stay for now — Task 2 removes them once nothing references them):

```ts
  runtimeConfig: {
    mailService: process.env.MAIL_SERVICE,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    mailerSendApiKey: process.env.MAILERSEND_API_KEY,
    mailerSendFromEmail: process.env.MAILERSEND_FROM_EMAIL,
    mailerSendFromName: process.env.MAILERSEND_FROM_NAME,
    contactEmail: process.env.CONTACT_EMAIL,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    public: {
      siteUrl: process.env.SITE_URL,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
    }
  },
```

- [ ] **Step 3: Add the new vars to the local `.env`**

In `.env` (gitignored, local only), add these three lines (placement anywhere in the file is fine, e.g. after the existing `# Email Configuration` block):

```
MAILERSEND_API_KEY='your-mailersend-api-key-here'
MAILERSEND_FROM_EMAIL='no-reply@raynaldtech.com'
MAILERSEND_FROM_NAME='Raynald Tech'
```

Leave the existing `MAIL_SERVICE`/`MAIL_HOST`/`MAIL_PORT`/`MAIL_USER`/`MAIL_PASSWORD` lines in place for now — Task 2 removes them.

- [ ] **Step 4: Write `server/api/utils/email.ts`**

```ts
// server/api/utils/email.ts

import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

export interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text: string
  replyTo?: { email: string; name?: string }
}

export async function sendEmail(options: SendEmailOptions) {
  const config = useRuntimeConfig()

  const mailerSend = new MailerSend({ apiKey: config.mailerSendApiKey })

  const sentFrom = new Sender(config.mailerSendFromEmail, config.mailerSendFromName)
  const recipients = [new Recipient(options.to)]

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(options.subject)
    .setHtml(options.html)
    .setText(options.text)

  if (options.replyTo) {
    emailParams.setReplyTo(new Sender(options.replyTo.email, options.replyTo.name))
  }

  return mailerSend.email.send(emailParams)
}
```

- [ ] **Step 5: Verify it compiles**

Run: `pnpm run build`
Expected: build completes with no errors. This is the real verification that the installed `mailersend` package's actual type definitions match the `MailerSend`/`EmailParams`/`Sender`/`Recipient` usage above — if the SDK's published API has drifted from what's documented, this is where it surfaces. If it fails on a specific method/constructor mismatch, open `node_modules/mailersend`'s type definitions (e.g. `node_modules/mailersend/dist/**/*.d.ts` or its `types/` folder) to find the correct current signature and adjust `email.ts` accordingly — do not guess.

`contact.post.ts` still uses the old nodemailer path unchanged at this point, so the contact form's actual behavior is identical to before this task.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml nuxt.config.ts server/api/utils/email.ts
git commit -m "feat: add MailerSend email util (additive, not yet wired into contact form)"
```

(`.env` is gitignored and won't be included — that's expected.)

---

### Task 2: Cut the contact form over to MailerSend, remove nodemailer entirely

**Files:**
- Modify: `server/api/contact.post.ts`
- Modify: `nuxt.config.ts` (remove the 5 old `mail*` runtimeConfig keys)
- Modify: `package.json` (remove `nodemailer`, `@types/nodemailer`)
- Modify: `.env` (remove the 5 old `MAIL_*` vars)
- Create: `.env.example`

**Interfaces:**
- Consumes: `sendEmail` from `server/api/utils/email.ts` (Task 1), with the `SendEmailOptions` shape defined there.

- [ ] **Step 1: Update `contact.post.ts`**

Find:

```ts
import { RecaptchaResponse } from '@raynaldtech/recaptcha'
import { defineEventHandler, readBody } from 'h3'
import { createTransport } from 'nodemailer'
import sanitizeHtml from 'sanitize-html'
import { verifyRecaptcha } from './utils/recaptcha'
```

Replace with:

```ts
import { RecaptchaResponse } from '@raynaldtech/recaptcha'
import { defineEventHandler, readBody } from 'h3'
import sanitizeHtml from 'sanitize-html'
import { verifyRecaptcha } from './utils/recaptcha'
import { sendEmail } from './utils/email'
```

Then find:

```ts
    // Create Nodemailer transporter
    const transporter = createTransport({
      service: config.mailService,
      host: config.mailHost,
      //port: config.mailPort,
      secure: true,  
      auth: {
        user: config.mailUser,
        pass: config.mailPassword
      }
    })

    // Send email
    await transporter.sendMail({
      from: `"Service Request User" <${body.email}>`,
      to: config.contactEmail,
      subject: `New Contact Request: ${serviceForHeader}`,
      text: `
        Name: ${sanitized.name}
        Email: ${sanitized.email}
        Service: ${serviceForHeader}
        Message: ${sanitized.message}
      `,
      html: `
        <p><strong>Name:</strong> ${sanitized.name}</p>
        <p><strong>Email:</strong> ${sanitized.email}</p>
        <p><strong>Service:</strong> ${sanitized.service}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitized.message.replace(/\n/g, '<br>')}</p>
      `
    })
```

Replace with:

```ts
    // Send email via MailerSend. `from` must be the fixed, domain-verified
    // sender identity — MailerSend rejects sends from arbitrary addresses,
    // unlike the old Gmail SMTP relay. The visitor's email goes in replyTo
    // instead, so replying to the notification still reaches them.
    await sendEmail({
      to: config.contactEmail,
      subject: `New Contact Request: ${serviceForHeader}`,
      text: `
        Name: ${sanitized.name}
        Email: ${sanitized.email}
        Service: ${serviceForHeader}
        Message: ${sanitized.message}
      `,
      html: `
        <p><strong>Name:</strong> ${sanitized.name}</p>
        <p><strong>Email:</strong> ${sanitized.email}</p>
        <p><strong>Service:</strong> ${sanitized.service}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitized.message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: { email: body.email, name: sanitized.name }
    })
```

Everything else in the file (field validation, `verifyRecaptcha`, `sanitized`/`serviceForHeader` construction, the try/catch and error response) is unchanged — do not modify it.

- [ ] **Step 2: Remove the old runtimeConfig keys**

In `nuxt.config.ts`, find:

```ts
  runtimeConfig: {
    mailService: process.env.MAIL_SERVICE,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    mailerSendApiKey: process.env.MAILERSEND_API_KEY,
    mailerSendFromEmail: process.env.MAILERSEND_FROM_EMAIL,
    mailerSendFromName: process.env.MAILERSEND_FROM_NAME,
    contactEmail: process.env.CONTACT_EMAIL,
```

Replace with:

```ts
  runtimeConfig: {
    mailerSendApiKey: process.env.MAILERSEND_API_KEY,
    mailerSendFromEmail: process.env.MAILERSEND_FROM_EMAIL,
    mailerSendFromName: process.env.MAILERSEND_FROM_NAME,
    contactEmail: process.env.CONTACT_EMAIL,
```

(The rest of the `runtimeConfig` block — `recaptchaSecretKey` and the `public` object — is unchanged.)

- [ ] **Step 3: Remove the nodemailer dependency**

Run: `pnpm remove nodemailer @types/nodemailer`

- [ ] **Step 4: Update the local `.env`**

Remove these 5 lines from `.env`:

```
MAIL_SERVICE='Gmail'
MAIL_HOST='smtp.gmail.com'
MAIL_PORT=465
MAIL_USER='raynaldtech@gmail.com'
MAIL_PASSWORD='...'
```

(Leave `CONTACT_EMAIL`, the reCAPTCHA vars, `SITE_URL`, and the `MAILERSEND_*` vars added in Task 1 untouched.)

- [ ] **Step 5: Create `.env.example`**

This repo's `.gitignore` already has a `!.env.example` exception but no such file exists yet. Create `.env.example` at the project root:

```
# Email Configuration (MailerSend)
# API key from your MailerSend account (Integrations > API tokens)
MAILERSEND_API_KEY=your-mailersend-api-key-here
# Must be an address on a domain verified in your MailerSend account
MAILERSEND_FROM_EMAIL=no-reply@raynaldtech.com
MAILERSEND_FROM_NAME="Raynald Tech"
# Where contact form submissions are delivered
CONTACT_EMAIL=info@raynaldtech.com

# reCAPTCHA
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here

# Website URL
SITE_URL=https://raynaldtech.com
```

- [ ] **Step 6: Verify it compiles**

Run: `pnpm run build`
Expected: build completes with no errors. This confirms `contact.post.ts` no longer references the removed `mailService`/`mailHost`/`mailPort`/`mailUser`/`mailPassword` config keys or the removed `nodemailer` import.

- [ ] **Step 7: Manually verify the request-handling code path**

There is no real MailerSend API key or verified sender domain available in this environment, so a live email cannot be sent end-to-end — do not attempt to fake this or claim it was verified. Instead:

Run: `pnpm run dev`, then send a request to the local `/api/contact` endpoint with a syntactically valid but fake `recaptchaToken` (this will fail reCAPTCHA verification before reaching the email step, which is fine — the goal is confirming the route still starts and responds, not exercising the email path). Confirm the server responds with a 4xx error from the reCAPTCHA check (not a 500 from a broken import or missing config), which confirms `contact.post.ts` loads and type-checks correctly at runtime, not just at build time.

If you want to go one step further and are comfortable doing so: temporarily set a placeholder non-empty string for `MAILERSEND_API_KEY` in `.env` (already done in Task 1) and `MAILERSEND_FROM_EMAIL`, then bypass reCAPTCHA by checking how `verifyRecaptcha` behaves with a dummy token in this codebase (note: unlike the reference project, this codebase's `verifyRecaptcha` in `server/api/utils/recaptcha.ts` has no dummy-token bypass — it always calls Google's real siteverify endpoint, so you cannot skip reCAPTCHA locally without a real token). Given that, the practical extent of verification here is: build passes, and code-path review confirms `sendEmail(...)` is called with the correct arguments after reCAPTCHA succeeds. Report this limitation clearly rather than a false claim of end-to-end verification.

- [ ] **Step 8: Commit**

```bash
git add server/api/contact.post.ts nuxt.config.ts package.json pnpm-lock.yaml .env.example
git commit -m "feat: cut contact form over to MailerSend, remove nodemailer"
```

(`.env` is gitignored and won't be included.)
