<template>
  <div class="child">
    <h3>Child</h3>
    <button @click="$emit('sendToy', toy)">ddd</button>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineEmits } from "vue";

let toy = ref("Bus"); // No ref will come some warming in console
defineEmits(["sendToy"]);
</script>
<style scoped>
.child {
  background-color: rgb(50, 210, 21);
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 15px;
  width: 500px;
}
</style>
