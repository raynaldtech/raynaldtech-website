<template>
    <div>    
      <main class="container mx-auto px-4 pb-16">
      <!-- Hero Section -->
      <section class="bg-primary-900 text-neutral-100 py-20">
        <div class="container mx-auto px-4 text-center max-w-4xl">
          <h1 class="text-4xl md:text-6xl font-heading mb-6 animate-fade-in">
            Meet Our Team
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
          <TeamMember
            v-for="(member, index) in teamMembers"
            :key="index"
            :name="member.name"
            :role="member.role"
            :bio="member.bio"
            :image="member.image"
            :certifications="member.certifications"
          />
        </div>
      </main>
      </div>
  </template>
  
  <script setup lang="ts">
  const config = useRuntimeConfig()
  const teamMembers = ref([
    {
      name: 'Gomotso Mkhabela',
      role: 'CEO & Founder',
      image: '/images/team/gomotso-mkhabela.webp',
      bio: 'A visionary leader with expertise in IT, technical troubleshooting, web development, and graphic design. Known for delivering innovative and high-quality solutions, Gomotso ensures Raynald Tech ICT stays at the forefront of digital transformation and trusted IT services.',
      certifications: ['IT Troubleshooting', 'Web Development', 'Graphic Design', 'Device Repair Technician']
    },
    {
      name: 'Lethu Ndimande',
      role: 'General Manager & Administrative Assistant',
      image: '/images/team/lethu-ndimande.webp',
      bio: 'An operations expert specializing in technical support, troubleshooting, and administration. Lethu ensures seamless business operations, providing efficient, professional, and reliable IT solutions to clients and the team.',
      certifications: ['Technical Support', 'Troubleshooting', 'Administration']
    },
    {
      name: 'Moeketsi Mokoena',
      role: 'Strategic Solutions Partner with RAYNALD TECH ',
      image: '/images/team/moeketsi-mokoena.webp',
      bio: 'A seasoned Application Development Manager with 14+ years of IT expertise, Moeketsi specializes in team leadership, cloud infrastructure, and enterprise application development. He has successfully built and led high-performing IT teams, orchestrated AWS-based scalable architectures, and delivered revenue-generating applications. His strategic approach ensures efficient processes and innovative solutions that drive business success.',
      certifications: ['Java Full Stack Dev', 'Python','DevOps', 'Cloud Infrastructure', 'IT Leadership', 'App Dev', 'Web Dev (incl. MEAN/MERV Stack)']
    },
    // Add other team members
  ])

  useSeoMeta({
  title: 'About Raynald Tech | Certified IT Professionals Nelspruit',
  description: 'Learn about our team of CompTIA and Cisco certified IT experts serving Nelspruit since 2015. Our commitment to technology excellence.',
  keywords: 'IT company about us, certified technicians, company history, IT certifications, Nelspruit tech team',
  ogTitle: 'About Our IT Expertise - Raynald Tech',
  ogDescription: 'Meet our team of certified professionals dedicated to solving your technology challenges',
  //ogImage: `${config.public.siteUrl}/images/og-about.jpg`,
  ogUrl: `${config.public.siteUrl}/about`,
  //twitterCard: 'summary_large_image'
  robots: 'about, follow'
})
  </script>