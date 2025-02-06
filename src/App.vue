<script setup>
import Greeting from './components/Greeting.vue'
// import TheWelcome from './components/TheWelcome.vue'
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
      console.log('提交的数据：', this.formData);
      alert(`提交成功！姓名：${this.formData.name}，邮箱：${this.formData.email}`);
      this.showTable = false; // 隐藏表格，重置状态
    }
  }
};
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <Greeting msg="ScopeVisio AG" />
    
      <svg v-if="!showTable" class="arrow-icon" @click="showTable=true"  viewBox="0 0 48 48" width="96" height="96">
        <path stroke="gold" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  </header>

  <main v-if="showTable">
    <form class="form">
      <h2>请输入您的信息</h2>
      <div class="form-group">
        <label for="name">姓名：</label>
        <input type="text" id="name" v-model="formData.name" placeholder="请输入您的姓名" />
      </div>
      <div class="form-group">
        <label for="email">邮箱：</label>
        <input type="email" id="email" v-model="formData.email" placeholder="请输入您的邮箱" />
      </div>
      <button type="button" @click="submitForm">提交</button>
    </form>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.wrapper {
  display: flex;
  align-items: center;
  gap: 100px; /* Greeting 和箭头之间的间距 */
}

.arrow-icon {
  cursor: pointer;
  transition: transform 0.3s;
}

.arrow-icon:hover {
  transform: scale(2);
}

.form {
  padding: 20px;
  background: #ffe562;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
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

button {
  padding: 10px 15px;
  background: #ffa500;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #1324e0;
}
</style>
