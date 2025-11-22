// types/image.d.ts
declare module '@nuxt/image' {
    interface NuxtImageModifiers {
        quality?: number
        fit?: 'cover' | 'contain' | 'fill'
        format?: 'avif' | 'webp' | 'png' | 'jpg'
        width?: number
        height?: number
    }
}
