# MailerSend Contact Form Integration — Design Spec

**Date:** 2026-08-09
**Status:** Draft — pending user review

## 1. Overview

Replace the contact form's email delivery mechanism — currently a hardcoded Gmail SMTP transport via `nodemailer` — with MailerSend's transactional email API, using the official `mailersend` npm SDK. This is a transport-layer swap: form validation, sanitization, reCAPTCHA verification, and the email's content (subject/text/html) are unchanged.

## 2. Background

The user asked to "reimplement form submission using mailersend, same implementation as in `C:\workspace_2026\web_development\solid-rock.co.za`." Investigation found that reference project does **not** actually use MailerSend anywhere (confirmed via full-project grep, including `.env`/`.env.example`) — its email system is a generic multi-provider SMTP architecture (`server/utils/email.ts`, `smtp-config.ts`, `antispam.ts`) supporting gmail/mailtrap/mailgun/sendgrid/zoho/ses via `nodemailer`, with none of those providers being MailerSend.

Clarified with the user:
- The email sender should use MailerSend's HTTP API (via the official SDK), not SMTP relay.
- The reference project's **separated-file structure** (dedicated util for send logic, called from the API route) should still be followed, adapted to this project's existing convention of `server/api/utils/` (where `recaptcha.ts` already lives) rather than the reference's `server/utils/`.
- The reference project's anti-spam layer (per-IP rate limiting, spam-keyword content checks) is **not** being ported — this project's existing reCAPTCHA v3 is considered sufficient.
- The sender domain will be `raynaldtech.com` (matching `SITE_URL`), not the current Gmail address.

## 3. Current State

- `server/api/contact.post.ts` — validates required fields, verifies reCAPTCHA via `server/api/utils/recaptcha.ts`, sanitizes inputs with `sanitize-html`, then builds a `nodemailer` transport directly inline (`createTransport({ service: config.mailService, host: config.mailHost, secure: true, auth: { user: config.mailUser, pass: config.mailPassword } })`) and calls `transporter.sendMail(...)`.
- `from` is currently set to the **visitor's own email address** (`"Service Request User" <${body.email}>`) — this only works because Gmail SMTP relay doesn't enforce sender-identity checks on the `from` header the way a transactional API provider does.
- `nuxt.config.ts` `runtimeConfig` exposes `mailService`, `mailHost`, `mailPort` (unused — commented out in the transport config), `mailUser`, `mailPassword`, `contactEmail`, `recaptchaSecretKey`, and public `siteUrl`/`recaptchaSiteKey`.
- `.env` holds real Gmail SMTP credentials (gitignored, not committed). No `.env.example` exists yet, though `.gitignore` already carves out `!.env.example` as an exception — implying one was always intended.
- `package.json` depends on `nodemailer` + `@types/nodemailer`; grep confirms these are used **only** in `contact.post.ts`.
- No existing MailerSend dependency or code anywhere in this project.

## 4. Target State

### 4.1 Dependency changes

- Add `mailersend` (official SDK) to `dependencies`.
- Remove `nodemailer` from `dependencies` and `@types/nodemailer` from `devDependencies` — confirmed unused elsewhere after this change.

### 4.2 New file: `server/api/utils/email.ts`

Mirrors the separation-of-concerns pattern from the reference project's `email.ts`, adapted to this project's simpler needs (no anti-spam layer, no attachment support, no multi-provider abstraction — MailerSend is the only provider). Exports a single `sendEmail` function wrapping the MailerSend SDK:

