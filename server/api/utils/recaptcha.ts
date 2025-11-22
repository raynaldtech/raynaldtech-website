import { useRuntimeConfig } from '#imports'
import { RecaptchaResponse } from '@raynaldtech/recaptcha'

export async function verifyRecaptcha(token: string) {
    const { recaptchaSecretKey } = useRuntimeConfig()

    // Verify reCAPTCHA token
    const verification: RecaptchaResponse = await $fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body: new URLSearchParams({
            secret: recaptchaSecretKey,
            response: token
        }).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    if (!verification.success || verification.score < 0.5) {
        throw createError({
            statusCode: 403,
            statusMessage: 'reCAPTCHA verification failed',
            data: {
                reason: verification['error-codes'] || 'Low score'
            }
        })
    }

    return verification.success
}