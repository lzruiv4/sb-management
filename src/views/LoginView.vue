<template>
  <div class="auth-form">
    <h2>LOGIN</h2>
    <form @submit.prevent="handleLogin">
      <input
        v-model.trim="form.username"
        type="text"
        placeholder="username"
        autocomplete="username"
        required
      />
      <input
        v-model.trim="form.password"
        type="password"
        placeholder="password"
        autocomplete="current-password"
        required
      />
      <button type="submit">LOGIN</button>
    </form>
    <p>Not account？<router-link to="/register">REGISTER</router-link></p>
  </div>
</template>

<script setup lang="ts" name="LoginView">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth-api'
import { useAuthStore } from '@/stores/auth-store'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  password: '',
})

const handleLogin = async () => {
  try {
    const res = await login(form)
    console.log(res.data)

    if (res.data.token) {
      // localStorage.setItem('authToken', res.data.token)
      authStore.setAuth(res.data.token, res.data.userId)
      router.push('/home')
    } else {
      alert('登录失败，服务器未返回令牌')
    }
  } catch (err) {
    console.log(err)
    alert('登录失败，请检查邮箱和密码')
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
