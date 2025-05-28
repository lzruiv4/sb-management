<template>
  <div class="auth-form">
    <h2>REGISTER</h2>
    <form @submit.prevent="handleRegister">
      <input
        v-model="form.username"
        type="text"
        placeholder="username"
        autocomplete="username"
        required
      />
      <input
        v-model="form.firstname"
        type="text"
        placeholder="firstname"
        autocomplete="firstname"
        required
      />
      <input
        v-model="form.lastname"
        type="text"
        placeholder="lastname"
        autocomplete="lastname"
        required
      />
      <input
        v-model="form.password"
        type="password"
        autocomplete="new-password"
        placeholder="password"
        required
      />
      <button type="submit">REGISTER</button>
    </form>
    <p>already registered?<router-link to="/login">LOGIN</router-link></p>
  </div>
</template>

<script setup lang="ts" name="RegisterView">
import { reactive } from 'vue'
import { register } from '@/api/auth-api'
import { useRouter } from 'vue-router'
import { RoleType } from '@/domain/enums/role.enum'

const router = useRouter()

const form = reactive({
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  roles: [RoleType.ROLE_ADMIN],
})

const handleRegister = async () => {
  try {
    await register(form)
    alert('注册成功，请登录')
    router.push('/login')
  } catch (err) {
    console.log(err)
    alert('注册失败，请重试')
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
