<script setup>
import CompanyTitel from "./components/CompanyTitel.vue";
import AddUserButton from "./components/AddUserButton.vue";
import CompanyLogo from "./components/CompanyLogo.vue";

// 定义 showTable，初始值为 false
// const showTable = ref(false);

// 切换 showTable 的方法
// const toggleTable = () => {
//   showTable.value = !showTable.value;
// };

// function changeFormStatus(status) {
//   showTable.value = false;
// }

// const users = ref([]);

// const fetchUsers = async () => {
//   try{
//     const response = await fetch("http://localhost:8080/clients/all")
//     if(!response.ok) throw new Error("404");
//     users.value = await response.json();
//   } catch (error) {
//     console.log(error);
//   }
// }
// console.log(users.value)
// onMounted(fetchUsers);
</script>

<template>
  <div id="headerContainer">
    <CompanyLogo/>
    <CompanyTitel companyName="Lin Group" />
    <AddUserButton/>
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
  position: fixed;
  top: 5px;
  left: 50px;
}
</style>
