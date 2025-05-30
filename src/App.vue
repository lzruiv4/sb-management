<template>
  <HeaderLayout v-if="authService.isLoggedIn" />
  <router-view />
</template>

<script setup lang="ts">
import HeaderLayout from './layouts/HeaderLayout.vue'
import { useAuthStore } from './stores/auth-store'

const authService = useAuthStore()
</script>
