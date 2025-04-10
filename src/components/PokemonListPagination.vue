<template>
  <div class="pagination">
    <button @click="$emit('prev')" :disabled="currentPage === 1">
      Previous page
    </button>
    <span>{{ currentPage }} / {{ totalPages }}</span>
    <button @click="$emit('next')" :disabled="currentPage === totalPages">
      Next page
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
