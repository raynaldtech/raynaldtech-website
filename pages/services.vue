<template>
    <div>      
      <main class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-heading text-primary mb-12 text-center">
          Our Technical Services
        </h1>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            v-for="(service, index) in allServices"
            :key="index"
            :title="service.title"
            :category="service.category"
            :description="service.description"
            :specifications="service.specifications"
          >
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
  </script>