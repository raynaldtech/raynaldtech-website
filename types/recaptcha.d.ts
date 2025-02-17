// types/recaptcha.d.ts
declare module '@raynaldtech/recaptcha' {
    interface RecaptchaResponse {
        success: boolean
        score: number
        'error-codes'?: string[]
        hostname?: string
        challenge_ts?: string
        action?: string
    }
}
