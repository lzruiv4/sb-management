import { type IPokemonRecord, type IPokemonRecordDTO } from '@/domain/models/pokemen.model'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth-store'
import axios from 'axios'
import { POKEMON_RECORDS_API } from '@/api/api'
import { usePokemonStore } from './pokemon-store'

export const usePokemonRecordStore = defineStore('pokemonRecordStore', () => {
  const loading = ref(false)
  const authService = useAuthStore()
  const pokemonRecords = ref<IPokemonRecord[]>([])

  const pokemonRecord = ref<IPokemonRecord>({
    pokemonRecordId: '',
    image: '',
    pokemonId: '',
    userId: '',
    captureTime: new Date(),
    isRelease: false,
  })

  const pokemonService = usePokemonStore()
  pokemonService.getPokemons()

  async function getAllPokemonRecords() {
    loading.value = true
    try {
      const res = await axios.get<IPokemonRecordDTO[]>(
        POKEMON_RECORDS_API,
        authService.tokenInHeader,
      )
      // console.log(pokemonStore.pokemons.indexOf(Number(dto.pokemonId) - 1))
      pokemonRecords.value = res.data.map((dto) => {
        const index = Number(dto.pokemonId) - 1
        // console.log(index)
        return {
          pokemonRecordId: dto.id,
          image: pokemonService.pokemons[index].image,
          pokemonId: dto.pokemonId,
          userId: dto.userId,
          captureTime: dto.captureTime,
          isRelease: dto.isRelease,
        } as IPokemonRecord
      })
    } catch (error) {
      console.error('Get pokemon records failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return { loading, pokemonRecord, pokemonRecords, getAllPokemonRecords }
})
