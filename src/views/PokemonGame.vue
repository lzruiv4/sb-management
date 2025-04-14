<template>
  <div class="game_container">
    <div class="user_container">
      <div class="div_ball">
        <PokemonIcon
          :class="
            userStore.user.poke_coin > 0 ? 'catch_ball' : 'no_ball_animation'
          "
          @click="callDialog"
        />
      </div>
      <CatchPokemonDialog
        v-model:callDialogInComponent="showCatchPokemonDialog"
      />
      <div class="userInfo">
        <a>Firstname: {{ userStore.user.firstname }}</a>
        <a>Lastname: {{ userStore.user.lastname }}</a>
        <a>Coin: {{ userStore.user.poke_coin }}</a>
      </div>
    </div>
    <div class="user_history">
      <el-table
        :data="pokemonRecordsStore.tableData"
        stripe
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{
          background: '#f5f7fa',
          color: '#606266',
          fontSize: '30px',
          fontWeight: 'bold',
          margin: '15px',
          textShadow: '0 0 2px rgb(61, 60, 60)',
        }"
      >
        <el-table-column prop="date" label="Date" sortable>
          <template #default="scope">
            <span class="dateStyle">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Pokemons">
          <template #default="scope">
            <div style="display: flex">
              <el-image
                v-for="(pokemonUrl, index) in scope.row.pokemonUrls"
                :key="index"
                :src="pokemonUrl"
                :preview-src-list="scope.row.pokemonUrls"
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
import { usePokemonRecordsStore } from "@/store/PokemonRecordsStore";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/UserStore";
import CatchPokemonDialog from "@/components/CatchPokemonDialog.vue";

const pokemonRecordsStore = usePokemonRecordsStore();
const userStore = useUserStore();

const shouldAnimate = ref(false);
const showCatchPokemonDialog = ref(false);

onMounted(() => {
  pokemonRecordsStore.getRecords();
  userStore.getCurrentUser();
  if (userStore.user) {
    shouldAnimate.value = userStore.user.poke_coin > 0;
  }
});

function callDialog() {
  return (showCatchPokemonDialog.value = !showCatchPokemonDialog.value);
}
</script>

<style scoped>
.game_container {
  display: flex;
  flex-direction: column;
  margin: 50px;
  gap: 50px;
}

.user_container {
  display: flex;
}

.div_ball {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.catch_ball {
  animation: zoomInOut 3s infinite;
}

.no_ball_animation {
  animation: none;
}

.catch_ball:hover {
  animation-play-state: paused;
}

@keyframes zoomInOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.userInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 50px;
  align-items: left;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  text-shadow: 0 0 2px rgb(163, 71, 71);
}

/* .el_column {
  font-size: 30px;
  text-align: left;
  font-weight: bold;
  text-shadow: 0 0 2px rgb(61, 60, 60);
} */

.user_history {
  display: flex;
}

.dateStyle {
  flex: 1;
  font-size: 25px; /* 设置文字大小 */
  text-align: center;
  font-weight: bold;
  text-shadow: 0 0 2px rgb(61, 60, 60);
}

.element-table-container {
  font-size: 30px; /* 设置文字大小 */
  text-align: left;
  font-weight: bold;
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.poke_image {
  width: 60px !important;
  /* height: 70px !important; */
  margin: 10px;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.2s;
}

.poke_image:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.el-table {
  margin-top: 15px;
}
</style>
