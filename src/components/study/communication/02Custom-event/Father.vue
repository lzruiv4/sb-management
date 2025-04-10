<template>
  <div class="father">
    <h3>Father</h3>
    <h4 v-show="toy">Toy from child: {{ toy }}</h4>
    <Child @sendToy="getToy" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Child from "./Child.vue";

let toy = ref("");
function getToy(value: string) {
  console.log("Get toy from child, is a", value);
  toy.value = value;
}
</script>
<style scoped>
.father {
  width: 700px;
  background-color: rgb(52, 14, 221);
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 15px;
}
</style>
