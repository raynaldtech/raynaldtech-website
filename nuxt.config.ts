// https://nuxt.com/docs/api/configuration/nuxt-config

import { defineOrganization } from 'nuxt-schema-org/schema'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-schema-org',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    
  ],
  runtimeConfig: {
    mailService: process.env.MAIL_SERVICE,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,
    contactEmail: process.env.CONTACT_EMAIL,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    public: {
      siteUrl: process.env.SITE_URL,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
    }
  },
  build: {
    transpile: [
      '@heroicons/vue',
    ],
  },
  tailwindcss: {
    // Options
  },
  googleFonts: {
    families: {
      'IBM+Plex+Sans': [500, 700],
      Inter: [400, 500],
    },
    display: 'swap',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // OpenGraph/Twitter meta tags
      ],
    },
  },
  site: {
    url: process.env.SITE_URL || 'https://raynald-tech.com',
    name: 'Raynald Tech'
  },
  sitemap: {
    autoLastmod: true,
    autoI18n: false
  },
  robots: {
    allow: ['/', '/about', 'services','/contact'],
    //disallow: ['/admin'],
  },
  schemaOrg: {
    identity: defineOrganization({

      // Basic Information
      name: 'Raynald Tech ICT Solutions',
      alternateName: 'Raynald Tech',
      description: 'Expert IT consulting and support services tailored to your business needs',
      url: 'https://raynaldtech.com',
      logo: '/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp',
     
      // Address Information, if applicable
      address: {
        '@type': 'BusinessAddress',
        'streetAddress': 'No 9 Bouten Stress, Sonhuewele',
        'addressLocality': 'Nelspruit',
        'addressRegion': 'Mpumalanga ',
        'postalCode': '1200',
        'addressCountry': 'SA'
      },

      // Contact Information, if applicable
      email: 'raynaldtech@gmail.com',
      telephone: '+27 79 436 4970',
      contactPoint: {
        '@type': 'ContactPoint',
        'telephone': '+27 79 436 4970',
        'whatsapp': '+27 77 391 7629',
        'email': 'raynaldtech@gmail.com'
      },

      sameAs: [
        'https://www.facebook.com/profile.php?id=100088055389432',
        'https://www.instagram.com/raynaldtech_itc',
        'https://www.tiktok.com/@raynaldtech_ict'
      ],

      // Professional Details, if applicable
      worksFor: {
        '@type': 'Organization',
        'name': 'Raynald Tech ICT Solutions',
        'url': 'https://raynaldtech.com'
      },
      canonicalHost: 'https://raynaldtech.com',
      defaultLanguage: 'en-ZA', // South African English
    })   
  },
})
