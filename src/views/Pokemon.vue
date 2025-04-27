<template>
  <div class="pokemon-content">
    <div class="pokemon-box pokemon-list">
      <ul class="select-poke">
        <li v-for="pokemon in pagination.pokemonPaginated" :key="pokemon.id">
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
            <div class="foto-div">
              <img
                :src="pokemon.image"
                alt="pokemon image"
                class="pokemon-foto"
              />
            </div>
            <a class="pname">{{ pokemon.name.toUpperCase() }}</a>
          </RouterLink>
        </li>
      </ul>

      <PokemonListPagination
        :current-page="pagination.currentPage"
        :total-pages="pagination.totalPages"
        @prev="pagination.prevPage"
        @next="pagination.nextPage"
      />
    </div>
    <div class="pokemon-box pokemon-detail">
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
}

.pokemon-box {
  min-width: 400px;
}

.pokemon-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
}

.pokemon-detail {
  flex: 3;
  max-width: 1000px;
  display: flex; /* 这里必须加上，不然下面的语句无效*/
  justify-content: center;
  align-items: center;
}

.pokemon-item {
  display: flex;
  align-items: center;
  justify-items: center;
  height: 80px;
  margin: 10px 0;
  border: 1px solid #4e4e4e; /* 添加分割线 */
  border-radius: 10px;
  padding: 10px;
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

.foto-div {
  width: 70px; /*设置图片大小*/
  height: 80px;
}

.pokemon-foto {
  flex: 1;
  width: 90%;
  height: 90%;
  padding-right: 10px; /* 图片与名字之间的间距 */
}

.pname {
  flex: 6;
  font-size: 30px; /* 设置文字大小 */
  text-align: left;
  font-weight: bold;
  text-shadow: 0 0 2px rgb(61, 60, 60);
}
</style>
