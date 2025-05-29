<template>
  <div class="register-container">
    <n-card title="Register" class="register-card" :bordered="false" size="huge">
      <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
        <n-form-item label="Username" path="username">
          <n-input
            v-model:value="form.username"
            placeholder="Please enter your username"
            clearable
            :input-props="{ autocomplete: 'username' }"
          />
        </n-form-item>

        <n-form-item label="Firstname" path="firstname">
          <n-input
            v-model:value="form.firstname"
            placeholder="Please enter your firstname"
            clearable
            :input-props="{ autocomplete: 'firstname' }"
          />
        </n-form-item>

        <n-form-item label="Lastname" path="lastname">
          <n-input
            v-model:value="form.lastname"
            placeholder="Please enter your lastname"
            clearable
            :input-props="{ autocomplete: 'lastname' }"
          />
        </n-form-item>

        <n-form-item label="Password" path="password">
          <n-input
            type="password"
            v-model:value="form.password"
            placeholder="Please enter your password"
            show-password-on="mousedown"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>

        <n-form-item label="Confirm password" path="confirmPassword">
          <n-input
            type="password"
            v-model:value="form.confirmPassword"
            placeholder="Please enter your password again"
            show-password-on="mousedown"
            :input-props="{ autocomplete: 'new-password' }"
          />
        </n-form-item>

        <n-space justify="space-between">
          <n-button color="green" size="large" @click="handleRegister">REGISTER</n-button>
          <router-link to="/login">
            <n-button color="green" size="large">LOGIN</n-button>
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
  height: 100vh;
  background: linear-gradient(to right, #fdfbfb, #ebedee);

  .register-card {
    width: 100%;
    max-width: 440px;
    padding: 2rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    background-color: #fff;

    .n-button {
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
