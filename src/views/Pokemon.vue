<template>
  <div class="pokemon-content">
    <div class="pokemon-list">
      <ul>
        <li
          v-for="pokemon in pagination.pokemonPaginated"
          :key="pokemon.id"
          class="select-poke"
        >
          <!--拼接写法-->
          <!-- <RouterLink :to="`/detail?name=${pokemon.name}`"> -->
          <!--拼接写法-->
          <!-- <RouterLink to="/pokemons/detail"> -->
          <!-- <RouterLink :to="`/pokemons/detail?pokemonname=${pokemon.name}`"> -->
          <RouterLink
            :to="{
              name: 'detail1',
              query: {
                name: pokemon.name,
              },
            }"
            class="pokemon-item"
          >
            <!-- <div class="ballIcon">
              <PokemonIcon v-if="pokemon.id in catchendPokemons" />
            </div> -->
            <img
              :src="pokemon.image"
              alt="pokemon image"
              class="pokemon-foto"
            />
            <a class="pname">{{ pokemon.name.toUpperCase() }}</a>
          </RouterLink>
        </li>
        <PokemonListPagination
          :current-page="pagination.currentPage"
          :total-pages="pagination.totalPages"
          @prev="pagination.prevPage"
          @next="pagination.nextPage"
        />
      </ul>
    </div>
    <div class="pokemon-detail">
      <router-view v-slot="{ Component }">
        <component v-if="Component" :is="Component" />
        <PokemonIcon v-else />
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts" name="PokemonPage">
import { onMounted } from "vue";
import { RouterLink, RouterView } from "vue-router";
import PokemonListPagination from "@/components/PokemonListPagination.vue";
import PokemonIcon from "@/components/PokemonIcon.vue";
import { usePokemonStore } from "@/store/PokemonStore";
import { userPagination } from "@/store/Pagination";

const pokemonStore = usePokemonStore();
const pagination = userPagination();

onMounted(() => pokemonStore.getPokemons());
</script>

<style scoped>
.pokemon-content {
  display: flex;
  gap: 10px;
}

.pokemon-list {
  flex: 3;
}

.pokemon-detail {
  flex: 5;
  display: flex; /* 这里必须加上，不然下面的语句无效*/
  justify-content: center;
  align-items: center;
}

.pokemon-item {
  display: flex;
  align-items: center;
  justify-items: center;
  height: 70px;
  margin: 8px 0;
  border: 1px solid #4e4e4e; /* 添加分割线 */
  border-radius: 10px;
  padding: 8px;
  gap: 10px;
  transition: transform 0.5s ease;
}

.pokemon-item:hover {
  transform: scale(1.2);
  border-radius: 10px;
  background-color: aquamarine;
}

.select-poke {
  list-style: none;
}

/* .ballIcon {
  flex: 1;
  width: 5px;
  height: 5px;
  transform: rotate(20deg);
} */

.pokemon-foto {
  flex: 1;
  width: 50px; /*设置图片大小*/
  height: auto;
  padding-right: 5px; /* 图片与名字之间的间距 */
}

.pname {
  flex: 8;
  font-size: 30px; /* 设置文字大小 */
  text-align: left;
  font-weight: bold;
  text-shadow: 0 0 2px rgb(61, 60, 60);
}
</style>
