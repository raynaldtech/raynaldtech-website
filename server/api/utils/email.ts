// server/api/utils/email.ts

import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

export interface SendEmailOptions {
  /** A single address, or multiple addresses as an array or a comma-separated string. */
  to: string | string[]
  subject: string
  html: string
  text: string
  replyTo?: { email: string; name?: string }
}

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Splits/trims a `to` value (comma-separated string or array) into
 * Recipients, dropping anything that isn't a syntactically valid email —
 * MailerSend rejects the ENTIRE send if even one `to` address is malformed
 * (e.g. a stray comma-joined string passed as a single address), so this
 * keeps one bad entry in config from silently killing every notification.
 */
function parseRecipients(to: string | string[]): Recipient[] {
  const rawList = Array.isArray(to) ? to : to.split(',')
  const candidates = rawList.map(email => email.trim()).filter(Boolean)

  const valid: string[] = []
  const invalid: string[] = []
  for (const email of candidates) {
    (EMAIL_FORMAT.test(email) ? valid : invalid).push(email)
  }

  if (invalid.length > 0) {
    console.warn('Dropping invalid recipient address(es):', invalid.join(', '))
  }

  if (valid.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'No valid recipient email address configured'
    })
  }

  return valid.map(email => new Recipient(email))
}

export async function sendEmail(options: SendEmailOptions) {
  const config = useRuntimeConfig()

  if (!config.mailerSendApiKey || !config.mailerSendFromEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service is not configured'
    })
  }

  const mailerSend = new MailerSend({ apiKey: config.mailerSendApiKey })

  const sentFrom = new Sender(config.mailerSendFromEmail, config.mailerSendFromName)
  const recipients = parseRecipients(options.to)

  // Send one email per recipient rather than one email with multiple `to`
  // addresses. MailerSend's lower-tier/trial plans cap the number of
  // recipients allowed on a single send ("#MS42205"), and per-recipient
  // sends also mean one bad/blocked address can't take the others down
  // with it.
  const results = await Promise.allSettled(
    recipients.map(async (recipient) => {
      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo([recipient])
        .setSubject(options.subject)
        .setHtml(options.html)
        .setText(options.text)

      if (options.replyTo) {
        emailParams.setReplyTo(new Sender(options.replyTo.email, options.replyTo.name))
      }

      return mailerSend.email.send(emailParams)
    })
  )

  const failures = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected')
  const successes = results.filter((r): r is PromiseFulfilledResult<unknown> => r.status === 'fulfilled')

  for (const failure of failures) {
    const error = failure.reason as any
    console.error('MailerSend send failed for one recipient:', error?.statusCode, JSON.stringify(error?.body))
  }

  if (successes.length === 0) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Email delivery failed'
    })
  }

  return successes[0].value
}
