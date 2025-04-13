<template>
  <div class="user_container">
    <div class="catch_ball"><PokemonIcon style="width: 60%" /></div>
    <div class="user_history">
      <el-table
        :data="tableData"
        stripe
        :header-cell-style="{ background: '#f5f7fa', color: '#606266' }"
      >
        <el-table-column prop="date" label="Date" sortable></el-table-column>
        <el-table-column label="Pokemons">
          <template #default="scope">
            <div
              style="
                /* height: 150px; */
                /* width: 250px; */
                display: flex;
                /* flex-wrap: wrap; */
              "
            >
              <el-image
                v-for="(pokemonUrl, index) in scope.row.pokemonUrls"
                :key="index"
                :src="pokemonUrl"
                :preview-src-list="scope.row.images"
                fit="cover"
                :initial-index="index"
                class="poke_image"
              >
              </el-image>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonIcon from "@/components/PokemonIcon.vue";
import { usePokemonStore } from "@/store/PokemonStore";
import { usePokemonRecordsStore } from "@/store/PokemonRecordsStore";
import { computed, onMounted } from "vue";

const pokemonStore = usePokemonStore();
const pokemonRecordsStore = usePokemonRecordsStore();
// const tableData = ref<TableItem[]>([]);
const pokemons = computed(() => pokemonStore.detailed);
const tableData = computed(() => groupByDate(pokemonRecordsStore.detailed));
console.log("2323", tableData.value);
// const error = ref<string | null>(null);

interface TableItem {
  date: string;
  pokemonUrls: string[];
}

onMounted(async () => {
  try {
    await pokemonStore.getPokemon();
    if (pokemonStore.detailed) {
      await pokemonRecordsStore.getRecords();
    }
  } catch (e) {
    console.error(e);
  }
});

function groupByDate(
  data: Array<{ catch_time: string; poke_id: string }>
): TableItem[] {
  const map = new Map<string, string[]>();
  data.forEach(({ catch_time, poke_id }) => {
    if (!map.has(catch_time)) map.set(catch_time, []);
    map.get(catch_time)?.push(getPokemonUrl(poke_id));
  });
  console.log("dsds", map);
  return Array.from(map.entries()).map(([date, pokemonUrls]) => ({
    date,
    pokemonUrls,
  }));
}

function getPokemonUrl(id: string): string {
  console.log("@@@", pokemons.value?.length);
  return pokemons.value?.at(parseInt(id) + 1)?.image ?? "";
}
</script>

<style scoped>
.user_container {
  display: flex;
  flex-direction: column;
  margin: 50px;
  gap: 50px;
}

.catch_ball {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(24deg);
}

.user_history {
  flex: 2;
}

.element-table-container {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.poke_image {
  width: 100px !important;
  /* height: 70px !important; */
  margin: 10px;
  border-radius: 4px;
  object-fit: cover;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  transition: transform 0.2s;
}

/* .person-image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
} */

.el-table {
  margin-top: 15px;
}
</style>
