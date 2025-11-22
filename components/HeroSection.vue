<template>
    <section class="relative min-h-[80vh] flex items-center">
      <!-- Background Image with Overlay 
       raynald_tech_background.avif
       tech_raynald_tech_bg.avif
       woman_raynald_tech_bg.avif
       -->
      <div class="absolute inset-0 z-0">
        <picture>
          <source srcset="/images/background/raynald_tech_background.avif" type="image/avif">
          <img 
            src="/images/background/raynald_tech_background.avif" 
            alt="IT infrastructure background"
          class="w-full h-full object-cover"
          loading="eager"
          :modifiers="{ quality: 80 }"
          />
        </picture>
        <!-- <NuxtImg 
          src="/images/hero-background.webp"
          alt="IT infrastructure background"
          class="w-full h-full object-cover"
          loading="eager"
          :modifiers="{ quality: 80 }"
        /> -->
        <div class="absolute inset-0 bg-neutral-900/80 bg-gradient-to-b from-primary-900/30 to-primary-700/60"></div>
      </div>
  
      <!-- Content -->
      <div class="container mx-auto px-4 text-center relative z-10">
        <picture>
          <source srcset="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" type="image/webp">
          <img 
            src="/images/logos/RAYNOLD_TECH_TRANSPARENT_LOGO.webp" 
            alt="Raynald Tech Logo"
            class="mx-auto mb-8 w-48 md:w-64 hover:scale-105 transition-transform"
            loading="eager"
          />
        </picture>
  
        <h1 class="text-4xl md:text-6xl font-heading text-white mb-6 animate-fade-in-up">
          Transforming Technology Solutions
        </h1>
  
        <p class="text-xl text-primary-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
          Expert IT consulting and support services tailored to your business needs
        </p>
  
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <NuxtLink 
            to="/services" 
            class="btn-primary shadow-lg hover:shadow-xl"
            aria-label="Explore our services"
          >
            View Services
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="btn-secondary shadow-lg hover:shadow-xl"
            aria-label="Learn about our company"
          >
            About Us
          </NuxtLink>
        </div>
      </div>
    </section>
  </template>
  
  <style>
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .btn-primary {
    @apply bg-secondary text-white px-8 py-3 rounded-lg 
           hover:bg-red-800 transition-all duration-300
           focus:ring-2 focus:ring-white focus:ring-offset-2 
           focus:ring-offset-primary-900;
  }
  
  .btn-secondary {
    @apply border-2 border-white text-white px-8 py-3 rounded-lg
           hover:bg-white/10 hover:border-white/80 transition-all duration-300
           focus:ring-2 focus:ring-white focus:ring-offset-2 
           focus:ring-offset-primary-900;
  }

  </style>