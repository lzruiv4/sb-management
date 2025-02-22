<script setup>
import CompanyTitel from "./components/CompanyTitel.vue";
import AddUser from "./components/AddUser.vue";
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
      <svg
        v-if="!showTable"
        class="arrow-icon"
        @click="showTable"
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
    </div>
  </div>
  <AddUser visible="true" />
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
