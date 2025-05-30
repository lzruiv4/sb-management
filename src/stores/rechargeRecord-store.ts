import { defineStore } from 'pinia'
import { useAuthStore } from './auth-store'
import { mapDtoToModel, type IRechargeRecord } from '@/domain/models/recharge.record.model'
import { ref } from 'vue'
import { RECHARGE_RECORD_API } from '@/api/api'
import axios from 'axios'
import type { IRechargeRecordDTO } from '@/domain/dtos/recharge.record.dto'

export const useRechargeRecordStore = defineStore('rechargeRecordStore', () => {
  const loading = ref(false)

  const authService = useAuthStore()

  const rechargeRecord = ref<IRechargeRecord>({
    rechargeRecordId: '',
    userId: '',
    amountRecharge: 0,
    currentPokemonCoin: 0,
    rechargeAt: undefined,
  })

  const rechargeRecords = ref<IRechargeRecord[]>([])

  async function getAllRechargeRecords() {
    loading.value = true
    try {
      const res = await axios.get<IRechargeRecordDTO[]>(
        RECHARGE_RECORD_API,
        authService.tokenInHeader,
      )
      rechargeRecords.value = res.data.map((dto) => mapDtoToModel(dto))
      console.log('sdfadfs: ', rechargeRecords.value)
    } catch (error) {
      console.error('Get rechargeRecords failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return { loading, rechargeRecord, rechargeRecords, getAllRechargeRecords }
})
