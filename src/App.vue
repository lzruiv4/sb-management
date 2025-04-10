<template>
  <div class="app">
    <h2 style="color: #f0f2e6">VUE STUDY</h2>
  </div>
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
    <RouterLink :to="{ name: 'about' }" active-class="showActive"
      >About</RouterLink
    >
  </div>

  <!--LoveTalk /> -->
  <!--Content-->
  <div class="content_container">
    <div class="main-content">
      <RouterView></RouterView>
    </div>
    <!-- <div class="studyTime">
      <Father />
    </div> -->
  </div>
</template>

<script lang="ts" setup name="App">
import { RouterView, RouterLink } from "vue-router";
// import Father from "./components/study/communication/02Custom-event/Father.vue";
</script>

<style>
body {
  font-family: "Microsoft YaHei", sans-serif;
  text-align: center;
  background-color: #fff;
  margin: 0;
  padding: 0;
}

.app {
  background: linear-gradient(to right, #fe73a2, #eee);
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  box-shadow: 0 0 5px #999;
  margin-bottom: 20px;
}

/* 按钮区域 */
.navigate {
  margin-bottom: 20px;
}

.navigate a {
  background-color: #ed0000;
  color: #f0f2e6;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
}

.navigate a.showActive {
  background-color: #000;
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
