<template>
  <n-layout has-sider class="layout">
    <n-layout-content class="content">
      <n-card class="card" bordered>
        <div class="toolbar">
          <h2>Pokemon records</h2>
          <!-- <n-button type="success" size="medium" strong @click="onAdd"> Add User </n-button> -->
        </div>

        <n-data-table
          :columns="columns"
          :data="paginatedPokemonRecords"
          :pagination="false"
          :bordered="true"
        />

        <PaginationComponent
          :data="pokemonRecordData"
          :pageSizeList="pageSizeList"
          @page-changed="handlePageChanged"
        />

        <n-modal v-model:show="showModal" title="Edit user info" preset="dialog">
          <n-form
            :model="pokemonRecordService.pokemonRecord"
            label-placement="left"
            label-width="100"
          >
            <n-form-item label="PokeRecord ID">
              <n-input
                v-model:value="pokemonRecordService.pokemonRecord.pokemonRecordId"
                disabled
              />
            </n-form-item>
            <n-form-item label="Pokemon ID">
              <n-input v-model:value="pokemonRecordService.pokemonRecord.pokemonId" />
            </n-form-item>
            <n-form-item label="User ID">
              <n-input v-model:value="pokemonRecordService.pokemonRecord.userId" />
            </n-form-item>
            <n-form-item label="Release">
              <n-input :v-model:value="pokemonRecordService.pokemonRecord.isRelease" />
            </n-form-item>
          </n-form>
          <template #action>
            <n-button @click="showModal = false">Cancel</n-button>
            <!-- <n-button type="primary" @click="handleSave">Save</n-button> -->
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
} from 'naive-ui'
import { Create } from '@vicons/ionicons5'
import PaginationComponent from '../basis/PaginationComponent.vue'
import { usePokemonRecordStore } from '@/stores/pokemonRecord-store'
import type { IPokemonRecord } from '@/domain/models/pokemen.model'

const pokemonRecordService = usePokemonRecordStore()

const paginatedPokemonRecords = ref<IPokemonRecord[]>([])
const pokemonRecordData = ref<IPokemonRecord[]>([])

const pageSizeList = [10, 20, 30]

const currentPage = ref(1)
const pageSize = ref(10)

function handlePageChanged(paginatedData: IPokemonRecord[], page: number, size: number) {
  paginatedPokemonRecords.value = paginatedData
  currentPage.value = page
  pageSize.value = size
}

const showModal = ref(false)
const currentEditRow = ref<IPokemonRecord | null>(null)

// const editForm = ref<IPokemonRecord>({
//   rechargeRecordId: '',
//   userId: '',
//   amountRecharge: 0,
//   currentPokemonCoin: 0,
// })

const handleEdit = (row: IPokemonRecord) => {
  currentEditRow.value = row
  pokemonRecordService.pokemonRecord = { ...row }
  showModal.value = true
}

// const handleSave = async () => {
//   const index = paginatedPokemonRecords.value.findIndex(
//     (rechargeRecord) => rechargeRecord.rechargeRecordId === editForm.value.rechargeRecordId,
//   )
//   if (index !== -1) {
//     await pokemonRecordService.updateRechargeRecord(mapModelToDto(editForm.value))
//     pokemonRecordData.value[index] = { ...editForm.value }
//     refreshCurrentPage()
//   }
//   showModal.value = false
// }

// function refreshCurrentPage() {
//   const start = (currentPage.value - 1) * pageSize.value
//   const end = start + pageSize.value
//   paginatedPokemonRecords.value = pokemonRecordData.value.slice(start, end)
// }

// 表格列
const columns = [
  { title: 'PokeRecord ID', key: 'pokemonRecordId' },
  {
    title: 'Icon',
    key: 'image',
    render(row: IPokemonRecord) {
      return h('img', {
        src: row.image,
        alt: 'image',
        style: 'width: 30px; height: 30px; object-fit: cover; border-radius: 8px;',
      })
    },
  },
  { title: 'Pokemon ID', key: 'pokemonId' },
  { title: 'User ID', key: 'userId' },
  { title: 'Capture time', key: 'captureTime' },
  { title: 'Release', key: 'isRelease' },
  {
    title: 'Edit',
    key: 'actions',
    render(row: IPokemonRecord) {
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
    await pokemonRecordService.getAllPokemonRecords()
    pokemonRecordData.value = pokemonRecordService.pokemonRecords
  } catch (err) {
    console.error('Something wrong ', err)
  }
})
</script>
