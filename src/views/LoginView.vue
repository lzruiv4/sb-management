<template>
  <div class="login-wrapper">
    <n-card title="Welcome" class="login-card" :bordered="false" size="huge">
      <n-form :model="form" :rules="rules" ref="formRef" label-placement="top">
        <n-form-item label="Username" path="username">
          <n-input
            type="text"
            v-model:value="form.username"
            placeholder="Please enter your username"
            :input-props="{ autocomplete: 'username' }"
          />
        </n-form-item>
        <n-form-item label="Password" path="password">
          <n-input
            type="password"
            v-model:value="form.password"
            placeholder="Please enter your password"
            show-password-on="mousedown"
            :input-props="{ autocomplete: 'current-password' }"
          />
        </n-form-item>

        <n-space justify="space-between">
          <n-button type="primary" icon-placement="right" @click="handleLogin"
            ><template #icon
              ><n-icon><LogIn /></n-icon></template
            >LOGIN</n-button
          >
          <router-link to="/register">
            <n-button tertiary>REGISTER</n-button>
          </router-link>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts" name="LoginView">
import { NForm, NFormItem, NInput, NButton, NIcon, NCard, NSpace } from 'naive-ui'
import { LogIn } from '@vicons/ionicons5'
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

const rules = {
  username: [{ required: true, message: 'Please enter your username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter your password', trigger: 'blur' }],
}

const handleLogin = async () => {
  try {
    const res = await login(form)
    console.log(res.data)

    if (res.data.token) {
      // localStorage.setItem('authToken', res.data.token)
      authStore.setAuth(res.data.token, res.data.userId)
      router.push('/home')
    } else {
      alert('Login successful, welcome back!')
    }
  } catch (err) {
    console.error('Login:', err)
    alert('Login failed, please check your username and password')
  }
}
</script>

<style scoped lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  padding: 1rem;
}

.login-card {
  font-size: larger;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}
</style>
