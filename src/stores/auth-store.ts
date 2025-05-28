import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '' as string,
    userId: '' as string,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
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
      localStorage.removeItem('authToken')
      localStorage.clear()
      window.location.href = '/login'
    },
  },
})
