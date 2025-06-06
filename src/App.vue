<template>
  <HeaderLayout v-if="authService.isLoggedIn" />
  <router-view />
</template>

<script setup lang="ts">
import HeaderLayout from './layouts/HeaderLayout.vue'
import { useAuthStore } from './stores/auth-store'

const authService = useAuthStore()
</script>

<style scoped lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
