<template>
  <div class="pokemon-content">
    <div class="pokemon-list">
      <ul>
        <li v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-item">
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
          >
            <img
              :src="pokemon.image"
              alt="pokemon image"
              class="pokemon-foto"
            />
            <span>{{ pokemon.name }}</span>
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

const pokemons = ref([]);

onMounted(async () => {
  try {
    const res = await axios.get(PokemonAPI);
    const results = res.data.results;

    const detailed = await Promise.all(
      results.map(async (pokemon) => {
        const detailRes = await axios.get(pokemon.url);
        return {
          id: detailRes.data.id,
          name: pokemon.name,
          image:
            detailRes.data.sprites.front_default ||
            "https://via.placeholder.com/80?text=?",
          biggerImage:
            detailRes.data.sprites.other.dream_world.front_default ||
            "https://via.placeholder.com/80?text=?",
        };
      })
    );
    pokemons.value = detailed;
  } catch (error) {
    console.error("获取 Pokémon 数据失败：", error);
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
  text-align: center;
}

.pokemon-item {
  display: flex;
  align-items: center;
  margin: 8px 0;
  border-bottom: 1px solid #ccc; /* 添加分割线 */
  padding-bottom: 8px;
}

/* .pokemon-item.active {
  background-color: red;
} */

.pokemon-foto {
  width: 30px; /* 设置图片大小 */
  height: 30px;
  margin-right: 10px; /* 图片与名字之间的间距 */
}

span {
  font-size: 20px; /* 设置文字大小 */
}
</style>
