<template>
  <div class="login-container">
    <n-card class="login-card-container" :bordered="false" size="huge">
      <div class="logo-container">
        <img src="/src/assets/images/logo.png" style="width: 100px" />
        <h2 style="color: #004097; font-size: 35px">Welcome</h2>
      </div>

      <n-form
        :model="form"
        :rules="rules"
        ref="formRef"
        label-placement="top"
        @keyup.enter="handleLogin"
      >
        <n-form-item
          label="Username"
          path="username"
          :label-style="{ fontSize: '18px', fontWeight: 'bold', color: '#004097' }"
        >
          <n-input
            type="text"
            size="large"
            v-model:value="form.username"
            placeholder="Please enter your username"
            :input-props="{ autocomplete: 'username' }"
          />
        </n-form-item>
        <n-form-item
          label="Username"
          path="username"
          :label-style="{ fontSize: '18px', fontWeight: 'bold', color: '#004097' }"
        >
          <n-input
            type="password"
            size="large"
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/auth-api'
import { useAuthStore } from '@/stores/auth-store'
import type { ILoginRequestDTO } from '@/domain/dtos/auth.dto'

const router = useRouter()
const authService = useAuthStore()

const form = ref<ILoginRequestDTO>({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: 'Please enter your username', trigger: 'blur' }],
  password: [{ required: true, message: 'Please enter your password', trigger: 'blur' }],
}

const handleLogin = async () => {
  try {
    const res = await login(form.value)
    console.log(res.data)
    authService.setAuth(res.data.token, res.data.userId)
    if (authService.isLoggedIn) {
      await router.push('/home')
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #004097;

  .login-card-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    z-index: 10;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    background-color: #fff;

    .logo-container {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 30px;
    }

    .n-button {
      background-color: #3b3c50;
      width: 100%;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 10px rgba(182, 195, 254, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}
</style>
