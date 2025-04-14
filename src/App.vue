<template>
  <div class="app">
    <h2 class="app_title">VUE STUDY</h2>
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
  </div>
  <div class="content_container">
    <div class="main-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
import { RouterView, RouterLink } from "vue-router";
</script>

<style>
body {
  font-family: "Microsoft YaHei", sans-serif;
  text-align: center;
  background-color: #fff;
}

.app {
  display: flex;
  background: linear-gradient(to right, #fe73a2, #eee);
  /* padding: 10px; */
  font-weight: bold;
  box-shadow: 0 0 10px #999;
  margin: 10px;
  gap: 60px;
}

.app_title {
  flex: 2;
  color: #3d3d3d;
  font-size: 60px;
}

/* 按钮区域 */
.navigate {
  flex: 3;
  display: flex;
  align-items: center;
  justify-items: center;
}

.navigate a {
  background-color: #92c6d9;
  color: #feece8;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 30px;
  /* font-weight: bold; */
  border-radius: 10px;
  cursor: pointer;
  width: 150px;
  height: 50px;
}

.navigate a:hover {
  transform: scale(1.2);
  border-radius: 10px;
  /* background-color: aquamarine; */
}

.navigate a.showActive {
  transform: scale(1.1);
  background-color: #393838;
}

.content_container {
  display: grid;
}

.studyTime {
  margin: 50px;
  position: relative;
  justify-content: center;
  /* align-items: center; */
}

/* 内容展示区域 */
.main-content {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #333;
  border-radius: 10px;
  text-align: left;
  font-size: 16px;
  line-height: 1.6;
}
</style>
