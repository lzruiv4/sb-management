import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'

export function setupAuthGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register']
    const authRequired = !publicPages.includes(to.path)

    const authStore = useAuthStore()
    if (authRequired && !authStore.isLoggedIn) {
      return next('/login')
    }

    next()
  })
}
