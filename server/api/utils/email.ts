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

  if (!config.mailerSendApiKey || !config.mailerSendFromEmail) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service is not configured'
    })
  }

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
