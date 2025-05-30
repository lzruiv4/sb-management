<template>
  <HeaderLayout v-if="isLogin" />
  <router-view />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderLayout from './layouts/HeaderLayout.vue'
import { useAuthStore } from './stores/auth-store'

const authService = useAuthStore()
const isLogin = ref(false)
if (authService.isLoggedIn) {
  isLogin.value = true
}
</script>
