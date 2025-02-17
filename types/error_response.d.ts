// types/errorResponse.d.ts
declare module '@raynaldtech/error' {
interface ErrorResponse {
    statusCode: number
    statusMessage: string
    data?: any
  }
}
