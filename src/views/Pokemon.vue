<template>
  <div class="pokemon-content">
    <div class="pokemon-box pokemon-list">
      <a-list
        item-layout="horizontal"
        :pagination="pagination"
        :data-source="pokemonStore.pokemons"
      >
        <template #renderItem="{ item }">
          <RouterLink
            :to="{
              name: 'detail',
              query: {
                name: item.name,
              },
            }"
          >
            <a-list-item class="list-item">
              <div class="item-container">
                <img
                  :src="item.image"
                  alt="pokemon image"
                  class="image-in-list"
                />
                <a class="pname">{{ item.name.toUpperCase() }}</a>
              </div>
            </a-list-item>
          </RouterLink>
        </template>
      </a-list>
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
import PokemonIcon from "@/components/PokemonIcon.vue";
import { usePokemonStore } from "@/store/PokemonStore";

const pokemonStore = usePokemonStore();

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 8,
  showSizeChanger: false,
};

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
  min-width: 300px;
}

.pokemon-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 550px;
}

.list-item {
  transition: transform 0.3s ease;
  height: 80px;
  overflow: hidden;
  padding: 2px;
  /* border: 1px solid #656565; */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  margin: 10px 0;
  transition: transform 0.5s ease;
}

.list-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 6px 16px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  background-color: rgb(16, 184, 210);
}

.item-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.image-in-list {
  height: 90%;
  width: 75px;
  object-fit: contain;
  margin: 1px 16px;
  border-radius: 8px;
}

.pokemon-detail {
  flex: 2;
  min-width: 500px;
  max-width: 1000px;
  display: flex; /* 这里必须加上，不然下面的语句无效*/
  justify-content: center;
  align-items: center;
}

.pokemon-foto {
  flex: 1;
  width: 90%;
  height: 90%;
  padding-right: 10px; /* 图片与名字之间的间距 */
}

.pname {
  font-size: 27px; /* 设置文字大小 */
  text-align: left;
  font-weight: 500;
}
</style>
