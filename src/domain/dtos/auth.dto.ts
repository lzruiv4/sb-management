// import type { RoleType } from '../enums/role.enum'

export interface ITokenDTO {
  userId: string
  token: string
}

export interface ILoginRequestDTO {
  username: string
  password: string
}

export interface IRegisterRequestDTO {
  username: string
  firstname: string
  lastname: string
  password: string
  // roles: RoleType[]
}

export interface IRegisterResponseDTO {
  userId: string
  username: string
  firstname: string
  lastname: string
}
