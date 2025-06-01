import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore(
  'authStore',
  () => {
    const isLoggedIn = ref(false)

    const token = ref('')
    const userId = ref('')
    const tokenInHeader = ref()

    function setAuth(tokenFromBackend: string, userIdFromBackend: string): void {
      localStorage.setItem('authToken', tokenFromBackend)
      token.value = tokenFromBackend
      tokenInHeader.value = {
        headers: {
          Authorization: `Bearer ${tokenFromBackend}`,
        },
      }
      localStorage.setItem('userId', userIdFromBackend)
      userId.value = userIdFromBackend
      isLoggedIn.value = true
    }

    function logout() {
      isLoggedIn.value = false
      localStorage.clear()
      window.location.href = '/login'
    }

    function getUserId() {
      return localStorage.getItem('userId')
    }

    function getToken() {
      return localStorage.getItem('authToken')
    }

    return { isLoggedIn, token, userId, getUserId, getToken, setAuth, logout, tokenInHeader }
  },
  {
    persist: true,
  },
)
