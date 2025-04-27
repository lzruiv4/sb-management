<template>
  <div class="pagination">
    <button
      @click="$emit('prev')"
      :disabled="currentPage === 1"
      class="buttonInPage"
    >
      Previous
    </button>
    <span>{{ currentPage }}/{{ totalPages }}</span>
    <button
      @click="$emit('next')"
      :disabled="currentPage === totalPages"
      class="buttonInPage"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps<{
  currentPage: number;
  totalPages: number;
}>();
</script>

<style scoped>
.pagination {
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 10px;
  padding: 5px;
}

.buttonInPage {
  font-size: medium;
  font-weight: bold;
  width: 100px;
  height: 50px;
  background-color: #ff9a9a;
  box-shadow: 0 0 15px black;
  border-radius: 15px;
  /* align-items: center; */
  transition: transform 0.2s ease;
}

.buttonInPage:hover {
  transform: scale(1.1);
}
</style>
