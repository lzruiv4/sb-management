<template>
  <div class="register-container">
    <n-card class="register-card-container" :bordered="false" size="huge">
      <div class="logo-container">
        <img src="/src/assets/images/logo.png" style="width: 100px" />
        <h2 style="color: #004097; font-size: 35px">REGISTER</h2>
      </div>

      <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
        <n-form-item
          label="Username"
          path="username"
          :label-style="{ fontSize: '18px', fontWeight: 'bold', color: '#004097' }"
        >
          <n-input
            v-model:value="form.username"
            placeholder="Please enter your username"
            clearable
            size="large"
            :input-props="{ autocomplete: 'username' }"
          />
        </n-form-item>

        <n-form-item
          label="Firstname"
          path="firstname"
          :label-style="{ fontSize: '18px', fontWeight: 'bold', color: '#004097' }"
        >
          <n-input
            v-model:value="form.firstname"
            placeholder="Please enter your firstname"
            clearable
            size="large"
            :input-props="{ autocomplete: 'firstname' }"
          />
        </n-form-item>

        <n-form-item
          label="Lastname"
          path="lastname"
          :label-style="{ fontSize: '18px', fontWeight: 'bold', color: '#004097' }"
        >
          <n-input
            v-model:value="form.lastname"
            placeholder="Please enter your lastname"
            clearable
            size="large"
            :input-props="{ autocomplete: 'lastname' }"
          />
        </n-form-item>

        <n-form-item
          label="Password"
          path="password"
          :label-style="{ fontSize: '18px', fontWeight: 'bold', color: '#004097' }"
        >
          <n-input
            type="password"
            size="large"
            v-model:value="form.password"
            placeholder="Please enter your password"
            show-password-on="mousedown"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>

        <n-form-item
          label="Confirm password"
          path="confirmPassword"
          :label-style="{ fontSize: '18px', fontWeight: 'bold', color: '#004097' }"
        >
          <n-input
            type="password"
            size="large"
            v-model:value="form.confirmPassword"
            placeholder="Please enter your password again"
            show-password-on="mousedown"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>

        <n-space justify="space-between">
          <n-button color="green" size="large" @click="handleRegister">REGISTER</n-button>
          <router-link to="/login">
            <n-button color="green" size="large">TO LOGIN</n-button>
          </router-link>
        </n-space>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts" name="RegisterView">
import { reactive } from 'vue'
import { register } from '@/api/auth-api'
import { useRouter } from 'vue-router'
import { RoleType } from '@/domain/enums/role.enum'
import { NCard, NForm, NFormItem, NInput, NSpace, NButton } from 'naive-ui'
import type { FormRules } from 'naive-ui'

const router = useRouter()

const form = reactive({
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  confirmPassword: '',
  roles: [RoleType.ROLE_ADMIN],
})

const rules: FormRules = {
  username: [{ required: true, message: 'Please check you input', trigger: 'blur' }],
  password: [{ required: true, message: 'Please check you input', trigger: 'blur' }],
  confirmPassword: [
    { required: true, message: 'Please check you input', trigger: 'blur' },
    {
      validator(_: unknown, value: string) {
        if (value !== form.password) {
          return new Error('The two passwords do not match')
        }
        return true
      },
      trigger: 'input',
    },
  ],
}

const handleRegister = async () => {
  try {
    await register(form)
    alert('Register successful, please login')
    router.push('/login')
  } catch (err) {
    console.log(err)
    alert('Register failed, please check your input')
  }
}
</script>

<style scoped lang="scss">
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #004097;

  .register-card-container {
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
