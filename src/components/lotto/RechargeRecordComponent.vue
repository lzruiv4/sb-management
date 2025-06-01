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
          :data="rechargeRecordService.rechargeRecords"
          :pageSizeList="pageSizeList"
          @page-changed="handlePageChanged"
        />

        <n-modal v-model:show="showModal" title="Edit user info" preset="dialog">
          <n-form :model="editForm" label-placement="left" label-width="100">
            <!-- <n-form-item label="Recharge record Id">
              <n-input v-model:value="editForm.id" />
            </n-form-item> -->
            <n-form-item label="User ID">
              <n-input v-model:value="editForm.userId" disabled />
            </n-form-item>
            <n-form-item label="Amount recharge">
              <n-input-number v-model:value="editForm.amountRecharge" :min="0" />
            </n-form-item>
            <n-form-item label="Current pokemon coin">
              <n-input-number v-model:value="editForm.currentPokemonCoin" :min="0" />
            </n-form-item>
            <!-- <n-form-item label="Date">
              <n-date-picker
                v-model:value="editForm.rechargeAt"
                type="date"
                placeholder="Please choice"
              />
            </n-form-item> -->
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
import { Create } from '@vicons/ionicons5'
import { useRechargeRecordStore } from '@/stores/rechargeRecord-store'
import { mapModelToDto, type IRechargeRecord } from '@/domain/models/recharge.record.model'
import PaginationComponent from '../basis/PaginationComponent.vue'

const rechargeRecordService = useRechargeRecordStore()

const paginatedRechargeRecords = ref<IRechargeRecord[]>([])

const pageSizeList = [10, 20, 30]

const currentPage = ref(1)
const pageSize = ref(10)

function handlePageChanged(paginatedData: IRechargeRecord[], page: number, size: number) {
  paginatedRechargeRecords.value = paginatedData
  currentPage.value = page
  pageSize.value = size
}

const showModal = ref(false)
const currentEditRow = ref<IRechargeRecord | null>(null)
const editForm = ref<IRechargeRecord>({
  rechargeRecordId: '',
  userId: '',
  amountRecharge: 0,
  currentPokemonCoin: 0,
})

const handleEdit = (row: IRechargeRecord) => {
  currentEditRow.value = row
  editForm.value = { ...row }
  showModal.value = true
}

const handleSave = async () => {
  const index = paginatedRechargeRecords.value.findIndex(
    (rechargeRecord) => rechargeRecord.rechargeRecordId === editForm.value.rechargeRecordId,
  )
  if (index !== -1) {
    await rechargeRecordService.updateRechargeRecord(mapModelToDto(editForm.value))
    rechargeRecordService.rechargeRecords[index] = { ...editForm.value }
    refreshCurrentPage()
  }
  showModal.value = false
}

function refreshCurrentPage() {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  paginatedRechargeRecords.value = rechargeRecordService.rechargeRecords.slice(start, end)
}

// 表格列
const columns = [
  { title: 'Recharge record ID', key: 'rechargeRecordId' },
  { title: 'User ID', key: 'userId' },
  { title: 'Amount recharge', key: 'amountRecharge' },
  { title: 'Current pokemon coin', key: 'currentPokemonCoin' },
  { title: 'Create at', key: 'rechargeAt' },
  {
    title: 'Edit',
    key: 'actions',
    render(row: IRechargeRecord) {
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

onMounted(async () => {
  try {
    await rechargeRecordService.getAllRechargeRecords()
  } catch (err) {
    console.error('Something wrong ', err)
  }
})
</script>
