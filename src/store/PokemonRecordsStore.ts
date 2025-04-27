import { POKEMON_RECORDS_API, testUser } from "@/api/GameAPI";
import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { usePokemonStore } from "./PokemonStore";
import { dateFormatterDMY } from "@/utils/DateTools";

export interface IPokemonInList {
  id: string;
  poke_id: string;
  catch_time: string;
  user_id: string;
}

export interface TableItem {
  date: string;
  pokemonUrls: string[];
}

export const usePokemonRecordsStore = defineStore("pokemonRecordsStore", () => {
  const pokemonStore = usePokemonStore();
  pokemonStore.getPokemons();

  const records = ref<IPokemonInList[]>([]);
  const loading = ref(false);

  // const tableData = ref<TableItem[]>([]);
  const tableData = computed<TableItem[]>(() => groupByRecords(records.value));

  // watch(
  //   [records, tableData],
  //   ([newRecords, newTableData], [oldRecords, oldTableData]) => {
  //     if (newRecords !== oldRecords || newTableData !== oldTableData) {
  //       console.log("Something changed in PokemonRecordStore.");
  //     }
  //   }
  // );

  // watch(tableData, (newTableData) => {
  //   if (newTableData) {
  //     console.log("Something changed in PokemonRecordStore.");
  //   }
  // });

  const groupByRecords = (
    data: Array<{ catch_time: string; poke_id: string }>
  ): TableItem[] => {
    const map = new Map<string, string[]>();
    data.forEach(({ catch_time, poke_id }) => {
      if (!map.has(catch_time)) map.set(catch_time, []);
      map.get(catch_time)?.push(getPokemonUrl(poke_id));
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
      const res = await axios.get(POKEMON_RECORDS_API);
      records.value = res.data
        .filter((record: IPokemonInList) => record.user_id === testUser)
        .map((item: IPokemonInList) => {
          return {
            id: item.id,
            poke_id: item.poke_id,
            catch_time: dateFormatterDMY(item.catch_time),
            user_id: item.user_id,
          };
        });
    } catch (error) {
      console.error("Get Pokémon failed:", error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function catchANewPokemon(newPokemon: {
    poke_id: string;
    catch_time: string;
    user_id: string;
  }) {
    try {
      const res = await axios.post<IPokemonInList>(
        POKEMON_RECORDS_API,
        newPokemon
      );
      res.data.catch_time = dateFormatterDMY(res.data.catch_time);
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
