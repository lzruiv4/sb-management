<template>
  <div class="game_container">
    <div class="user_history">
      <el-table
        :data="pokemonRecordsStore.tableData"
        stripe
        :default-sort="{ prop: 'date', order: 'descending' }"
        :header-cell-style="{
          fontSize: '30px',
          fontWeight: 'bold',
        }"
      >
        <el-table-column prop="date" label="Date" sortable width="200">
          <template #default="scope">
            <span class="dateStyle">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Pokemons">
          <template #default="scope">
            <div
              style="
                display: flex;
                max-width: 100%;
                overflow-x: auto;
                padding-right: 5px;
              "
            >
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
    <div class="user_container">
      <div class="div_ball">
        <PokemonIcon
          :class="
            userStore.user.pokemonCoin > 0 ? 'catch_ball' : 'no_ball_animation'
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
        <a>Coin: {{ userStore.user.pokemonCoin }}</a>
      </div>
      <div class="recharge-history"><RechargeRecordHistory /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PokemonIcon from "@/components/PokemonIcon.vue";
import { usePokemonRecordsStore } from "@/store/PokemonRecordsStore";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store/UserStore";
import CatchPokemonDialog from "@/components/CatchPokemonDialog.vue";
import RechargeRecordHistory from "@/components/RechargeRecordHistory.vue";

const pokemonRecordsStore = usePokemonRecordsStore();
const userStore = useUserStore();

const shouldAnimate = ref(false);
const showCatchPokemonDialog = ref(false);

onMounted(() => {
  pokemonRecordsStore.getRecords();
  userStore.getCurrentUser();
  if (userStore.user) {
    shouldAnimate.value = userStore.user.pokemonCoin > 0;
  }
});

function callDialog() {
  return (showCatchPokemonDialog.value = !showCatchPokemonDialog.value);
}
</script>

<style scoped>
.game_container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  gap: 50px;
}

.user_container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 250px;
  gap: 20px;
}

.div_ball {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
}

.userInfo {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 20px;
  align-items: start;
  justify-content: flex-start;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 0 0 2px rgb(163, 71, 71);
  /* min-height: 50px; */
}

.recharge-history {
  flex: 3;
  max-height: 400px;
  width: 95%;
  padding: 10px;
}

.catch_ball {
  animation: zoomInOut 5s infinite;
}

.no_ball_animation {
  animation: none;
}

.catch_ball:hover {
  animation-play-state: paused;
}

@keyframes zoomInOut {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.8);
  }
}

.user_history {
  flex: 4;
  display: flex;
  min-width: 500px;
  min-height: 800px;
}

.dateStyle {
  flex: 1;
  font-size: 25px; /* 设置文字大小 */
  text-align: center;
  font-weight: bold;
  text-shadow: 0 0 2px rgb(110, 110, 110);
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
  min-width: 70px;
  height: 70px;
  margin: 10px;
  object-fit: cover;
  object-position: center !important;
  border-radius: 50px; /* 圆角效果，让图片更加柔和 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.poke_image:hover {
  transform: scale(1.1); /* 缩放效果更细腻 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 轻微增加阴影 */
}

/* 设置表头的背景色 */
:deep(.el-table__header-wrapper th) {
  background-color: #70b8ff !important;
  color: #fff;
  font-weight: bold;
  font-size: 30px;
  height: 90px;
}

/* 数据行背景色 */
:deep(.el-table__body-wrapper td) {
  background-color: #f9f2e0 !important;
  color: #3a3a3a;
  height: 100px;
}

/* 鼠标悬停时，行高亮 */
:deep(.el-table__row:hover) {
  background-color: #e2f1dd !important;
}

/* 设置表格边框颜色 */
:deep(.el-table__cell) {
  border-color: #a5c1a3 !important;
}
</style>
