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

      <section class="py-16">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-3xl font-heading text-primary dark:text-primary-300 mb-4">
            Monthly IT Support Packages
          </h2>
          <p class="text-neutral-600 dark:text-neutral-300">
            Three packages. One goal. Your business running smoothly.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 items-start">
          <PricingTier v-for="(tier, index) in pricingTiers" :key="index" :name="tier.name" :price="tier.price"
            :price-suffix="tier.priceSuffix" :tagline="tier.tagline" :features="tier.features"
            :featured="tier.featured" />
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
import { ComputerDesktopIcon, WrenchScrewdriverIcon, CommandLineIcon, DevicePhoneMobileIcon, PaintBrushIcon, CloudIcon, DocumentTextIcon, TagIcon, PrinterIcon } from '@heroicons/vue/24/outline'

const pricingTiers = ref([
  {
    name: 'Starter Package',
    price: 'R2200',
    priceSuffix: '/month',
    tagline: 'Essential IT support to keep your business running without interruptions.',
    features: [
      'WhatsApp Support',
      'Remote Support',
      'Virus & Malware Removal',
      'Printer Setup & Support',
      'Wi-Fi Troubleshooting',
      'CCTV Checks',
      'Device Health Checks',
      'Software Installs',
      'Backup Assistance'
    ],
    featured: false
  },
  {
    name: 'Business Package',
    price: 'R3500',
    priceSuffix: '/month',
    tagline: 'More coverage, faster support and proactive care for your growing business.',
    features: [
      'Everything in Starter, plus:',
      'Up to 10 Devices Covered',
      'Priority Support',
      '2 Onsite Visits Per Month',
      'Enhanced Printer Support',
      'Enhanced CCTV Support',
      'Preventative Maintenance',
      'Device Inventory'
    ],
    featured: true
  },
  {
    name: 'Premium Package',
    price: 'R5000+',
    priceSuffix: '/month',
    tagline: 'Complete IT care with maximum uptime, security and peace of mind.',
    features: [
      'Everything in Business, plus:',
      'Unlimited Remote Support',
      'Multiple Onsite Visits',
      'Backup Management',
      '24/7 Network Monitoring',
      'Full CCTV Support',
      'Priority Response',
      'Proactive System Maintenance'
    ],
    featured: false
  }
])

const allServices = ref([
  {
    title: 'Internet Cafe Services',
    category: 'Digital Services',
    description: 'Comprehensive internet and computer access solutions for all your needs',
    specifications: [
      'Internet browsing',
      'Computer workstation access',
      'Email services',
      'Document processing'
    ],
    emoji: '💻'
  },
  {
    title: 'Document Services',
    category: 'Office Solutions',
    description: 'Professional document processing and finishing services',
    specifications: [
      'Laminating',
      'Scanning',
      'Printing services',
      'Document formatting'
    ],
    icon: DocumentTextIcon
  },
  {
    title: 'Design & Drafting',
    category: 'Creative Services',
    description: 'Professional design and technical drafting solutions',
    specifications: [
      'CAD drafting',
      'Graphic design',
      'Technical drawings',
      'Digital artwork'
    ],
    icon: PaintBrushIcon
  },
  {
    title: 'Device Repairs',
    category: 'Hardware Services',
    description: 'Expert repair services for all your electronic devices',
    specifications: [
      'Cellphone repairs (screens, batteries, charging ports)',
      'Laptop repair (hardware & software)',
      'Computer hardware repair',
      'Printer repair & maintenance',
      'Component replacement',
      'Diagnostic testing'
    ],
    icon: DevicePhoneMobileIcon
  },
  {
    title: 'IT Infrastructure',
    category: 'Enterprise Solutions',
    description: 'Complete technology infrastructure design and implementation',
    specifications: [
      'Computer network installation (LAN, Wi-Fi, structured cabling)',
      'CCTV camera supply, installation & maintenance',
      'Network architecture design',
      'Cloud integration',
      'Security protocols'
    ],
    icon: CloudIcon
  },
  {
    title: 'Software Solutions',
    category: 'Development & Support',
    description: 'Custom software development and maintenance services',
    specifications: [
      'Software application maintenance',
      'Web application development',
      'System optimization',
      'Technical support'
    ],
    icon: CommandLineIcon
  },
  {
    title: 'Printed Apparel & Promotional Items',
    category: 'Branding & Print Solutions',
    description: 'Custom branded apparel and promotional items for events, teams and businesses',
    specifications: [
      'Custom branded gazebos',
      'T-shirt printing',
      'Sublimation printing (mugs, cups, plates & more)',
      'Professional embroidery',
      'Contisuit & workwear printing'
    ],
    icon: TagIcon
  },
  {
    title: 'Signage & Print Media',
    category: 'Branding & Print Solutions',
    description: 'Eye-catching signage and print media that build your brand identity',
    specifications: [
      'Outdoor & indoor signage',
      'Pull-up banners',
      'X-banners',
      'Chromadec boards',
      'Business cards',
      'Flyers',
      'Product labeling'
    ],
    icon: PrinterIcon
  }
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