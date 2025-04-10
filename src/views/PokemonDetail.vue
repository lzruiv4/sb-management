<template>
  <img :src="imagePath" class="imgSize" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const imagePath = computed(() => {
  const path = route.query.imagePath;
  return typeof path === "string" ? path : "";
});
</script>

<style scoped>
.imgSize {
  justify-items: center;
  align-items: center;
  width: 70%;
}
</style>
