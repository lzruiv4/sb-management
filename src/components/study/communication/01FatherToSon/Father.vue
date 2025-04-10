<template>
  <div class="father">
    <h3>Father</h3>
    <h4>Car: {{ carFromFather }}</h4>
    <h4 v-show="toy">Toy from son {{ toy }}</h4>
    <Child :getCar="carFromFather" :sendToy="getToy" />
  </div>
</template>

<script lang="ts" setup name="Father">
import { ref } from "vue";
import Child from "./Child.vue";

let carFromFather = ref("Benz");
let toy = ref("");

function getToy(toyFromChild: string) {
  toy.value = toyFromChild;
}
</script>

<style scoped>
.father {
  width: 700px;
  background-color: aquamarine;
  padding: 10px;
  box-shadow: 0 0 10px black;
  border-radius: 15px;
}
</style>
