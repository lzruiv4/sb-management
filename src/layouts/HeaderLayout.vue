<template>
  <header class="header">
    <div class="logo">
      <img src="/src/assets/images/logo.png" class="logo-image" @click="goHome" />
    </div>
    <div class="nav">
      <router-link class="nav-link" to="/home">Home</router-link>
      <router-link class="nav-link" to="/lotto">Lotto</router-link>
    </div>
    <div class="user-logo">
      <!-- <img src="/src/assets/icons/user-icon.svg" class="user-image" alt="user" /> -->
      <LogOut class="user-image" @click="handleLogout" />
    </div>
  </header>
</template>

<script lang="ts" setup name="HeaderLayout">
import { useAuthStore } from '@/stores/auth-store'
import { LogOut } from '@vicons/ionicons5'
import router from '@/router'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}

const goHome = () => {
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  width: calc(100% - 10px);
  height: 100px;
  background-color: #000407ce;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 6px 16px rgba(0, 0, 0, 0.06);
  border-radius: 20px;

  .logo {
    margin-left: 20px;
    width: 70px;
    height: 70px;

    .logo-image {
      width: 100%;
      height: 100%;
    }
  }

  .nav {
    flex: 1;
    margin: 5px 20px;
    display: flex;
    list-style: none;
    justify-content: flex-start;
    font-size: 30px;
    padding-left: 30px;
    gap: 50px;
    transition: color 0.3s;

    .nav-link {
      color: aliceblue;
      text-decoration: none;
      font-weight: bolder;
    }

    .nav-link:hover {
      color: #ffbdf0;
    }
  }

  .user-logo {
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;

    .user-image {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
