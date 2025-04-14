<template>
  <img :src="imagePath" class="imgSize" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePokemonStore } from "@/store/PokemonStore";

const route = useRoute();
const pokemonStore = usePokemonStore();

const imagePath = computed(
  () =>
    pokemonStore.pokemons?.find((pokemon) => pokemon.name === route.query.name)
      ?.biggerImage
);
</script>

<style scoped>
.imgSize {
  width: auto;
  height: 80%;
  max-width: 90%;
  max-height: 90%;
  padding: 10px;
}
</style>
