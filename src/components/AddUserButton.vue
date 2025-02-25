<script>
import NewUserDialog from "./NewUserDialog.vue";

export default {
  name: "AddUserButton",
  components: {
    NewUserDialog,
  },
  data() {
    return {
      showUserDialog: false,
    };
  },
  methods: {
    openUserDialog() {
      this.showUserDialog = !this.showUserDialog;
      // console.log(this.showUserDialog);
    },
  },
};
</script>

<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gold"
      stroke-width="5"
      stroke-linecap="round"
      stroke-linejoin="round"
      width="50"
      height="50"
      @click="openUserDialog"
    >
      <!-- 竖线 -->
      <path d="M12 5v14" />
      <!-- 横线 -->
      <path d="M5 12h14" />
    </svg>
  </div>

  <div>
    <NewUserDialog v-if="showUserDialog" />
  </div>
</template>

<style scoped>
svg {
  position: fixed;
  top: 20px;
  right: 20px;
  margin: 20px;
  transition: transform 0.3s ease;
}

svg:hover {
  filter: drop-shadow(0 0 10px #ffa500); /* 发光效果 */
  transform: scale(1.5);
}
</style>
