<template>
  <!-- <el-header class="app"> -->
  <el-container
    ><el-header>
      <!-- Navi place -->
      <div class="navigate">
        <!--- 三种to网页的写法 -->
        <!-- <RouterLink to="/home" active-class="showActive">Home</RouterLink> -->
        <RouterLink :to="{ name: 'home' }" active-class="showActive"
          >Home</RouterLink
        >
        <RouterLink :to="{ name: 'pokemons' }" active-class="showActive"
          >Pokédex</RouterLink
        >
        <RouterLink :to="{ name: 'pokemon_game' }" active-class="showActive"
          >Game</RouterLink
        >
        <RouterLink :to="{ name: 'about' }" active-class="showActive"
          >About</RouterLink
        >
      </div>
    </el-header>
    <a-layout-content style="padding: 10px">
      <div
        :style="{
          background: '#f9f2e0',
          padding: '20px',
          minHeight: '280px',
          borderRadius: '30px',
        }"
      >
        <el-main> <RouterView></RouterView> </el-main>
      </div>
    </a-layout-content>
  </el-container>
</template>

<script lang="ts" setup name="App">
import { RouterView, RouterLink } from "vue-router";
</script>

<style scoped>
.el-header {
  background-color: #002fa7;
  color: #333;
  text-align: center;
  line-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px #999;
  padding: 5px 10px;
  font-weight: bold;
  height: 120px !important;
  border-radius: 10px;
}
/* buttons */
.navigate {
  text-align: center;
}

.navigate a {
  background-color: #92c6d9;
  color: #feece8;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 30px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  height: 50px;
}

.navigate a:hover {
  transform: scale(1.2);
  border-radius: 10px;
  background-color: rgb(87, 155, 203);
}

.navigate a.showActive {
  transform: scale(1.1);
  background-color: #ff9a9a;
}

/* 内容展示区域 */
.el-main {
  width: 80%;
  margin: 0 auto;
  /* padding: 20px; */
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.6;
  height: 90vh;
}
</style>
