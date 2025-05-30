import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'authStore',
  () => {
    const isLoggedIn = ref(false)

    const token = localStorage.getItem('authToken') || ''
    const userId = localStorage.getItem('userId') || ''

    function setAuth(token: string, userId: string): void {
      isLoggedIn.value = true
      localStorage.setItem('authToken', token)
      localStorage.setItem('userId', userId)
    }

    function logout() {
      isLoggedIn.value = false
      localStorage.clear()
      window.location.href = '/login'
    }

    function getUserId() {
      return userId
    }

    function getToken() {
      return token
    }

    const tokenInHeader = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    }

    return { isLoggedIn, getUserId, getToken, setAuth, logout, tokenInHeader }
  },
  {
    persist: true,
  },
)
