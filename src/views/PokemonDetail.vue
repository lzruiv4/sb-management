<template>
  <img :src="imagePath" style="height: 70%" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
const imagePath = route.query.imagePath as string;
</script>
