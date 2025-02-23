import { RecaptchaResponse } from '@raynaldtech/recaptcha'
import { defineEventHandler, readBody } from 'h3'
import { createTransport } from 'nodemailer'
import sanitizeHtml from 'sanitize-html'
import { verifyRecaptcha } from './utils/recaptcha'

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

    // Sanitize inputs
    const sanitized = {
      name: sanitizeHtml(body.name),
      email: sanitizeHtml(body.email),
      service: sanitizeHtml(body.service),
      message: sanitizeHtml(body.message)
    }

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
      from: `"Raynald Tech Contact" <${config.mailUser}>`,
      to: config.contactEmail,
      subject: `New Contact Request: ${sanitized.service}`,
      text: `
        Name: ${sanitized.name}
        Email: ${sanitized.email}
        Service: ${sanitized.service}
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