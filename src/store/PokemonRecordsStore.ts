import { POKEMON_RECORDS_API, testUser } from "@/api/GameAPI";
import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { usePokemonStore } from "./PokemonStore";
import { IPokemonRecord, IPokemonRecordDTO } from "@/model/IPokemon";

export interface TableItem {
  date: string;
  pokemonUrls: string[];
}

export const usePokemonRecordsStore = defineStore("pokemonRecordsStore", () => {
  const pokemonStore = usePokemonStore();
  pokemonStore.getPokemons();

  const records = ref<IPokemonRecord[]>([]);
  const loading = ref(false);

  const tableData = computed<TableItem[]>(() => groupByRecords(records.value));

  const groupByRecords = (data: IPokemonRecord[]): TableItem[] => {
    const map = new Map<string, string[]>();
    data.forEach((pokemonRecord) => {
      if (!map.has(pokemonRecord.captureTime ?? ""))
        map.set(pokemonRecord.captureTime ?? "", []);
      map
        .get(pokemonRecord.captureTime ?? "")
        ?.push(getPokemonUrl(pokemonRecord.pokemonId));
    });

    return Array.from(map.entries()).map(([date, pokemonUrls]) => ({
      date,
      pokemonUrls,
    }));
  };

  const getPokemonUrl = (id: string): string =>
    pokemonStore.pokemons?.at(parseInt(id) - 1)?.image ?? "";

  async function getRecords() {
    try {
      // this.loading = true;
      const res = await axios.get(POKEMON_RECORDS_API + "?userId=" + testUser);
      console.log(res.data);
      records.value = res.data
        .filter((record: IPokemonRecord) => record.userId === testUser)
        .map((item: IPokemonRecord) => {
          return {
            id: item.pokemonRecordId,
            pokemonId: item.pokemonId,
            captureTime: item.captureTime?.split("T")[0],
            // captureTime: item.captureTime,
            userId: item.userId,
            isRelease: item.isRelease,
          };
        });
    } catch (error) {
      console.error("Get Pokémon failed:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function catchANewPokemon(newPokemonDTO: IPokemonRecordDTO) {
    try {
      newPokemonDTO.captureTime = new Date().toISOString();
      const res = await axios.post<IPokemonRecord>(
        POKEMON_RECORDS_API,
        newPokemonDTO
      );
      console.log("asdf ", res.data);
      res.data.captureTime = res.data.captureTime?.split("T")[0];
      records.value = [...records.value, res.data];
    } catch (error) {
      console.error("Pokemon ran away");
    }
  }

  return {
    records,
    loading,
    tableData,
    groupByRecords,
    getPokemonUrl,
    getRecords,
    catchANewPokemon,
  };
});
