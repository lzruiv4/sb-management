<template>
  <div>
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

defineProps(["getCar", "sendToy"]);
</script>
