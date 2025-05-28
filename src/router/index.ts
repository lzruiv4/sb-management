import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView,
    },
    // {
    //   name: 'pokemon_game',
    //   path: '/pokemon_game',
    //   component: PokemonGame,
    // },
    // {
    //   name: 'pokemons',
    //   path: '/pokemons',
    //   component: Pokemon,
    //   children: [
    //     {
    //       name: 'detail',
    //       path: 'detail',
    //       component: PokemonDetail,
    //       props: true,
    //     },
    //   ],
    // },
    // {
    //   name: 'about',
    //   path: '/about',
    //   component: About,
    // },
  ],
})

export default router
