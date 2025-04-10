<template>
  <img :src="imagePath" style="height: 90%; align-items: center" />
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
