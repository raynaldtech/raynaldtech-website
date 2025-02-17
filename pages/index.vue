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
      <!-- <section>
        <RealTimeChatWidget/>
      </section> -->
    </main>
  </div>
</template>

<script setup lang="ts">
// Import icons from Heroicons
import { ComputerDesktopIcon, WrenchScrewdriverIcon, CommandLineIcon } from '@heroicons/vue/24/outline'

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
    title: 'IT Infrastructure',
    category: 'Enterprise Solutions',
    description: 'Full-stack technology infrastructure design and implementation',
    specifications: [
      'Network architecture design',
      'Cloud integration',
      'Security protocols',
      'Disaster recovery'
    ],
    icon: ComputerDesktopIcon
  },
  {
    title: 'Hardware Support',
    category: 'Device Services',
    description: 'Comprehensive hardware maintenance and repair services',
    specifications: [
      'Component-level repairs',
      'Preventive maintenance',
      'Warranty management',
      'Data recovery'
    ],
    icon: WrenchScrewdriverIcon
  },
  {
    title: 'Software Solutions',
    category: 'Development & Support',
    description: 'Custom software development and maintenance',
    specifications: [
      'Web application development',
      'API integration',
      'Legacy system migration',
      'Performance optimization'
    ],
    icon: CommandLineIcon
  }
])
</script>