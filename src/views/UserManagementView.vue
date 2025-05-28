<template>
  <HeaderLayout />
  <n-layout has-sider class="layout">
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="60" :width="180" show-trigger>
      <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
    </n-layout-sider>
    <n-layout-content class="content">
      <n-card class="card" bordered>
        <div class="toolbar">
          <h2>Users</h2>
          <n-button type="success" size="medium" strong @click="onAdd"> Add User </n-button>
        </div>
        <n-data-table
          :columns="columns"
          :data="paginatedData"
          :pagination="false"
          :bordered="true"
        />

        <n-pagination
          v-model:page="currentPage"
          :page-size="pageSize"
          :item-count="userData.length"
          show-size-picker
          :page-sizes="[5, 10, 20]"
          @update:page-size="handlePageSizeChange"
          class="mt-4"
        />

        <n-modal v-model:show="showModal" title="编辑信息" preset="dialog">
          <n-form :model="editForm" label-placement="left" label-width="80">
            <n-form-item label="Username">
              <n-input v-model:value="editForm.username" />
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
            <n-button @click="showModal = false">取消</n-button>
            <n-button type="primary" @click="handleSave">保存</n-button>
          </template>
        </n-modal>
      </n-card>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { computed, h, onMounted, ref, type Component } from 'vue'
import {
  NLayout,
  NLayoutSider,
  NLayoutContent,
  NMenu,
  NCard,
  NButton,
  NDataTable,
  NModal,
  NIcon,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NPagination,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import HeaderLayout from '@/layouts/HeaderLayout.vue'
import { BarChart, Person, WalletSharp, Speedometer, Pencil } from '@vicons/ionicons5'
import type { IUser } from '@/domain/models/user.model'
import { useUserStore } from '@/stores/user-store'
import type { IUserDTO } from '@/domain/dtos/user.dto'

const userService = useUserStore()
const userData = ref<IUser[]>([])

// 分页状态
const currentPage = ref(1)
const pageSize = ref(8)

const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

// 分页后的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return userData.value.slice(start, end)
})

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

const handleSave = async () => {
  const index = userData.value.findIndex((user) => user.username === editForm.value.username)
  // console.log('sddd: ', editForm.value, index)
  if (index !== -1) {
    // console.log('sddd: ddd')
    await userService.updateUser(userData.value[index].userId!, editForm.value)
    userData.value[index] = { ...editForm.value }
  }
  showModal.value = false
}

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
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
    title: '操作',
    key: 'actions',
    render(row: IUser) {
      return h(
        NButton,
        {
          size: 'small',
          type: 'primary',
          text: true,
          onClick: () => handleEdit(row),
        },
        {
          icon: () => h(Pencil),
        },
      )
    },
  },
]

// 左侧导航选项
const menuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: 'recharges',
    icon: renderIcon(Speedometer),
  },
  {
    label: 'USERS',
    key: 'recharges',
    icon: renderIcon(Person),
  },
  {
    label: 'RECHARGES',
    key: 'recharges',
    icon: renderIcon(WalletSharp),
  },
  {
    label: 'POKEMONS',
    key: 'recharges',
    icon: renderIcon(BarChart),
  },
]

// Add User 按钮回调
function onAdd() {
  // TODO: 弹窗或跳转添加用户
  console.log('Add User clicked')
}

onMounted(async () => {
  try {
    await userService.getAllUsers()
    userData.value = userService.users
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

.mt-4 {
  margin-top: 1rem;
}
</style>
