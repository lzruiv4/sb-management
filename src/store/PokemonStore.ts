import { IPokemon } from "@/model/IPokemon";
import { IPokemonAPIList } from "@/model/IPokemonAPIList";
import { PokemonAPI } from "@/model/PokemonAPI";
import axios from "axios";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const usePokemonStore = defineStore("pokemonStore", () => {
  const pokemons = ref<IPokemon[]>([]);
  const loading = ref(false);

  // check for data has been loading
  watch(pokemons, (newPokemons) => {
    if (newPokemons) console.log("Pokemons data has been loading.");
  });

  async function getPokemons() {
    try {
      loading.value = true;
      const res = await axios.get(PokemonAPI);
      const results: IPokemonAPIList[] = res.data.results;

      pokemons.value = await Promise.all(
        results.map(async (pokemon): Promise<IPokemon> => {
          const detailRes = await axios.get(pokemon.url);
          return {
            id: detailRes.data.id,
            name: pokemon.name,
            image:
              detailRes.data.sprites.other.showdown.front_default || undefined,
            biggerImage:
              detailRes.data.sprites.other.dream_world.front_default ||
              undefined,
          };
        })
      );
      // console.log(pokemons.value.length);
    } catch (error) {
      console.error("Get Pokémon failed:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  return { pokemons, loading, getPokemons };
});
