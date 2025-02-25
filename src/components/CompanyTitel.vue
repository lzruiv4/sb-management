<script setup>
defineProps({
  companyName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="companyInfo">
    <h1>{{ companyName }}</h1>
    <p>Welcome to user management service</p>
  </div>
</template>

<style scoped>
.companyInfo{
  margin: 5px;
}

h1 {
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(90deg, #fff 0%, #ffa500 50%, #fff 100%);
  background-size: 200% auto;
  color: transparent;
  white-space: nowrap; /* 禁止换行 */
  background-clip: text;
  animation: glow-wave 2s linear infinite;
}

p {
  font-size: 1.2rem;
  color: yellow;
  white-space: nowrap; /* 禁止换行 */
}

@keyframes glow-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
