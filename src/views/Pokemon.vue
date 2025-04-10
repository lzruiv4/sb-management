<template>
  <div class="pokemon-content">
    <div class="pokemon-list">
      <ul>
        <li
          v-for="pokemon in pokemons"
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
      </ul>
    </div>
    <div class="pokemon-detail">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts" name="PokemonPage">
import { ref, onMounted } from "vue";
import axios from "axios";
import { RouterLink, RouterView } from "vue-router";
import { PokemonAPI } from "@/model/PokemonAPI";
import { IPokemonAPIList } from "@/model/IPokemonAPIList";
import { IPokemon } from "@/model/IPokemon";

const pokemons = ref<IPokemon[]>([]);

onMounted(async () => {
  try {
    const res = await axios.get(PokemonAPI);
    const results: IPokemonAPIList[] = res.data.results;

    const detailed: IPokemon[] = await Promise.all(
      results.map(async (pokemon): Promise<IPokemon> => {
        const detailRes = await axios.get(pokemon.url);
        console.log(detailRes);
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
  flex: 2;
}

.pokemon-detail {
  flex: 5;
  padding: 20px;
  text-align: top;
  height: 700px;
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

/* .pokemon-item.active {
  background-color: red;
} */

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
