import { USER_API } from '@/api/api'
import { mapDtoToModel, type IUser } from '@/domain/models/user.model'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useAuthStore } from './auth-store'
import type { IUserDTO } from '@/domain/dtos/user.dto'

export const useUserStore = defineStore('userStore', () => {
  const authService = useAuthStore()
  const user = ref<IUser>({
    userId: '',
    username: '',
    createdAt: undefined,
    firstname: '',
    lastname: '',
    pokemonCoin: 0,
  })
  const users = ref<IUser[]>([])
  const loading = ref(false)

  const token = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  }

  // check for data has been loading
  watch(user, (newUser) => {
    if (newUser) console.log('User data has been loading.')
  })

  async function getAllUsers() {
    loading.value = true
    try {
      const res = await axios.get<IUserDTO[]>(USER_API, token)
      users.value = res.data.map((userDTO) => mapDtoToModel(userDTO))
      // console.log('sdfadfs: ', users.value)
    } catch (error) {
      console.error('Get users failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function getCurrentUser() {
    try {
      loading.value = true
      const res = await axios.get(USER_API + '/' + authService.getUserId, token)
      user.value = res.data
    } catch (error) {
      console.error('Get user failed:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateUser(userId: string, newUserDTO: IUserDTO) {
    try {
      // console.log('Before update ', newUserDTO)
      // newUserDTO.id = authService.newUserDTO
      const res = await axios.put(USER_API + '/' + userId, newUserDTO, token)
      console.log(res.data)
      user.value = res.data
    } catch (error) {
      console.error('User update failed', error)
    }
  }

  return { user, users, loading, getAllUsers, getCurrentUser, updateUser }
})
