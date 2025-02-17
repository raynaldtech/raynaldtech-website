// server/api/chat.post.ts
import * as sanitizeHtml from 'sanitize-html'
import { verifyRecaptcha } from './utils/recaptcha'
 
export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    // Verify reCAPTCHA
    await verifyRecaptcha(body.recaptchaToken)
 
    
    // Validate message content
    if (body.message.length > 500 || !body.message.trim()) {
      throw createError({ statusCode: 400, message: 'Invalid message' })
    }
    
    // Broadcast message
    event.context.io.emit('chat-message', {
      text: sanitizeHtml(body.message),
      timestamp: new Date(),
      sender: 'user'
    })
    
    return { success: true }
  })