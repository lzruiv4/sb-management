// import { IPokemon } from "@/model/IPokemon";
// import { IPokemonAPIList } from "@/model/IPokemonAPIList";
// import { PokemonAPI } from "@/model/PokemonAPI";
// import axios from "axios";
// import { defineStore } from "pinia";

// export const usePokemonStore = defineStore("pokemon", {
//   state: () => ({
//     detailed: null as IPokemon[] | null,
//     loading: false,
//   }),
//   actions: {
//     async getPokemon() {
//       try {
//         this.loading = true;
//         const res = await axios.get(PokemonAPI);
//         const results: IPokemonAPIList[] = res.data.results;

//         this.detailed = await Promise.all(
//           results.map(async (pokemon): Promise<IPokemon> => {
//             const detailRes = await axios.get(pokemon.url);
//             return {
//               id: detailRes.data.id,
//               name: pokemon.name,
//               image: detailRes.data.sprites.front_default || undefined,
//               biggerImage:
//                 detailRes.data.sprites.other?.dream_world?.front_default ||
//                 undefined,
//             };
//           })
//         );
//       } catch (error) {
//         console.error("Get Pokémon failed:", error);
//         throw error; // 重新抛出错误以便组件可以处理
//       } finally {
//         this.loading = false; // 无论成功失败都停止加载
//       }
//     },
//   },
// });
