<template>
  <ClientOnly>
    <main class="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <!-- Contact Section -->
      <section class="container mx-auto px-4 py-16">
        <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
            <h2 class="text-3xl font-heading text-primary dark:text-primary-300 mb-8">
              Get in Touch
            </h2>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Full Name
                </label>
                <input v-model="form.name" type="text" required
                  class="w-full rounded-lg border-neutral-300 dark:border-neutral-600 focus:border-primary focus:ring-primary dark:bg-neutral-700 dark:text-neutral-100">
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Email Address
                </label>
                <input v-model="form.email" type="email" required
                  class="w-full rounded-lg border-neutral-300 dark:border-neutral-600 focus:border-primary focus:ring-primary dark:bg-neutral-700 dark:text-neutral-100">
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Service Needed
                </label>
                <select v-model="form.service" required
                  class="w-full rounded-lg border-neutral-300 dark:border-neutral-600 focus:border-primary focus:ring-primary dark:bg-neutral-700 dark:text-neutral-100">
                  <option value="">Select a service</option>
                  <option v-for="service in services" :value="service" :key="service">
                    {{ service }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Message
                </label>
                <textarea v-model="form.message" rows="5" required
                  class="w-full rounded-lg border-neutral-300 dark:border-neutral-600 focus:border-primary focus:ring-primary dark:bg-neutral-700 dark:text-neutral-100"></textarea>
              </div>

              <div class="grecaptcha-badge" data-style="badge"></div>

              <button type="submit" :disabled="isLoading"
                class="w-full bg-primary hover:bg-primary-800 text-white py-3 px-6 rounded-lg transition-colors duration-300">
                <span v-if="!isLoading">Send Message</span>
                <span v-else class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Sending...
                </span>
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="space-y-8">
            <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
              <h3 class="text-2xl font-heading text-primary dark:text-primary-300 mb-6">
                Contact Information
              </h3>

              <div class="space-y-4 text-neutral-600 dark:text-neutral-300">
                <div class="flex items-start gap-4">
                  <div class="space-y-4">
                    <p class="text-lg font-bold">Support Hours:</p>
                    <p class="font-semibold">Mon-Fri: 8AM - 6PM</p>

                    <div class="flex items-center gap-4">
                      <PhoneIcon class="w-6 h-6 flex-shrink-0 text-primary" />
                      <a href="tel:+27794364970"
                        class="hover:text-primary-400 font-semibold font-semiboldtransition-colors">
                        +27 79 436 4970
                      </a>
                    </div>

                    <div class="flex items-center gap-4">
                      <ChatBubbleOvalLeftEllipsisIcon class="w-6 h-6 flex-shrink-0 text-primary" />
                      <a href="tel:+27773917629"
                        class="hover:text-primary-400 font-semibold font-semiboldtransition-colors">
                        +27 77 391 7629
                      </a>
                    </div>
                  </div>
                </div>


                <div class="flex items-start gap-4">
                  <EnvelopeIcon class="w-6 h-6 flex-shrink-0 text-primary" />
                  <div>
                    <p class="font-bold">Email Address:</p>
                    <a href="mailto:raynaldtech@gmail.com" class="hover:text-primary dark:hover:text-primary-300">
                      raynaldtech@gmail.com
                    </a>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <MapPinIcon class="w-6 h-6 flex-shrink-0 text-primary" />
                  <div>
                    <p class="font-bold">Headquarters:</p>
                    <p>No 9 Bouten Street<br>Sonhuewele, Nelspruit 1200<br>South Africa</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Trust Badges -->
            <div class="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
              <h3 class="text-lg font-heading text-primary dark:text-primary-300 mb-4">
                Certified Professionals
              </h3>
              <div class="flex flex-wrap gap-4">
                <!-- <NuxtImg src="/certifications/comptia.webp" alt="CompTIA Certified" class="h-12 w-auto" />
              <NuxtImg src="/certifications/cisco.webp" alt="Cisco Certified" class="h-12 w-auto" /> -->
              </div>
            </div>
          </div>
        </div>
      </section>
      <AppToast v-if="toast" :title="toast.title" :message="toast.message" :type="toast.type" />
    </main>
  </ClientOnly>
</template>

<script setup lang="ts">
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/vue/24/outline'
import { useToast } from '~/composables/useToast'

const { showToast, toast } = useToast()
const config = useRuntimeConfig()
const recaptchaSiteKey = await config.public.recaptchaSiteKey

declare global {
  interface Window {
    grecaptcha: any
  }
}

const services = ref([
  'Network Installation',
  'Hardware Maintenance',
  'Software Support',
  'Device Repair',
  'IT Consulting',
  'Security Audit'
])

const form = reactive({
  name: '',
  email: '',
  service: '',
  message: '',
  recaptchaToken: ''
})

// Load reCAPTCHA script
onMounted(() => {
  const script = document.createElement('script')
  script.src = `https://www.google.com/recaptcha/api.js?render=${config.public.recaptchaSiteKey}`
  document.head.appendChild(script)
})


const isLoading = ref(false)
const handleSubmit = async () => {
  if (isLoading.value) return;
  try {
    isLoading.value = true

    // Execute reCAPTCHA
    await new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(recaptchaSiteKey, {
          action: 'contact'
        }).then((token: string) => {
          form.recaptchaToken = token
          resolve(true)
        })
      })
    })

    // Submit form
    const { data, error } = await useFetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ ...form })
    })

    if (error.value) throw error.value

    // Reset form
    if (!error.value) Object.assign(form, {
      name: '',
      email: '',
      service: '',
      message: ''
    })

    showToast('Message Sent', 'We will respond within 24 hours', 'success')
  } catch (error: any) {
    console.log(error)
    showToast('Error', error.statusMessage || 'Failed to send message', 'error')
  } finally {
    isLoading.value = false
  }
}

useSeoMeta({
  title: 'Contact IT Support Nelspruit | 24/7 Technical Help',
  description: 'Get instant IT assistance in Nelspruit. Call +27 79 436 4970 or email raynaldtech@gmail.com for urgent tech support.',
  keywords: 'IT support contact, emergency computer repair, Nelspruit tech help, IT consultation booking',
  ogTitle: '24/7 IT Support Contact - Raynald Tech',
  ogDescription: 'Reach our certified technicians day or night for urgent tech solutions',
  //ogImage: `${config.public.siteUrl}/images/og-contact.jpg`,
  ogUrl: `${config.public.siteUrl}/contact`,
  //twitterCard: 'summary_large_image'
  robots: 'contact, follow'
})
</script>

<style>
/* Custom form focus styles */
input:focus,
textarea:focus,
select:focus {
  @apply ring-2 ring-primary/50 border-primary;
}
</style>