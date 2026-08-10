// app/server/api/contact.post.ts

import { RecaptchaResponse } from '@raynaldtech/recaptcha'
import { defineEventHandler, readBody } from 'h3'
import { verifyRecaptcha } from './utils/recaptcha'
import { sendEmail } from './utils/email'
import { buildContactEmailSubject, buildContactEmailHtml, buildContactEmailText, toSingleLine } from './utils/contactEmailTemplate'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event).catch(() => {})

  try {
       // Add validation for all fields including recaptchaToken
   const requiredFields = ['name', 'email', 'service', 'message', 'recaptchaToken']
   const missingFields = requiredFields.filter(field => !body[field])
    // Validate required fields
    if (missingFields.length  > 0) {
      console.log(body.name, body.email, body.service, body.message)
      throw createError({
        statusCode: 400,
        statusMessage: `Missing required fields: ${missingFields.join(', ')}`,
        data: body
      })
    }

    // Verify reCAPTCHA
    await verifyRecaptcha(body.recaptchaToken)

    // MailerSend validates reply_to.email format server-side and rejects the
    // ENTIRE send if it's malformed — the frontend's type="email" input only
    // does loose HTML5 validation, so a bad address here shouldn't be able to
    // take down the whole notification. Only attach replyTo when it looks valid.
    const isValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)

    const emailData = {
      name: body.name,
      email: body.email,
      service: body.service,
      message: body.message,
      siteUrl: config.public.siteUrl
    }

    // Send email via MailerSend. `from` must be the fixed, domain-verified
    // sender identity — MailerSend rejects sends from arbitrary addresses,
    // unlike the old Gmail SMTP relay. The visitor's email goes in replyTo
    // instead, so replying to the notification still reaches them.
    await sendEmail({
      to: config.contactEmail,
      subject: buildContactEmailSubject(emailData),
      html: buildContactEmailHtml(emailData),
      text: buildContactEmailText(emailData),
      replyTo: isValidEmailFormat ? { email: body.email, name: toSingleLine(body.name) } : undefined
    })

    return { success: true }

  } catch (error: any) {
    console.error('Contact form error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal server error',
      data: error.data || {}
    })
  }
})