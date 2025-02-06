<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="greetings">
    <h1 style="color: gold;">{{ msg }}</h1>
    <h3>
      Welcome to scopevisio insurance calculation service
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
  white-space: nowrap; /* 禁止换行 */
}

h3 {
  font-size: 1.2rem;
  color: yellow;
  white-space: nowrap; /* 禁止换行 */
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
