// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, _from, _savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 120, // Adjust this number based on your header height
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
}