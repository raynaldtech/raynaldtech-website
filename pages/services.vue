<template>
  <div>
    <main class="container mx-auto px-4 pb-16">
      <!-- Hero Section -->
      <section class="bg-primary-900 text-neutral-100 py-20">
        <div class="container mx-auto px-4 text-center max-w-4xl">
          <h1 class="text-4xl md:text-6xl font-heading mb-6 animate-fade-in">
            Our Technical Services
          </h1>
          <p class="text-xl text-primary-200 max-w-2xl mx-auto mb-8">
            Empowering everyone to experience technology without barriers
          </p>
          <div class="flex justify-center space-x-4">
            <NuxtLink to="/contact" class="btn-secondary" aria-label="Contact us about accessibility needs">
              Request Assistance
            </NuxtLink>
          </div>
        </div>
      </section>


      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-16">
        <ServiceCard v-for="(service, index) in allServices" :key="index" :title="service.title"
          :category="service.category" :description="service.description" :specifications="service.specifications">
          <template #icon>
            <component :is="service.icon" class="w-8 h-8 text-primary" />
            <span class="text-2xl">{{ service.emoji }}</span>
          </template>
        </ServiceCard>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
import { ComputerDesktopIcon, WrenchScrewdriverIcon, CommandLineIcon } from '@heroicons/vue/24/outline'

const allServices = ref([
  // {
  //   title: 'Network Security',
  //   category: 'Cybersecurity',
  //   description: 'Enterprise-grade network protection solutions',
  //   specifications: [
  //     'Firewall configuration',
  //     'Intrusion detection',
  //     'VPN setup',
  //     'Security audits'
  //   ],
  //   emoji: '🛡️'
  // },
  {
    title: 'Device Repairs',
    category: 'Hardware Services',
    description: 'Expert repair for all tech devices',
    specifications: [
      'Component replacement',
      'Diagnostic testing',
      'Warranty services',
      'Data migration'
    ],
    emoji: '🔧'
  },
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
  // Add other services following the same pattern
])

useSeoMeta({
  title: 'IT Services Nelspruit | Network Installation & Computer Repair',
  description: 'Comprehensive IT services including network setup, hardware repairs, cybersecurity audits, and software support in Mpumalanga.',
  keywords: 'IT services list, network setup Nelspruit, computer repair shop, cybersecurity services, data recovery South Africa',
  ogTitle: 'Professional IT Services in Nelspruit - Raynald Tech',
  ogDescription: 'Full-spectrum technology solutions for home and business networks',
  //ogImage: `${config.public.siteUrl}/images/og-services.jpg`,
  ogUrl: `${config.public.siteUrl}/services`,
  //twitterCard: 'summary_large_image'
  robots: 'services, follow'
})
</script>