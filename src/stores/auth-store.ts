import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('authToken') || '',
    userId: localStorage.getItem('userId') || '',
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserId: (state) => state.userId,
  },

  actions: {
    setAuth(token: string, userId: string) {
      this.token = token
      localStorage.setItem('authToken', token)
      this.userId = userId
      localStorage.setItem('userId', userId)
    },

    logout() {
      this.token = ''
      this.userId = ''
      localStorage.clear()
      window.location.href = '/login'
    },
  },
})
