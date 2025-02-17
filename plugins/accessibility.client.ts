export default defineNuxtPlugin(() => {
    // Reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--scroll-behavior', 'auto')
    }
  
    // Focus indicators
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Tab') {
        document.documentElement.classList.add('user-is-tabbing')
      }
    })
  
    // Dynamic contrast
    const updateContrast = () => {
      document.documentElement.style.setProperty('--text-contrast', 
        window.matchMedia('(prefers-contrast: more)').matches ? '#000' : 'currentColor')
    }
    window.matchMedia('(prefers-contrast: more)').addListener(updateContrast)
  })