```ts
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

(SDK class names, constructor shape, and builder methods — `MailerSend`, `EmailParams`, `Sender`, `Recipient`, `.setFrom`/`.setTo`/`.setSubject`/`.setHtml`/`.setText`/`.setReplyTo`, `mailerSend.email.send(...)` — verified against the SDK's current published README before writing this spec.)

### 4.3 `server/api/contact.post.ts` changes

- Remove the `createTransport` import and the inline transporter/`sendMail` block.
- Import `sendEmail` from `./utils/email`.
- Keep all existing logic unchanged: required-field validation, `verifyRecaptcha`, `sanitizeHtml` sanitization, the header-injection-safe `serviceForHeader` value, and the existing subject/text/html template strings.
- Replace the send call with:
  ```ts
  await sendEmail({
    to: config.contactEmail,
    subject: `New Contact Request: ${serviceForHeader}`,
    text: `...` /* unchanged */,
    html: `...` /* unchanged */,
    replyTo: { email: body.email, name: sanitized.name }
  })
  ```
- **Behavioral change (necessary, not optional):** `from` is no longer the visitor's email — it's now the fixed `mailerSendFromEmail` address, since MailerSend rejects sends from unverified sender addresses. The visitor's email moves to `replyTo`, so replying to the notification email still reaches the visitor. This is a correctness fix as much as a migration necessity: the old `from: visitor@example.com` pattern was already questionable practice (borderline spoofing) that happened to work only because Gmail's SMTP relay doesn't validate it.

### 4.4 `nuxt.config.ts` changes

Replace in `runtimeConfig`:
```ts
mailService: process.env.MAIL_SERVICE,
mailHost: process.env.MAIL_HOST,
mailPort: process.env.MAIL_PORT,
mailUser: process.env.MAIL_USER,
mailPassword: process.env.MAIL_PASSWORD,
```
with:
```ts
mailerSendApiKey: process.env.MAILERSEND_API_KEY,
mailerSendFromEmail: process.env.MAILERSEND_FROM_EMAIL,
mailerSendFromName: process.env.MAILERSEND_FROM_NAME,
```
`contactEmail`, `recaptchaSecretKey`, and the `public` block are unchanged.

### 4.5 Environment variables

`.env` (local, gitignored) gets updated: remove `MAIL_SERVICE`/`MAIL_HOST`/`MAIL_PORT`/`MAIL_USER`/`MAIL_PASSWORD`, add:
```
MAILERSEND_API_KEY='your-mailersend-api-key-here'
MAILERSEND_FROM_EMAIL='no-reply@raynaldtech.com'
MAILERSEND_FROM_NAME='Raynald Tech'
```
`CONTACT_EMAIL` and the reCAPTCHA vars are unchanged.

A new `.env.example` file is created (this repo's `.gitignore` already has a `!.env.example` exception, implying one was always intended but never added) documenting all required vars — MailerSend, contact email, reCAPTCHA, site URL — with placeholder values, so the project is self-documenting for future setup.

## 5. Manual Prerequisite (outside this implementation's control)

`raynaldtech.com` must be added and verified as a sender domain in the MailerSend account (SPF/DKIM records configured) before emails will actually send. Until then, MailerSend's API will reject sends with an authentication/domain error. This spec's implementation will be code-complete and buildable regardless, but **cannot be end-to-end verified against a live send** without a real API key and a verified domain — verification is therefore build/type-check plus code-path review, not a live send test.

## 6. Explicitly Out of Scope

- No anti-spam rate-limiting or content-filtering layer (per user decision — reCAPTCHA v3 stands alone).
- No file-attachment support (current form has no file upload field).
- No multi-provider abstraction (MailerSend is the sole provider; no `SmtpProvider`-style enum).
- No redesign of the email's HTML/text content — template strings are carried over unchanged.
- No changes to `pages/contact.vue` (the frontend form) — this is a server-side transport swap only.

## 7. Testing / Acceptance Criteria

- `pnpm run build` completes with no errors (this repo has no automated test framework).
- `server/api/contact.post.ts` no longer imports `nodemailer`; `package.json` no longer lists `nodemailer`/`@types/nodemailer`.
- `server/api/utils/email.ts` exists and is imported by `contact.post.ts`.
- Code review confirms: `from` uses the fixed MailerSend sender identity, `replyTo` carries the visitor's email, and all pre-existing validation/sanitization/reCAPTCHA logic in `contact.post.ts` is untouched.
- `.env.example` exists and documents every env var the app now reads for contact-form email.
- A live send cannot be verified in this environment (no real API key, no verified domain) — this is called out explicitly rather than silently skipped.

## 8. Risks

- If the MailerSend SDK's actual installed-version API differs subtly from what's documented in its README (verified above), `pnpm run build`'s type-checking will catch a mismatch at implementation time — the plan should include installing the package and confirming its type definitions before finalizing `email.ts`'s exact method calls.
- Without a real API key/verified domain, this change is unverifiable end-to-end until the user completes the MailerSend account setup — flagged in §5, not a blocker to implementation.
