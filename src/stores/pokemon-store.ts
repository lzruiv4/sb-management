import { POKEMON_API } from '@/api/api'
import type {
  IPokemonWithNameAndFotos,
  IPokemonWithNameAndUrl,
} from '@/domain/models/pokemen.model'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePokemonStore = defineStore('pokemonStore', () => {
  const pokemons = ref<IPokemonWithNameAndFotos[]>([])
  const loading = ref(false)

  // check for data has been loading
  watch(pokemons, (newPokemons) => {
    if (newPokemons) console.log('Pokemons data has been loading.')
  })

  async function getPokemons() {
    try {
      loading.value = true
      const res = await axios.get(POKEMON_API)
      const results: IPokemonWithNameAndUrl[] = res.data.results

      pokemons.value = await Promise.all(
        results.map(async (pokemon): Promise<IPokemonWithNameAndFotos> => {
          const detailRes = await axios.get(pokemon.url)
          return {
            id: detailRes.data.id,
            name: pokemon.name,
            image: detailRes.data.sprites.other.showdown.front_default || undefined,
            biggerImage: detailRes.data.sprites.other.dream_world.front_default || undefined,
          }
        }),
      )
    } catch (error) {
      console.error('Get Pokémon failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return { pokemons, loading, getPokemons }
})
