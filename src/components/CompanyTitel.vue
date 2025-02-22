<script setup>
defineProps({
  companyName: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="greetings">
    <div>
      <h1 class="company_name">{{ companyName }}</h1>
    </div>
    <div>
      <h3 class="welcome">
        Welcome to user management service
      </h3>
    </div>
  </div>
</template>

<style scoped>
.company_name {
  font-size: 48px;
  font-weight: 500;
  top: 10px;
  font-weight: bold;
  background: linear-gradient(90deg, #fff 0%, #ffa500 50%, #fff 100%);
  background-size: 200% auto;
  color: transparent;
  white-space: nowrap; /* 禁止换行 */
  background-clip: text;
  animation: glow-wave 2s linear infinite;
}

.welcome {
  font-size: 1.2rem;
  color: yellow;
  white-space: nowrap; /* 禁止换行 */
}

/* .greetings h1,
.greetings h3 {
  text-align: center;
} */

@keyframes glow-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
