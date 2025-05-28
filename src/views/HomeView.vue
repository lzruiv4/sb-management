<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup name="HomeView">
import HeaderLayout from '@/layouts/HeaderLayout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const toUser = () => {
  router.push('/users')
}
</script>

<template>
  <HeaderLayout />

  <button @click="toUser" style="width: 200px; height: 70px; background-color: aqua">
    TO User
  </button>
</template>

<style lang="scss"></style>
