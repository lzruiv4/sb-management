// // import { IUser, IUserDTO } from '@/model/IUser'
// // import axios from 'axios'
// import { USER_API } from '@/api/api'
// import axios from 'axios'
// import { defineStore } from 'pinia'
// import { ref, watch } from 'vue'

// export const useUserStore = defineStore('userStore', () => {
//   const user = ref<IUser>({
//     userId: '',
//     username: '',
//     createdAt: undefined,
//     firstname: '',
//     lastname: '',
//     pokemonCoin: 0,
//   })
//   const loading = ref(false)

//   // check for data has been loading
//   watch(user, (newUser) => {
//     if (newUser) console.log('User data has been loading.')
//   })

//   async function getCurrentUser() {
//     try {
//       loading.value = true
//       const res = await axios.get(USER_API + '/' + CURRENT_USER_ID)
//       user.value = res.data
//     } catch (error) {
//       console.error('Get user failed:', error)
//       throw error
//     } finally {
//       loading.value = false
//     }
//   }

//   async function updateUser(newUserDTO: IUserDTO) {
//     try {
//       console.log('Before update ', newUserDTO)
//       newUserDTO.id = CURRENT_USER_ID
//       const res = await axios.put(USER_API + '/' + CURRENT_USER_ID, newUserDTO)
//       console.log(res.data)
//       user.value = res.data
//     } catch (error) {
//       console.error('User update failed', error)
//     }
//   }

//   return { user, loading, getCurrentUser, updateUser }
// })
