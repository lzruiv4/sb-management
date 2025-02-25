<script>
export default {
  name: "AddUser",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
    };
  },
  methods: {
    submitForm() {
      console.log("Submitted Data：");
      alert(
        `Submit successfully！Name：${this.firstname} ${this.lastname}，Email：${this.email}`
      );
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.isVisible = !this.isVisible;
    },
    closeTable() {
      //   this.$emit("changeFormStatus", false);
    },
  },
};
</script>

<template>
  <form class="form-group">
    <h2 style="padding: 10px; font-weight: bold">New User</h2>

    <div class="userInfo">
      <label for="firstname">Firstname：</label>
      <input
        type="text"
        v-model="firstname"
        placeholder="Please input your first name"
      />
    </div>

    <div class="userInfo">
      <label for="name">Lastname：</label>
      <input
        type="text"
        v-model="lastname"
        placeholder="Please input your family name"
      />
    </div>

    <div class="userInfo">
      <label for="email">Email：</label>
      <input
        type="email"
        v-model="email"
        placeholder="Please input your email address"
      />
    </div>

    <div class="button-group">
      <button type="button" @click="submitForm">submit</button>
      <button type="button" @click="closeTable">cancel</button>
    </div>
  </form>
</template>

<style scoped>
.form-group {
  width: 400px;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 4px 4px 4px #ffffff;
  margin: 20px;
  font-family: Arial, sans-serif;
  background-color: #2f2f2f; /* 深蓝色 */
  color: #ffffff; /* 白色 */
  position: fixed; /* 固定定位，避免影响 header 布局 */
  top: 10%;
  right: 5%;
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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input.selected {
  background-color: #e8f5e9; /* 浅绿色 */
  color: #1b5e20; /* 深绿色文字 */
}

.button-group {
  margin: 10px;
  display: flex;
  justify-content: space-between; /* 按钮左右对齐 */
  gap: 10px; /* 按钮之间的间距 */
}

button {
  width: 100px;
  padding: 8px 16px;
  background-color: #ffffff;
  /* border: none; */
  border-radius: 8px;
  cursor: pointer;
  font-size: medium;
  font-weight: bolder;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049; /* 深绿色 */
  filter: drop-shadow(0 0 10px #fff200);
  transform: scale(1.1);
}
</style>
