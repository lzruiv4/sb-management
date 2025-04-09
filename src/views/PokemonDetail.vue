<template>
  <img :src="route.query.imagePath" style="height: 70%" />
  <!-- <h2>dddd</h2> -->
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
// const imagePath = ref("");
</script>
