import { PokemonRecordsAPI } from "@/model/GameAPI";
import axios from "axios";
import { defineStore } from "pinia";

export interface IPokemonInList {
  id: string;
  poke_id: string;
  catch_time: string;
  user_id: string;
}

export const usePokemonRecordsStore = defineStore("pokemonRecordsStore", {
  state: () => ({
    detailed: [] as IPokemonInList[],
    loading: false,
  }),
  actions: {
    async getRecords() {
      try {
        this.loading = true;
        const res = await axios.get(PokemonRecordsAPI);
        this.detailed = res.data.map((item: IPokemonInList) => {
          return {
            id: item.id,
            poke_id: item.poke_id,
            catch_time: dateFormatter(item.catch_time),
            user_id: item.user_id,
          };
        });
        // console.log("2323", this.detailed);
      } catch (error) {
        console.error("Get Pokémon failed:", error);
        throw error; // 重新抛出错误以便组件可以处理
      } finally {
        this.loading = false; // 无论成功失败都停止加载
      }
    },
  },
});

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
