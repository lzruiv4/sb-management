import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'

export function setupAuthGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const isLoggedIn = authStore.getToken() || localStorage.getItem('authToken')

    if (to.meta.requiresAuth && !isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  })
}
