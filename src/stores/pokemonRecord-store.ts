import {
  mapDtoToModelInPokemonRecord,
  type IPokemonRecord,
  type IPokemonRecordDTO,
} from '@/domain/models/pokemen.model'
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

  async function getAllPokemonRecords() {
    await pokemonService.getPokemons()

    loading.value = true
    try {
      const res = await axios.get<IPokemonRecordDTO[]>(
        POKEMON_RECORDS_API,
        authService.tokenInHeader,
      )
      // console.log(pokemonStore.pokemons.indexOf(Number(dto.pokemonId) - 1))
      pokemonRecords.value = res.data.map((dto) => {
        return {
          pokemonRecordId: dto.id,
          image: getImageUrlLink(dto.pokemonId),
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

  async function updatePokemonRecord(newPokemonRecordDTO: IPokemonRecordDTO) {
    try {
      console.log('Before update: ', newPokemonRecordDTO)
      const res = await axios.put(
        POKEMON_RECORDS_API + '/' + newPokemonRecordDTO.id,
        newPokemonRecordDTO,
        authService.tokenInHeader,
      )
      console.log('update: ', res.data)
      const index = pokemonRecords.value.findIndex(
        (pokemonRecord) => pokemonRecord.pokemonRecordId === res.data.id,
      )
      if (index !== -1) {
        pokemonRecords.value[index] = mapDtoToModelInPokemonRecord(res.data)
        pokemonRecords.value[index].image = getImageUrlLink(res.data.pokemonId)
        console.log('Successful', pokemonRecords.value[index])
      }
    } catch (error) {
      console.error('Recharge record update failed', error)
    }
  }

  function getImageUrlLink(pokemonId: string): string {
    return pokemonService.pokemons[Number(pokemonId) - 1].image
  }

  return {
    loading,
    pokemonRecord,
    pokemonRecords,
    getAllPokemonRecords,
    updatePokemonRecord,
    getImageUrlLink,
  }
})
