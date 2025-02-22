<script setup>
import { ref, reactive, defineProps, defineEmits } from "vue";

defineProps({
  visible: {
    type: Boolean,
  },
});

const showTable = ref(false); // 控制箭头和表格的显示状态
const formData = reactive({
  firstname: "",
  lastname: "",
  email: "",
});

const submitForm = () => {
  console.log("Submitted Data：", formData);
  alert(
    `Submit successfully！Name：${formData.firstname} ${formData.lastname}，Email：${formData.email}`
  );

  showTable.value = false; // 隐藏表格，重置状态
  formData.name = ""; // 提交后清空输入框
  formData.email = ""; // 提交后清空输入框
};
const closeTable = defineEmits(["close"]);
</script>

<template>
  <div class="form-group">
    <form v-if="visible">
      <h2 style="padding: 10px; font-weight: bold">New User</h2>
      <div class="userInfo">
        <label for="firstname">First Name：</label>
        <input
          type="text"
          v-model="formData.firstname"
          placeholder="Please input your first name"
        />
      </div>
      <div class="userInfo">
        <label for="name">Family Name：</label>
        <input
          type="text"
          v-model="formData.lastname"
          placeholder="Please input your family name"
        />
      </div>
      <div class="userInfo">
        <label for="email">Email：</label>
        <input
          type="email"
          v-model="formData.email"
          placeholder="Please input your email address"
        />
      </div>
      <div class="button-group">
        <button type="button" @click="submitForm">submit</button>
        <button type="button" @click="closeTable">cancel</button>
      </div>
    </form>
  </div>
</template>

<style>
.form-group {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 4px 4px 4px #fff200;
  margin: 20px;
  font-family: Arial, sans-serif;
  background-color: #2f2f2f; /* 深蓝色 */
  color: #ffd700; /* 白色 */
  /* border-bottom: 2px solid #e0e0e0; 浅灰色边框 */
  /* position: fixed; /* 固定定位，避免影响 header 布局 */
  /* left: 50%; */
  /* top: 50px; */
  float: left;
  /* z-index: 1000; */
}

.userInfo {
  padding: 10px;
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
  margin: 20px;
  display: flex;
  justify-content: space-between; /* 按钮左右对齐 */
  gap: 10px; /* 按钮之间的间距 */
}

button {
  padding: 8px 16px;
  /* border: none; */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049; /* 深绿色 */
  filter: drop-shadow(0 0 10px #fff200);
  transform: scale(1.2);
}
</style>
