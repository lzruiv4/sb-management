import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupAuthGuard } from './guards/auth.guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
    {
      path: '/home',
      component: HomeView,
      children: [],
    },
    { path: '/:pathMatch(.*)', redirect: '/login' },
  ],
})

setupAuthGuard(router)

export default router
