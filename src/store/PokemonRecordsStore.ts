import { PokemonRecordsAPI } from "@/model/GameAPI";
import axios from "axios";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { usePokemonStore } from "./PokemonStore";

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

  const records = ref<IPokemonInList[]>([]);
  const loading = ref(false);

  const tableData = ref<TableItem[]>([]);

  watch(
    [records, tableData],
    ([newRecords, newTableData], [oldRecords, oldTableData]) => {
      if (newRecords !== oldRecords || newTableData !== oldTableData) {
        console.log("Something changed in PokemonRecordStore.");
      }
    }
  );

  const groupByRecords = (
    data: Array<{ catch_time: string; poke_id: string }>
  ): TableItem[] => {
    const map = new Map<string, string[]>();
    data.forEach(({ catch_time, poke_id }) => {
      if (!map.has(catch_time)) map.set(catch_time, []);
      map.get(catch_time)?.push(getPokemonUrl(poke_id));
      console.log(getPokemonUrl(poke_id));
    });

    return Array.from(map.entries()).map(([date, pokemonUrls]) => ({
      date,
      pokemonUrls,
    }));
  };

  const getPokemonUrl = (id: string): string =>
    pokemonStore.detailed?.at(parseInt(id) - 1)?.image ?? "";

  function dateFormatter(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    // const hours = String(date.getHours()).padStart(2, "0");
    // const minutes = String(date.getMinutes()).padStart(2, "0");
    // return `${day}-${month}-${year} ${hours}:${minutes}`;
    return `${day}-${month}-${year}`;
  }

  async function getRecords() {
    try {
      // this.loading = true;
      const res = await axios.get(PokemonRecordsAPI);
      records.value = res.data.map((item: IPokemonInList) => {
        return {
          id: item.id,
          poke_id: item.poke_id,
          catch_time: dateFormatter(item.catch_time),
          user_id: item.user_id,
        };
      });
      tableData.value = groupByRecords(records.value);
      // console.log("2323", this.detailed);
    } catch (error) {
      console.error("Get Pokémon failed:", error);
      throw error; // 重新抛出错误以便组件可以处理
    } finally {
      loading.value = false; // 无论成功失败都停止加载
      // console.log(records);
    }
  }

  async function catchANewPokemon(newPokemon: {
    poke_id: string;
    catch_time: string;
    user_id: string;
  }) {
    try {
      const res = await axios.post(PokemonRecordsAPI, newPokemon);
      records.value.push(res.data);
      tableData.value = groupByRecords(records.value);
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
    dateFormatter,
    getRecords,
    catchANewPokemon,
  };
});
