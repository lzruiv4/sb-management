import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { usePokemonStore } from "./PokemonStore";

export const userPagination = defineStore("pagination", () => {
  const pokemonStore = usePokemonStore();
  const currentPage = ref(1);
  const itemsPerPage = 9;

  const totalPages = computed(() =>
    pokemonStore.pokemons
      ? Math.ceil(pokemonStore.pokemons.length / itemsPerPage)
      : 0
  );

  const pokemonPaginated = computed(() =>
    pokemonStore.pokemons.slice(
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

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    pokemonPaginated,
    nextPage,
    prevPage,
  };
});
