<template>
  <div>
    <main>
      <HeroSection />

      <TrustIndicators />

      <section class="container mx-auto px-4 py-16">
        <h2 class="text-3xl font-heading text-primary mb-12 text-center">
          Featured Services
        </h2>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard v-for="(service, index) in featuredServices" :key="index" :title="service.title"
            :category="service.category" :description="service.description" :specifications="service.specifications">
            <template #icon>
              <component :is="service.icon" class="w-8 h-8 text-primary" />
            </template>
          </ServiceCard>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
// Import icons from Heroicons
import { ComputerDesktopIcon, DevicePhoneMobileIcon, CommandLineIcon, PaintBrushIcon, DocumentTextIcon, CloudIcon } from '@heroicons/vue/24/outline'

const openWhatsAppChat = () => {
  // Replace with your WhatsApp number (include country code, e.g., "15551234567")
  const phoneNumber = '+27714798214'
  // Optional: pre-filled message
  const message = 'Hello, I need assistance with your services.'
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

const featuredServices = ref([
  {
    title: 'Device Repairs',
    category: 'Hardware Services',
    description: 'Expert repair services for computers and mobile devices',
    specifications: [
      'Cellphone repairs',
      'Computer hardware',
      'Component replacement',
      'Data recovery'
    ],
    icon: DevicePhoneMobileIcon
  },
  {
    title: 'Internet Cafe',
    category: 'Digital Services',
    description: 'Complete internet access and computer workstation services',
    specifications: [
      'Internet browsing',
      'Computer access',
      'Email services',
      'Printing & scanning'
    ],
    icon: ComputerDesktopIcon
  },
  {
    title: 'IT Infrastructure',
    category: 'Business Solutions',
    description: 'Professional network installation and system setup',
    specifications: [
      'Network installation',
      'System configuration',
      'Cloud integration',
      'Security setup'
    ],
    icon: CloudIcon
  }
])

useSeoMeta({
  title: 'Raynald Tech ICT Solutions | IT Services Nelspruit',
  description: 'Professional IT support, device repairs, internet cafe services, and network installation in Nelspruit. 24/7 technical support and certified IT solutions.',
  keywords: 'IT services Nelspruit, computer repair, cellphone repairs, internet cafe, network installation, IT consulting Mpumalanga',
  ogTitle: 'Raynald Tech - Your Trusted IT Partner in Mpumalanga',
  ogDescription: 'Expert IT solutions, device repairs, and internet services for businesses and individuals in Nelspruit and surrounding areas.',
  //ogImage: `${config.public.siteUrl}/images/og-home.jpg`,
  ogUrl: `${config.public.siteUrl}`,
  //twitterCard: 'summary_large_image',
  robots: 'index, follow'
})
</script>