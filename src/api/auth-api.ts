import axios from 'axios'
import { LOGIN_URL, REGISTER_URL } from './api'
import type { ILoginRequestDTO, IRegisterRequestDTO } from '@/domain/dtos/auth.dto'

export const login = (data: ILoginRequestDTO) => axios.post(LOGIN_URL, data)
export const register = (data: IRegisterRequestDTO) => axios.post(REGISTER_URL, data)
