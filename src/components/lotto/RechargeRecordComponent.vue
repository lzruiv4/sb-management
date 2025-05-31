<template>
  <n-layout has-sider class="layout">
    <n-layout-content class="content">
      <n-card class="card" bordered>
        <div class="toolbar">
          <h2>Recharge records</h2>
          <!-- <n-button type="success" size="medium" strong @click="onAdd"> Add User </n-button> -->
        </div>

        <n-data-table
          :columns="columns"
          :data="paginatedRechargeRecords"
          :pagination="false"
          :bordered="true"
        />

        <PaginationComponent
          :data="rechargeRecordData"
          :pageSizeList="pageSizeList"
          @page-changed="handlePageChanged"
        />

        <n-modal v-model:show="showModal" title="Edit user info" preset="dialog">
          <n-form :model="editForm" label-placement="left" label-width="80">
            <n-form-item label="Recharge record Id">
              <n-input v-model:value="editForm.id" />
            </n-form-item>
            <n-form-item label="User ID">
              <n-input v-model:value="editForm.userId" />
            </n-form-item>
            <n-form-item label="Amount recharge">
              <n-input-number v-model:value="editForm.amountRecharge" :min="0" />
            </n-form-item>
            <n-form-item label="Current pokemon coin">
              <n-input-number v-model:value="editForm.currentPokemonCoin" :min="0" />
            </n-form-item>
            <!-- <n-form-item label="Poke coins">
              <n-input v-model:value="editForm.rechargeAt" />
            </n-form-item> -->
          </n-form>
          <template #action>
            <n-button @click="showModal = false">取消</n-button>
            <!-- <n-button type="primary" @click="handleSave">保存</n-button> -->
          </template>
        </n-modal>
      </n-card>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts" name="RechargeRecordComponent">
import { h, onMounted, ref } from 'vue'
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
import { Pencil } from '@vicons/ionicons5'
import { useRechargeRecordStore } from '@/stores/rechargeRecord-store'
import type { IRechargeRecord } from '@/domain/models/recharge.record.model'
import type { IRechargeRecordDTO } from '@/domain/dtos/recharge.record.dto'
import PaginationComponent from '../basis/PaginationComponent.vue'

const rechargeRecordService = useRechargeRecordStore()

const paginatedRechargeRecords = ref<IRechargeRecord[]>([])
const rechargeRecordData = ref<IRechargeRecord[]>([])

const pageSizeList = [10, 20, 30]

function handlePageChanged(paginatedData: IRechargeRecord[]) {
  paginatedRechargeRecords.value = paginatedData
}

// 编辑功能
const showModal = ref(false)
const currentEditRow = ref<IRechargeRecord | null>(null)
const editForm = ref<IRechargeRecordDTO>({
  id: '',
  userId: '',
  amountRecharge: 0,
  currentPokemonCoin: 0,
  // rechargeAt: new Date().toDateString(),
})

const handleEdit = (row: IRechargeRecord) => {
  currentEditRow.value = row
  editForm.value = { ...row }
  showModal.value = true
}

// const handleSave = async () => {
//   const index = tableData.value.findIndex((user) => user.username === editForm.value.username)
//   // console.log('sddd: ', editForm.value, index)
//   if (index !== -1) {
//     // console.log('sddd: ddd')
//     await rechargeRecordService.updateUser(tableData.value[index].userId!, editForm.value)
//     tableData.value[index] = { ...editForm.value }
//   }
//   showModal.value = false
// }

// 表格列
const columns = [
  { title: 'Recharge record ID', key: 'rechargeRecordId' },
  { title: 'User ID', key: 'userId' },
  { title: 'Amount recharge', key: 'amountRecharge' },
  { title: 'Current pokemon coin', key: 'currentPokemonCoin' },
  { title: 'Create at', key: 'createdAt' },
  {
    title: 'Edit',
    key: 'actions',
    render(row: IRechargeRecord) {
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

// Add User 按钮回调
// function onAdd() {
//   // TODO: 弹窗或跳转添加用户
//   console.log('Add User clicked')
// }

onMounted(async () => {
  try {
    await rechargeRecordService.getAllRechargeRecords()
    rechargeRecordData.value = rechargeRecordService.rechargeRecords
  } catch (err) {
    console.error('Something wrong ', err)
  }
})
</script>

<!-- <style scoped lang="scss">
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
</style> -->
