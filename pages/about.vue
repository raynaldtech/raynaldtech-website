<template>
    <div>    
      <main class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-heading text-primary mb-12 text-center">
          Meet Our Team
        </h1>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  </script>