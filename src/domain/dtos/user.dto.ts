import type { RoleType } from '../enums/role.enum'

export interface IUserDTO {
  id?: string
  username: string
  firstname: string
  lastname: string
  createdAt?: Date
  pokemonCoin: number
  roles?: RoleType[]
}

export interface IPasswordUpdateDTO {
  oldPassword: string
  newPassword: string
}
