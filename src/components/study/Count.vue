<template>
  <div class="count">
    <h2>Aktuelle : {{ countStore.$state.sum }}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">+</button>
    <button @click="minus">-</button>
  </div>
</template>

<script lang="ts" setup name="Count">
import { ref } from "vue";
import { useCountStore } from "@/store/Count";

const countStore = useCountStore();
console.log(countStore);
// let sum = ref(1);
let n = ref(1);

function add(): void {
  // countStore.$state.sum += n.value;
  countStore.sum += n.value;
}
function minus() {
  countStore.$state.sum -= n.value;
}
</script>
<style lang="css" scoped>
.count {
  background-color: skyblue;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}

select,
button {
  margin: 0 5px;
  height: 25px;
}
</style>
