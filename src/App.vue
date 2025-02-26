<script setup>
import CompanyTitel from "./components/CompanyTitel.vue";
import AddUserButton from "./components/AddUserButton.vue";
import CompanyLogo from "./components/CompanyLogo.vue";
// import Test from "./components/study/VTest.vue";
import UserInfo from "./components/UserInfo.vue";
</script>

<template>
  <div>
    <div id="headerContainer">
      <CompanyLogo />
      <CompanyTitel companyName="Lin Group" />
      <AddUserButton />
    </div>
    <!-- <div>
      <Test />
    </div> -->
    <div id="tableId">
      <UserInfo />
    </div>
  </div>
</template>

<style>
body {
  background-color: black !important; /* 强制黑色背景 */
  color: rgb(255, 255, 255) !important; /* 强制白色文字 */
}

#headerContainer {
  display: flex;
  height: 100px;
  /* position: fixed; */
  margin-top: 5px;
  margin-left: 50px;
  margin-bottom: 40px;
}

#div {
  margin-top: auto;
  margin-left: 10%;
}

#tableId {
  padding-top: 30px;
  margin-left: 20px;
}
</style>
