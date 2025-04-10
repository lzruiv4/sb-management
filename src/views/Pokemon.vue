<template>
  <div class="pokemon-content">
    <div class="pokemon-list">
      <ul>
        <li
          v-for="pokemon in pokemonPaginated"
          :key="pokemon.id"
          style="list-style: none"
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
                imagePath: pokemon.biggerImage,
              },
            }"
            class="pokemon-item"
          >
            <img
              :src="pokemon.image"
              alt="pokemon image"
              class="pokemon-foto"
            />
            <a class="pname">{{ pokemon.name.toUpperCase() }}</a>
          </RouterLink>
        </li>
        <PokemonListPagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @prev="prevPage"
          @next="nextPage"
        />
      </ul>
    </div>
    <div class="pokemon-detail">
      <router-view v-slot="{ Component }">
        <component v-if="Component" :is="Component" />
        <img v-else :src="PokeImage" style="width: 30%" />
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts" name="PokemonPage">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { RouterLink, RouterView } from "vue-router";
import { PokemonAPI } from "@/model/PokemonAPI";
import { IPokemonAPIList } from "@/model/IPokemonAPIList";
import { IPokemon } from "@/model/IPokemon";
import PokemonListPagination from "@/components/PokemonListPagination.vue";
import PokeImage from "@/assets/poke.png";

const pokemons = ref<IPokemon[]>([]);
const currentPage = ref(1);
const itemsPerPage = 10;

onMounted(async () => {
  try {
    const res = await axios.get(PokemonAPI);
    const results: IPokemonAPIList[] = res.data.results;

    const detailed: IPokemon[] = await Promise.all(
      results.map(async (pokemon): Promise<IPokemon> => {
        const detailRes = await axios.get(pokemon.url);
        // console.log(detailRes);
        return {
          id: detailRes.data.id,
          name: pokemon.name,
          image: detailRes.data.sprites.other.showdown.front_default || "",
          biggerImage:
            detailRes.data.sprites.other.dream_world.front_default || "",
        };
      })
    );
    pokemons.value = detailed;
  } catch (error) {
    console.error("Get Pokémon fail：", error);
  }
});

const totalPages = computed(() =>
  Math.ceil(pokemons.value.length / itemsPerPage)
);
const pokemonPaginated = computed(() =>
  pokemons.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  )
);

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}
</script>

<style scoped>
.pokemon-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  gap: 10px;
}

.pokemon-list {
  flex: 3;
}

.pokemon-detail {
  flex: 5;
  width: 80%; /* 子元素宽度占满父元素 */
  /* 子元素内容居中方式 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-item {
  display: flex;
  align-items: center;
  height: 70px;
  margin: 8px 0;
  border-bottom: 1px solid #000000; /* 添加分割线 */
  padding-bottom: 8px;
  gap: 10px;
}

.pokemon-foto {
  width: 50px; /*设置图片大小*/
  height: auto;
  padding-right: 10px; /* 图片与名字之间的间距 */
}

.pname {
  /* width: 50px; */
  font-size: 100%; /* 设置文字大小 */
  text-align: center;
  font-weight: bold;
  /* padding-bottom: 10px; */
}
</style>
