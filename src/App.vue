<script setup>
import CompanyTitel from './components/CompanyTitel.vue'
</script>

<script>
export default {
  data() {
    return {
      showTable: false, // 控制箭头和表格的显示状态
      formData: {
        name: '',
        email: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log('Submitted Data：', this.formData);
      alert(`Submit successfully！Name：${this.formData.name}，Email：${this.formData.email}`);
      this.showTable = false; // 隐藏表格，重置状态
      this.formData.name = ''; // 提交后清空输入框
      this.formData.email = ''; // 提交后清空输入框
    }
  }
};
</script>

<template>
  <div id="homeContainer">
      <div id="companyInfo">
        <img alt="Vue logo" class="logo" src="./assets/logo.png" width="100" height="100" />
        <CompanyTitel companyName="Lin Group" />
      </div>
      <div id="addUser">
        <svg v-if="!showTable" class="arrow-icon" @click="showTable=true"  viewBox="0 0 48 48" width="96" height="96">
          <path stroke="gold" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
  </div>

  <main v-if="showTable">
    <form class="form">
      <h2>New User</h2>
      <div class="form-group">
        <label for="firstname">First Name：</label>
        <input type="text" id="name" v-model="formData.name" placeholder="Please input your first name" />
      </div>
      <div class="form-group">
        <label for="name">Family Name：</label>
        <input type="text" id="name" v-model="formData.name" placeholder="Please input your family name" />
      </div>
      <div class="form-group">
        <label for="email">Email：</label>
        <input type="email" id="email" v-model="formData.email" placeholder="Please input your email address" />
      </div>
      <div class="button-group">
        <button type="button" @click="submitForm">submit</button>
        <button type="button" @click="showTable=false">cancel</button>
      </div>
      
    </form>
  </main>
</template>

<style>
body {
  background-color: black !important;  /* 强制黑色背景 */
  color: rgb(0, 0, 0) !important;            /* 强制白色文字 */
}
#homeContainer{
  display: flex;
}

#companyInfo{
  margin-right: 100px;
}

.arrow-icon {
  align-items: center;
  transition: transform 0.3s ease;
}

.arrow-icon:hover {
  filter: drop-shadow(0 0 10px #ffa500); /* 发光效果 */
  transform: scale(1.5);
}

.form {
  padding: 20px;
  background: #ffe562;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
  font-family: Arial, sans-serif;
  background-color: #2F2F2F; /* 深蓝色 */
  color: #FFD700; /* 白色 */
  border-bottom: 2px solid #e0e0e0; /* 浅灰色边框 */
  /* position: fixed; /* 固定定位，避免影响 header 布局 */
  left: 50%;
  top: 50px;
  z-index: 1000;
  transform: translateX(-50%); 
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input.selected {
  background-color: #e8f5e9; /* 浅绿色 */
  color: #1b5e20; /* 深绿色文字 */
}

.button-group {
  display: flex;
  justify-content: space-between; /* 按钮左右对齐 */
  gap: 10px; /* 按钮之间的间距 */
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049; /* 深绿色 */
  filter: drop-shadow(0 0 10px #45a049);
  transform: scale(1.2);
}
</style>
