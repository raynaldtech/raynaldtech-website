<template>
  <footer class="bg-neutral-800 text-neutral-100 mt-20">
    <div class="container mx-auto px-4 py-12">
      <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
        <!-- Company Info -->
        <section aria-labelledby="company-info" class="space-y-4">
          <h2 id="company-info" class="text-xl font-heading text-primary-300 mb-4">
            About Us
          </h2>
          <NuxtLink to="/" class="inline-block">
            <picture>
              <source srcset="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" type="image/webp">
              <img src="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" alt="Raynald Tech Logo" class="h-16 mb-4"
                loading="lazy">
            </picture>
            <!-- <NuxtImg
                src="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp"
                alt="Raynald Tech Logo"
                class="h-16 w-16 mb-4"
                loading="lazy"
              /-->
          </NuxtLink>
          <p class="text-semibold font-semibold text-neutral-300 leading-relaxed">
            Delivering expert IT solutions since 2008. Specializing in enterprise technology infrastructure, hardware
            maintenance, and custom software development.
          </p>
        </section>

        <!-- Quick Links -->
        <section aria-labelledby="quick-links">
          <h2 id="quick-links" class="text-xl font-heading text-primary-300 mb-4">
            Quick Links
          </h2>
          <nav class="space-y-2" aria-label="Footer navigation">
            <NuxtLink v-for="link in footerLinks" :key="link.path" :to="link.path"
              class="block text-neutral-300 hover:text-primary-200 transition-colors py-1.5">
              {{ link.label }}
            </NuxtLink>
          </nav>
        </section>

        <!-- Contact Info -->
        <section aria-labelledby="contact-info">
          <h2 id="contact-info" class="text-xl font-heading text-primary-300 mb-4">
            Connect With Us
          </h2>
          <SociaMediaHandles />
          <div class="space-y-3 text-sm text-neutral-300">
            <div class="flex items-center gap-2 text-neutral-100">
              <MapPinIcon class="w-5 h-5 flex-shrink-0" />
              <div>
                <p class="font-bold text-2xl">Headquarters:</p>
                <p class="font-semibold">No 9 Bouten Stress<br>Sonhuewele, Nelspruit 1200<br>
                  South Africa</p>
              </div>
            </div>

            <div class="flex items-center gap-2 text-neutral-100">
              <PhoneIcon class="w-5 h-5 flex-shrink-0" />
              <a href="tel:+27794364970" class="hover:text-primary-400 font-semibold font-semiboldtransition-colors">
                +27 79 436 4970
              </a>
            </div>
            <div class="flex items-center gap-2 text-neutral-100">
              <ChatBubbleOvalLeftEllipsisIcon class="w-5 h-5 flex-shrink-0" />
              <a href="tel:+27773917629" class="hover:text-primary-400 font-semibold font-semiboldtransition-colors">
                +27 77 391 7629
              </a>
            </div>
            <div class="flex items-center gap-2 text-neutral-100">
              <EnvelopeOpenIcon class="w-5 h-5 flex-shrink-0" />
              <a href="mailto:info@raynaldtech.com" class="hover:text-primary-400 font-semibold transition-colors">
                raynaldtech@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>

      <!-- Copyright -->
      <div class="border-t border-neutral-700 mt-8 pt-8 text-center">
        <p class="text-sm text-neutral-400">
          &copy; {{ new Date().getFullYear() }} Raynald Tech. All rights reserved.
        </p>
        <p class="mt-2 text-xs text-neutral-500">
          <NuxtLink to="/privacy" class="hover:text-neutral-400">
            Privacy Policy
          </NuxtLink>
          <span class="mx-2">•</span>
          <NuxtLink to="/terms" class="hover:text-neutral-400">
            Terms of Service
          </NuxtLink>
          <span class="mx-2">•</span>
          <NuxtLink to="/accessibility" class="hover:text-neutral-400">
            Accessibility Statement
          </NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { EnvelopeOpenIcon, PhoneIcon, MapPinIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline'

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Our Team', path: '/about' },
  { label: 'Contact', path: '/contact' },
  //{ label: 'Case Studies', path: '/case-studies' },
  //{ label: 'Support', path: '/support' },
  //{ label: 'Careers', path: '/careers' }
]
</script>

<style scoped>
.router-link-active {
  @apply text-primary-200 font-medium;
}
</style>