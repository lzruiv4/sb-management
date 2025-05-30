import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'auth',
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

    return { isLoggedIn, getUserId, getToken, setAuth, logout }
  },
  {
    persist: true,
  },
)
