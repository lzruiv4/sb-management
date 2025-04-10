<template>
  <div class="pagination">
    <button
      @click="$emit('prev')"
      :disabled="currentPage === 1"
      class="buttonInPage"
    >
      Previous
    </button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
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
  gap: 20px;
  padding: 5px;
  /* border: 0px solid #ccc; */
}

.buttonInPage {
  font-size: medium;
  font-weight: bold;
  width: 150px;
  height: 50px;
  background-color: rgb(223, 0, 171);
  box-shadow: 0 0 15px black;
  border-radius: 15px;
  align-items: center;
}
</style>
