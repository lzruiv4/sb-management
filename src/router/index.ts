// Create e router and export

import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import PokemonGame from "@/views/PokemonGame.vue";
import Pokemon from "@/views/Pokemon.vue";
import About from "@/views/About.vue";
import PokemonDetail from "@/views/PokemonDetail.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "pokemon_game",
      path: "/pokemon_game",
      component: PokemonGame,
    },
    {
      name: "pokemons",
      path: "/pokemons",
      component: Pokemon,
      children: [
        {
          name: "detail1",
          path: "detail",
          component: PokemonDetail,
          props: true,
        },
      ],
    },
    {
      name: "about",
      path: "/about",
      component: About,
    },
  ],
});
