<script setup>
import { ref } from "vue";
import CompanyTitel from "./components/CompanyTitel.vue";
import AddUser from "./components/AddUser.vue";

// 定义 showTable，初始值为 false
const showTable = ref(false);

// 切换 showTable 的方法
const toggleTable = () => {
  showTable.value = !showTable.value;
};
</script>

<template>
  <div id="homeContainer">
    <div id="companyInfo">
      <img
        alt="Vue logo"
        class="logo"
        src="./assets/icons/logo.png"
        width="100"
        height="100"
      />
      <CompanyTitel companyName="Lin Group" />
    </div>
    
    <div id="addUser">
      <!-- 根据 showTable 显示不同的箭头 -->
      <svg
        v-if="!showTable"
        class="arrow-icon"
        @click="toggleTable"
        viewBox="0 0 48 48"
        width="96"
        height="96"
      >
        <path
          stroke="gold"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 12h14M12 5l7 7-7 7"
        />
      </svg>

      <svg
        v-else
        class="arrow-icon"
        @click="toggleTable"
        viewBox="0 0 48 48"
        width="96"
        height="96"
      >
        <path
          stroke="gold"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5 36h14M12 29l7 7-7 7"
        />
      </svg>
    </div>
  </div>

  <!-- 这里用 :visible 传递真正的布尔值 -->
  <AddUser :visible="showTable" />
</template>

<style>
body {
  background-color: black !important; /* 强制黑色背景 */
  color: rgb(0, 0, 0) !important; /* 强制白色文字 */
}

#homeContainer {
  display: flex;
}

#companyInfo {
  margin-right: 200px;
}

.arrow-icon {
  align-items: center;
  transition: transform 0.3s ease;
}

.arrow-icon:hover {
  filter: drop-shadow(0 0 10px #ffa500); /* 发光效果 */
  transform: scale(1.5);
}
</style>
