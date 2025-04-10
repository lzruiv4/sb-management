<template>
  <div class="child">
    <h3>Child</h3>
    <h4>Toy: {{ toy }}</h4>
    <h4>Car from father, is a {{ getCar }}</h4>
    <button @click="sendToy(toy)">Give the toy to father</button>
  </div>
</template>

<script lang="ts" setup name="Child">
import { ref } from "vue";
import { defineProps } from "vue";

let toy = ref("Bus");

defineProps<{
  getCar: string;
  sendToy: string;
}>();
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
