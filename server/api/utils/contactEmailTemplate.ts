// server/api/utils/contactEmailTemplate.ts
//
// Builds the branded subject/html/text for a contact-form notification
// email. Each builder does its own escaping appropriate to its context —
// callers should pass raw field values, not pre-sanitized ones, so there's
// exactly one place that decides what's safe for HTML vs. plain text.

import sanitizeHtml from 'sanitize-html'

export interface ContactEmailData {
  name: string
  email: string
  service: string
  message: string
  /** Public site URL (e.g. https://raynaldtech.com), used for the logo asset and footer link. */
  siteUrl: string
}

/**
 * Strips newlines/carriage-returns for safe use in single-line contexts
 * (email subject, plain-text field lines) without HTML-escaping.
 */
export function toSingleLine(value: string): string {
  return String(value).replace(/[\r\n]/g, '')
}

export function buildContactEmailSubject(data: Pick<ContactEmailData, 'service'>): string {
  return `New Contact Request: ${toSingleLine(data.service)}`
}

export function buildContactEmailHtml(data: ContactEmailData): string {
  const name = sanitizeHtml(data.name)
  const email = sanitizeHtml(data.email)
  const service = sanitizeHtml(data.service)
  const message = sanitizeHtml(data.message).replace(/\n/g, '<br>')
  const logoUrl = `${data.siteUrl}/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.png`

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Form Submission</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: Arial, Helvetica, sans-serif;
        color: #262626;
      }
      .wrapper {
        width: 100%;
        padding: 32px 16px;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      .header {
        background-color: #041813;
        background-image: linear-gradient(135deg, #13775F 0%, #041813 100%);
        padding: 28px 32px;
        text-align: center;
        border-top: 4px solid #D70000;
      }
      .header img {
        height: 48px;
        margin-bottom: 12px;
      }
      .header .wordmark {
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0.06em;
        color: #ffffff;
        margin: 0;
      }
      .header .tagline {
        font-size: 12px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #8FC4B5;
        margin: 4px 0 0;
      }
      .banner {
        background-color: #d4e8e3;
        color: #041813;
        text-align: center;
        padding: 14px 24px;
        font-size: 16px;
        font-weight: bold;
      }
      .content {
        padding: 32px;
      }
      .service-badge {
        display: inline-block;
        background-color: #13775F;
        color: #ffffff;
        font-size: 13px;
        font-weight: bold;
        letter-spacing: 0.02em;
        padding: 6px 14px;
        border-radius: 999px;
        margin-bottom: 24px;
      }
      .field {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
      }
      .field:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }
      .field-label {
        display: block;
        font-size: 12px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #737373;
        margin-bottom: 6px;
      }
      .field-value {
        font-size: 16px;
        color: #262626;
        line-height: 1.5;
      }
      .field-value a {
        color: #13775F;
        text-decoration: none;
      }
      .footer {
        background-color: #fafafa;
        padding: 24px 32px;
        text-align: center;
        border-top: 1px solid #e5e5e5;
      }
      .footer p {
        margin: 4px 0;
        font-size: 13px;
        color: #737373;
      }
      .footer a {
        color: #13775F;
        text-decoration: none;
      }
      .footer .disclaimer {
        margin-top: 16px;
        font-size: 12px;
        color: #a3a3a3;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="Raynald Tech" width="48" height="48">
          <p class="wordmark">RAYNALD TECH</p>
          <p class="tagline">Raising The Bar</p>
        </div>

        <div class="banner">New Contact Form Submission</div>

        <div class="content">
          <span class="service-badge">${service}</span>

          <div class="field">
            <span class="field-label">Name</span>
            <div class="field-value">${name}</div>
          </div>

          <div class="field">
            <span class="field-label">Email</span>
            <div class="field-value"><a href="mailto:${email}">${email}</a></div>
          </div>

          <div class="field">
            <span class="field-label">Message</span>
            <div class="field-value">${message}</div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Raynald Tech ICT Solutions</strong></p>
          <p>Bester Brown Building, 10 Paul Kruger Street, Nelspruit 1200, South Africa</p>
          <p><a href="tel:+27794364970">+27 79 436 4970</a> &nbsp;&middot;&nbsp; <a href="mailto:raynaldtech@gmail.com">raynaldtech@gmail.com</a> &nbsp;&middot;&nbsp; <a href="${data.siteUrl}">${data.siteUrl.replace(/^https?:\/\//, '')}</a></p>
          <p class="disclaimer">This email was generated automatically from the website contact form. Reply directly to respond to the sender.</p>
        </div>
      </div>
    </div>
  </body>
</html>
`
}

export function buildContactEmailText(data: ContactEmailData): string {
  const name = toSingleLine(data.name)
  const email = toSingleLine(data.email)
  const service = toSingleLine(data.service)
  const message = String(data.message)
  const siteHost = data.siteUrl.replace(/^https?:\/\//, '')

  return `
==================================================
RAYNALD TECH — RAISING THE BAR
==================================================

NEW CONTACT FORM SUBMISSION

Service: ${service}

Name: ${name}

Email: ${email}

Message:
${message}

--------------------------------------------------
Raynald Tech ICT Solutions
Bester Brown Building, 10 Paul Kruger Street, Nelspruit 1200, South Africa
Phone: +27 79 436 4970
Email: raynaldtech@gmail.com
Web: ${siteHost}
--------------------------------------------------

This email was generated automatically from the website contact form.
Reply directly to this email to respond to the sender.
`
}
