<template>
  <n-layout has-sider class="layout">
    <n-layout-content class="content">
      <n-card class="card" bordered>
        <div class="toolbar">
          <h2>Users</h2>
          <n-button type="success" size="medium" strong @click="openDialogForNewUser">
            Add User
          </n-button>
        </div>

        <n-modal v-model:show="showAddNewUserModal" title="New User" preset="dialog">
          <n-form :model="registerForm" label-placement="left" label-width="80">
            <n-form-item label="Username">
              <n-input v-model:value="registerForm.username" />
            </n-form-item>
            <n-form-item label="Firstname">
              <n-input v-model:value="registerForm.firstname" />
            </n-form-item>
            <n-form-item label="Lastname">
              <n-input v-model:value="registerForm.lastname" />
            </n-form-item>
            <n-form-item label="Password">
              <n-input v-model:value="registerForm.password" />
            </n-form-item>
            <n-form-item label="Lastname">
              <n-input v-model:value="registerForm.confirmPassword" />
            </n-form-item>
          </n-form>
          <template #action>
            <n-button @click="showAddNewUserModal = false">Cancel</n-button>
            <n-button type="primary" @click="handleAddNewUser">Save</n-button>
          </template>
        </n-modal>

        <n-data-table
          :columns="columns"
          :data="paginatedUsers"
          :pagination="false"
          :bordered="true"
        />

        <PaginationComponent
          :data="userService.users"
          :pageSizeList="pageSizeList"
          @page-changed="handlePageChanged"
        />

        <n-modal v-model:show="showModal" title="Edit user info" preset="dialog">
          <n-form :model="editForm" label-placement="left" label-width="80">
            <n-form-item label="Username">
              <n-input v-model:value="editForm.username" disabled />
            </n-form-item>
            <n-form-item label="Firstname">
              <n-input v-model:value="editForm.firstname" />
            </n-form-item>
            <n-form-item label="Lastname">
              <n-input v-model:value="editForm.lastname" />
            </n-form-item>
            <n-form-item label="Poke coins">
              <n-input-number v-model:value="editForm.pokemonCoin" :min="0" />
            </n-form-item>
          </n-form>
          <template #action>
            <n-button @click="showModal = false">Cancel</n-button>
            <n-button type="primary" @click="handleSave">Save</n-button>
          </template>
        </n-modal>
      </n-card>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { h, onMounted, reactive, ref } from 'vue'
import {
  NLayout,
  NLayoutContent,
  NCard,
  NButton,
  NDataTable,
  NModal,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
} from 'naive-ui'
import { Create } from '@vicons/ionicons5'
import type { IUser } from '@/domain/models/user.model'
import { useUserStore } from '@/stores/user-store'
import type { IUserDTO } from '@/domain/dtos/user.dto'
import PaginationComponent from '../basis/PaginationComponent.vue'
import { RoleType } from '@/domain/enums/role.enum'

const userService = useUserStore()
const paginatedUsers = ref<IUser[]>([])
const pageSizeList = [5, 10, 15, 20]
const currentPage = ref(1)
const pageSize = ref(10)

function handlePageChanged(paginatedData: IUser[], page: number, size: number) {
  paginatedUsers.value = paginatedData
  currentPage.value = page
  pageSize.value = size
}

// 编辑功能
const showModal = ref(false)
const currentEditRow = ref<IUser | null>(null)
const editForm = ref<IUserDTO>({
  username: '',
  firstname: '',
  lastname: '',
  createdAt: new Date(),
  // roles: [RoleType.ROLE_USER],
  // status: 'Active',
  pokemonCoin: 10,
})

const handleEdit = (row: IUser) => {
  currentEditRow.value = row
  editForm.value = { ...row }
  showModal.value = true
}

const showAddNewUserModal = ref(false)
const registerForm = reactive({
  username: '',
  firstname: '',
  lastname: '',
  password: '',
  confirmPassword: '',
  roles: [RoleType.ROLE_USER],
})

const handleSave = async () => {
  const index = userService.users.findIndex((user) => user.username === editForm.value.username)
  if (index !== -1) {
    await userService.updateUser(userService.users[index].userId!, editForm.value)
    userService.users[index] = { ...editForm.value }
    refreshCurrentPage()
  }
  showModal.value = false
}

function refreshCurrentPage() {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  paginatedUsers.value = userService.users.slice(start, end)
}

// 表格列
const columns = [
  { title: 'User ID', key: 'userId' },
  { title: 'Username', key: 'username' },
  { title: 'Firstname', key: 'firstname' },
  { title: 'Lastname', key: 'lastname' },
  { title: 'Poke coins', key: 'pokemonCoin' },
  { title: 'Create at', key: 'createdAt' },
  { title: 'Roles', key: 'roles' },
  // {
  //   title: 'Edit',
  //   key: 'edit',
  //   render(row: IUser) {
  //     return h(
  //       NTag,
  //       {
  //         type: row.status === 'Active' ? 'success' : 'error',
  //         bordered: false,
  //       },
  //       { default: () => row.status },
  //     )
  //   },
  // },
  {
    title: 'Edit',
    key: 'actions',
    render(row: IUser) {
      return h(
        NButton,
        {
          size: 'large',
          text: true,
          onClick: () => handleEdit(row),
        },
        {
          icon: () => h(Create),
        },
      )
    },
  },
]

function openDialogForNewUser() {
  console.log('Add User clicked')
  showAddNewUserModal.value = true
}

async function handleAddNewUser() {
  // TODO: add validation
  if (
    Object.values(registerForm).some(
      (value) => value === '' || value === null || value === undefined,
    )
  ) {
    console.error('Please check you input')
    alert('Please check you input')
  } else {
    await userService.addNewUser(registerForm)
    showAddNewUserModal.value = false
    refreshCurrentPage()
  }
}

onMounted(async () => {
  try {
    await userService.getAllUsers()
  } catch (err) {
    console.error('Something wrong ', err)
  }
})
</script>

<style scoped lang="scss">
.layout {
  height: 100vh;
}
.sider {
  background: #fff;
  .logo {
    font-weight: bold;
    font-size: 16px;
    padding: 16px;
    border-bottom: 1px solid #eee;
  }
  .menu {
    padding: 8px 0;
  }
}
.header {
  background: #f5f7fa;
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  padding-left: 24px;
  border-bottom: 1px solid #eee;
}
.content {
  background: #f9fafb;
  padding: 24px;
  height: 100%;
}
.card {
  background: #fff;
  border-radius: 8px;
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
