<template>
  <div>
    <main class="container mx-auto px-4 pb-16">
      <!-- Hero Section -->
      <section class="bg-primary-900 text-neutral-100 py-20">
        <div class="container mx-auto px-4 text-center max-w-4xl">
          <h1 class="text-4xl md:text-6xl font-heading mb-6 animate-fade-in">
            Wedding Stationery, Décor & Signage
          </h1>
          <p class="text-xl text-primary-200 max-w-2xl mx-auto mb-8">
            Designed for your big day.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/documents/raynald-tech-wedding-catalogue.pdf" download
              class="btn-secondary" aria-label="Download our wedding catalogue PDF">
              Download Our Wedding Catalogue (PDF)
            </a>
            <NuxtLink :to="{ path: '/contact', query: { service: 'Wedding Stationery & Décor' } }"
              class="block text-center bg-white text-primary-900 px-6 py-3 rounded-lg font-medium hover:bg-neutral-100 transition-colors duration-300">
              Request a Quote
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Promo Banner -->
      <!-- Copied from the source catalogue (undated) - confirm this offer is still valid before publishing, and periodically after. -->
      <section class="bg-secondary-50 dark:bg-neutral-800 border border-secondary-200 dark:border-neutral-700 rounded-xl mt-12 p-6 text-center">
        <p class="text-secondary-700 dark:text-secondary-300 font-heading text-lg">
          Get 15% off if your order is more than R3000
        </p>
      </section>

      <!-- Category Overview -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        <WeddingCategoryCard v-for="(category, index) in categories" :key="index" :title="category.title"
          :description="category.description">
          <template #icon>
            <component :is="category.icon" class="w-8 h-8 text-primary" />
          </template>
        </WeddingCategoryCard>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
import { EnvelopeIcon, PhotoIcon, SparklesIcon, RectangleGroupIcon, HashtagIcon, GiftIcon } from '@heroicons/vue/24/outline'

const categories = ref([
  {
    title: 'Invitations & Stationery',
    description: 'Custom wedding invitations, programs and pocket-fold stationery.',
    icon: EnvelopeIcon
  },
  {
    title: 'Décor & Backdrops',
    description: 'Elegant backdrops, welcome boards and reception styling.',
    icon: PhotoIcon
  },
  {
    title: 'Ring Trays',
    description: 'Engraved ring trays and personalized engagement displays.',
    icon: SparklesIcon
  },
  {
    title: 'Welcome Boards',
    description: 'Custom welcome signage for your ceremony and reception.',
    icon: RectangleGroupIcon
  },
  {
    title: 'Table Numbers',
    description: 'Table numbers in a range of styles, from rustic wood to gold foil.',
    icon: HashtagIcon
  },
  {
    title: 'Personalized Gifts',
    description: 'Personalized keepsakes and gifts for your wedding party.',
    icon: GiftIcon
  }
])

useSeoMeta({
  title: 'Wedding Stationery, Décor & Signage Nelspruit | Raynald Tech',
  description: 'Custom wedding invitations, décor, ring trays, welcome boards and table numbers, designed and printed in Nelspruit by Raynald Tech.',
  keywords: 'wedding stationery Nelspruit, wedding invitations Mpumalanga, wedding decor printing, wedding signage',
  ogTitle: 'Wedding Stationery & Décor - Raynald Tech',
  ogDescription: 'Designed for your big day - invitations, décor, ring trays, welcome boards and more.',
  ogUrl: `${config.public.siteUrl}/weddings`,
  robots: 'index, follow'
})
</script>
