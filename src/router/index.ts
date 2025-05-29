import { createRouter, createWebHistory } from 'vue-router'
import { setupAuthGuard } from './guards/auth.guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/LoginView.vue') },
    { path: '/register', component: () => import('@/views/RegisterView.vue') },
    {
      path: '/home',
      component: () => import('@/views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/lotto',
      component: () => import('@/views/LottoManagementView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'users',
          component: () => import('@/components/lotto/UserComponent.vue'),
          // meta: { requiresAuth: true },
        },
        // {
        //   path: '/pokemonRecords',
        //   component: () => import('@/components/lotto/PokemonRecordComponent.vue'),
        // },
        // {
        //   path: '/rechargeRecords',
        //   component: () => import('@/components/lotto/RechargeRecordComponent.vue'),
        // },
      ],
    },

    { path: '/:pathMatch(.*)', redirect: '/login' },
  ],
})

setupAuthGuard(router)

export default router
