<template>
  <img :src="imageLink" style="height: 70%" />
  <!-- <h2>dd</h2> -->
</template>

<script setup lang="ts">
import { defineProps } from "vue";
defineProps(["imageLink"]);
</script>
